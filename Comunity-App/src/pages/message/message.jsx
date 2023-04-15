import React ,{useEffect}from "react";
import "./message.css";
import Sidebar from "../messageCompo/sidebar/sidebar";
import ChatPage from "../messageCompo/messageside/message";
import { useSelector } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
const Message = () => {

  const user = useSelector((state) => state);

  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(() => {
    if (user.details === "unset") {
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
