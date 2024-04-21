import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import PrivateRoutes from "./components/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
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
