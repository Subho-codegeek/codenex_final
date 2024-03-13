import React from 'react'
import { useNavigate } from "react-router-dom";

import '../css/Sign.css'

const SignUp = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault(); 
      navigate('/editor');
    };

  return (
    <div className='log-body'>
    <div className="log-container" id="log-container">
        <div className="log-form-container log-sign-up">
            <form action='#' onSubmit={handleLogin}>
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
                <button>Sign Up</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default SignUp