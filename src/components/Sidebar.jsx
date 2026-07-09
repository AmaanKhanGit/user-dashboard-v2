import {
  FaBell,
  FaCog,
  FaHome,
  FaQuestionCircle,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Button from "./Layout/Button";
import useAuth from "../hooks/useAuth";

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
];

const Sidebar = ({ onClose, className }) => {
  const handleClick = () => {
    onClose?.();
  };

  const { logout } = useAuth();

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
                `w-full cursor-pointer rounded-lg px-4 py-2 text-xl font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${isActive ? "bg-gray-100 text-purple-700" : "bg-white"}`
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

      <Button onClick={logout} className="dangerBtn mt-auto">
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;
