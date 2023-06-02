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

  return (
    <div className="header">
      <div className="header-left">
        <button className="header-btn" onClick={toggleCategories}>
          Categories
        </button>
        {isCategoriesOpen && (
          <div className="dropdown-content">
            <button className="dropdown-btn">Breakfast</button>
            <button className="dropdown-btn">Lunch</button>
            <button className="dropdown-btn">Dinner</button>
            <button className="dropdown-btn">Vegetarian</button>
            <button className="dropdown-btn">Dessert</button>
          </div>
        )}
        <button className="header-btn" onClick={toggleSort}>
          Sort
        </button>
        {isSortOpen && (
          <div className="dropdown-content">
            <button className="dropdown-btn">Rating</button>
            <button className="dropdown-btn">Likes</button>
            <button className="dropdown-btn">Recent</button>
          </div>
        )}
        <button className="header-btn">Favourites</button>
        <button className="header-btn">Shopping List</button>
        <button className="header-btn">Logout</button>
      </div>
    </div>
  );
}

export default Header;
