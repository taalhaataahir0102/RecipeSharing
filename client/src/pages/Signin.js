import React, { useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Hi")
      const response = await fetch('https://peach-zebra-coat.cyclic.app/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Signin successful
        console.log('Signin successful');
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
        // Store the token in local storage or cookies for future use
        // Redirect to the dashboard or another page
      } else {
        // Signin failed
        alert(data.message);
      }
    } catch (error) {
      console.error('Signin error:', error);
      setErrorMessage('An error occurred during signin. Please try again later.');
    }
    // Reset form fields
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <div className="left-side"></div>
      <div className="right-side">
        <div className="form-container">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className="signin-link">
            Already have an account? <a href="/">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
