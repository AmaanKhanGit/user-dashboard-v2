import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectAuth from "./ProtectedRoute/ProtectAuth";
import ProtectApp from "./ProtectedRoute/ProtectApp";
import { useAuth } from "@clerk/react";
import Loading from "./components/Layout/Loading";
import RootLayout from "./components/RootLayout";

const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Workspace = lazy(() => import("./Pages/Wrokspace/Workspace"));
const Signin = lazy(() => import("./Pages/Auth/temp/Signin"));
const Signup = lazy(() => import("./Pages/Auth/Signup/Signup"));
const ResetPassword = lazy(
  () => import("./Pages/Auth/components/ResetPassword"),
);
const SSOCallback = lazy(() => import("./Pages/Auth/SSOCallback"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
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
        path: "/workspace",
        element: (
          <ProtectApp>
            <Workspace />
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
      {
        path: "/sso-callback",
        element: (
          <ProtectAuth>
            <SSOCallback />
          </ProtectAuth>
        ),
      },
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { isLoaded } = useAuth();
  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className:
              "!bg-white !text-gray-900 dark:!bg-gray-900 dark:!text-gray-100",
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
