import { createRoot } from 'react-dom/client'
import { ContextProvider } from './context.jsx'
import './assets/css/index.css'
import Chat from './Chat.jsx'
import NavBar from './NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <NavBar />
    <Chat />
  </ContextProvider>
)
