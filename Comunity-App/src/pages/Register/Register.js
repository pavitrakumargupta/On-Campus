import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../assets/logo.png"
import "react-toastify/dist/ReactToastify.css";
// import axios from "../../axios";

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
    <>
    <div className="loginPage_signup">
      <div class="container" id="container">
		<div class="form-container log-in-container">
			<form style={{overflowY:"auto"}} action="#">
				<h1 style={{marginTop:"60px"}} >Register</h1>
				{/* <div class="social-container">
					<a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
					<a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
				</div> */}
				{/* <span>or use your account</span> */}
        <input className="form__input" onChange={handleDetail} name="firstname" type="text" placeholder="First Name" />
        <input type="text" name="lstname" onChange={handleDetail} className="form__input" placeholder="LastName" />
        <input type="text" name="username" onChange={handleDetail} className="form__input" placeholder="User Name" />
				<input type="email" name="email"   onChange={handleDetail} className="form__input" placeholder="Email" />
				<input className="form__input" onChange={handleDetail} name="password" type="password" placeholder="Password" />
        <input className="form__input" onChange={handleDetail} name="conf_password" type="password" placeholder="Confirm Password" />
        {Fill_otp && (<input   className="form__input"   onChange={handleDetail}   name="otp"   type="text"   placeholder="Enter OTP" />)}
				<button style={{marginTop:"10px"}} onClick={onSubmit} type="submit" className="btn" disabled={submitButtonDisabled}> {Fill_otp ? "Confirm Otp" : "Register"}</button>
        <p style={{marginTop:"10px"}} >Already have an account? <Link to="/login" style={{textDecoration:"underline"}}  >Login </Link></p> 
			</form>
		</div>
		<div  class="overlay-container">
			<div  class="overlay">
				<div style={{backgroundColor:"#ddfcfc"}} class="overlay-panel overlay-right">
					<h1>Hey welcome to ComUnity App</h1>
          <img style={{width:"600px",marginLeft:"50px"}} src="https://herothemes.com/wp-content/uploads/what-is-IT-helpdesk-support-880x440.png" alt="" />
					<p>Discover your Comunity and find the way you can best utilize the app</p>
				</div>
			</div>
		</div>
    <ToastContainer style={{}}/>
	</div>
  </div>
    
    </>
  );
};

export default Register;
