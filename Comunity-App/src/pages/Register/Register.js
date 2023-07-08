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
    firstname: "",
    lstname: "",
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
      !signupDetails.firstname ||
      !signupDetails.lstname ||
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.conf_password
    ) {
      toast.error("Please Fill all the detail", toast_style);
    } else if(!emailRegex.test(signupDetails.email)){
      toast.error("Please provide a valid email address.", toast_style);
    }else if (signupDetails.password !== signupDetails.conf_password) {
      toast.error("Password and Confirm Password are not matched", toast_style);
    } else {
      setSubmitButtonDisabled(true);
      try {
        const response = await axios.post("/setSignupDetails",signupDetails);
        if (signupDetails.otp === "" && response.data.status) {
          setFillotp(true);
          setSubmitButtonDisabled(false);
        }else if(!response.data.status){
          toast.error(response.data.msg,toast_style)
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
  <div className="authenticationPage">
      <div className="container">
        <div className="authenticationScreen">
        <h1 className="tittle">Sign In</h1>
          <div className="form">
          <input className="form__input" onChange={handleDetail} name="firstname" type="text" placeholder="First Name" />
          <input type="text" name="lstname" onChange={handleDetail} className="form__input" placeholder="LastName" />
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
            <h1>Welcome Back <br /> 👏</h1>
            <img src={SideImage} alt="" />
        </div>
      </div>
      <ToastContainer />
  </div>
  );
};

export default Register;
