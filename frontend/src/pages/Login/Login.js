import React, { useEffect, useState } from "react";
import "../Register/authentication.css";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css" 
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/index'
import Logo from "../../assets/logo.png"
import axios from "../../axios";
// import SideImage from "./sideScreen.png"
import SideImage from "./sideImage.png" 
// var md5 = require('md5');
const Login = () => {

  const dispatch=useDispatch()


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
      verifyUser(LoginDetail.email,LoginDetail.password).then((url)=>navigate(url))
    }
  }
  
  const verifyUser=async(email,password)=>{
    try {
      const {data} = await axios.post("/User/authUser",{email,password});
      console.log(data);
      localStorage.setItem('On-Campus',JSON.stringify(data))
      dispatch(actionCreators.setUserDetails(data))
      const url = JSON.parse(localStorage.getItem("lastUrl"));
     
      if(url && url.url!=null){
        return data&&url
      }else{
        return data&&"/dashboard"
      }

    } catch (error) {
      setSubmitButtonDisabled(false);
      toast.error(error.response.data.message,toast_style)
    }
  }

  return (
  <div className="authenticationPage">
      <div className="container">
        <div className="authenticationScreen">
        <h1 style={{marginBottom:"50px"}} className="tittle">Login</h1>
          <div className="form">
            <div className="form-Input">
              <i class="fa-regular fa-envelope"></i>
             <input type="email"  name="email" onChange={handleDetail} placeholder="Email" />
            </div>
            <div className="form-Input">
            <i class="fa-solid fa-lock"></i>
              <input type="password" placeholder="Password" onChange={handleDetail} name="password" />
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
            <button onClick={onSubmit} className="submitBtn"  disabled={submitButtonDisabled}>LogIn</button>
          </div>
          <p style={{marginTop:"20px"}} >Don't have an account ?<Link to="/register" style={{textDecoration:"underline"}}  >Register </Link></p> 
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

export default Login;
