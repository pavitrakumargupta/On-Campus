import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import "./viewprofile.css"
import {UploadImage,DeleteImage} from "../../uploadImage";
import { ToastContainer, toast } from "react-toastify";

const UserProfile = ({ UserId,editProfileActive }) => {
  const [user, setUser] = useState();

  const [updateDetails,setUpdateDetails]=useState()
  const [updatePassw,setupdatePassw]=useState({
    oldPassword:"",
    newpassword:"",
    conf_password:""
  })
  const toast_style = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    width: "10rem",
  };
  
  

  useEffect(()=>{
    const getData=async()=>{
        const response = await axios.get(`/getUserbyId?id=${UserId}`);
        setUser(response.data.user)
        setUpdateDetails({name:response.data.user.name})
      }
      getData()
  },[UserId])

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDetail=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setUpdateDetails(prevValue=>({...prevValue,[name]:value}))
  }

  const updateProfile=async()=>{
    let updateDetailsCopy={...updateDetails}

    if(updateDetailsCopy.firstname && updateDetailsCopy.lstname){
      updateDetailsCopy.name=updateDetailsCopy.firstname+" "+updateDetailsCopy.lstname;
    }else if(updateDetailsCopy.firstname){
      updateDetailsCopy.name=updateDetailsCopy.firstname+" "+user.name.split(" ")[1];
    }else if(updateDetailsCopy.lstname){
      updateDetailsCopy.name=user.name.split(" ")[0]+" "+updateDetailsCopy.lstname;
    }
 
    const res= await axios.post("/updateProfile",{id:UserId,profile:updateDetailsCopy})
    
    res.data.status?toast.success("Profile Updated Succesfully",toast_style):toast.error(res.data.msg,toast_style)
  }

  const uploadImage=async(e)=>{
    const res=await UploadImage(e.target.files[0],"profiles")
    console.log(res);
    setUpdateDetails(prevValue=>({...prevValue,profilePitchure:res }))
    setUser(prevValue=>({...prevValue,profilePitchure:res }))
  }
  

  const ViewEditProfile=()=>{
    return (
      <div className='viewProfile'>
        <div className='profilepic'>
          <img className='profilePitchure' src={user.profilePitchure===""?"https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg":user.profilePitchure} alt="Profile" />
          {editProfileActive&&<>
            <img className='editProfile' src="https://static.thenounproject.com/png/4879835-200.png" alt="" />
            <input name="profilePitchure" onChange={uploadImage} type="file" />
            </>}
        </div>
        
        <div className="username">
            <label className="form__label" for="firstName"> First Name{" "}</label>
            <input className="form__input" name="firstname" disabled={!editProfileActive} defaultValue={user.name.split(" ")[0]} onChange={handleDetail}  type="text" placeholder="First Name" />
          </div>
          <div className="lastname">
            <label className="form__label" for="lastName"> Last Name{" "}  </label>
            <input type="text" name="lstname" disabled={!editProfileActive} defaultValue={user.name.split(" ")[1]} onChange={handleDetail} className="form__input" placeholder="LastName" />
          </div>
          <div className="UserName">
            <label className="form__label" for="username"> User Name{" "}</label>
            <input type="text" name="username" disabled={!editProfileActive} defaultValue={user.username} onChange={handleDetail} className="form__input" placeholder="User Name" />
          </div>
          <div className="email">
            <label className="form__label" for="email"> Email{" "}  </label>
            <input type="email" name="email" disabled={true} defaultValue={user.email}   onChange={handleDetail} className="form__input" placeholder="Email" />
          </div>
          {editProfileActive&&<button onClick={updateProfile}>Update Profile</button>}
          <ToastContainer />
      </div>
    );
  }

 

  const updatePassword=()=>{
    
    const handlePasswDetail=(e)=>{
      const {name,value}=e.target;
      setupdatePassw(prevValue=>({...prevValue,[name]:value}))
    }

    const onSubmit=async()=>{
      if(!updatePassw.oldPassword || !updatePassw.newpassword||!updatePassw.conf_password){
        toast.error("Fill all the Fields",toast_style)
      }else if(updatePassw.newpassword!==updatePassw.conf_password){
        toast.error("Password do not match",toast_style)
      }else{
        let res=await axios.post("/updateProfile",{id:UserId,profile:updatePassw})
        res.data.status?toast.success("Password Updated Succesfully",toast_style):toast.error(res.data.msg,toast_style)
      }
      
    }

    return (
    <div className='viewProfile'>
      <div className="password">
          <label className="form__label" for="password"> Current Password{" "}  </label>
          <input className="form__input"  onChange={handlePasswDetail} value={updatePassw.oldPassword} name="oldPassword" type="password" placeholder="Password" />
        </div>
      <div className="password">
          <label className="form__label" for="password"> New Password{" "}  </label>
          <input className="form__input" value={updatePassw.newpassword} onChange={handlePasswDetail} name="newpassword" type="password" placeholder="Password" />
        </div>
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword"> Confirm New Password{" "}  </label>
          <input className="form__input" value={updatePassw.conf_password}  onChange={handlePasswDetail} name="conf_password" type="password" placeholder="Confirm Password" />
        </div>

        <button onClick={onSubmit} >Update Password</button>
        <ToastContainer />
    </div>)
  }

  if(editProfileActive!==null){
    return ViewEditProfile()
  }else{
    return updatePassword()
  }
};

export default UserProfile;
