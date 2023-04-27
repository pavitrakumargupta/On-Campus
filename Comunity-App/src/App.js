import { useState } from "react";
import "./App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
 
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./pages/newNav/Nav";
// // import Message from "./pages/message/message";
import Blog from "./pages/Blogs/Blog"
import Notes from "./pages/notes/Notes"
import Poles from "./pages/poles/Polls"
import News from "./pages/News/News";

import ChatsPage from "./pages/chatsPage/chatsPage";

function App() {

  return <Router>
    <Routes>
    <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/message" element={<div className="page"><Navbar currentMenu={"message"} /><ChatsPage/></div>}></Route>
        <Route path="/blogs"  element={<div className="page"><Navbar currentMenu={"blogs"} />  <Blog/></div>}></Route>
        <Route path="/notes" element={<div className="page"><Navbar currentMenu={"notes"} /> <Notes/></div>}></Route>
        <Route path="/polls" element={<div className="page"><Navbar currentMenu={"polls"} /> <Poles/></div>}></Route>
        <Route path="/news" element={<div className="page"><Navbar currentMenu={"news"} /> <News/></div>}></Route>
    </Routes>
  </Router>
}

export default App;
