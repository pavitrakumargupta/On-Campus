import React,{useState,useEffect} from "react";
import "./profilePage.css";
import UploadImage from "../../uploadImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "../../axios"
import Viewprofile from "./viewProfile"

const ProfilePage = () => {
    const user = useSelector((state) => state);
    const location = useLocation();
    const navigate = useNavigate();

    const [UserData,setUserData]=useState()
  useEffect(() => {
    if (user.details === "unset") {
      localStorage.setItem(
        "lastUrl",
        JSON.stringify({ url: location.pathname })
      );
      navigate("/");
      
      
    }
  }, []);

    const profilePages  = [
    { name: "viewProfile", text: "View Profile" },
    { name: "editProfile", text: "Edit Profile" },
    { name: "changePassword", text: "Change Password" },
    ];

    const [activeProfilePage,setActiveProfilePage]=useState("viewProfile")

    const handlePannel=()=>{
      if(activeProfilePage!=="changePassword"){
        return <Viewprofile editProfileActive={activeProfilePage==="editProfile"} UserId={user.details.userId}/>
      }else{
        return<Viewprofile editProfileActive={null} UserId={user.details.userId}/>
      }
    }

  return (
    <div className="Profile">
      <nav >
        <button className="back" onClick={()=>navigate("/")}> <img src="https://cdn-icons-png.flaticon.com/256/93/93634.png" alt="" /></button>
        <div className="ProfilePages">
          {profilePages.map(key=>(
            <button onClick={()=>setActiveProfilePage(key.name)} style={{color:key.name==activeProfilePage&&"#A67DFD"}}>{key.text}</button>
          ))}
        </div>
      </nav>
      {handlePannel()}
    </div>
  );
};

export default ProfilePage;
