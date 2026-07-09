import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../Layout/Loading";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <>{token ? children : <Navigate to="/signin" />}</>;
};

export default ProtectedRoute;
