// layouts/RootLayout.jsx

import { Outlet } from "react-router-dom";
import AuthProvider from "../Provider/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default RootLayout;
