import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const toggleCreatePost = () => {
    window.location.href = '/createpost';
  };

  const toggleDesert = () => {
    window.location.href = '/dessert';
  };
  const toggleVegetarian = () => {
    window.location.href = '/vegetarian';
  };
  const toggleMeat = () => {
    window.location.href = '/meat';
  };
  const toggleSortlikes = () => {
    window.location.href = '/sortlikes';
  };
  const toggleSortcomments = () => {
    window.location.href = '/sortcomments';
  };
  const toggleSortdates = () => {
    window.location.href = '/sortdates';
  };

  const handleLogout = () => {
    // Perform any necessary logout actions here, such as clearing token or user data
    localStorage.removeItem('token'); // Remove the token from localStorage
  
    // Redirect the user to the login page
    window.location.href = '/signin';
  };

  return (
      <div className="header">
        <div className="header-left">
        <button className="header-btn" onClick={toggleCreatePost}>Create Post</button>
          <button className="header-btn" onClick={toggleCategories}>
            Categories
          </button>
          {isCategoriesOpen && (
            <div className="dropdown-content">
              <button className="dropdown-btn" onClick={toggleDesert}>Dessert</button>
              <button className="dropdown-btn" onClick={toggleVegetarian}>Vegetarian</button>
              <button className="dropdown-btn" onClick={toggleMeat}>Meat</button>
            </div>
          )}
          <button className="header-btn" onClick={toggleSort}>
            Sort
          </button>
          {isSortOpen && (
            <div className="dropdown-content">
              <button className="dropdown-btn" onClick={toggleSortcomments}>Comments</button>
              <button className="dropdown-btn" onClick={toggleSortlikes}>Likes</button>
              <button className="dropdown-btn" onClick={toggleSortdates}>Recent</button>
            </div>
          )}
          <button className="header-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
  );
}

export default Header;
