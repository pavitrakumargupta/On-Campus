import './App.css';
import { BrowserRouter as Router,Routes,  Route } from "react-router-dom";
import Homepage from './pages/Homepage/Homepage';
function App() {
  console.log("jhghfhjvk");
  return (
    <Router>
      <div className='app'>
      <Routes> 
        <Route path="/" element={<Homepage/>} ></Route>
      </Routes>
      </div>
    
  </Router>
  );    
}

export default App;
 