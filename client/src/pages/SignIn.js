import React from 'react'
import { useNavigate, Link } from "react-router-dom";

import '../css/Sign.css'

const SignIn = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault(); 
      navigate('/room');
    };
  return (
    <div className='log-body'>
    <div className="log-container sign-in" id="log-container">
        <div className="log-form-container log-sign">
            <div className='log-form'>
                <h1>Sign In</h1>
                <div className="log-social-icons">
                    <a href="#" className="log-icon"><i className="fa-brands fa-google"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-microsoft"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button onClick={handleLogin}>Sign In</button>
                <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default SignIn
