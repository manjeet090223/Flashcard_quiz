import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem('user', username);
    setMessage('🎉 Account created successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      {message && <p className="success-msg">{message}</p>}
    </div>
  );
};

export default Signup;
