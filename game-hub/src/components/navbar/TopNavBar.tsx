import ExtensionIcon from "@mui/icons-material/Extension";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import ColorModeSwitch from "../ColorModeSwitch";
import SearchInput from "../InputSearch";
import TopNavMenu, { Page } from "./TopNavMenu";
import TopNavProfileMenu from "./TopNavProfileMenu";

const appName = "GameHub";
const pages: Page[] = [{ path: "/", name: "Home" }];

function TopNavBar() {
  return (
    <AppBar position="relative" sx={{ zIndex: 999 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo  */}
          <ExtensionIcon sx={{ display: { xs: "none", md: "inline" } }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mx: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appName}
          </Typography>

          <TopNavMenu pages={pages}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {appName}
            </Typography>
          </TopNavMenu>

          <SearchInput />

          <Box sx={{ flexGrow: 0, p: 3 }}>
            <ColorModeSwitch />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <TopNavProfileMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopNavBar;
