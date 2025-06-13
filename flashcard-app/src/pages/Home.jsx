import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

 
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUsername(user);
    } else {
      navigate('/login'); 
    }
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };

  return (
    <div className="home-container">
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <Sun size={28} /> : <Moon size={28} />}
      </div>

      <h1 className="home-title">Welcome to BrainBloom!</h1>
      <p className="home-subtitle">Let's play and learn together</p>

      {username && (
        <p className="welcome-user">👋 Hi, <strong>{username}</strong>!</p>
      )}


      <div className="button-group">
        <Link to="/learn" className="home-button learn-button">Learn</Link>
        <Link to="/quiz" className="home-button quiz-button">Quiz</Link>
      </div>

      
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default Home;
