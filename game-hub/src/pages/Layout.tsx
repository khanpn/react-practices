import { Divider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { TopNavBar } from "../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Divider component="div" sx={{ my: 3, border: "none" }} />
      <Outlet />
    </>
  );
}

export default Layout;
