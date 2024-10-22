import React, { useEffect } from "react";
import './Styles/LogOutButton.css';

const LogOutButton = ({ onClick }) => {

  useEffect(() => {
    console.log('Auto-logout timer started');

    // Set a timer to auto-log out after 2 minutes (120000 milliseconds)
    const autoLogoutTimer = setTimeout(() => {
      console.log('Auto-logout triggered');
      onClick(); // Trigger the log out action
    }, 120000); // 2 minute logout

    // Clean up the timer if the component unmounts before 2 minutes
    return () => {
      console.log('Cleaning up auto-logout timer');
      clearTimeout(autoLogoutTimer);
    };
  }, [onClick]);

  return (
    <button className="log-out-button" onClick={onClick}>
      Log Out
    </button>
  );
};

export default LogOutButton;
