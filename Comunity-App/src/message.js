import React,{useEffect} from 'react'
import {PrettyChatWindow} from "react-chat-engine-pretty"
import { ChatEngine } from 'react-chat-engine'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Message = () => {
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

  return (
    <div style={{height:"80vh"}}>
        {user!=="unset"&&
        <PrettyChatWindow
          projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
          username={user.details.username} // adam
          secret={user.details.userId} // pass1234
          style={{ height: "100%" }}
        />
  }

    </div> 
  )
}

export default Message