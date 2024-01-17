import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Update the path to your AuthContext file
import { useNavigate} from 'react-router-dom';

import './staff.css'; // Import the CSS for styling



const StaffLogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a request to your login route
      const response = await fetch('https://ab-6ybe.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the user role is admin
        if (data.user.role === 'admin') {
          // Redirect to /staff if the user is an admin
          navigate('/staff');
        } else {
          // Alert if the user is not an admin
          alert('Unauthorized. Sign in as admin.');
        }
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="staff-login-container">
      <div className="staff-login-form">
        <h2>Staff Login</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default StaffLogIn;
