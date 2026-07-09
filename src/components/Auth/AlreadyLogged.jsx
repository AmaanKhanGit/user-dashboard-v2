import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Loading from "../Layout/Loading";

const AlreadyLogged = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return <>{!token ? children : <Navigate to="/" />}</>;
};

export default AlreadyLogged;
