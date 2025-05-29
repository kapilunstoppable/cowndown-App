import React, { useEffect, useState } from 'react';
import DigitCard from './DigitCard';

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ 
  hours, 
  minutes, 
  seconds, 
  isRunning, 
  isPaused, 
  isCompleted,
  onComplete 
}) => {
  const [remainingTime, setRemainingTime] = useState({
    hours,
    minutes,
    seconds
  });
  
  useEffect(() => {
    setRemainingTime({ hours, minutes, seconds });
  }, [hours, minutes, seconds]);

  useEffect(() => {
    let intervalId: number;
    
    if (isRunning && !isPaused && !isCompleted) {
      intervalId = window.setInterval(() => {
        setRemainingTime(prev => {
          // Calculate new time
          let newSeconds = prev.seconds;
          let newMinutes = prev.minutes;
          let newHours = prev.hours;
          
          if (newSeconds > 0) {
            newSeconds--;
          } else if (newMinutes > 0) {
            newSeconds = 59;
            newMinutes--;
          } else if (newHours > 0) {
            newSeconds = 59;
            newMinutes = 59;
            newHours--;
          }
          
          // Check if timer is complete
          if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
            clearInterval(intervalId);
            onComplete();
          }
          
          return {
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds
          };
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, isPaused, isCompleted, onComplete]);

  // Format digits to always show two digits
  const formatDigit = (digit: number): string => {
    return digit.toString().padStart(2, '0');
  };

  // Split hours, minutes, and seconds into individual digits
  const hourDigits = formatDigit(remainingTime.hours).split('');
  const minuteDigits = formatDigit(remainingTime.minutes).split('');
  const secondDigits = formatDigit(remainingTime.seconds).split('');
  
  return (
    <div className="flex justify-center items-center my-6 gap-1 sm:gap-2">
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <DigitCard digit={hourDigits[0]} />
          <DigitCard digit={hourDigits[1]} />
        </div>
        <span className="text-xs mt-1 opacity-70">HOURS</span>
      </div>
      
      <div className="text-2xl font-bold mx-1 sm:mx-2">:</div>
      
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <DigitCard digit={minuteDigits[0]} />
          <DigitCard digit={minuteDigits[1]} />
        </div>
        <span className="text-xs mt-1 opacity-70">MINUTES</span>
      </div>
      
      <div className="text-2xl font-bold mx-1 sm:mx-2">:</div>
      
      <div className="flex flex-col items-center">
        <div className="flex gap-1">
          <DigitCard digit={secondDigits[0]} />
          <DigitCard digit={secondDigits[1]} />
        </div>
        <span className="text-xs mt-1 opacity-70">SECONDS</span>
      </div>
    </div>
  );
};

export default TimerDisplay;