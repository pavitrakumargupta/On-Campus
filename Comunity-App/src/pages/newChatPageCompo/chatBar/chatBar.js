import React, { useEffect, useState } from 'react'
import "./chatBar.css"
import axios from "../../../axios"
import { useSelector } from "react-redux";
import Skeleton from 'react-loading-skeleton'
import GroupChatModel from '../groupChatModel';
import { useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"

const ChatBar = ({setSelectedChat,selectedChat,chatModified,unReadMessage}) => {
  const toast_style={
    position:"bottom-right", 
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }

  const navigate=useNavigate()
  const user = useSelector((state) => state);
  const [chats,setChats]=useState()
  const [loading,setloading]=useState(false)
  const [chatUnreadMessageList,setUnreadMessageList]=useState({})


  const fetchChats=async()=>{
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      setloading(true)
      const {data}=await axios.get("/Chat",config)
      setChats(data)
    } catch (error) {
      console.log(error);

      if(error.response.status===401){
        navigate("/login")
      }else{
        toast.error(error.response.data.message,toast_style)
        
      }
      throw error
    }
    
  }

  useEffect(()=>{
    try {
      if(selectedChat&&chats){
        let isChatExist=chats.find((key)=>key._id===selectedChat._id)
        !isChatExist&&fetchChats()
      }else if(user.details!=="unset") {
        fetchChats()
      }
      
    } catch (error) {
     
    }
  },[user,selectedChat])

  useEffect(()=>{
    fetchChats()
  },[chatModified])



  useEffect(()=>{
    
    loading&&chats?.map((key)=>{
      setUnreadMessageList(prevValue=>({...prevValue,[key._id]:[]}))
    })
    setloading(false)
  
  },[chats])
  
  useEffect(()=>{

  if(chatUnreadMessageList&&unReadMessage){
    let unreadChat = chats.find((key) => key._id === unReadMessage?.chat._id);
    const filteredChats = chats.filter((chat) => chat._id !== unreadChat._id);
    const reorderedChats = [unreadChat, ...filteredChats];
    setChats(reorderedChats);

    setUnreadMessageList(prevValue=>(
    {
      ...prevValue,
      [unReadMessage?.chat._id]:[...chatUnreadMessageList[unReadMessage?.chat._id],unReadMessage]
    }
  ))
  }
  },[unReadMessage])
 
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

  const setSelectedChatfunc=(chat)=>{
    setSelectedChat(chat)
    setUnreadMessageList(prevValue=>(
      {
        ...prevValue,
        [chat._id]:[]
      }))
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
          <button style={selectedChat===chat?{ backgroundColor:"rgb(61, 62, 62,0.5)", color: "white"}:{}} onClick={()=>setSelectedChatfunc(chat)} className='chatWrap'>
            {chat.isGroupChat? <i class="fa-solid fa-users-viewfinder"></i>:
             <img src={getSender(chat.users).profilePitchure} alt="" />
            }
             <div>
              <p>{!chat.isGroupChat?getSender(chat.users).name:chat.chatName}</p>
              <span>last Message</span>
             </div> 
             {chatUnreadMessageList[chat._id]?.length>0&&<p>{chatUnreadMessageList[chat._id]?.length}</p> }           
          </button>
        ))}
      </div>
      <ToastContainer />
    </div>
  )
}

export default ChatBar