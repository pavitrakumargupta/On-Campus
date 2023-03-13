import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "../../axios";
import axios from "axios";
// import apiCall from "../../apiCall";
var md5 = require("md5");

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
    if (
      !signupDetails.firstname ||
      !signupDetails.lstname ||
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.conf_password
    ) {
      toast.error("Please Fill all the detail", toast_style);
    } else if (signupDetails.password !== signupDetails.conf_password) {
      toast.error("Password and confirm Password do not match", toast_style);
    } else {
      setSubmitButtonDisabled(true);
      try {
        const response = await axios.post("http://localhost:5000/setSignupDetails",{
          username: signupDetails.firstname + " " + signupDetails.lstname,
          email: signupDetails.email,
          password: signupDetails.password,
          otp: signupDetails.otp,
        });
        console.log(response.data);
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
          <span style={{ color: "red", fontSize: "10px" }}>
            *For authentication
          </span>
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
        {Fill_otp && (
          <div className="confirm-password">
            <label className="form__label" for="confirmPassword">
              Enter OTP{" "}
            </label>
            <input
              className="form__input"
              onChange={handleDetail}
              name="otp"
              type="text"
              placeholder="Enter OTP"
            />
          </div>
        )}
        <div>
          <button
            onClick={onSubmit}
            type="submit"
            className="btn"
            disabled={submitButtonDisabled}
          >
            {Fill_otp ? "Confirm Otp" : "Register"}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
