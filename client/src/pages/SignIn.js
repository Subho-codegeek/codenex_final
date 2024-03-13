import React from 'react'
import { useNavigate } from "react-router-dom";

import '../css/Sign.css'

const SignIn = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault(); 
      navigate('/editor');
    };
  return (
    <div className='log-body'>
    <div className="log-container" id="log-container">
        <div className="log-form-container log-sign-in">
            <form action="#" onSubmit={handleLogin}>
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
                <button>Sign In</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default SignIn
