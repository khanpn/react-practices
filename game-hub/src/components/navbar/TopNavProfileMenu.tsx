import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIconTypeMap,
  Tooltip,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { MouseEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { User } from "../../models/user";

interface ProfileMenuItem {
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  isEnable: (user?: User) => boolean;
}

const menuItems: ProfileMenuItem[] = [
  {
    path: "/profile",
    name: "Profile",
    icon: AccountCircleOutlinedIcon,
    isEnable: () => true,
  },
  {
    path: "/login",
    name: "Login",
    icon: LoginIcon,
    isEnable: (user) => !user,
  },
  {
    path: "/logout",
    name: "Logout",
    icon: LogoutIcon,
    isEnable: (user) => !!user,
  },
];

function TopNavProfileMenu() {
  const { user } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userDisplayName = `${user?.firstName || ""}${
    user?.lastName ? " " + user?.lastName : ""
  }`;

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
          <Avatar alt={userDisplayName} src={user?.avatar}>
            {userDisplayName}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuItems
          .filter((item) => item.isEnable(user))
          .map((item, index) => (
            <MenuItem key={index}>
              <NavLink style={{ textDecoration: "none" }} to={item.name}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {item?.icon &&
                    React.createElement(item.icon, { color: "primary" })}
                  <Typography color="primary" variant="body2">
                    {item.name}
                  </Typography>
                </Stack>
              </NavLink>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
}

export default TopNavProfileMenu;
