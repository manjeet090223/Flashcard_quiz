import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = localStorage.getItem('user');
    if (username === savedUser) {
      setMessage('✅ Logged in successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      alert('❌ User not found! Please sign up first.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p className="success-msg">{message}</p>}
    </div>
  );
};

export default Login;
