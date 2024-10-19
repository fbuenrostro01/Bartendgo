import React, { useState } from 'react';
import './Components/Styles/index.css';
import GetAllRecords from './GetAllRecords'; // Import your main records component
import Login from './Components/Login/Login.jsx'; // Import the Login component

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  return (
    <div className="App">
      {isLoggedIn ? (
        <GetAllRecords /> // Render this component if logged in
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} /> // Render Login component if not logged in
      )}
    </div>
  );
};

export default App;
