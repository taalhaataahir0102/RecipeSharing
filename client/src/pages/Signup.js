// https://peach-zebra-coat.cyclic.app/api/form

import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://peach-zebra-coat.cyclic.app/api/form', {
        fullName,
        email,
        password,
      });

      console.log(response.data); // Handle success response
      // TODO: Handle successful signup, e.g., redirect to dashboard or show a success message
    //   alert('Signup successful!');
      window.location.href = '/signin';

    } catch (error) {
      console.error(error); // Handle error response
      // TODO: Handle error during signup, e.g., display an error message to the user
      alert('Signup Failed!');
      window.location.href = '/';
    }




    console.log('Signup form submitted');
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset form fields
    setFullName('');
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
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit">Sign Up</button>
          </form>
          <div className="signin-link">
            Already have an account? <a href="/signin">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;