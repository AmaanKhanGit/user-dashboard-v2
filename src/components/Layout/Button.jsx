const Button = ({ children, className, ...props }) => {
  return (
    <button {...props} className={`myBtn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
