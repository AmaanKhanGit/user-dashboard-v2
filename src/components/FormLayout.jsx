const FormLayout = ({ children, className }) => {
  return (
    <section
      className={`flex h-screen items-center justify-center bg-gray-100 ${className}`}
    >
      {children}
    </section>
  );
};

export default FormLayout;
