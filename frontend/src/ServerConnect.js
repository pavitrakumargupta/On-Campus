import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "./state/index";
const ENDPOINT="http://localhost:5000"
var socket;
const ServerConnect = ({}) => {
  const dispatch = useDispatch();


  useEffect(()=>{
    UseVerifyAuth()
  })


    const UseVerifyAuth = async() => {
      const userHistory = JSON.parse(localStorage.getItem("On-Campus"));
      if (userHistory !== null && ( window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password') ) {
          await dispatch(actionCreators.setUserDetails(userHistory));
          await setServerconnected()
          
      } else if (userHistory === null&& (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password')) {
          localStorage.setItem("lastUrl", JSON.stringify(window.location.pathname)); 
          window.location.href = "/login";
      }
  };

  const setServerconnected=async()=>{
    try {
      
      await dispatch(actionCreators.serverConnected(true));
    } catch (error) {
      await dispatch(actionCreators.serverConnected(false));
    }
  }

      

  return <></>
}

export default ServerConnect