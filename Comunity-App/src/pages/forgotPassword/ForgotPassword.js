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
    <>

<div className="loginPage_signup">
      <div class="container" id="container">
		<div class="form-container log-in-container">
			<form action="#">
				<h1>Recover  Password</h1>
				{/* <div class="social-container">
					<a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
					<a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
				</div> */}
				{/* <span>or use your account</span> */}
        {!updatePassword ? <>
           
            <input type="email" name="email"   onChange={handleDetail} className="form__input" placeholder="Email" />
          
          
          {Fill_otp && (
             <input   className="form__input"   onChange={handleDetail}   name="otp"   type="text"   placeholder="Enter OTP" />
            
          )}
        </>:<>
           <input className="form__input" value={signupDetails.password} onChange={handleDetail} name="password"  type="password" placeholder="Password" />
           
           <input className="form__input" value={signupDetails.conf_password} onChange={handleDetail} name="conf_password"  type="password" placeholder="Confirm Password" />
           
        </>}
				{/* <input type="email"  name="email" onChange={handleDetail} placeholder="Email" />
				<input type="password" placeholder="Password" onChange={handleDetail} name="password" /> */}
				{/* <Link to="/forgot-password"  >Forgot your password?</Link> */}
				<button style={{marginTop:"20px"}}  className="btn"  onClick={onSubmit} type="submit" disabled={submitButtonDisabled} > {Fill_otp ? updatePassword?"Update Password":"Confirm Otp" : "Recover"} </button>
        <p style={{marginTop:"20px"}} >go back to login page? <Link to="/login" style={{textDecoration:"underline"}}  >login </Link></p> 
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
    <ToastContainer  />
	</div>
  </div>
  </>
  );
};

 

export default ForgotPassword