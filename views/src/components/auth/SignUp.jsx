
import React, { useState } from 'react';
import Button from '../button/Button';
import './auth.css';

const SignUp = ({ onSignUpSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [professionalInformation, setProfessionalInformation] = useState('');

  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Perform your signup logic here
    try {
      // Example: Make a request to your backend for user registration
      const response = await fetch('https://ab-6ybe.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password, // Add password if needed
          email,
          graduationYear,
          contactInformation,
          professionalInformation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If signup is successful, call the onSignUpSuccess callback
        onSignUpSuccess();
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="sign-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Graduation Year"
          value={graduationYear}
          onChange={(e) => setGraduationYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Information"
          value={contactInformation}
          onChange={(e) => setContactInformation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Professional Information"
          value={professionalInformation}
          onChange={(e) => setProfessionalInformation(e.target.value)}
        />
        <Button classs="btn-s" text="SIGN UP" onClick={handleSignUp} />
      </form>
      {error && <div className="error-message">{error}</div>}
      {/* <div className="sign-in">Already have an account? <a href="#">Sign In</a></div> */}
    </div>
  );
};

export default SignUp;



