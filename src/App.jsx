import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Profile from "./Pages/Profile/Profile";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signin from "./Pages/Auth/Signin/Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/sign-in/",
    element: <Signin />,
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
