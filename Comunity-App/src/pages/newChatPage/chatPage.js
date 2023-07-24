import React, { useState,useEffect } from 'react'
import "./chatPage.css"
import ChatBar from "../newChatPageCompo/chatBar/chatBar"
import Chats from "../newChatPageCompo/chats/chats"
import UserSidebar from "../newChatPageCompo/userSidebar/userSidebar"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css'
const ChatPage = () => {

  const location = useLocation();
  const user = useSelector((state) => state);

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

  const [userSidebarActive,setUserSidebarActive]=useState(false)
  const [selectedChat,setSlectChat]=useState()
  const [chatModified,setChatModified]=useState(false)

  const navbar=()=>{
    return <nav>
            <button onClick={toggleUserSearchSidebar}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <p>Search User</p>
            </button>
            <h5>Messaging App</h5>
            <div>
              <div className='notification'>
                <i class="fa-solid fa-bell"></i>
              </div>
              <i class="fa-solid fa-user"></i>
            </div>
        </nav>
  }

  const toggleUserSearchSidebar=()=>{
    setUserSidebarActive(!userSidebarActive)
  }
  
  const setSelectedChat=(data)=>{
    setSlectChat(data)
  }
  // useEffect(()=>{},[chatModified])

  const toggleModiefiedChat=()=>{
    setChatModified(!chatModified)
  }
  

  return (
    <div className='ChatPage'> 
      {navbar()}
      {userSidebarActive&&<UserSidebar  
        setSelectedChat={setSelectedChat}
        UserSidebar={toggleUserSearchSidebar}/>}
      <div className='chatPagePannel'>
          <ChatBar
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            chatModified={chatModified}
          />
          <Chats 
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            toggleModiefiedChat={toggleModiefiedChat}
            />
            
      </div> 
    </div>
  )
}

export default ChatPage  