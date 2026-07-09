import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { logout } = useAuth();

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-full p-2"
      >
        <FaUserCircle className="cursor-pointer" />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-48 origin-top rounded-xl bg-white shadow-lg transition-all duration-300 ease-out ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <Link to="/profile">
          <button className="w-full cursor-pointer rounded-xl px-4 py-3 text-left text-lg transition-colors hover:bg-gray-100">
            Profile
          </button>
        </Link>

        <button
          onClick={logout}
          className="w-full cursor-pointer rounded-xl px-4 py-3 text-left text-lg text-red-600 transition-colors hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
