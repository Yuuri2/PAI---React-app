import { useState, useEffect } from 'react'
import KeyPad from './KeyPad'
import Display from './Display'

function App() {
  const [theme, setTheme] = useState('light');

  const [onDisplay, setOnDisplay] = useState("");
  const [val1, setVal1] = useState("");
  const [operand, setOperand] = useState("");

  const inputHandle = (value) => {
    console.log("Kliknięto guzik: ", value);
    switch(value){
      case "=":
        evaluate();
        break;
      case "C":
        setOnDisplay(prev => prev.toString().slice(0, -1));
        break;
      case "+": case "-": case "/": case "*": case "^": case "Sqrt":
        if(val1 === "") setVal1("0");
        setVal1(onDisplay);
        setOperand(value);
        setOnDisplay("");
        break;
      
      case "Bin":
        //TODO
        break;
      case "Hex":
        //TODO
        break;
      default:
        try{
          setOnDisplay(prev => prev + value);
        }
        catch{
          return;
        }
    }
  }

  const evaluate = () => {
    if(val1 === "" || operand === "" || onDisplay === "") return;
    const num1 = parseFloat(val1);
    const num2 = parseFloat(onDisplay);
    let result = 0;
  
    switch(operand){

      case "+":
        result = num1 + num2;
        break;
      
      case "-":
        result = num1 - num2;
        break;
      
      case "/":
        if(num2 == 0){
          setOnDisplay("Err: Div/0");
          return;
        } 
        result = num1 / num2;
        break;
      
      case "*":
        result = num1 * num2;
        break;
      
      case "^":
        //TODO
        break;
      
      case "Sqrt":
        //TODO
        break;
    }
  setOnDisplay(result.toString());
  setOperand("");
  setVal1("");
}

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
        <Display value={onDisplay}/>
      </div>
      <div id='KeyPadContainer'>
        <KeyPad onBtnClick={inputHandle}/>
      </div>
    </main>
  );
}

export default App
