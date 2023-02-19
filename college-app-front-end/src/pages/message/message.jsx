import React from "react";
import "./message.css";
import Sidebar from "../messageCompo/sidebar/sidebar";
import Message from "../messageCompo/messageside/message";
const message = () => {
  return (
    <div className="message">
      <Sidebar />
      <Message/>
    </div>
  );
};

export default message;
