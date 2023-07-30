import React, { useState,useEffect } from 'react'
import "./chatPage.css"
import ChatBar from "../newChatPageCompo/chatBar/chatBar"
import Chats from "../newChatPageCompo/chats/chats"
import UserSidebar from "../newChatPageCompo/userSidebar/userSidebar"
import 'react-loading-skeleton/dist/skeleton.css'
const MessageIcon="https://firebasestorage.googleapis.com/v0/b/otp-sender-382116.appspot.com/o/blogs%2Fimage_20230728_075303_34229_messgae.png?alt=media&token=82904c64-15aa-45af-8974-94c51d499b7c"

const ChatPage = () => {

  const [userSidebarActive,setUserSidebarActive]=useState(false)
  const [selectedChat,setSlectChat]=useState()
  const [chatModified,setChatModified]=useState(false)
  const [unReadMessage,setUnreadMessage]=useState()
  const [activechatSidebar,setactivechatSidebar]=useState(false)
  useEffect(()=>{},[activechatSidebar])

  const navbar=()=>{
    return <nav>
            <button onClick={toggleUserSearchSidebar}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className='chatBarActive'
            onClick={activechatSidebarFunc}>
            <i class="fa-solid fa-message"></i>
            </button>
        </nav>
  }

  const activechatSidebarFunc=()=>{
    setactivechatSidebar(!activechatSidebar)
  }

  const toggleUserSearchSidebar=()=>{
    setUserSidebarActive(!userSidebarActive)
  }
  
  const setSelectedChat=(data)=>{
    setactivechatSidebar(!activechatSidebar)
    setSlectChat(data)
  }
  // useEffect(()=>{},[chatModified])

  const toggleModiefiedChat=()=>{
    setChatModified(!chatModified)
  } 

  const setUnreadMessagefunc=(data)=>{
    setUnreadMessage(data)
  }
  

  return (
    <div className={activechatSidebar?'ChatPage':'ChatPage chatBarActiveresp'}> 
      {navbar()}
      {userSidebarActive&&<UserSidebar  
        setSelectedChat={setSelectedChat}
        UserSidebar={toggleUserSearchSidebar}/>}
      <div className='chatPagePannel'>
          <ChatBar
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            chatModified={chatModified}
            unReadMessage={unReadMessage}
          />
          <Chats 
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            toggleModiefiedChat={toggleModiefiedChat}
            setUnreadMessage={setUnreadMessagefunc}
            />
            
      </div> 
    </div>
  )
}

export default ChatPage  