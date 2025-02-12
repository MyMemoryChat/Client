import { useMessages } from './context.jsx';
import './assets/css/Chat.css';
import { motion } from "framer-motion";

import ChatBar from './ChatBar.jsx'
import Image from './Image.jsx';

function ChatMessages(){
  const { messages } = useMessages();
  console.log(messages)
  return(
    <div className='chat-messages'>
      {messages.map((message, index) => (
        <div key={index} className={`${message.role} message ${message.message.image ? 'image' : ''}`}>
          <div className='images'>
            {message.message.images.map((image, index) => (
              image !== null && (<Image image={image} />)
            ))}
          </div>
          <p>{message.message.message}</p>
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
    </div>
  )
}

export default function Chat(){
  const { messages, setMessages } = useMessages();
  console.log(messages);

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
      {messages.length > 0 ? <ChatMessages/> : <h1 className='main-title'>Tell me about yourself 🤗</h1>}
      <ChatBar addMessage={addMessage} removeLastMessage={removeLastMessage}/>
    </div>
  )
}