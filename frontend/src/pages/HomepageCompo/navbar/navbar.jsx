import React, { useState } from "react";
import "./navbar.css";
import { CgMenu, CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
// images
import Logo from "../../../assets/logo.png";
import Search from "../../../assets/search.png";
import setting from "../../../assets/settings.png";
import question_mark from "../../../assets/help.png";

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const navigate = useNavigate();
  const deleteLocalstorage = () => {
    localStorage.clear("On-Campus");
    navigate("/login");
  };

  return (
    <nav className={menuIcon ? "homeNav active" : "homeNav"}>
      <a href="https://On-Campus.netlify.app"><img className="logo" src={Logo} alt="Logo" /></a>
      <div className="nav_compo">
        <div className="search">
          <img src={Search} alt="" />
          <input placeholder="Search" type="search" />
        </div>
        <div className="help_setting">
          <div className="help">
            <img src={question_mark} alt="" />
            <span>Help</span>
          </div>
          <div onClick={()=>navigate("/profile")} className="setting">
            <img  src={setting} alt="" />
            <span>Setting</span>
          </div>
        </div>

        <Link className="login btn" onClick={deleteLocalstorage} to="/login">
          <button>Log-Out</button>
        </Link>
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
