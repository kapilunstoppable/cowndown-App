import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TimerSetupProps {
  onSetTimer: (hours: number, minutes: number, seconds: number) => void;
}

interface PresetTimer {
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimerSetup: React.FC<TimerSetupProps> = ({ onSetTimer }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { isDarkMode } = useTheme();

  const presetTimers: PresetTimer[] = [
    { name: "Pomodoro", hours: 0, minutes: 25, seconds: 0 },
    { name: "Short Break", hours: 0, minutes: 5, seconds: 0 },
    { name: "Coffee", hours: 0, minutes: 3, seconds: 0 },
    { name: "Meeting", hours: 1, minutes: 0, seconds: 0 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetTimer(hours, minutes, seconds);
  };

  const handlePresetClick = (preset: PresetTimer) => {
    setHours(preset.hours);
    setMinutes(preset.minutes);
    setSeconds(preset.seconds);
    onSetTimer(preset.hours, preset.minutes, preset.seconds);
  };

  const inputClass = `
    w-full p-2 rounded-md border 
    ${isDarkMode 
      ? 'bg-gray-700 border-gray-600 text-white' 
      : 'bg-white border-gray-300 text-gray-900'}
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  `;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Set Timer</h2>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-xs mb-1 opacity-70">Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              className={inputClass}
              aria-label="Hours"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 opacity-70">Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              className={inputClass}
              aria-label="Minutes"
            />
          </div>
          <div>
            <label className="block text-xs mb-1 opacity-70">Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              className={inputClass}
              aria-label="Seconds"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={`mt-3 w-full py-2 px-4 rounded-md flex items-center justify-center
            ${isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'}
            transition-colors duration-200
          `}
          aria-label="Set timer"
        >
          <Clock size={18} className="mr-2" />
          Set Timer
        </button>
      </form>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Presets</h3>
        <div className="grid grid-cols-2 gap-2">
          {presetTimers.map((preset, index) => (
            <button
              key={index}
              onClick={() => handlePresetClick(preset)}
              className={`
                py-2 px-3 text-sm rounded-md
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
                transition-colors duration-200
              `}
              aria-label={`Set timer to ${preset.name}`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerSetup;