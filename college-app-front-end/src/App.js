import './App.css';
import { BrowserRouter as Router,Routes,  Route } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
import Navbar from './pages/navbar/navbar';
import Message from './pages/message/message';
function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar/>
      <Routes> 
        <Route path="/" element={<Homepage/>} ></Route>
        <Route path="/message" element={<Message/>}> </Route>
      </Routes>
      </div>
    
  </Router>
  );    
}

export default App;
 