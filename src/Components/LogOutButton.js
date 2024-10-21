import React from "react"
import './Styles/LogOutButton.css'
import './Login/Login.jsx'
// again wanted the log out button to basically kick you out to login had to put some of the other code in the getallrcords component
const LogOutButton=({onClick})=>{
    return(
        <button className="log-out-button" onClick={onClick}>
        Log Out
        </button>
        
    )

}
export default LogOutButton