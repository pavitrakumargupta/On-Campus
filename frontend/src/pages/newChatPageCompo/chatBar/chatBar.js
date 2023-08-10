import React, { useState } from 'react'
import "./chatBar.css"
import { useSelector } from "react-redux";
import GroupChatModel from '../groupChatModel';


const ChatBar = ({chats,setSelectedChat,selectedChat,chatUnreadMessageList,fetchChats}) => {


  const user = useSelector((state) => state);
  // const [chats,setChats]=useState()
   
  const setSelectedChatfunc=(chat)=>{
    setSelectedChat(chat)
  }

  const navBar=()=>{
    return (
    <nav>
      <h3>My Chats</h3>
      <button onClick={()=>setActiveCreateGpWindow(true)}>
        <icon>
          <i class="fa-solid fa-plus"></i>
          {/* <i class="fa-solid fa-people-group"></i> */}
        </icon> 
        <p>New Group Chat</p>
      </button>
    </nav>)
  }

  const getSender=(users)=>{
    let sender=users.find(key=>key._id!==user.details._id)
    return sender
  }

  const [activeCreateGpWindow,setActiveCreateGpWindow]=useState(false)
  
  const toggleActiveCreateGpWindow=()=>{
    setActiveCreateGpWindow(!activeCreateGpWindow)
  }

  

  return (
    <div className='chatBar'>
      {navBar()}
      {activeCreateGpWindow&&<GroupChatModel
        setActiveWindow={toggleActiveCreateGpWindow}
        fetchChats={fetchChats}
      />}
      <div className='chatsWrapper'>
      {/* {loading&&<Skeleton className='skeleton'  count={20}/> } */}
        {chats?.map(chat=>(
          <button style={selectedChat===chat?{ backgroundColor:"rgb(61, 62, 62,0.5)", color: "white"}:{}} onClick={()=>setSelectedChatfunc(chat)} className='chatWrap'>
            {chat.isGroupChat? <i class="fa-solid fa-users-viewfinder"></i>:
             <img src={getSender(chat.users).profilePitchure} alt="" />
            }
             <div>
              <p>{!chat.isGroupChat?getSender(chat.users).name:chat.chatName}</p>
              {chat?.latestMessage&&<span>{chat?.latestMessage?.content.substring(0,40)}..</span>}
             </div> 
             {chatUnreadMessageList[chat._id]?.length>0&&<p>{chatUnreadMessageList[chat._id]?.length}</p> }           
          </button>
        ))}
      </div>
     
    </div>
  )
}

export default ChatBar