import React from "react";
import "./message.css";
import send from "../../../assets/send.png"
import { RiSendPlaneLine } from "react-icons/ri";
const message = () => {
  const profile =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

    const chats= [
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
      "you: hii"
    ]
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
      <div className="chats">
        {
          chats.map((key,index)=>{
            if(key.includes("me:")){
              return <p key={index} className="yourMessage">{key.slice(4,)}</p>
            }else{
              return <p>{key.slice(5,)}</p>
            }
          })

        }
      </div>
      <footer>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ic_attach_file_48px.svg/1024px-Ic_attach_file_48px.svg.png" alt=""  />
        <div className="messageinput">
        <input placeholder="Type a Message" type="text" />
        {/* <img src={send} alt="" /> */}
        <RiSendPlaneLine/>
      </div>
      
        <img src="https://cdn1.iconfinder.com/data/icons/smileys-emoticons-outlines-with-medical-mask-inclu/96/SMILEY_GRINNING_outline-512.png" alt=""  />
      </footer>
    </div>
  );
};

export default message;
