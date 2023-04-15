import "./App.css";
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
import Message from "./pages/message/message";
import Blog from "./pages/Blogs/Blog"
import Notes from "./pages/notes/Notes"
function App() {
   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        
        <Route path="/message"  element={ <div className="page"> <Navbar currentMenu={"message"} /> <Message /> </div>
          }
        ></Route>
        <Route path="/blogs"  element={<div className="page"><Navbar currentMenu={"blogs"} />  <Blog/></div>}></Route>
        <Route path="/notes" element={<div className="page"><Navbar currentMenu={"notes"} /> <Notes/></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
