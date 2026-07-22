const Overlay = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-gray-950/20 backdrop-blur-sm transition-opacity duration-300"
    ></div>
  );
};

export default Overlay;
