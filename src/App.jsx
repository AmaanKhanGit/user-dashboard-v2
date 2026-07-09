import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Auth/signup/Signup";
import Signin from "./Pages/Auth/signin/Signin";
import RegisterEmailVarify from "./Pages/Auth/RegisterEmailVarify/RegisterEmailVarify";
import RegietserSuccess from "./Pages/Auth/RegisterSuccess/RegietserSuccess";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import ForgotVarify from "./Pages/Auth/ForgotVarify/ForgotVarify";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import ResetSuccess from "./Pages/Auth/ResetSuccess/ResetSuccess";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AlreadyLogged from "./components/Auth/AlreadyLogged";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <AlreadyLogged>
        <Signin />
      </AlreadyLogged>
    ),
  },
  {
    path: "/signup",
    element: (
      <AlreadyLogged>
        <Signup />
      </AlreadyLogged>
    ),
  },
  {
    path: "/register-email-varify/:email",
    element: (
      <AlreadyLogged>
        <RegisterEmailVarify />
      </AlreadyLogged>
    ),
  },
  {
    path: "/email-verify/:token",
    element: (
      <AlreadyLogged>
        <RegietserSuccess />
      </AlreadyLogged>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AlreadyLogged>
        <ForgotPassword />
      </AlreadyLogged>
    ),
  },
  {
    path: "/forgot-success/:email",
    element: (
      <AlreadyLogged>
        <ForgotVarify />
      </AlreadyLogged>
    ),
  },
  {
    path: "/forgot-password-verify/:token",
    element: (
      <AlreadyLogged>
        <ResetPassword />
      </AlreadyLogged>
    ),
  },
  {
    path: "/reset-success",
    element: (
      <AlreadyLogged>
        <ResetSuccess />
      </AlreadyLogged>
    ),
  },
]);

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              height: "50px",
              fontSize: "18px",
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
