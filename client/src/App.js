import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React from 'react';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
function App() {
  return (
    <Router> 
     <div className="App"> 
      <Routes>
        <Route path="/" element={<Signup/>}>
        </Route>
        <Route path="/signin" element={<Signin/>}>
        </Route>
      </Routes>
     </div>
    </Router>
  );
}

export default App;
