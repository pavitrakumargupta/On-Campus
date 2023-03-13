import React, { useState } from "react";
import "./sidebar.css";
import Search from "../../../assets/search.png";
const Sidebar = () => {
  const profile =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";

  const users = [
    {
      id:"0",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {  id:"1",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"2",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"3",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"4",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"5",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"6",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"7",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"8",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
    {
      id:"9",
      img: profile,
      name: "Pavitra ",
      lastMessage: "kase ho",
      lastMessageDate: "yesterday",
    },
  ];
  const fieldStyle = {
    border: "5px solid rgba(164, 163, 163, 0.2)",
  };
  const [StyleFieldname, setStyleFieldname] = useState({});
  const handleFieldStyle = (event) => {
    const name = event.target.name;
    setStyleFieldname({ [name]: fieldStyle });
  };
 
  return (
    <div className="sidebar">
      <div className="search">
        <img src={Search} alt="" />
        <input placeholder="Search" type="search" />
      </div>
      <div className="userList">
        {users.map((key) => {
          return (
            <button
              style={StyleFieldname[key.id]}
              onClick={handleFieldStyle}
              className="user"
              name={key.id}
            >
              <img src={key.img} alt="" />
              <div>
                <h6>{key.name}</h6>
                <p>{key.lastMessage}</p>
              </div>
              <p>{key.lastMessageDate}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
