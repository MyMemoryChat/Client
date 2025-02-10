import { useState } from 'react'
import './assets/css/Chat.css'

import ChatBar from './ChatBar.jsx'

function ChatMessages(messages){
  console.log(messages);
  return(
    <div className='chat-messages'>
      {messages.messages.map((message, index) => (
        <div key={index} className={`${message.role} message ${message.message.image ? 'image' : ''}`}>
          {message.message.images.map((image, index) => (
            image !== null && (<img key={index} src={image.image_file} />)
          ))}
          <p>{message.message.message}</p>
        </div>
      ))}
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

  return(
    <div id='chat'>
      {messages.length > 0 ? <ChatMessages messages={messages}/> : <h1>Tell me about you</h1>}
      <ChatBar addMessage={addMessage}/>
    </div>
  )
}