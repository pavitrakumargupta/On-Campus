import React, {useState } from 'react'
import "./navbar.css"
import { CgMenu, CgClose } from "react-icons/cg";

// images
import Logo from "../../../assets/logo.jpg"
import Search from "../../../assets/search.png"
import setting from "../../../assets/settings.png"
import question_mark from "../../../assets/help.png"

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const services=["Home","About","Skills","Projects"]

  const fieldStyle={
    borderBottom:"5px solid",   
    fontSize:"25px",
    marginTop:"-5px"
  }
  const [fieldsnameStyle,setfieldnameStyle]=useState({
    Home: fieldStyle,
  })
  const handleFieldstyle=(event)=>{ 
    const name=event.target.name;
    setfieldnameStyle(()=>{return{[name]:fieldStyle}})
  } 

  return (
    <nav className={menuIcon ? 'nav active' : 'nav'}> 
      <img src={Logo} alt="" /> 
      <div  className= 'nav_compo'>
            <div className='search'>
                <img src={Search} alt="" />
                <input placeholder="Search"  type="search" />
            </div>
            <div className='help_setting'>
              <div className='help'>
               <img src={question_mark} alt="" />
               <span>Help</span>
              </div>
              <div className='setting'>
                <img src={setting} alt="" />
                <span>Setting</span>
              </div>

            </div>
            
           
            <button className='login'>Log in</button>
            <button className='signin'>Sign up </button>
      </div>  
     
      <div className="mobileMenuBtn">
        <CgMenu className="mobileMenuIcon openMenuIcon" onClick={() => setMenuIcon(true)} />
        <CgClose className="mobileMenuIcon closeMenuOutline" onClick={() => setMenuIcon(false)} />
      </div>
    </nav>
    
  );
}

export default Navbar