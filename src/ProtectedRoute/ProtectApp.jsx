import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

const ProtectApp = ({ children }) => {
  const { isSignedIn } = useAuth();

  return <>{isSignedIn ? children : <Navigate to="/sign-in" />}</>;
};

export default ProtectApp;
