import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, User } from 'lucide-react';
import Lottie from 'lottie-react';

import learnAnimation from '../assets/learn.json';
import quizAnimation from '../assets/quiz.json';
import gamesAnimation from '../assets/games.json';
import backgroundAnim from '../assets/background2.json';
import logoImg from '../assets/brainbloom-logo.png';

import '../styles/Home.css';

const Home = () => {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');
  const [showProfile, setShowProfile] = useState(false);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signup');
  };

  return (
    <div className="home-container">
     
      <div className="background-wrapper">
  <Lottie
    animationData={backgroundAnim}
    loop
    autoplay
    className="background-lottie"
  />
</div>


     
      <div className="top-nav">
        <img src={logoImg} alt="Brain Bloom Logo" className="app-logo" />

        <div className="right-actions">
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Sun size={26} /> : <Moon size={26} />}
          </div>

          <div className="profile-container">
            <User
              size={26}
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="profile-dropdown">
                <p><strong>Name:</strong> {username}</p>
                <p><strong>Age:</strong> 8</p>
                <p><strong>Grade:</strong> 3rd</p>
                <button className="logout-profile-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <div className="animation-buttons">
        <Link to="/learn" className="lottie-link">
          <Lottie animationData={learnAnimation} loop className="lottie-icon" />
          <p>Learn</p>
        </Link>

        <Link to="/quiz" className="lottie-link">
          <Lottie animationData={quizAnimation} loop className="lottie-icon" />
          <p>Quiz</p>
        </Link>

        <Link to="/mini-games" className="lottie-link">
          <Lottie animationData={gamesAnimation} loop className="lottie-icon" />
          <p>Mini Games</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
