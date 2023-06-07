import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Dashboard.css';
import Topheader from './Topheader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [posts,setPosts] = useState([])


  const formatDate = (dateString) => {
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  

  const handleLikeClick = async (postId) => {
    try {
      console.log("postId:", postId);
      // Send the post id to the backend API
      const token = localStorage.getItem('token');
      const response = await fetch('https://peach-zebra-coat.cyclic.app/api/liked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
  
      if (response.ok) {
        const updatedPost = await response.json();
        // Update the like count on the frontend
        setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likescount: updatedPost.likescount } : post
        )
      );
      } else {
        console.log('Error updating like on the frontend');
      }
    } catch (error) {
      console.log('Error updating like:', error);
    }
  };
  

   // Function to handle rating change for a specific post
   const handleRatingChange = (postId, newRating) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, rating: newRating } : post
      )
    );
  };

  // Render the star rating component
  const renderStarRating = (postId, rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? 'fa-star star-filled' : 'fa-star star-empty'}
          onClick={() => handleRatingChange(postId, i)}
        />
      );
    }
    return <div className="star-rating-stars">{stars}</div>;
  };
  




  // Function to handle comment submission for a specific post
  const handleCommentSubmit = async (postId, commentText) => {
    if (commentText) {
      try {
        const response = await fetch('https://peach-zebra-coat.cyclic.app/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, commentText }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === postId
                ? {
                    ...post,
                    comments: [
                      ...post.comments,
                      { id: post.comments.length + 1, text: commentText },
                    ],
                    commentscount: post.commentscount + 1,
                  }
                : post
            )
          );
        } else {
          console.error('Failed to add comment');
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };
  
  // Render comments for a specific post
  const renderComments = (comments) => {
    if (comments && comments.length > 0) {
      console.log("comments: ", comments);
      return (
        <div className="comments-section">
          <h4>Comments ({comments.length})</h4>
          {comments.map((comment) => (
            <div key={comment.id || comment} className="comment-item">
              <span>{typeof comment === 'object' ? comment.text : comment}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return <p className="no-comments">No comments yet.</p>;
    }
  };
  

  const handleIngredientClick = async (ingredient) => {
    try {
      console.log(ingredient);
      const token = localStorage.getItem('token');
      const response = await fetch('https://peach-zebra-coat.cyclic.app/api/addToShoppingList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ingredient }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add ingredient to shopping list');
      }
  
      console.log(`Added ${ingredient} to shopping list`);
      toast.success(`Added ${ingredient} to shopping list`, {
        autoClose: 2000, // Duration in milliseconds
        hideProgressBar: true, // Hide the progress bar
      });
    } catch (error) {
      console.error('Error adding ingredient to shopping list:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/signin';
    } else {
      const userPromise = fetch('https://peach-zebra-coat.cyclic.app/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) {
          // throw new Error('Failed to fetch user');
          window.location.href = '/signin';
        }
        return response.json();
      });
  
      const postsPromise = fetch('https://peach-zebra-coat.cyclic.app/api/meat', {
        headers: {
          
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      });
  
      Promise.all([userPromise, postsPromise])
        .then(([userData, postsData]) => {
          // const user = userData.user; // Assuming user data is nested under 'user' property
          const posts = postsData; // Assuming the response is an array of posts
          setPosts(posts);
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
    <div className="fixed-topheader">
        <Topheader />
      </div>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          {/* Render the content for each post */}
          <div className="post-header">
            <div className="post-name-container">
                <h3 className="post-name">{post.name}</h3>
                <span className="post-date">{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <div className="post-content">

            <div className="post-text">
              <h4 className="post-category">Category</h4>
              <p className="post-recipe">{post.category}</p>
              <h4 className="post-ingredients">Ingredients:</h4>
              
              <ul className="post-ingredients-list">
                {post.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="ingredient-icon">
                    <FontAwesomeIcon icon={faShoppingCart} className="ingredient-icon" onClick={() => handleIngredientClick(ingredient)} />
                    </span>
                    {ingredient}
                  </li>
                ))}
              </ul>
              <p className="post-recipe">
                <h4 className="post-category">Recipe</h4>
                {post.recipe}
              </p>
            </div>

            <div className="post-image">
              <img src={post.image} alt="Pic" className="image-resize" />
            </div>

          </div>

          <div className="post-bar">
          <button
                className="bar-button"
                onClick={() => handleLikeClick(post._id)} // Pass the postId to handleLikeClick
              >
                Like <span className="like-count">{post.likescount}</span>
              </button>

            <div className="star-rating">
                <span className="star-rating-label">Rating:</span>
                {renderStarRating(post._id, post.rating)} {/* Pass the postId and rating */}
              </div>
          </div>

          {renderComments(post.comments)}
            <div className="comment-form">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const commentText = event.target.comment.value;
                  handleCommentSubmit(post._id, commentText); // Pass the postId and commentText
                  event.target.comment.value = '';
                }}
              >
                <input type="text" name="comment" placeholder="Write a comment..." />
                <button type="submit">Post</button>
              </form>
            </div>

        </div>          
      ))}
        </div>
        <ToastContainer />
    </div>
  );
};

export default Dashboard;
