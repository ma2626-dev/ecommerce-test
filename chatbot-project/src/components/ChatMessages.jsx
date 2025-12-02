import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'


 function useAutoScroll(dependencies) {
        const chatMessagesRef =  useRef(null); /* ref = a container with special React features - saves an html element inside ref with initial value of null */

        useEffect(() => {
          const containerElem = chatMessagesRef.current /* .current = the current element inside ref */
          if(containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        }, [dependencies]);
        return chatMessagesRef;
      }

function ChatMessages ({ chatMessages }){
  const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
            currentTime={chatMessage.currentTime}
          />
        );
      })}
    </div>
  )
}

export default ChatMessages;