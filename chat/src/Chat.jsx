import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faImage, faX } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Chat.css'

function ChatMessages(messages){
  console.log(messages);
  return(
    <div className='chat-messages'>
      {messages.messages.map((message, index) => (
        <div key={index} className={`${message.role} message ${message.message.image ? 'image' : ''}`}>
          {message.message.images.map((image, index) => (
            image !== null && (<img key={index} src={image.image_file} alt='preview' />)
          ))}
          <p>{message.message.message}</p>
        </div>
      ))}
    </div>
  )
}

function ChatBar({addMessage}){
  const [image, setImage] = useState(null);
  const [query, setQuery] = useState('');

  const loadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  }

  const modelAnswerFetch = async () => {
    const response = await fetch('http://localhost:5124/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: query,
        image: image
      })
    });
    const data = await response.json();
    if (data.answer.error){
      console.error('Error:', data.answer.error);
      return;
    }
    console.log(data);
    addMessage('model', data.answer);
  }

  const handleQuery = async ()=>{
    if (query==='') return;
    console.log(query);
    addMessage('user', {
      message: query,
      images: [image]
    });
    try {
      await modelAnswerFetch();
    } catch (error) {
      console.error('Error fetching model answer:', error);
    }
    setQuery('');
    setImage(null);
  }

  const handlePressEnter = (event)=>{
    if (event.key === 'Enter') {
        event.preventDefault();
        handleQuery();
    }
  };

  return(
    <div className='chat-bar'>
      <input 
        type="file" 
        accept="image/*"
        id="imageInput" 
        style={{ display: 'none' }} 
        onChange={loadImage} 
      />
      <button onClick={() => document.getElementById('imageInput').click()}>
        <FontAwesomeIcon icon={faImage} />
      </button>
      {image && (
        <div className='image-preview'>
          <button onClick={()=>setImage(null)}>
            <FontAwesomeIcon icon={faX} />
          </button>
          <img src={image} alt='preview' />
        </div>
      )}
      <hr />
      <textarea 
        type='text' 
        value={query}
        onChange={(event)=>setQuery(event.target.value)}
        placeholder='Write something...'
        onKeyDown={handlePressEnter}
      />
      <button onClick={handleQuery}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
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