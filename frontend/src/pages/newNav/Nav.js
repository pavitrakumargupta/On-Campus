import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
// import Logo from "../../assets/logo.png";
import Logo from "../../logos/logo.png"
import { CgMenu, CgClose } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({currentMenu}) => {
  const user = useSelector((state) => state);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  localStorage.setItem("lastUrl", JSON.stringify(window.location.pathname)); 


  return ( 
    <nav className={`navbar ${showMenu ? "showMobileNav" : ""}`}>
        <div className="sidebar"></div>
      <div className="logo">
      <a href="https://on-campus.netlify.app"><img src={Logo} alt="Logo" /></a>
      </div>
      <h1 style={{color:"white"}} onClick={()=>window.location.href = "/dashboard"}>{window.location.pathname==='/dashboard'?'DashBoard': <><i class="fa-solid fa-backward"></i> Back to Dashboard</>}</h1>

      
      <div className="profile">
      {/* {user.details&&<img
          src={user.details.profilePicture}
          alt="Profile"
          onClick={()=>navigate("/profile")}
        />} */}
        
         <i style={{color:"white",fontSize:"25px",marginRight:"80px"}} class="fa-solid fa-bell"></i>
      {/* <i style={{color:"white",fontSize:"35px",marginRight:"20px"}} class="fa-solid fa-user"></i> */}
      <div className="ProfileImage">
        <img src={user.details.profilePicture} alt="" />
        <div  className="UserOptions">
          <p onClick={()=>{ window.location.href = "/profile"}} >profile</p>
          <p onClick={()=>{localStorage.clear('On-Campus');window.location.href = "/profile"}}>Log out</p>
        </div>
      </div>
      
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
