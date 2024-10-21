import { Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Time is over! The assessment has been submitted.");
      return; // Stop the timer when it reaches zero
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
  };

  return (
    <>
      <Text fontSize="md" fontWeight="bold" color={"green.400"}>Time Left: {formatTime(timeLeft)}</Text>
    </>
  );
};

export default CountdownTimer;
