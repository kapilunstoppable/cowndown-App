import React, { useState } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import TimerSetup from './TimerSetup';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

type TimerState = {
  hours: number;
  minutes: number;
  seconds: number;
};

const CountdownTimer: React.FC = () => {
  const [timerValues, setTimerValues] = useState<TimerState>({ 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  const handleSetTimer = (hours: number, minutes: number, seconds: number) => {
    setTimerValues({ hours, minutes, seconds });
    setIsCompleted(false);
  };

  const handleStart = () => {
    if (timerValues.hours === 0 && timerValues.minutes === 0 && timerValues.seconds === 0) {
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setIsCompleted(true);
    playAlarm();
  };

  const playAlarm = () => {
    // Create and play audio
    const audio = new Audio('/alarm.mp3');
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <div className={`w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Countdown Timer</h1>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          <TimerDisplay 
            hours={timerValues.hours}
            minutes={timerValues.minutes}
            seconds={timerValues.seconds}
            isRunning={isRunning}
            isPaused={isPaused}
            isCompleted={isCompleted}
            onComplete={handleComplete}
          />

          <TimerControls 
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={handleStart}
            onPause={handlePause}
            onResume={handleResume}
            onReset={handleReset}
          />

          {!isRunning && (
            <TimerSetup onSetTimer={handleSetTimer} />
          )}
          
          {isCompleted && (
            <div className="mt-4 py-2 px-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md text-center animate-pulse">
              Time's up!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;