import { useState } from 'react'
import './assets/css/Chat.css'

import ChatBar from './ChatBar.jsx'

function ChatMessages(messages){
  console.log(messages);
  return(
    <div className='chat-messages'>
      {messages.messages.map((message, index) => (
        <div key={index} className={`${message.role} message ${message.message.image ? 'image' : ''}`}>
          <div className='images'>
            {message.message.images.map((image, index) => (
              image !== null && (<img key={index} src={image.image_file} />)
            ))}
          </div>
          <p>{message.message.message}</p>
        </div>
      ))}
      {messages.messages.length > 0 && messages.messages[messages.messages.length - 1].role === 'user' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          className='loading-spin'
        >
          <path
            fill="#000"
            d="M43.935,25.146c0-10.318-8.364-18.682-18.682-18.682
              c-10.318,0-18.682,8.364-18.682,18.682h4.068
              c0-8.064,6.55-14.614,14.614-14.614
              c8.064,0,14.614,6.55,14.614,14.614H43.935z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>      
      )}
    </div>
  )
}

export default function Chat(){
  const [messages, setMessages] = useState([]);

  const addMessage = (role, message)=>{
    const newMessage = {
      role: role,
      message: message
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }

  const removeLastMessage = () => {
    setMessages((prevMessages) => prevMessages.slice(0, -1));
  }

  return(
    <div id='chat'>
      {messages.length > 0 ? <ChatMessages messages={messages}/> : <h1>Tell me about yourself 🤗</h1>}
      <ChatBar addMessage={addMessage} removeLastMessage={removeLastMessage}/>
    </div>
  )
}