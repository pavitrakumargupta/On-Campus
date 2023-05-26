import React,{useState,useEffect} from "react";
import "./profilePage.css";
import UploadImage from "../../uploadImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "../../axios"

const ProfilePage = () => {
    const user = useSelector((state) => state);
    const location = useLocation();
    const navigate = useNavigate();
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

    const[ProfileUrl,setProfileUrl]=useState("")
    const [imagePath, setimagePath] = useState("");
    const [Image, setImage] = useState("");

    const handleNotesUpload = async (event) => {
    const ImagDetails = await UploadImage(event.target.files[0],"profiles", "upload");
    setImage(event.target.files[0].name);
    setimagePath(ImagDetails.pathname);
        
    setProfileUrl(ImagDetails.url)
    };
    const handleNotesDelete = async () => {
    const deleteImage = await UploadImage(imagePath, "delete");
    setImage("");
    setimagePath("");
    setProfileUrl("")
    }; 

    const EditProfile=async()=>{
        let updateProfile=await axios.post("/updateProfile",{id:user.details.userId,profile:{profilePitchure:ProfileUrl}})
        navigate("/")
    }

    let profileImage="";
     if(ProfileUrl!=""){
        profileImage=ProfileUrl
    }else if(user.details.profilePitchure!=""){
        profileImage=user.details.profilePitchure
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
      <div className="editProfile">
        <h6>*Change Profile Pitchure</h6>
        <img src={profileImage!==""?profileImage:"https://imgs.search.brave.com/iUQN726wdtZCy0T-0h75qU-Z2G_pncG6DygWzLUzkNU/rs:fit:600:600:1/g:ce/aHR0cHM6Ly96dWx0/aW1hdGUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzEy/L2RlZmF1bHQtcHJv/ZmlsZS5wbmc"} alt="Profile" />
        <div className="imageSection" style={{border:"2px dashed black"}}>
          <input className="imageInput"    type="file"   onChange={handleNotesUpload} id="file" />
            <div className="imageUpload" >
            <img  src="https://www.efilecabinet.com/wp-content/uploads/2019/05/upload-01.png" alt="" />
              <button >Upload Profile Pitchure</button>
            </div>
          </div>
          {ProfileUrl !== "" && (
              <div  className="UploadedBox">
                <embed className="UploadedImage" src={ProfileUrl} type="" />
                <p>{Image.substring(0, 5)}... {Image.substring(Image.length - 4)}</p>
                <MdOutlineDeleteOutline
                  onClick={handleNotesDelete}
                  className="dleteImage"
                />
              </div>
            )}
            <button onClick={EditProfile}>Edit Profile</button>
      </div>
    </div>
  );
};

export default ProfilePage;
