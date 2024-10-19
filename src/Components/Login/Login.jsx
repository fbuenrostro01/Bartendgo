import React from 'react'
import './Login.css'


const Login = ({ setIsLoggedIn }) => {

    
    const handleSubmit = (e) => {
      e.preventDefault();
      
      setIsLoggedIn(true); // changes the state of it to true which logs you in / if we have time weed need to add anohter button to log out 
    }; // the user we can problem have the button trigger with a click and a timer that automatically logs out after 3 min back to login page
  
    return (
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type="text" placeholder='Username' required />
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;
  