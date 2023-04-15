import React,{useRef,useEffect, useState} from "react";
import "./message.css";
import send from "../../../assets/send.png";
import { RiSendPlaneLine } from "react-icons/ri";
const Message = () => {
  const profile =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

   
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
  const [chats,setchats]=useState(chats_message)
  const chatSectionRef = useRef(null);
  const [input_message,setInputmessage]=useState("")

  useEffect(() => {
    // Scroll to the bottom of the chat section
    chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
  }, [chats]);
   
  const handleMessage=(event)=>{
    const {value}=event.target
    let message=value.replace(/\s{3,}/g, ' ');
    if (!/\S/.test(message)) {
      message = message.replace(/\s+/g, '');
    }
    setInputmessage(message)
  }

  const sendMessage=()=>{
    if(input_message!==""){
      const newChat=[...chats]
      newChat.push("me: "+input_message)
      setchats(newChat)
      setInputmessage("")
    } 
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      // Handle Enter key event here
      sendMessage();
    }
  }
 
  return (
    <div className="chatingPage">
      <header>
        <div className="about">
          <img src={profile} alt="" />
          <div>
            <h6>Pavitra</h6>
            <p>Online</p>
          </div>
        </div>
        <p>⋮</p> 
      </header>
      <div className="chats" ref={chatSectionRef}>
        {chats.map((key, index) => {
          if (key.includes("me:")) {
            return (
              <p key={index} className="yourMessage">
                {key.slice(4)}
              </p>
            );
          } else {
            return <p>{key.slice(5)}</p>;
          }
        })}
      </div>
      <footer>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ic_attach_file_48px.svg/1024px-Ic_attach_file_48px.svg.png"
          alt=""
        />
        <div className="messageinput">
          {/* <input value={input_message} name="me: " onChange={handleMessage} onKeyDown={handleKeyDown} placeholder="Type a Message" type="text" /> */}
          <textarea value={input_message} name="me: " onChange={handleMessage} onKeyDown={handleKeyDown} placeholder="Type a Message" type="text"></textarea>
          {/* <img src={send} alt="" /> */}
          <RiSendPlaneLine onClick={sendMessage} className="send" />
        </div>

        <img
          src="https://cdn1.iconfinder.com/data/icons/smileys-emoticons-outlines-with-medical-mask-inclu/96/SMILEY_GRINNING_outline-512.png"
          alt=""
        />
      </footer>
    </div>
  );
};

export default Message;
