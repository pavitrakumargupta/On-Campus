import React, { useEffect, useState } from 'react'
import "./chatBar.css"
import axios from "../../../axios"
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import GroupChatModel from '../groupChatModel';

const ChatBar = ({setSelectedChat,selectedChat,chatModified}) => {
  const user = useSelector((state) => state);
  const [chats,setChats]=useState()
  const [loading,setloading]=useState(false)


  const fetchChats=async()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
      },
    };
    setloading(true)
    const {data}=await axios.get("/Chat",config)
    setChats(data)
  }

  useEffect(()=>{
    try {
      if(selectedChat&&chats){
        let isChatExist=chats.find((key)=>key._id===selectedChat._id)
        !isChatExist&&fetchChats()
      }else{
        fetchChats()
      }
      
    } catch (error) {
      
    }
  },[user,selectedChat])

  useEffect(()=>{
    fetchChats()
  },[chatModified])



  useEffect(()=>{setloading(false)},[chats])

  const navBar=()=>{
    return (
    <nav>
      <h3>My Chats</h3>
      <button onClick={()=>setActiveCreateGpWindow(true)}>
        <icon>
          <i class="fa-solid fa-plus"></i>
          <i class="fa-solid fa-people-group"></i>
        </icon> 
        <p>New Group Chat</p>
      </button>
    </nav>)
  }

  const getSender=(users)=>{
    let sender=users.find(key=>key._id!==user.details.userId)
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
      {loading&&<Skeleton className='skeleton'  count={20}/> }
        {!loading&&chats?.map(chat=>(
          <button style={selectedChat===chat?{ backgroundColor:"rgb(56, 178, 172)", color: "white"}:{}} onClick={()=>setSelectedChat(chat)} className='chatWrap'>
            {chat.isGroupChat? <i class="fa-solid fa-users-viewfinder"></i>:
             <img src={getSender(chat.users).profilePitchure} alt="" />
            }
             <div>
              <p>{!chat.isGroupChat?getSender(chat.users).name:chat.chatName}</p>
              <span>last Message</span>
             </div>             
          </button>
        ))}
      </div>
      
    </div>
  )
}

export default ChatBar