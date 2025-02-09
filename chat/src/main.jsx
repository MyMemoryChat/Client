import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import Chat from './Chat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chat />
  </StrictMode>,
)
