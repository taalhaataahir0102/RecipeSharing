import React, { useEffect,useState } from 'react';
import Header from './Header';
import './Profile.css';
import Topheader from './Topheader';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
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

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
      <Topheader />
        <h1 className="title">PROFILE</h1>
        {userInfo && (
            <div>
              <h2>User Information:</h2>
              <p>Name: {userInfo.fullName}</p>
              <p>Email: {userInfo.email}</p>
              {/* Add additional user information as needed */}
            </div>
          )}
      </div>
    </div>
  );
};

export default Profile;