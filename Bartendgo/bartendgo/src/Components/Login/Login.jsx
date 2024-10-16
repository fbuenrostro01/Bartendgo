import React from 'react'
import './Login.css'

import user_icon from '../Assests/person.png'
import password_icon from '../Assests/password.png'

const Login = () => {
    return (
        <div className = 'container'>
            <div className="header">
                <div className="text">Sign In</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
            <div className="input">
             <img scr={user_icon} alt="" />
             <input type="login" />   
            </div> 
            <div className="input">
             <img scr={password_icon} alt="" />
             <input type="password" />   
            </div> 
            </div>
            <div className="submit-container">
                <div className="submit">Login</div>
                <div className="submit">Password</div>

            </div>
        </div>
    );
};

export default Login