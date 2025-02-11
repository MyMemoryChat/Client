import React from "react";

import './assets/css/NavBar.css'

export default function NavBar(){
    const resetAgents = () => {
        fetch('http://localhost:5124/reset', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error resetting agents:', error);
        });
    }
    return(
        <div id='nav-bar'>
            <h1 onClick={resetAgents}>OurMemories</h1>
        </div>
    )
}