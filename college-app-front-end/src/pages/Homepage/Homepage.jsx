import React, { useEffect, useState } from "react";
import Navbar from "../HomepageCompo/navbar/navbar";
import "./Homepage.css";
import Services from "../HomepageCompo/services/services";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Homepage = () => {
  const [userDetail, setUserDetail] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userHistory = JSON.parse(localStorage.getItem("ComUnity"));
    if (userHistory == null) {
      navigate("/login");
    } else {
      signInWithEmailAndPassword(
        auth,
        userHistory.email,
        userHistory.password
      ).then(async (res) => {
        await setUserDetail({
          userName: res.user.displayName,
          email: res.user.email,
        })
      });
    }
  });
  return (
    <>
      {userDetail === null ? (
        <h2>Loading...</h2>
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
