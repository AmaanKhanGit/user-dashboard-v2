import { FaSpinner } from "react-icons/fa";

const ActionLoader = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-950/30 backdrop-blur-sm">
      <div className="flex min-w-55 flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-2xl">
        <FaSpinner className="animate-spin text-4xl text-purple-600" />

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          Processing...
        </h3>

        <p className="mt-2 text-center text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
};

export default ActionLoader;
