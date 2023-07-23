import React,{useRef,useEffect, useState}  from 'react'
import "./chat.css"
import { useSelector } from "react-redux";
import EditGroupChat from "../editGroupChat"

const Chats = ({setSelectedChat,selectedChat,toggleModiefiedChat}) => {
  const user = useSelector((state) => state);
  const chats_message = [
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
    "me: hello",
    "you: hii",
  ];

  

  const [chats,setChats]=useState(chats_message)
  const chatSectionRef = useRef(null);
  const [input_message,setInputMessage]=useState("")
  const [activeEditWindow,setActiveEditWIndow]=useState(false)

  useEffect(() => {
    // Scroll to the bottom of the chat section
    selectedChat&&(chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight)
  }, [chats,selectedChat]);

  const handleMessage=(event)=>{
    const {value}=event.target
    setInputMessage(value)
  }

  const sendMessage = () => {
    if (input_message.trim() !== '') {
      // Trim leading and trailing spaces without replacing new lines
      const message = input_message.replace(/^\s+|\s+$/g, '');
      const newChat = [...chats, 'me: ' + message];
      setChats(newChat);
      setInputMessage('');
    }
  }; 
  

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      // Handle Enter key event here
      if (event.shiftKey) {
        // Do nothing if Shift key is pressed along with Enter
        return;
      }
      event.preventDefault(); 
      sendMessage();
    }
  }

  const getSender=(users)=>{
    let sender=users.find(key=>key._id!==user.details.userId)
    return sender
  }


  const toggleEditWindow=()=>{
    setActiveEditWIndow(!activeEditWindow)
  }

  if(!selectedChat){
    return <div className='chatPannel'>
      <h5>Start Chatting with people</h5>
    </div>
  }else{
  return (
    <div className='chatPannel'>
    {selectedChat.isGroupChat&&activeEditWindow&&
      <EditGroupChat
      setActiveWindow={toggleEditWindow}
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      toggleModiefiedChat={toggleModiefiedChat}
      />
    }
      {selectedChat&&<nav>
        <h4>{!selectedChat.isGroupChat?getSender(selectedChat.users).name:selectedChat.chatName}</h4>
        <i class="fa-solid fa-bars-progress" onClick={toggleEditWindow}></i>
      </nav>}
      <div className='chatInbox'>
        <div className='chats' ref={chatSectionRef}>
        {chats.map((key, index) => (
          <p className={key.includes("me:")?"myMessage":""}>{key.includes("me:")?key.slice(4):key.slice(5)}</p>
        ))}
        </div>
        <div className='chatInput'>
          <textarea id="" cols="30"  placeholder='Enter a message'
            value={input_message} name="me: " onChange={handleMessage} onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </div>
      
    </div>
  )
 }
}

export default Chats