import Button from './Button';

const layout = [
    "C", "1", "2", "3", "+",
    "^", "4", "5", "6", "-",
    "Sqrt", "7", "8", "9", "*",
    "Bin", "Hex", "0", "=", "/"
]

function KeyPad(){
    return(
        <div id='KeyPadSpace'>
            {layout.map((label) => (
                <Button key={label} label={label} />
            ))}
        </div>
    );
}

export default KeyPad;