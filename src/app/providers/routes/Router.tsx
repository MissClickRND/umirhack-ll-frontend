import { Error404 } from "@/pages/errors";
import { Main } from "@/pages/main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthPage, Login } from "@/pages/auth";
import MainLayout from "../layouts/MainLayout";
import Choose from "@/pages/auth/ui/components/Choose";
import { Student } from "@/pages/student";
import StudentRegister from "@/pages/auth/ui/StudentRegister.page";
import UniversityRegister from "@/pages/auth/ui/UniversityRegister.page";
import Admin from "@/pages/admin/ui/Admin.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/admin",
        element: <Admin />,
      }
    ],
  },

  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Choose />,
      },
      {
        path: "/auth/register/student",
        element: <StudentRegister />,
      },
      {
        path: "/auth/register/university",
        element: <UniversityRegister />,
      },
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
