import React, { useEffect, useState } from "react";
import "../Register/Register.css";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css" 
import axios from "axios";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state/index'
import Logo from "../../assets/logo.png"
 
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
        const response = await axios.post("http://localhost:5000/checkLogin",LoginDetail);
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
    <div className="RegisterLogin">
      <div className="form-body">
      <img src={Logo} style={{margin:"auto"}} width={150} alt="" />
        <h2>Welocome Back fill  your  Details for LogIn</h2>
         
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            name="email"
            onChange={handleDetail}
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            onChange={handleDetail}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
         
        <div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn"
            disabled={submitButtonDisabled}
          >
            LogIn
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/register">Create Account</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer style={{}}/>
    </div>
  );
};

export default Login;
