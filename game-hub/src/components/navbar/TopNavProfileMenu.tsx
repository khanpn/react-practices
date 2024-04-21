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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { MouseEvent, useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { User } from "../../models/user";
import { NavLink } from "react-router-dom";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface ProfileMenuItem {
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
}

const menuItems: ProfileMenuItem[] = [
  { path: "/profile", name: "Profile", icon: AccountCircleOutlinedIcon },
  { path: "#", name: "Logout", icon: LogoutIcon },
];

const anonymous: User = {
  id: -1,
  username: "",
  firstName: "",
  lastName: "",
};

function TopNavProfileMenu() {
  const { user = anonymous } = useContext(AuthContext);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userDisplayName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
          <Avatar alt={userDisplayName} src={user.avatar} />
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
        {menuItems.map((item, index) => (
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
