import React from 'react';
import CountdownTimer from './components/CountdownTimer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <CountdownTimer />
    </ThemeProvider>
  );
}

export default App;