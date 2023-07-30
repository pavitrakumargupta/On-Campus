import { useEffect, useState } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import { actionCreators } from "./state/index";
import UseVerifyAuth from "./verifyAuth";

import Loader from "./assets/loader.gif"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./pages/newNav/Nav";
// // import Message from "./pages/message/message";
import Blog from "./pages/Blogs/Blog"
import Notes from "./pages/notes/Notes"
import Poles from "./pages/poles/Polls"
import News from "./pages/News/News";
import Faq from "./pages/faq/faq"
import ChatsPage from "./pages/chatsPage/chatsPage";
import ProfilePage from "./pages/profilePage/profilePage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import NewChat from "./pages/newChatPage/chatPage"
import Dashboard from "./pages/newHomePage/Dashboard";


function App() {

  const [userSetDone,setUserSetDone]=useState(false)

  const dispatch = useDispatch();
 

  // Custom hook for verifying auth
  useEffect(()=>{
    console.log(userSetDone);
  },[userSetDone])
  

  const setUserDetails=async()=>{
    const data=await UseVerifyAuth();
    await dispatch(actionCreators.setUserDetails(data));
    await setUserSetDone(true)
    
  }
  setUserDetails()    

  if(!userSetDone){
    return <div style={{
      position:"absolute",
      width:"100vw",
      height:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
    }}>
      <img src={Loader} alt="" />
    </div>
  }else{
    return <Router>
    <Routes>
    <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        {/* <Route path="/message" element={<div className="page"><Navbar currentMenu={"message"} /><ChatsPage/></div>}></Route> */}
        <Route path="/message" element={<div className="page"><Navbar currentMenu={"blogs"} /> <NewChat/></div>}></Route>
        <Route path="/blogs"  element={<div className="page"><Navbar currentMenu={"blogs"} />  <Blog/></div>}></Route>
        <Route path="/notes" element={<div className="page"><Navbar currentMenu={"notes"} /> <Notes/></div>}></Route>
        <Route path="/polls" element={<div className="page"><Navbar currentMenu={"polls"} /> <Poles/></div>}></Route>
        <Route path="/news" element={<div className="page"><Navbar currentMenu={"news"} /> <News/></div>}></Route>
        <Route path="/faq" element={<div className="page"><Navbar currentMenu={"questions"} /> <Faq/></div>}></Route>
        <Route path="/profile" element={<div className="page"><ProfilePage/></div>}></Route>
        <Route path="/dashboard" element={<div className="page"><Navbar currentMenu={"blogs"} />  <Dashboard/></div>} ></Route>
    </Routes>
  </Router>
  }
  
}

export default App;
