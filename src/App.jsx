import React, { useState } from 'react';
import './Components/Styles/index.css';
import GetAllRecords from './GetAllRecords.jsx'; 
import Login from './Components/Login/Login.jsx'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [refreshKey, setRefreshKey] = useState(0); 

  // changes the state to log in or out 
  const handleLogout = () => {
    console.log("Logged out");
    setIsLoggedIn(false); 
  };

  // refreshes taht data dont think we need it anymore but not trying to delted adn mess up code last moment 
  const refreshData = () => {
    setRefreshKey((oldKey) => oldKey + 1); 
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          {/*sends the data again*/}
          <GetAllRecords refreshKey={refreshKey} onLogout={handleLogout} /> 
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} /> 
      )}
    </div>
  );
};

export default App;


