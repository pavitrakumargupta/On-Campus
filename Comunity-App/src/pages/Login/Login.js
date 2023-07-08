import React, { useEffect, useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css" 
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/index'
import Logo from "../../assets/logo.png"
import axios from "../../axios";
 
// var md5 = require('md5');
const Login = () => {

  const dispatch=useDispatch()
  useEffect(() => {
    const userHistory = JSON.parse(localStorage.getItem("ComUnity")); 
    if (userHistory !== null) {
      navigate("/");
    }
  })
  const navigate = useNavigate();

  const toast_style={
    position:"bottom-right",
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
    
  }
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [LoginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });
  const handleDetail = async (event) => {
    const { name, value } = event.target;
    await setLoginDetail((prevValue) => {
      event.preventDefault();
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onSubmit=async()=>{
    if(  !LoginDetail.email ||!LoginDetail.password) { 
      toast.error("Please Fill all the detail",toast_style)
    }else{
      setSubmitButtonDisabled(true);
      try {
        const response = await axios.post("/checkLogin",LoginDetail);
         if(!response.data.status){
          toast.error(response.data.msg,toast_style)
          setSubmitButtonDisabled(false);
        }else{
          localStorage.setItem('ComUnity',JSON.stringify({email:LoginDetail.email,password:LoginDetail.password}))
          navigate("/");
          dispatch(actionCreators.setUserDetails(response.data.data))
        }
      } catch (error) {
        console.log(error);
      }
    }
  } 

  return (
    <div className="loginPage_signup">
      <div class="container" id="container">
		<div class="form-container log-in-container">
			<form action="#">
				<h1>Login</h1>
				{/* <div class="social-container">
					<a href="#" class="social"><i class="fa fa-facebook fa-2x"></i></a>
					<a href="#" class="social"><i class="fab fa fa-twitter fa-2x"></i></a>
				</div> */}
				{/* <span>or use your account</span> */}
				<input type="email"  name="email" onChange={handleDetail} placeholder="Email" />
				<input type="password" placeholder="Password" onChange={handleDetail} name="password" />
				<Link to="/forgot-password"  >Forgot your password?</Link>
				<button onClick={onSubmit} className="btn"  disabled={submitButtonDisabled}>Log In</button>
        <p style={{marginTop:"20px"}} >Don't have an account ?<Link to="/register" style={{textDecoration:"underline"}}  >Register </Link></p> 
			</form>
		</div>
		<div  class="overlay-container">
			<div  class="overlay">
				<div style={{backgroundColor:"#ddfcfc"}} class="overlay-panel overlay-right">
					<h1>Hey welcome to Pamuru App</h1>
          <img style={{width:"600px",marginLeft:"50px"}} src="https://herothemes.com/wp-content/uploads/what-is-IT-helpdesk-support-880x440.png" alt="" />
					<p>Discover your Comunity and find the way you can best utilize the app</p>
				</div>
			</div>
		</div>
    <ToastContainer style={{}}/>
	</div>
  </div>
  );
};

export default Login;
