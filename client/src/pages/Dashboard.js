import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Dashboard.css';
import Topheader from './Topheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  
  const [likeCount, setLikeCount] = useState(0);
  const [checkClick, setcheckClick] = useState(0);
  const [commentCount, setcommentCount] = useState(0);
  const [rating, setRating] = useState(3);

  // Add the showComments state variable and its setter
  const [showComments, setShowComments] = useState(false);

  // Add the comments state variable and its setter
  const [comments, setComments] = useState([]);

  // Function to toggle the showComments state
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // Function to handle comment submission
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const commentText = event.target.comment.value;
    if (commentText) {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
      };
      setComments([...comments, newComment]);
      event.target.comment.value = '';
      setcommentCount(commentCount + 1)
    }
  };


  // Function to handle like click
  const handleLikeClick = () => {
    if (checkClick === 0){
      setLikeCount(likeCount + 1);
      setcheckClick(1);
    }
    else if (checkClick === 1){
      setLikeCount(likeCount - 1);
      setcheckClick(0);
    }
  };


  // Render the star rating component
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? 'fa-star star-filled' : 'fa-star star-empty'}
          onClick={() => setRating(i)} // Add onClick event handler
        />
      );
    }
    return <div className="star-rating-stars">{stars}</div>;
  };

  const handleIngredientClick = (ingredient) => {
    console.log(ingredient);
  };

  useEffect(() => {
    // Add event listener for Esc key press
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not present, redirect to signin page
      window.location.href = '/signin';
    } else {
      // If token is present, verify its validity
      fetch('https://peach-zebra-coat.cyclic.app/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            // If token is not valid, redirect to signin page
            window.location.href = '/signin';
          } else {
            // If token is valid, retrieve user information
            return response.json();
          }
        })
        .then((data) => {
          // Set the user information in state
          // setUserInfo(data.user);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);
  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
      <Topheader />
          <div className="post">
            <div className="post-header">
              <h3 className="post-name">John Doe</h3>
            </div>
            <div className="post-content">
              <div className="post-text">
                <h4 className="post-category">Category</h4>
                <p className="post-recipe"> Desert</p>
                <h4 className="post-ingredients">Ingredients:</h4>
                <ul className="post-ingredients-list">
                  <li onClick={() => handleIngredientClick('Sugar')}>Sugar</li>
                  <li onClick={() => handleIngredientClick('Flour')}>Flour</li>
                  <li onClick={() => handleIngredientClick('Eggs')}>Eggs</li>
                </ul>
                <p className="post-recipe">
                <h4 className="post-category">Recipe</h4>
                  Take a bowl of water.
                  Boil the water
                  Add eggs, flour and sugar to it.
                  It's ready
                </p>
              </div>
              <div className="post-image">
                <img src={require('./image1.jpg')} alt="Pic" className="image-resize"/>
              </div>
            </div>
            <div className="post-bar">
              <button className="bar-button" onClick={handleLikeClick}>Like <span className="like-count">{likeCount}</span></button>
              <button className="bar-button" onClick={toggleComments}>
              Comments <span className="like-count">{commentCount}</span>
            </button>

              <div className="star-rating">
              <span className="star-rating-label">Rating:</span>
                {renderStarRating()}
              </div>
            </div>
          </div>

          {showComments && (
            <div className="commentgg">
              <div className="comment-section">
                <div className="comment-bar">
                </div>
                <div className="comment-form">
                  <form onSubmit={handleCommentSubmit}>
                    <input type="text" name="comment" placeholder="Write a comment..." />
                    <button type="submit">Post</button>
                  </form>
                </div>
                <div className="comment-list">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <span className="comment-text">{comment.text}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-comments">No comments yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Dashboard;
