import { useState } from 'react'

function Button(props) {
  const [count, setCount] = useState(0)
  
  return(
    <button className="calc-button">
        {props.label}
    </button>
  );
}
export default Button;