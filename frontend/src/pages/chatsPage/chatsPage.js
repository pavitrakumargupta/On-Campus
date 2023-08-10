import { PrettyChatWindow } from "react-chat-engine-pretty";
import { ChatEngine,ChatFeed  } from 'react-chat-engine';
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./chatsPage.css"

const ChatsPage = () => {
  const user = useSelector((state) => state); 

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.details === "unset") {
      localStorage.setItem(
        "lastUrl",
        JSON.stringify({ url: location.pathname })
      );
      navigate("/");
    } 
  }, []);
  // console.log(user.details );
  return (
    <div className="chatPage">
      {user.details!="unset"&&
      // <PrettyChatWindow
      //   projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID} 
      //   username={user.details.username} // adam
      //   secret={user.details._id} // pass1234
      //   style={{ height: "100%" }}
      // />
    //   <ChatEngine
    //     projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
    //     userName={user.details.username} 
    //     userSecret={user.details._id}
 		// >
    //    <ChatFeed />
    // </ChatEngine>
    <ChatEngine
    projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
    userName={user.details.username} 
    userSecret={user.details._id}
    renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
  />
      }
    </div>
  ); 
}; 

export default ChatsPage; 
