import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  // Problem: ProtectedRoute expects a loading state, but this hook does not expose it from AuthContext.
  // That means the protected route cannot pause the redirect while the app is reloading auth from cookies.
  // Solution: return loading from AuthContext through this hook and use it in ProtectedRoute before redirecting.
  const { login, logout, user, token, loading } = useContext(AuthContext);

  return { login, logout, user, token, loading };
};

export default useAuth;
