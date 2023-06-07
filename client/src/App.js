// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import React from 'react';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CreatePost from './pages/Createpost';
import Favourite from './pages/Favourite'
import Shopping from './pages/Shopping'
import Dessert from './pages/Dessert'
import Vegetarian from './pages/Vegetarian'
import Meat from './pages/Meat'
import Sortlikes from './pages/Sortlikes'
import Sortcomments from './pages/Sortcomments'
import Sortdates from './pages/Sortdates'
function App() {
  return (
    <Router> 
     <div className="App"> 
      <Routes>
        <Route path="/" element={<Signup/>}>
        </Route>
        <Route path="/signin" element={<Signin/>}>
        </Route>
        <Route path="/dashboard" element={<Dashboard/>}>
        </Route>
        <Route path="/profile" element={<Profile/>}>
        </Route>
        <Route path="/createpost" element={<CreatePost/>}>
        </Route>
        <Route path="/favourites" element={<Favourite/>}>
        </Route>
        <Route path="/shoppinglist" element={<Shopping/>}>
        </Route>
        <Route path="/dessert" element={<Dessert/>}>
        </Route>
        <Route path="/vegetarian" element={<Vegetarian/>}>
        </Route>
        <Route path="/meat" element={<Meat/>}>
        </Route>
        <Route path="/sortlikes" element={<Sortlikes/>}>
        </Route>
        <Route path="/sortcomments" element={<Sortcomments/>}>
        </Route>
        <Route path="/sortdates" element={<Sortdates/>}>
        </Route>
      </Routes>
     </div>
    </Router>
  );
}

export default App;
