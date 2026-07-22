import { FaMoon, FaBell, FaBars, FaSun } from "react-icons/fa";
import ProfileMenu from "./Layout/ProdileMenu";
import { useTheme } from "../Provider/ThemeProvider";

const Topnav = ({ onClose }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="sticky top-0 z-20 h-16 bg-white shadow transition-colors dark:bg-gray-900">
      <div className="myContainer flex items-center justify-between px-3 py-4 sm:px-10">
        <div className="flex items-center gap-2 text-2xl font-bold text-purple-700">
          <FaBars
            onClick={onClose}
            className="cursor-pointer text-xl sm:hidden"
          />
          Task Managemant
        </div>

        <div className="flex items-center gap-3 text-xl sm:gap-6">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <div className="relative inline-flex">
            <div className="text-center disabled:shadow-none">
              <FaBell className="cursor-pointer" />
            </div>
            <span className="absolute top-0.5 right-0.5 grid min-h-3 min-w-3 translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 px-1 py-1 text-xs text-white"></span>
          </div>

          <ProfileMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
