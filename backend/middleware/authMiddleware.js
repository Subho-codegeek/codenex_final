// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

module.exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, "abc123");

      req.user = await User.findById(decoded.userId).select('-password');
      console.log("req.user:", req.user); // Informative logging
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

