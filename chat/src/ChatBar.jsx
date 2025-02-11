import { useState } from 'react'

import './assets/css/ChatBar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faImage, faX } from '@fortawesome/free-solid-svg-icons';

import UserMessage from './UserMessage'

export default function ChatBar({addMessage,removeLastMessage}){
    const [image, setImage] = useState(null);
    const [query, setQuery] = useState('');
    const [userMessage, setUserMessage] = useState(null);
  
    const loadImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImage({"image_file": e.target.result});
        reader.readAsDataURL(file);
      }
    }
  
    const modelAnswerFetch = async ({text, img}) => {
      try {
        const response = await fetch('http://localhost:5124/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            image: img !== null ? image.image_file : null
          })
        });
        const data = await response.json();
        if (data.error) {
          throw Error(data.error);
        }
        console.log(data);
        addMessage('model', data);
      } catch (error) {
        console.error('Error fetching model answer:', error);
        setUserMessage('Error fetching model answer');
        setTimeout(() => setUserMessage(null), 5000);
        throw error;
      }
    }
  
    const handleQuery = async ()=>{
      if (query==='') return;
      const text = query;
      const img = image;
  
      setQuery('');
      setImage(null);
  
      addMessage('user', {
        message: text,
        images: [img]
      });
      try {
        await modelAnswerFetch({text, img});
      } catch (error) {
        setQuery(text);
        setImage(img);
        removeLastMessage();
      }
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
        <button className='image-input button' onClick={() => document.getElementById('imageInput').click()}>
            <FontAwesomeIcon icon={faImage}/>
        </button>
        {image && (
          <div className='image-preview'>
            <button className='close button' onClick={()=>setImage(null)}>
                <FontAwesomeIcon icon={faX}/>
            </button>
            <img src={image.image_file} alt='preview' />
          </div>
        )}
        <textarea 
          type='text' 
          value={query}
          onChange={(event)=>setQuery(event.target.value)}
          placeholder='Write something...'
          onKeyDown={handlePressEnter}
        />
        <button className='search button' onClick={handleQuery}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {userMessage && (<UserMessage message={userMessage} isVanishing={true} messageType='error' />)}
      </div>
    )
}