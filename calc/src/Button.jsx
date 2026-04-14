function Button({ label, onClick, className }) {
  return (
    <button className={`calc-button ${className}`} onClick={onClick}>
        {label}
    </button>
  );
}
export default Button;