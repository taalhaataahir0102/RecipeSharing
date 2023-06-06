import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import './Topheader.css'; // Import the CSS file

const Topheader = () => {

  const handleProfileClick = () => {
    window.location.href = '/profile';
  };

  const handleHomeClick = () => {
    window.location.href = '/Dashboard';
  };
  
  return (
    <div className="top-header">
      <div className="symbol" onClick={handleHomeClick}>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <div className="symbol">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="symbol">
        <FontAwesomeIcon icon={faShoppingCart} />
      </div>
      <div className="symbol" onClick={handleProfileClick}>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
};

export default Topheader;
