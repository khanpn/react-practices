import { Outlet } from "react-router-dom";
import { TopNavBar } from "../components";

function Layout() {
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  );
}

export default Layout;
