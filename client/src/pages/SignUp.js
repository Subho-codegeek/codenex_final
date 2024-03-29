import React from 'react'
import { useNavigate, Link } from "react-router-dom";

import '../css/Sign.css'

const SignUp = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault(); 
      navigate('/room');
    };

  return (
    <div className='log-body'>
    <div className="log-container sign-up" id="log-container">
        <div className="log-form-container log-sign">
            <div className='log-form'>
                <h1>Create Account</h1>
                <div className="log-social-icons">
                    <a href="#" className="log-icon"><i className="fa-brands fa-google"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-microsoft"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="log-icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button onClick={handleLogin}>Sign Up</button>
                <p>Already have an account? <Link to="/">Sign In</Link></p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default SignUp