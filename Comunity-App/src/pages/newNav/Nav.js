import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from "../../assets/logo.png";
import { CgMenu, CgClose } from "react-icons/cg";

const Navbar = ({currentMenu}) => {
  const [showMenu, setShowMenu] = useState(false);

  const [activeMenu,setActiveMenu]=useState(currentMenu)
  const menuItem=[
    {
        content:"Message",
        name:"message"
    },{
        content:"Blogs",
        name:"blogs"
    },{
        content:"Notes",
        name:"notes"
    },{
        content:"Dashboard",
        name:""
    },{
        content:"News",
        name:"news"
    },{
        content:"Questions",
        name:"questions"
    },{
        content:"Polls",
        name:"polls"
    },
  ]


  return (
    <nav className={`navbar ${showMenu ? "showMobileNav" : ""}`}>
        <div className="sidebar"></div>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
       
      <div className="menu-items">
        {menuItem.map(key=>(
            <Link onClick={()=>setActiveMenu(key.name)} style={{color:key.name==activeMenu&&"#A67DFD"}} to={"/"+key.name}>{key.content}</Link>
        ))}
      </div>
      <div className="profile">
        <img
          src="https://imgs.search.brave.com/iUQN726wdtZCy0T-0h75qU-Z2G_pncG6DygWzLUzkNU/rs:fit:600:600:1/g:ce/aHR0cHM6Ly96dWx0/aW1hdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEy/L2RlZmF1bHQtcHJv/ZmlsZS5wbmc"
          alt="Profile"
        />
      </div>
      <div className="mobileMenuBtn">
        <CgMenu
          className="mobileMenuIcon openMenuIcon"
          onClick={() => setShowMenu(true)}
        />
        <CgClose
          className="mobileMenuIcon closeMenuOutline"
          onClick={() => setShowMenu(false)}
        />
        
      </div>
    </nav>
  );
};

export default Navbar;
