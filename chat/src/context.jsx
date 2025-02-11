import { createContext, useState, useContext } from "react";

// Create Context
const Context = createContext();

// Provider Component
export const ContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <Context.Provider value={{ messages, setMessages }}>
      {children}
    </Context.Provider>
  );
};

// Custom Hook to use the context
export const useMessages = () => useContext(Context);
