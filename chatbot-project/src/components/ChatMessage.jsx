import RobotProfileimage from '../assets/robot.png'
import UserProfileImage from '../assets/profile-picture1.png'
import './ChatMessage.css'


export function ChatMessage({ message, sender, currentTime }){
        // const message = props.message;
        // const sender = props.sender;
        // const { message, sender } = props;
        
        /*
        if(sender === 'robot'){
          return (
            <div>
              <img src="robot.png" width="50"/>
              {message}
            </div>
          );
        }
        */
        return (
          <div className={sender === 'user' ? 'chat-message-user ' : 'chat-message-robot'}>
            {sender === 'robot' && (
              <img src={RobotProfileimage} className="chat-message-profile" />)
            }
            <div className="chat-message-text">
              {message}
              {currentTime && <div className="chat-message-time">{currentTime}</div>}
            </div>
            {sender === 'user' && (
              <img src={UserProfileImage} className="chat-message-profile" />
            )}
          </div>
        );
      }