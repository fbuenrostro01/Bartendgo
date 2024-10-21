import React, { useState } from 'react';
import './Components/Styles/index.css';
import GetAllRecords from './GetAllRecords.jsx'; // Import your main records component
import Login from './Components/Login/Login.jsx'; // Import the Login component
import LogOutButton from './Components/LogOutButton.js'; // Import the LogOutButton

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleLogout = () => {
    console.log("logged out"); // Log a message for debugging
    setIsLoggedIn(false); // Set logged-in status to false
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <GetAllRecords onLogout={handleLogout} /> {/* Pass handleLogout here */}
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} /> 
      )}
    </div>
  );
};

export default App;

