const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');

// module.exports.testUser = async (req, res) => {
//   console.log('Test Route');
//   return res.json({ message: 'Test Route' });
// }

module.exports.authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken.generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};



module.exports.registerUser = async (req, res) => {

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken.generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};



module.exports.logoutUser = async(req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};



module.exports.getUserProfile = async  (req, res) => {
  const user = await User.findById(req.user._id);
  // res.status(200).json(req.user);
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};


module.exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
