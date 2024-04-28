import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import LogoutPage from "./pages/LogoutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/games/:slug",
        element: <GameDetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
