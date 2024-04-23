import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";

export interface Page {
  path: string;
  name: string;
}

interface Props {
  pages: Page[];
  children?: ReactNode;
}

function TopNavMenu({ pages, children }: Props) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <>
      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleOpenNavMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.name}>
              <NavLink
                key={page.name}
                to={page.path}
                style={{ textDecoration: "none" }}
              >
                <Typography color="primary">{page.name}</Typography>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {children}

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <NavLink
            key={page.name}
            to={page.path}
            style={{ textDecoration: "none" }}
          >
            <Typography color="primary" variant="h5" sx={{ mx: 1 }}>
              {page.name}
            </Typography>
          </NavLink>
        ))}
      </Box>
    </>
  );
}

export default TopNavMenu;
