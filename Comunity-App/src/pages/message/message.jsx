import React ,{useState,useEffect}from "react";
import "./message.css";
import Sidebar from "../messageCompo/sidebar/sidebar";
import ChatPage from "../messageCompo/messageside/message";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
 
import axios from "../../axios"
 
const Message = () => {

  const User = useSelector((state) => state);
   

  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(() => {
    if (User.details === "unset") {
      localStorage.setItem(
        "lastUrl",
        JSON.stringify({ url: location.pathname })
      );
      navigate("/");
    } 
  }, []);

 

  return (
    <div className="messagePage">
      <Sidebar />
      <ChatPage/>
    </div>
  );
};

export default Message;
