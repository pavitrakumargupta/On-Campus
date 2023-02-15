import React, {useState } from 'react'
import "./navbar.css"
import { CgMenu, CgClose } from "react-icons/cg";

// images
import Logo from "../../assets/logo.jpg"
import Search from "../../assets/search.png"
import setting from "../../assets/settings.png"
import question_mark from "../../assets/help.png"

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(false);
  const pagesHeader=["Message","News","Notes", "Questions","Polls","Dashboard"]

  const fieldStyle={
    borderBottom:"5px solid",   
    fontSize:"130%",
    marginTop:"20px",
    borderRadius:"8px"
    // color:" rgba(0,0,0,.8)",
    // backgroudColor:"transparent"
  }
  const [fieldsnameStyle,setfieldnameStyle]=useState({
  })
  const handleFieldstyle=(key)=>{ 
    setfieldnameStyle(()=>{return{[key]:fieldStyle}})
  } 

  return (
    <nav className={menuIcon ? 'nav active' : 'nav'}> 
      <img src={Logo} alt="" /> 
      <div  className= 'nav_compo'>    
        <div className='header'>
          {pagesHeader.map(key=>(
            <h4 style={fieldsnameStyle[key]} onClick={(event) => {setMenuIcon(false); handleFieldstyle(key)}} name={key} >{key}</h4>
          ))}
        </div>    
        
        <img src="https://imgs.search.brave.com/iUQN726wdtZCy0T-0h75qU-Z2G_pncG6DygWzLUzkNU/rs:fit:600:600:1/g:ce/aHR0cHM6Ly96dWx0/aW1hdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEy/L2RlZmF1bHQtcHJv/ZmlsZS5wbmc" alt="" srcset="" />
      </div>  
     
      <div className="mobileMenuBtn">
        <CgMenu className="mobileMenuIcon openMenuIcon" onClick={() => setMenuIcon(true)} />
        <CgClose className="mobileMenuIcon closeMenuOutline" onClick={() => setMenuIcon(false)} />
      </div>
    </nav>
    
  );
}

export default Navbar