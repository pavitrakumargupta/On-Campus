import React, { useState,useEffect } from 'react'
import "./chatPage.css"
import ChatBar from "../newChatPageCompo/chatBar/chatBar"
import Chats from "../newChatPageCompo/chats/chats"
import UserSidebar from "../newChatPageCompo/userSidebar/userSidebar"
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux";
import axios from "../../axios"
import {ToastContainer,toast} from "react-toastify"
import io from "socket.io-client"
import startChatting from "../../logos/start chatting.gif"; 
const ENDPOINT="https://on-campus-server.onrender.com"
var socket,selectedChatCompare,newChatCompare;

const ChatPage = () => {
  const user = useSelector((state) => state);

  // toast style
  const toast_style={
    position:"bottom-right", 
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }

  // for sidebar only
  const [userSidebarActive,setUserSidebarActive]=useState(false)
  const [activechatSidebar,setactivechatSidebar]=useState(false)
  useEffect(()=>{},[activechatSidebar])



  // if userSidebar clicks on any of user New chat Created
  const [chatModified,setChatModified]=useState(false)
  useEffect(()=>{
    fetchChats()
  },[chatModified])

    // chats
    const [chats,setChats]=useState()
    const [selectedChat,setSlectChat]=useState()

  const setSelectedChatfunc=(chat)=>{
    setSlectChat(chat)
    setUnreadMessageList(prevValue=>(
      {
        ...prevValue,
        [chat._id]:[]
      }))
  }
  useEffect(()=>{
    try {
      if(selectedChat&&chats){
        let isChatExist=chats.find((key)=>key._id===selectedChat._id)
        !isChatExist&&fetchChats()
        socket.emit("join chat", {
          chatId: selectedChat._id,
          user: user.details._id,
        });
      }else if(user.details!=="unset") {
        fetchChats()
      }
      
    } catch (error) {
     
    }
  },[user,selectedChat])

  const fetchChats=async()=>{
    try {
      // setloading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      
      const {data}=await axios.get("/Chat",config)
      setChats(data)
    } catch (error) {
      console.log(error); 
      error.response.status==401&&(window.location.href = "/login")
      toast.error(error.response.data,toast_style)
      throw error
    }
  }

  

  // for unread messages
  const [unReadMessage,setUnreadMessage]=useState()
  const [loading,setloading]=useState(true)
  const [chatUnreadMessageList,setUnreadMessageList]=useState({})
  useEffect(()=>{
    loading&&chats?.map((key)=>{
      setUnreadMessageList(prevValue=>({...prevValue,[key._id]:[]}))
    })
    loading&&chats?.length>0&&setloading(false)
  },[chats])
  
  useEffect(()=>{

  if(chatUnreadMessageList&&unReadMessage){
    // console.log("hello");
    newChatCompare=newChat
    let unreadChat = chats.find((key) => key._id === unReadMessage?.chat._id);
    const filteredChats = chats.filter((chat) => chat._id !== unreadChat._id);
    const reorderedChats = [unreadChat, ...filteredChats];
    setChats(reorderedChats);
    if(!selectedChat ||selectedChat?._id!==unReadMessage?.chat?._id){
      chats&&setUnreadMessageList(prevValue=>(
        {
          ...prevValue,
          [unReadMessage?.chat._id]:[...chatUnreadMessageList[unReadMessage?.chat._id],unReadMessage]
        }
      ))
    }
  }
  },[unReadMessage])


  // specific chat
  const [newChat,setNewChat]=useState()
  const [typingUser,setTypingUser]=useState()
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (user.details._id && chats && chatUnreadMessageList && !socketConnected) {
      socket = io(ENDPOINT);
      socket.emit("setup", { ...user.details, _id: user.details._id }, (response) => {
        console.log(response);
        response?.map((newMessageReceived) => {
          setUnreadMessage(newMessageReceived);
        });
        setSocketConnected(true);
      });
      socket.on("connection", () => {
        console.log("connection");
        setSocketConnected(true); // Mark socket connection as established
      });
    }

  }, [chats, socketConnected]);
  

  // recieve messsage
      
// recieve message
useEffect(() => {
  try {
    if(chats && socketConnected){
      socket.on("message recieved", (newMessageReceived) => {
        console.log(newMessageReceived);
        setUnreadMessage(newMessageReceived)
        setNewChat(newMessageReceived);

        // Also, handle any other logic related to the received message
        if (selectedChatCompare?._id !== newMessageReceived.chat._id) {
        } else {
          setTypingUser();
          setNewChat(newMessageReceived);
        }
      });
    }
  } catch (error) {
    console.log("Error in message received:", error);
  }
}, [socketConnected]);


 useEffect(()=>{},[newChat])

  // send messsage
  const sendMessage=(data)=>{
    socket.emit("newMessgae",data)
  }

  useEffect(()=>{ 
    if(chats && socketConnected){
    socket.on("typing message recieved",(typingMessage)=>{
      if( selectedChatCompare?._id!==typingMessage?._id){
        // give notification to specific chat
      }else{
      setTypingUser(typingMessage.typingUser.name)
      setTimeout(()=>{
        setTypingUser() 
      },4000) 
    }
    })
  }
  },[socketConnected])

  const typingUserFunc=(data)=>{
    socket.emit("typing", data);
  }

  useEffect(()=>{
    setTypingUser()
    // console.log(selectedChat);
    selectedChatCompare = selectedChat;
  },[selectedChat])




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
      {chats&&<div className='chatPagePannel'>
          <ChatBar
            chats={chats}
            setSelectedChat={setSelectedChatfunc}
            selectedChat={selectedChat}
            unReadMessage={unReadMessage}
            fetchChats={fetchChats}
            chatUnreadMessageList={chatUnreadMessageList}
          />
          {selectedChat?<Chats 
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            toggleModiefiedChat={toggleModiefiedChat}
            setUnreadMessage={setUnreadMessagefunc}
            newChat={newChat}
            typingUser={typingUser}
            sendMessageFunc={sendMessage}
            typingUserFunc={typingUserFunc}
            />:<div className="chatPannel">
            <h5>Start Chatting with people</h5>
            <img src={startChatting} alt="" />
          </div>}
      </div> }
      <ToastContainer />
    </div>
  )
}

export default ChatPage  