import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signin from "./Pages/Auth/Signin/Signin";
import Signup from "./Pages/Auth/Signup/Signup";
import ResetPassword from "./Pages/Auth/components/ResetPassword";
import ProtectAuth from "./ProtectedRoute/ProtectAuth";
import ProtectApp from "./ProtectedRoute/ProtectApp";
import { useAuth } from "@clerk/react";
import Loading from "./components/Layout/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectApp>
        <Dashboard />
      </ProtectApp>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectApp>
        <Profile />
      </ProtectApp>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <ProtectAuth>
        <Signin />
      </ProtectAuth>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <ProtectAuth>
        <Signup />
      </ProtectAuth>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ProtectAuth>
        <ResetPassword />
      </ProtectAuth>
    ),
  },
]);

function App() {
  const queryClient = new QueryClient();
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              height: "50px",
              fontSize: "14px",
              fontWeight: "bold",
            },
          }}
          containerStyle={{
            bottom: "50px",
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
