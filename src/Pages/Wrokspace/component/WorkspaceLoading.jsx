import { FaSpinner } from "react-icons/fa";

const WorkspaceLoading = ({ message = "Loading your workspace...", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-700">
        <FaSpinner className="animate-spin text-2xl" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">
        Loading...
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>
    </div>
  );
};

export default WorkspaceLoading;