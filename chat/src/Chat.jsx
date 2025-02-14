import { useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";

import './assets/css/Chat.css';
import { motion } from "framer-motion";

import ChatBar from './ChatBar.jsx'
import Image from './Image.jsx';

function ChatMessages(){
  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return(
    <div className='chat-messages'>
      {messages.map((message, index) => (
        <div key={index} className={`${message.role} message ${message.message.image ? 'image' : ''}`}>
          <div className='images'>
            {message.message.images.map((image, index) => (
              image?<Image key={index} image={image} />:null
            ))}
          </div>
          <div className='text'>
            <ReactMarkdown>{message.message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
      {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
        <div className='model message'>
          <div className="typing-indicator">
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={{
                  y: [0, -3, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default function Chat(){
  const messages = useSelector((state) => state.messages.messages);
  
  return(
    <div id='chat'>
      {messages.length > 0 ? <ChatMessages/> : <h1 className='main-title'>Tell me about yourself 🤗</h1>}
      <ChatBar/>
    </div>
  )
}