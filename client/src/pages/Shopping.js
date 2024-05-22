import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import './Shopping.css';
import Topheader from './Topheader';

const Shoppinglist = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/shoppinglist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shopping list');
        }

        const data = await response.json();
        setShoppingList(data);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };
    fetchShoppingList();
  }, []);

  const handleIngredientClick = async (ingredient) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/removefromlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ingredient }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove ingredient from shopping list');
      }

      const updatedList = await response.json();
      setShoppingList(updatedList);
    } catch (error) {
      console.error('Error removing ingredient from shopping list:', error);
    }
  };

  const handleEmailButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shoppingList }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Topheader />
        <div className="profile-container">
          <h1 className="title">Shopping List</h1>
          <ul className="shopping-list">
            {shoppingList.map((ingredient, index) => (
              <li key={index}>
                <span className="ingredient-name">{ingredient}</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="cross-icon"
                  onClick={() => handleIngredientClick(ingredient)}
                />
              </li>
            ))}
          </ul>
          <button className="email-button" onClick={handleEmailButtonClick}>
            Email me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shoppinglist;
