import React, { useState } from "react";
import "./navbar.css";


// images
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const pagesHeader = [
    "Message",
    "News",
    "Notes",
    "Dashboard",
    "Blogs",
    "Questions",
    "Polls",
    
  ];

  return (
    <nav className={menuIcon ? "navMain active" : "navMain"}> 
      <img src={Logo} alt="" />
      <div className="nav_compo">
        <div className="header">
          {pagesHeader.map((key) => (
            <h4
              onClick={() => {
                setMenuIcon(false);
              }}
              name={key}
            >
              {key}
            </h4>
          ))}
        </div>

        <img
          src="https://imgs.search.brave.com/iUQN726wdtZCy0T-0h75qU-Z2G_pncG6DygWzLUzkNU/rs:fit:600:600:1/g:ce/aHR0cHM6Ly96dWx0/aW1hdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEy/L2RlZmF1bHQtcHJv/ZmlsZS5wbmc"
          
        />
      </div>

      <div className="mobileMenuBtn">
        <CgMenu
          className="mobileMenuIcon openMenuIcon"
          onClick={() => setMenuIcon(true)}
        />
        <CgClose
          className="mobileMenuIcon closeMenuOutline"
          onClick={() => setMenuIcon(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
