import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './assets/css/UserMessage.css';

export default function UserMessage({ message, isVanishing, messageType}) {
    const messages = [
        {name: "error", icon: faExclamationCircle},
        {name: "info", icon: faInfoCircle}
    ];

    return (
        <div className={`user-message ${isVanishing ? 'vanishing' : ''} ${messageType}`}>
            <div className="user-message-content">
                <p><FontAwesomeIcon icon={messages.find(message => message.name === messageType).icon} /> {message}</p>
            </div>
        </div>
    );
}