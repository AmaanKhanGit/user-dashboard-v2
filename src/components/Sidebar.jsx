import {
  FaBell,
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Button from "./Layout/Button";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import LogoutModal from "../Pages/Profile/modals/LogoutModal";
import { BsPersonWorkspace } from "react-icons/bs";

const links = [
  {
    title: "Dashboard",
    icon: FaHome,
    route: "/",
  },
  {
    title: "Profile",
    icon: FaUser,
    route: "/profile",
  },
  {
    title: "Workspace",
    icon: BsPersonWorkspace,
    route: "/workspace",
  },
];

const Sidebar = ({ onClose, className }) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    onClose?.();
  };

  const { handleLogout } = useContext(AuthContext);

  return (
    <aside className={className}>
      <div className="flex flex-1 flex-col items-start gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              to={link.route}
              key={link.title}
              onClick={handleClick}
              className={({ isActive }) =>
                `w-full cursor-pointer rounded-lg px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 ${isActive ? "bg-gray-100 text-purple-700 dark:bg-gray-800 dark:text-purple-300" : "bg-white dark:bg-gray-900"}`
              }
            >
              <div className="flex items-center gap-2">
                <Icon className="text-xl" />
                <div>{link.title}</div>
              </div>
            </NavLink>
          );
        })}
      </div>

      <Button onClick={() => setOpen(true)} className="dangerBtn mt-auto">
        Logout
      </Button>

      <LogoutModal
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={handleLogout}
      />
    </aside>
  );
};

export default Sidebar;
