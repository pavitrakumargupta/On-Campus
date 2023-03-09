import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
var md5 = require('md5');
const Register = () => {

  const navigate = useNavigate();

  const toast_style={
    position:"bottom-right",
    autoClose:4000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
    width:"10rem"
  }

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const [signupDetails, setSignupDetails] = useState({
    firstname: "",
    lstname: "",
    email: "",
    password: "",
    conf_password: "",
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

  const onSubmit=()=>{
    if(!signupDetails.firstname || !signupDetails.lstname || !signupDetails.email ||!signupDetails.password ||!signupDetails.conf_password) { 
      toast.error("Please Fill all the detail",toast_style)}
    else if(signupDetails.password !==signupDetails.conf_password)
      {toast.error("Password and confirm Password do not match",toast_style)}
    else{
      setSubmitButtonDisabled(true);
      createUserWithEmailAndPassword(auth, signupDetails.email, md5(signupDetails.password))
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: signupDetails.firstname+" "+ signupDetails.lstname,
        });
        navigate("/login");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.error(err.message,toast_style)
      });
    }
  }

  return ( 
    <div className="form">
      <div className="form-body">
        <h2>SignUp</h2>
        <div className="username">
          <label className="form__label" for="firstName">
            First Name{" "}
          </label>
          <input
            className="form__input"
            onChange={handleDetail}
            name="firstname"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="lastname">
          <label className="form__label" for="lastName">
            Last Name{" "}
          </label>
          <input
            type="text"
            name="lstname"
            onChange={handleDetail}
            className="form__input"
            placeholder="LastName"
          />
        </div>
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
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            onChange={handleDetail}
            name="conf_password"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn"
            disabled={submitButtonDisabled}
          >
            Register
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Register;
