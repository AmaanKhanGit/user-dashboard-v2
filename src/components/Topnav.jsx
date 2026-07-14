import { FaMoon, FaBell, FaBars } from "react-icons/fa";
import ProfileMenu from "./Layout/ProdileMenu";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import Button from "./Layout/Button";

const Topnav = ({ onClose }) => {
  return (
    <div className="sticky top-0 z-20 h-16 bg-white shadow">
      <div className="myContainer flex items-center justify-between px-10 py-4">
        <div className="text-2xl font-bold text-purple-700">
          Task Managemant
        </div>

        <FaBars
          onClick={onClose}
          className="cursor-pointer text-xl sm:hidden"
        />
        <div className="flex gap-3 text-xl sm:gap-6">
          {/* <FaMoon className="cursor-pointer" />

          <div className="relative inline-flex">
            <div className="text-center disabled:shadow-none">
              <FaBell className="cursor-pointer" />
            </div>
            <span className="absolute top-0.5 right-0.5 grid min-h-3 min-w-3 translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-600 px-1 py-1 text-xs text-white"></span>
          </div> */}
          {/* <Show when="signed-out">
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </Show>

          <UserButton></UserButton> */}
          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton />
          </Show>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
