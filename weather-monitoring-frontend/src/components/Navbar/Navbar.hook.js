import { useState, useEffect } from 'react';

// Custom hook for Navbar logic
export const useNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    currentTime,
  };
};
