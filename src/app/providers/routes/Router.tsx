import { Error404 } from "@/pages/errors";
import { Main } from "@/pages/main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, Login, Register } from "@/pages/auth";
import MainLayout from "../layouts/MainLayout";
import Choose from "@/pages/auth/ui/components/Choose";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "/auth",
        element: <Choose />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      }
    ],
  },
  
  {
    path: "*",
    element: <Error404 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
