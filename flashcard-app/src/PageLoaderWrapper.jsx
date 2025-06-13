
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

const PageLoaderWrapper = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 5000); 

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? <LoadingScreen /> : children;
};

export default PageLoaderWrapper;
