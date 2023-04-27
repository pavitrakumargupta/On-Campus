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
    const userHistory = JSON.parse(localStorage.getItem("ComUnity"));
    const url = JSON.parse(localStorage.getItem("lastUrl"));
    if (userHistory == null) {
      navigate("/login");
    } else {
      const checkingLogin = async () => {
        try {
          const response = await axios.post(
            "/checkLogin",
            {
              email: userHistory.email,
              password: userHistory.password,
            } 
          );
          if (!response.data.status) {
            localStorage.clear("ComUnity")
            navigate("/login");
          } else {
            setUserDetail();
            await dispatch(actionCreators.setUserDetails(response.data.data));
            if(url.url!=null){
              navigate(url.url) 
              localStorage.setItem(
                "lastUrl",
                JSON.stringify({ url: null})
              );
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      checkingLogin();
    }
  }, []);
  return (
    <>
      {userDetail === "null" ? (
        <img
          style={{ margin: "35vh 0 0 35vw" }}
          src="https://i.gifer.com/YCZH.gif"
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
