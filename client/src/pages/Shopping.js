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
        const response = await fetch('https://peach-zebra-coat.cyclic.app/api/shoppinglist', {
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
      const response = await fetch('https://peach-zebra-coat.cyclic.app/api/removefromlist', {
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

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Topheader />
        <div className="profile-container">
          <h1 className="title">PROFILE</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Shoppinglist;
