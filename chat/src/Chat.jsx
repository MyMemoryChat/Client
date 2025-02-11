import { useMessages } from './context.jsx';
import './assets/css/Chat.css';
import { motion } from "framer-motion";

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
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                y: [0, -5, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          ))}
        </div>    
      )}
    </div>
  )
}

export default function Chat(){
  const { messages, setMessages } = useMessages();

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