import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Three Dots */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <FaEllipsisV className="text-gray-600" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-xl bg-white shadow-lg transition-all duration-300 ease-out ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <button className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-100">
          View insights
        </button>

        {/* <button className="w-full px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50">
          Delete
        </button> */}
      </div>
    </div>
  );
};

export default Dropdown;
