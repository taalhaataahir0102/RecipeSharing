import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not present, redirect to signin page
      window.location.href = '/signin';
    } else {
      // If token is present, verify its validity
      fetch('https://peach-zebra-coat.cyclic.app/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            // If token is not valid, redirect to signin page
            window.location.href = '/signin';
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Dashboard</h1>
        <p className="subtitle">Welcome to the protected dashboard!</p>
        {/* <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Dashboard;
