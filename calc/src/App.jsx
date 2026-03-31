import { useState, useEffect } from 'react'
import KeyPad from './KeyPad'
import Display from './Display'

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
};

  return(
    <main data-theme={theme}>
      <div id='header'>
        <button id='themeSwitch' onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>
      </div>
      <div id='DisplayContainer'>
        <Display/>
      </div>
      <div id='KeyPadContainer'>
        <KeyPad/>
      </div>
    </main>
  );
}

export default App
