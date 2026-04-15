import { useState, useEffect } from 'react'
import KeyPad from './KeyPad'
import Display from './Display'

function App() {
  const [theme, setTheme] = useState('light');
  const [actionLock, setActionLock] = useState(false);
  const [onDisplay, setOnDisplay] = useState("");
  const [val1, setVal1] = useState("");
  const [operand, setOperand] = useState("");

  const inputHandle = (value) => {
    if(actionLock){
      if(value === "Clear"){
        setVal1("");
        setOperand("");
        setOnDisplay("");
        setActionLock(false);
      }
      return;
    }
    else{
    switch(value){
      case "=":
        evaluate();
        break;
      case "Clear":
        setVal1("");
        setOperand("");
        setOnDisplay("");
        break;
      case "Del":
        setOnDisplay(prev => prev.toString().slice(0, -1));
        break;
      case "+": case "-": case "/": case "*": case "^": case "Sqrt":
        if(value === "-" && onDisplay === ""){
          setOnDisplay("-");
          break;
        }
        if(val1 === "") setVal1("0");
        setVal1(onDisplay);
        setOperand(value);
        setOnDisplay("");
        break;
      
      case "Bin":
        if (onDisplay !== "") {
          const num = parseInt(onDisplay, 10);
          setOnDisplay(num.toString(2));
        }
        setActionLock(true);
        break;
      case "Hex":
        if (onDisplay !== "") {
          const num = parseInt(onDisplay, 10);
          setOnDisplay(num.toString(16).toUpperCase());
        }
        setActionLock(true);
        break;
      
      default:
        if(onDisplay.length > 13) break;
        if(value === "."){
          if(onDisplay === ""){ 
            setOnDisplay("0.");
          }
          else if(onDisplay.includes(".")) break;
          else{
            
            setOnDisplay(prev => prev + value);
          }
          break;
        }
        if(onDisplay === "0") {
          setOnDisplay(value)
        }
        else setOnDisplay(prev => prev + value);
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
          setActionLock(true);
          return;
        } 
        result = num1 / num2;
        break;
      
      case "*":
        result = num1 * num2;
        break;
      
      case "^":
        result = Math.pow(num1, num2);
        break;
      
      case "Sqrt":
        //Pierwsza liczba wartość, druga - stopień pierwiastka
        if (num1 < 0 && num2 % 2 === 0) {
          setOnDisplay("Err: Neg Sqrt");
          return;
        }
        result = Math.pow(num1, 1 / num2);
        break;
    }
    result = Math.round(result * 100) / 100;
  setOnDisplay(result.toString());
  setOperand("");
  setVal1("");
}
  useEffect(() => {
  const handleKeyDown = (event) => {
    const { key } = event;

    if (/^[0-9+\-*/.^]$/.test(key)) {
      event.preventDefault();
      inputHandle(key);
    }

    if (key === "Enter") {
      event.preventDefault();
      inputHandle("=");
    }
    else if (key === "Backspace") {
      inputHandle("Del");
    }
    else if (key === "Escape") {
      inputHandle("Clear");
    }
    else if (key === ",") {
      inputHandle(".");
    }
    else if (key === "^") {
      inputHandle("^");
    }
  };

  // Dodajemy "nasłuchiwacz" do całego okna przeglądarki
  window.addEventListener("keydown", handleKeyDown);

  // Sprzątanie (Cleanup) - ważne, żeby nie mnożyć listenerów!
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [onDisplay, val1, operand]);

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
        <KeyPad onBtnClick={inputHandle} isLocked={actionLock} />
      </div>
    </main>
  );
}

export default App
