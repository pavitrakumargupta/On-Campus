import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./pages/navbar/navbar";
// import Dashnavbar from './pages/HomepageCompo/Dashnavbar/navbar';
import Message from "./pages/message/message";
function App() {
  //   // const path=useParams()

  //   // console.log(path,'hi');
  //   const pathname = async()=>{
  //     const path = await window.location.pathname;
  //     return path;
  //   }
  // console.log(pathname());
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path="/Messages"
          element={
            <>
              <Navbar />
              <Message />
            </>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
