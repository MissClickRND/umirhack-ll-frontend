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
import EduPanelPage from "@/pages/edu-panel/ui/EduPanel.page";
import PublicApiPage from "@/pages/public-api/ui/PublicApi.page";
import ResultPage from "@/pages/result/ui/Result.page";

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
        path: "/public-api",
        element: <PublicApiPage />,
      },
      {
        path: "/student",
        element: <Student />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/edu-panel",
        element: <EduPanelPage />,
      },
      {
        path: "/:token",
        element: <ResultPage />,
      },
    ],
  },

  {
    path: "/account",
    element: <AuthPage />,
    children: [
      {
        path: "/account/login",
        element: <Login />,
      },
      {
        path: "/account/register",
        element: <Choose />,
      },
      {
        path: "/account/register/student",
        element: <StudentRegister />,
      },
      {
        path: "/account/register/university",
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
