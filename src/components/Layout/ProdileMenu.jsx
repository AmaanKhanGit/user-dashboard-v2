import { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoutModal from "../../Pages/Profile/modals/LogoutModal";
import { AuthContext } from "../../Provider/AuthProvider";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const { handleLogout } = useContext(AuthContext);

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
        className={`absolute right-0 mt-2 w-48 origin-top rounded-xl bg-white shadow-lg transition-all duration-300 ease-out dark:bg-gray-900 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <Link onClick={() => setIsOpen(false)} to="/profile">
          <button className="w-full cursor-pointer rounded-xl px-4 py-3 text-left text-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
            Profile
          </button>
        </Link>

        <button
          onClick={() => {
            setModalOpen(true);
            setIsOpen(false);
          }}
          className="w-full cursor-pointer rounded-xl px-4 py-3 text-left text-lg text-red-600 transition-colors hover:bg-red-50"
        >
          Logout
        </button>
      </div>
      <LogoutModal
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ProfileMenu;
