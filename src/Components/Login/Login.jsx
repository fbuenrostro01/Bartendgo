import React, { useState } from 'react'
import './Login.css'


const Login = ({ setIsLoggedIn }) => {
  let [loginId, setLoginId] = useState({username: '', password: ''})

  const handleInput = (event) => {
    const {name, value} = event.target
    setLoginId({...loginId, [name]:value})
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginId.username === "Admin" && loginId.password === "1234"){
      setIsLoggedIn(true);
    } 
    }
      // changes the state of it to true which logs you in / if we have time weed need to add anohter button to log out 
   // the user we can problem have the button trigger with a click and a timer that automatically logs out after 3 min back to login page

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="invalid">Invalid Username or Password</p>
        <div className='input-box'>
          <input onChange={handleInput} name='username' value={loginId.username} type="text" placeholder='Username' required />
        </div>
        <div className='input-box'>
          <input onChange={handleInput} name='password' value={loginId.password} type="password" placeholder='Password' required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

  export default Login;