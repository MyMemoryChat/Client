import React from "react";
import { useMessages } from "./context";

import './assets/css/NavBar.css'

export default function NavBar(){
    const { messages, setMessages } = useMessages();

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

    const resetConversation = () => {
        resetAgents();
        setMessages([]);
    }

    return(
        <div id='nav-bar'>
            <h1 onClick={resetConversation}>OurMemories</h1>
        </div>
    )
}