import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);

  const login = (tokenStr) => {
    if (tokenStr) {
      const decodedToken = jwtDecode(tokenStr);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        return;
      }

      setUser(decodedToken);
      setToken(tokenStr);
      const { exp } = decodedToken;
      const currentTime = Math.floor(Date.now() / 1000);

      const maxAge = exp - currentTime;
      if (exp) {
        setCookie("jwt", tokenStr, {
          path: "/",
          maxAge: maxAge,
          sameSite: true,
        });
      }
      return;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeCookie("jwt", { path: "/" });
  };

  useEffect(() => {
    if (cookie?.jwt) {
      setToken(cookie.jwt);
      const user = jwtDecode(cookie.jwt);
      setUser(user);
    }
    setLoading(false);
  }, [cookie]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
