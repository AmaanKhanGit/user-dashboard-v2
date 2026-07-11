import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

const ProtectAuth = ({ children }) => {
  const { isSignedIn } = useAuth();

  return <>{!isSignedIn ? children : <Navigate to="/" />}</>;
};

export default ProtectAuth;
