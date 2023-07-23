import React, { useEffect, useState } from "react";
import Navbar from "../HomepageCompo/navbar/navbar";
import "./Homepage.css";
import Services from "../HomepageCompo/services/services";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state/index";
import axios from "../../axios";

const Homepage = () => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState("null");
  const navigate = useNavigate();
  const user = useSelector((state) => state);

 

  useEffect(() => {
    const userHistory = JSON.parse(localStorage.getItem("CollegeDesk"));
    const url = JSON.parse(localStorage.getItem("lastUrl"));
    if (userHistory == null) {
      navigate("/login");
    } else {
      const checkingLogin = async () => {
        try {
          const response = await axios.post( "/User/authUser",
          { email: userHistory.email, password: userHistory.password });
         
          setUserDetail();
          await dispatch(actionCreators.setUserDetails(response.data.data));
           
          if(url && url.url!=null){
            navigate(url.url) 
            localStorage.setItem("lastUrl",JSON.stringify({ url: null}));
          }
    
        } catch (error) {
          console.log(error);
          localStorage.clear("CollegeDesk")
          navigate("/login");
        }
      };
      checkingLogin();
    }
  }, []);
  return (
    <>
      {userDetail === "null" ? (
        <img
          style={{ margin: "0 25vw" }}
          src="https://hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif"
          alt=""
        />
      ) : (
        <div className="home">
          <Navbar />
          <Services />
          
        </div>
      )}
      
    </>
  );
};

export default Homepage;
