const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`myBtn disabled:cursor-not-allowed disabled:bg-purple-400 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
