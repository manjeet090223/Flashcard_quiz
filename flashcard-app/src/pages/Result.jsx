import React from 'react';
import Lottie from 'lottie-react';
import { useLocation, useNavigate } from 'react-router-dom';
import completedAnimation from '../assets/completed.json';
import '../styles/Result.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score = 0 } = location.state || {};

  
  const stars = Array.from({ length: score });

  return (
    <div className="result-page">
      <Lottie animationData={completedAnimation} className="result-trophy" />
      <h1 className='title'>Quiz Completed!</h1>
      <div className="star-row">
        {stars.map((_, index) => (
          <span key={index} className="star filled">⭐</span>
        ))}
      </div>
      <p className="score-text">Your Score: {score}</p>
      <div className="result-buttons">
        <button onClick={() => navigate(-1)}>🔄 Retry</button>
        <button onClick={() => navigate('/')}>🏠 Back to Home</button>
      </div>
    </div>
  );
};

export default Result;
