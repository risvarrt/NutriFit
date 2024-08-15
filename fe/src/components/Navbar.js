import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  MenuItem,
  Typography,
  Drawer,
  IconButton,
  Avatar,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  appBarStyle,
  toolbarStyle,
  boxStyle,
  logoStyle,
  menuStyle,
  profileBoxStyle,
  drawerBoxStyle,
  drawerContentStyle,
} from "../styles/Navbar.module.js";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const menuItems = [
  { text: "Browse Workouts", path: "/bWorkouts" },
  { text: "My Workouts", path: "/workout-logging" },
  { text: "Meal Plan", path: "/meal-plan" },
  { text: "My Journey", path: "/my-journey" },
  { text: "Progress Reports", path: "/progress-reports" },
  { text: "View Products", path: "/view-products" },
  { text: "Browse recipes", path: "/recipes" },
  { text: "Cart", path: "/cart" },
  { text: "Blog", path: "/blog" },
];

const profileItems = [
  { text: "My Profile", path: "/my-profile" },
  { text: "Log Measurements", path: "/log-measurements" },
  { text: "Settings", path: "/settings" },
];

function AppAppBar({ mode }) {
  const [open, setOpen] = React.useState(false);
  const [role, setRole] = useState(""); // Corrected the import usage here
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { auth } = useContext(AuthContext); // Corrected the import usage here

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const extendedMenuItems = [...menuItems];
  if (role === "gym") {
    extendedMenuItems.push({ text: "My Programs", path: "/my-programs" });
  }

  return (
    <div>
      <AppBar position="fixed" sx={appBarStyle(theme)}>
        <Container maxWidth="lg">
          <Toolbar variant="regular" sx={toolbarStyle(theme)}>
            <Box sx={boxStyle}>
              <MuiLink component={RouterLink} to="/" color="text.secondary">
                <img
                  src="/appLogo-circular.png"
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </MuiLink>
              <Box sx={menuStyle}>
                {extendedMenuItems.map((item) => (
                  <MenuItem key={item.text} sx={{ py: "6px", px: "12px" }}>
                    <MuiLink
                      component={RouterLink}
                      to={item.path}
                      color="text.primary"
                    >
                      <Typography variant="body2">{item.text}</Typography>
                    </MuiLink>
                  </MenuItem>
                ))}
              </Box>
            </Box>

            <Box sx={profileBoxStyle}>
              <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
            <Box sx={drawerBoxStyle}>
              <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box sx={drawerContentStyle(isSmallScreen)}>
                  {menuItems.concat(profileItems).map((item) => (
                    <MenuItem key={item.text}>
                      <MuiLink component={RouterLink} to={item.path}>
                        {item.text}
                      </MuiLink>
                    </MenuItem>
                  ))}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
