const AuthCard = ({ children, className }) => {
  return (
    <div
      className={`my-2 flex flex-col gap-4 rounded-3xl bg-white p-7 max-sm:w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default AuthCard;
