import { FaRegFolderOpen } from "react-icons/fa";

const EmptyWorkspace = ({ title, message, className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-700">
        <FaRegFolderOpen className="text-2xl" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default EmptyWorkspace;
