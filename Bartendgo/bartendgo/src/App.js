import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login/Login';
import GetAllRecords from './GetAllRecords';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return (
    <div>
      {isLoggedIn ? <GetAllRecords /> : <Login setIsLoggedIn={setIsLoggedIn} />} {/* Passing setIsLoggedIn to Login */}
    </div>
  );
}




export default App;
