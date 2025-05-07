import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
  const [theme, setTheme] = useState('light');

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Initialize theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <div className="home-container">
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <Sun size={28} /> : <Moon size={28} />}
      </div>

      <h1 className="home-title">Welcome to BrainBloom! </h1>
      <p className="home-subtitle">Let's play and learn together </p>

      <div className="button-group">
        <Link to="/learn" className="home-button learn-button">Learn</Link>
        <Link to="/quiz" className="home-button quiz-button">Quiz</Link>
      </div>
    </div>
  );
};

export default Home;
