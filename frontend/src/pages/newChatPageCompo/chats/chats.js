import React, { useRef, useEffect, useState } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import EditGroupChat from "../editGroupChat";
import axios from "../../../axios";
import Skeleton from "react-loading-skeleton";




const Chats = ({
  setSelectedChat,
  selectedChat,
  toggleModiefiedChat,
  setUnreadMessage,
  newChat,
  typingUser,
  sendMessageFunc,
  typingUserFunc
}) => {
  const user = useSelector((state) => state);

  const [chats, setChats] = useState([]);
  const chatSectionRef = useRef(null);
  const [input_message, setInputMessage] = useState("");
  const [activeEditWindow, setActiveEditWIndow] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (newChat) {
      setChats([...chats, newChat]);
    }
    // console.log(newChat);
  }, [newChat]);

  useEffect(() => {
    chats.length>0 &&(chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight); 
  }, [chats]);

  useEffect(() => {
    if (selectedChat) {
      getAllMessage();
      
      setInputMessage("");
    }
  }, [selectedChat]);

  const getAllMessage = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.details.token}`,
        },
      };
      const { data } = await axios.get(`/message/${selectedChat._id}`, config);
      setChats(data);
    } catch (error) {
      console.log(error);
      error.response.status == 401 && (window.location.href = "/login");
    }
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setInputMessage(value);
    const data = {
      ...selectedChat,
      sender: {
        _id: user.details._id,
      },
    };
    typingUserFunc(data)
   
  };

  const sendMessage = async () => {
    if (input_message.trim() !== "") {
      // Trim leading and trailing spaces without replacing new lines
      const message = input_message.replace(/^\s+|\s+$/g, "");

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.details.token}`,
          },
        };
        const { data } = await axios.post(
          "/message",
          {
            content: message,
            chatId: selectedChat,
          },
          config
        );
        const newChat = [...chats, data];
        sendMessageFunc(data)
        setChats(newChat);
        setInputMessage("");
        setUnreadMessage(data);
      } catch (error) {
        error.response.status == 401 && (window.location.href = "/login");
      }
    }
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      // Handle Enter key event here
      if (event.shiftKey) {
        // Do nothing if Shift key is pressed along with Enter
        return;
      }
      event.preventDefault();
      sendMessage();
    }
  }

  const getSender = (users) => {
    let sender = users.find((key) => key._id !== user.details._id);
    return sender;
  };

  const toggleEditWindow = () => {
    setActiveEditWIndow(!activeEditWindow);
  };

 
    return (
      <div className="chatPannel">
        {selectedChat.isGroupChat && activeEditWindow && (
          <EditGroupChat
            setActiveWindow={toggleEditWindow}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            toggleModiefiedChat={toggleModiefiedChat}
          />
        )}
        {selectedChat && (
          <nav>
            <h4>
              {!selectedChat.isGroupChat
                ? getSender(selectedChat.users).name
                : selectedChat.chatName}
            </h4>
            <i class="fa-solid fa-bars-progress" onClick={toggleEditWindow}></i>
          </nav>
        )}
        <div className="chatInbox">
          <div className="chats" ref={chatSectionRef}>
            {chats ? (
              chats.map((key, index) => (
                <div
                  className={
                    key?.sender?._id === user.details._id ? "myMessage" : ""
                  }
                >
                  {!(chats[index + 1]?.sender._id === key?.sender?._id) &&
                  key?.sender?._id !== user.details._id ? (
                    <img src={key?.sender?.profilePitchure} alt="" />
                  ) : (
                    <div></div>
                  )}
                  <p>{key.content}</p>
                </div>
              ))
            ) : (
              <Skeleton className="skeleton" count={20} />
            )}
          </div>
          <div className="chatInput">
            <textarea
              id=""
              cols="30"
              placeholder="Enter a message"
              value={input_message}
              name="me: "
              onChange={handleMessage}
              onKeyDown={handleKeyDown}
            ></textarea>
            {typingUser && <span>... {typingUser} is Typing </span>}
          </div>
        </div>
      </div>
    );
  
};

export default Chats;
