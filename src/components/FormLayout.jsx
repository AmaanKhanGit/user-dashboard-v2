const FormLayout = ({ children, className }) => {
  return (
    <section
      className={`flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 ${className}`}
    >
      {children}
    </section>
  );
};

export default FormLayout;
