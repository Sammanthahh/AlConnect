

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Button from '../button/Button';
import './auth.css';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Perform your authentication logic here
    try {
      // Example: Make a request to your backend for authentication
      const response = await fetch('https://ab-6ybe.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If authentication is successful, log in the user
        login(data.user); // Assuming your backend returns the user data along with the token
      } else {
        // If authentication fails, display an error message
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="sign-container">
      <div className="sign-txt">Look no further! AlumConnect brings those business connections you have always dreamt of to reality! </div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          style={{ border: 'none' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button classs="btn-s" text="SIGN IN" onClick={handleSignIn} />
      </form>
      {error && <div className="error-message">{error}</div>}
      {/* <div className="sign-up">Don't have an account? <a href="#">Sign Up</a></div> */}
    </div>
  );
};

export default SignIn;
