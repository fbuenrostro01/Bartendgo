import React from 'react'
import './Login.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


import user_icon from '../Assests/person.png'
import password_icon from '../Assests/password.png'

const Login = () => {
    return (
        <div className = 'wrapper'>
            <form action="">
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Username' required />
                    <FaUser className='icon' />

                </div>
                <div className='input-box'>
                    <input type="password" placeholder='Password' required />
                    <FaLock className='icon'/>

                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href='#'>Forgot password?</a>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login