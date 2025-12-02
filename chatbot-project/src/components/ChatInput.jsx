import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadinGif from '../assets/loading-spinner.gif'
import dayjs from 'dayjs';

import './ChatInput.css'


export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading}) {
        const [inputText, setInputText] = useState('');

        function clearButton() {
          setChatMessages([])
        }


        function saveInputText(event){
          setInputText(event.target.value);
        }

        function saveInputByKey(event) {
          if (event.key === 'Enter' && !isLoading) {
            sendMessage();
          }

          if (event.key === 'Escape'){
            setInputText('');
          }
        }

        async function sendMessage() {
          if (isLoading || !inputText.trim()) {
            return;                
          }

          setIsLoading(true); 
          const time = dayjs().valueOf();
          const currentTime = dayjs(time).format('h:mma');

          const userMessage = {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID(),
            currentTime
          };

          const newChatMessages = [
            ...chatMessages,
            userMessage
          ]

          const loadingMessages = [
            ...newChatMessages,
            {
              message: <img src={LoadinGif} className="loading-spinner"/>,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(loadingMessages);
          setInputText('');

          try{
          const response = await Chatbot.getResponseAsync(userMessage.message);
            setChatMessages([
            ...newChatMessages,
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID(),
              currentTime
            }
          ]);
          }catch (error) {
            console.error("Chatbot API failed:", error);
          } finally {
            setIsLoading(false);
          }
        }

        return (
          <div className="chat-input-container">
            <input 
              className="chat-input"
              placeholder="Send a message to Chatbot" 
              size="30"
              onChange={saveInputText}
              onKeyDown={saveInputByKey}
              value={inputText}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="send-button"
            >Send</button>
            <button 
              onClick={clearButton}
              className="clear-button"
            >Clear</button>
          </div>
        );
      }