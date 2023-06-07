import React, { useEffect,useState } from 'react';
import Header from './Header';
import './Profile.css';
import Topheader from './Topheader';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  useEffect(() => {
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
          setUserInfo(data.user);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);


  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create a payload object with the necessary data
    console.log(name,email);
    const payload = {
      name: name,
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
  
    // Get the token from localStorage
    const token = localStorage.getItem('token');
  
    // Make a POST request to the backend API endpoint
    fetch('https://peach-zebra-coat.cyclic.app/api/updatepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        if (data.success) {
          // Password update was successful
          alert('Password updated successfully');
          window.location.href = '/signin';
        } else {
          // Password update failed
          console.log('Password update failed:', data.message);
          alert("Password update failed")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Topheader />
        <div className="profile-container">
          <h1 className="title">PROFILE</h1>
          {userInfo && (
            <div className="user-info">
              <h2>User Information:</h2>
              <p>Name: {userInfo.fullName}</p>
              <p>Email: {userInfo.email}</p>
              {/* Add additional user information as needed */}
            </div>
          )}
        </div>
        <button className="change-password-button" onClick={handleModalOpen}>
          Change Info
        </button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleModalClose}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
