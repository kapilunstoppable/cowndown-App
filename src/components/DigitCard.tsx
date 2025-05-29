import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface DigitCardProps {
  digit: string;
}
const DigitCard: React.FC<DigitCardProps> = ({ digit }) => {
  const { isDarkMode } = useTheme();

  const baseCardStyle = `
    w-8 h-12 sm:w-12 sm:h-16 
    rounded-lg shadow-md 
    flex items-center justify-center 
    text-lg sm:text-2xl font-bold
    px-2
    ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}
  `;

  return (
    <div className="relative w-8 h-12 sm:w-12 sm:h-16 mx-1">
      <div className={baseCardStyle}>
        {digit}
      </div>
    </div>
  );
};

export default DigitCard;