import React, { useState } from "react";
import "./authentication.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";
// import axios from "../../axios";
import SideImage from "./sideScreen.png"

import axios from "../../axios";
// import apiCall from "../../apiCall";
// var md5 = require("md5");
 
const Register = () => {
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

  const [signupDetails, setSignupDetails] = useState({
    name:"",
    username:"",
    email: "",
    password: "",
    conf_password: "",
    otp: "",
  });
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
    if (
      !signupDetails.name ||
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.conf_password
    ) {
      toast.error("Please Fill all the detail", toast_style);
    } else if(!emailRegex.test(signupDetails.email)){
      toast.error("Please provide a valid email address.", toast_style);
    }else if (signupDetails.password !== signupDetails.conf_password) {
      toast.error("Password and Confirm Password are not matched", toast_style);
    }else if(Fill_otp&&!signupDetails.otp){
      toast.error("Please Fill the Otp to verify Your Account", toast_style);
    }else {
      setSubmitButtonDisabled(true);
      try {
        if(signupDetails.otp===""){
          const response = await axios.post("/User/genrateOtp",signupDetails);
            toast.success(response.data.message, toast_style);
            setFillotp(true);
            setSubmitButtonDisabled(false);
        }else{
          const response = await axios.post("/User/createUser",signupDetails);
          toast.success(response.data.message, toast_style);
          setTimeout(()=>{
            navigate("/login")
          },4000)
        }
      } catch (error) {
        setSubmitButtonDisabled(false);
        toast.error(error.response.data.message,toast_style)
      }
    }
  };
    
  return (
  <div className="authenticationPage">
      <div className="container">
        <div className="authenticationScreen">
        <h1 className="tittle">Sign In</h1>
          <div className="form">
          <input type="text" name="name" onChange={handleDetail} className="form__input" placeholder="Enter Full Name" />
          <input type="text" name="username" onChange={handleDetail} className="form__input" placeholder="User Name" />
	  			<input type="email" name="email"   onChange={handleDetail} className="form__input" placeholder="Email" />
	  			<input className="form__input" onChange={handleDetail} name="password" type="password" placeholder="Password" />
          <input className="form__input" onChange={handleDetail} name="conf_password" type="password" placeholder="Confirm Password" />
          {Fill_otp && (<input   className="form__input"   onChange={handleDetail}   name="otp"   type="text"   placeholder="Enter OTP" />)}
	  			<button  onClick={onSubmit}  className="submitBtn" disabled={submitButtonDisabled}> {Fill_otp ? "Confirm Otp" : "Register"}</button>
  
          </div>
          <p style={{margin:"20px 0"}} >Already have an account ?<Link to="/login" style={{textDecoration:"underline"}}>Login </Link></p> 
        </div>
        <div className="welcomeScreen">
            <h1>Want to join us<br /> Register Here</h1>
            <img src={SideImage} alt="" />
        </div>
      </div>
      <ToastContainer />
  </div>
  );
};

export default Register;
