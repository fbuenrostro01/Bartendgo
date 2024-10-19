import React from "react"
import './Styles/LogOutButton.css'
import './Login/Login.jsx'

const LogOutButton=({onClick})=>{
    return(
        <button className="log-out-button" onClick={onClick}>
        Log Out
        </button>
        
    )

}
export default LogOutButton