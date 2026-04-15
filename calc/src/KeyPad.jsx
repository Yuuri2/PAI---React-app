import Button from './Button';

const layout = [
    "Clear", "1", "2", "3", "+",
    "^", "4", "5", "6", "-",
    "Sqrt", "7", "8", "9", "*",
    "Bin", "Hex", "0", "Del", "/",
    "=","."
]

function KeyPad({ onBtnClick, isLocked }){
    return(
        <div id='KeyPadSpace'>
            {layout.map((label) => (
                <Button 
                key={label} 
                label={label} 
                onClick={() => onBtnClick(label)}
                className={`
                        ${label === "=" ? "equal-btn" : ""} 
                        ${(label === "Clear" && isLocked) ? "highlight-green" : ""}
                    `}
                />
            ))}
        </div>
    );
}

export default KeyPad;