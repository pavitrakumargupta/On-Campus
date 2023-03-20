import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./pages/navbar/navbar";
import Message from "./pages/message/message";
import Blog from "./pages/Blogs/Blog"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
   
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        
        <Route
          path="/message" 
          element={
            <>
              <Navbar />
              <Message />
            </>
          }
        ></Route>
        <Route
          path="/blogs" 
          element={
            <>
              <Navbar />
              <Blog/>
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
