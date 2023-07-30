import React, { useEffect, useState } from "react";
import Navbar from "../HomepageCompo/navbar/navbar";
import "./Homepage.css";
import Services from "../HomepageCompo/services/services";

const Homepage = () => {
  return (
    <>
      <div className="home">
        <Navbar />
        <Services />
      </div>
    </>
  );
};

export default Homepage;
 