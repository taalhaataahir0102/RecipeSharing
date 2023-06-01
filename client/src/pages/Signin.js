import React, { useState } from 'react';
import './Signin.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/signin', {
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
        // Store the token in local storage or cookies for future use
        // Redirect to the dashboard or another page
      } else {
        // Signin failed
        setErrorMessage(data.message);
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
    <div className="signin-container">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signin</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Signin;
