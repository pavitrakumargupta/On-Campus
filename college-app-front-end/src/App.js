import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
function App() {
  return (
    <BrowserRouter>
    <Routes> 
      <Route path={"/"||"/home"} ><Homepage/></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
