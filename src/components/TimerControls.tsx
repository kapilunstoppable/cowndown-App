import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({ 
  isRunning, 
  isPaused, 
  onStart, 
  onPause, 
  onResume, 
  onReset 
}) => {
  const { isDarkMode } = useTheme();
  
  const buttonBaseClass = `
    flex items-center justify-center px-4 py-2 rounded-lg font-medium 
    transition-all duration-300 ease-in-out transform hover:scale-105
    focus:outline-none focus:ring-2 focus:ring-opacity-50
  `;
  
  const primaryButtonClass = `
    ${buttonBaseClass}
    ${isDarkMode 
      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
      : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400'}
  `;
  
  const secondaryButtonClass = `
    ${buttonBaseClass}
    ${isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300'}
  `;
  
  return (
    <div className="flex justify-center gap-3 mt-6">
      {!isRunning ? (
        <button 
          className={primaryButtonClass}
          onClick={onStart}
          aria-label="Start timer"
        >
          <Play size={20} className="mr-2" />
          Start
        </button>
      ) : isPaused ? (
        <button 
          className={primaryButtonClass}
          onClick={onResume}
          aria-label="Resume timer"
        >
          <Play size={20} className="mr-2" />
          Resume
        </button>
      ) : (
        <button 
          className={primaryButtonClass}
          onClick={onPause}
          aria-label="Pause timer"
        >
          <Pause size={20} className="mr-2" />
          Pause
        </button>
      )}
      
      <button 
        className={secondaryButtonClass}
        onClick={onReset}
        aria-label="Reset timer"
      >
        <RefreshCw size={20} className="mr-2" />
        Reset
      </button>
    </div>
  );
};

export default TimerControls;