import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { Chatbot } from 'supersimpledev';
import ChatMessages from './components/ChatMessages';
import './App.css'




  export function App(){    
          const [chatMessages, setChatMessages ] = useState(JSON.parse(localStorage.getItem('messages')) || []);
          useEffect(() => {
            localStorage.setItem('messages', JSON.stringify(chatMessages))
          },[chatMessages]);


          useEffect(() => {
            Chatbot.addResponses(
              {
                thanks:"You're Welcome!"
              })
          }, []);
            // const [chatMessages, setChatMessages] = array;
            // const chatMessages = array[0];
            // const setChatMessages = array[1];
          
          const [isLoading, setIsLoading] = useState(false);
          const showWelcomeMessage = chatMessages.length === 0;

          return (
            <div className="app-container">
              <ChatMessages 
                chatMessages={chatMessages}
              />
              {showWelcomeMessage && <div className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</div>}
              <ChatInput 
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          );
        } 


export default App