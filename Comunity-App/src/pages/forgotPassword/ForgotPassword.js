import React, { useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";
// import axios from "../../axios";

import axios from "../../axios";
// import apiCall from "../../apiCall";
// var md5 = require("md5");

function ForgotPassword() {
  
  const navigate = useNavigate();

  const toast_style = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    width: "10rem",
  };
  const [Fill_otp, setFillotp] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [updatePassword,setUpdatePassword]=useState(false)

  const [signupDetails, setSignupDetails] = useState({email: "",otp:"", password: "",conf_password: ""});
  const handleDetail = async (event) => {
    const { name, value } = event.target;
    await setSignupDetails((prevValue) => {
      event.preventDefault();
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
   

  const onSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!signupDetails.email  ) {
      toast.error("Please Fill all the detail", toast_style);
    } else if(!emailRegex.test(signupDetails.email)){
      toast.error("Please provide a valid email address.", toast_style);
    }else if(updatePassword){
      if(!signupDetails.password || !signupDetails.conf_password){
        toast.error("Please Fill all the detail", toast_style);
      }else if(signupDetails.password!==signupDetails.conf_password){
        toast.error("Password do not match", toast_style);
      }else{
        const response =await axios.post("/updateProfile",{id:signupDetails.userId,profile:{password:signupDetails.password}})
        if(response.data.status){
          toast.success("Password Updated Sucessfully", toast_style);
          setTimeout(()=>{
            navigate("/login")
          },4000)
        }else{
          toast.error(response.data.msg, toast_style);
        }
        
        
      }
    }else {
      setSubmitButtonDisabled(true);
      try {
        const response = await axios.post("/forgotPassword",signupDetails);
        if (signupDetails.otp === "" && response.data.status) {
          setFillotp(true);
          setSubmitButtonDisabled(false);
        }else if(!response.data.status){
          toast.error(response.data.msg,toast_style)
          setSubmitButtonDisabled(false);
        }else if(response.data.id){
          setUpdatePassword(true)
          setSignupDetails(prevValue=>({...prevValue,userId:response.data.id}))
          setSubmitButtonDisabled(false);
        }else{
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
    
  return (
    <div className="RegisterLogin">
      <div className="form-body">
        <img src={Logo} style={{margin:"auto"}} width={150} alt="" />
        <h2>Recover Your Password</h2>
        {!updatePassword ? <>
          <div className="email">
            <label className="form__label" for="email"> Email{" "}  </label>
            <input type="email" name="email"   onChange={handleDetail} className="form__input" placeholder="Email" />
          </div>
          
          {Fill_otp && (
            <div className="Otp"> 
              <label className="form__label" for="otp">   Enter OTP{" "} </label> 
              <input   className="form__input"   onChange={handleDetail}   name="otp"   type="text"   placeholder="Enter OTP" />
            </div>
          )}
        </>:<>
          <div className="password">
            <label className="form__label" for="password"> Password{" "}  </label>
            <input className="form__input" value={signupDetails.password} onChange={handleDetail} name="password"  type="password" placeholder="Password" />
          </div>
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword"> Confirm Password{" "}  </label>
            <input className="form__input" value={signupDetails.conf_password} onChange={handleDetail} name="conf_password"  type="password" placeholder="Confirm Password" />
          </div>
        </>}
        
        <div>
          <button onClick={onSubmit} type="submit" className="btn" disabled={submitButtonDisabled}
          > {Fill_otp ? updatePassword?"Update Password":"Confirm Otp" : "Recover"}
          </button>
          <p> Want to go for Login page?{" "} <span>   <Link to="/login">Login</Link> </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

 

export default ForgotPassword