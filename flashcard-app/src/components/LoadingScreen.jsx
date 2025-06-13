import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/loading.json'; 

const LoadingScreen = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Lottie animationData={animationData} loop={true} style={{ height: 200 }} />
    </div>
  );
};

export default LoadingScreen;
