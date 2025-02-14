import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./store/store";
import './assets/css/index.css'
import Chat from './Chat.jsx'
import NavBar from './NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavBar />
      <Chat />
    </PersistGate>
  </Provider>
)
