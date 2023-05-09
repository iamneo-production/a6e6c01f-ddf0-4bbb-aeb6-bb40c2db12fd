import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
}from "react-router-dom";
import './App.css';
import LandingComponent from "./landingComponent/landing";
import LoginComponent from "./loginComponent/login";
import SignupComponent from "./signupComponent/signup";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="apps">
          <Routes>
            <Route path="/home" element={<LandingComponent/>}/>
            <Route path="/login" element={<LoginComponent/>}/>
            <Route path="/signup" element={<SignupComponent/>}/>
            <Route path="/" element={<Navigate replace to="/home"/>}/>
          </Routes>
    
      
    </div>
    </Router>
    </div>
  );
}

export default App;
