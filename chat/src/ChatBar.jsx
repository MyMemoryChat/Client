import { useState, useRef } from 'react'

import { useDispatch } from 'react-redux';
import { addMessage, removeLastMessage } from "./store/messagesSlice";

import './assets/css/ChatBar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faImage, faX } from '@fortawesome/free-solid-svg-icons';

import UserMessage from './UserMessage'

export default function ChatBar({}){
    const [image, setImage] = useState(null);
    const [query, setQuery] = useState('');
    const [userMessage, setUserMessage] = useState(null);
    const textAreaRef = useRef(null);
    const dispatch = useDispatch();

    // Auto-grow function
    const handleInput = () => {
      const element = textAreaRef.current;
      element.style.height = "16px"; // Reset height to avoid accumulation
      const computedStyle = window.getComputedStyle(element);
      const padding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
      element.style.height = element.scrollHeight - padding + "px"; // Expand based on content
    };
  
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
        const response = await fetch('http://192.168.2.34:5124/generate', {
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
        dispatch(addMessage({
          role: 'model', 
          message: {
            message: data.message,
            images: data.images
          }
        }));
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

      const element = textAreaRef.current;
      element.style.height = "16px";

      setQuery('');
      setImage(null);
  
      dispatch(addMessage({
        role: 'user', 
        message:{
          message: text,
          images: [img?img:null]
        }
      }));
      try {
        await modelAnswerFetch({text, img});
      } catch (error) {
        setQuery(text);
        setImage(img);
        dispatch(removeLastMessage());
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
          ref={textAreaRef}
          onInput={handleInput}
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