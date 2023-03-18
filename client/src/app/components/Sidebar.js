import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  Box,
  Drawer,
  AppBar as MuiAppBar,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import BackDrop from "../components/Backdrop";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth.action";

import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 240;

export default function MiniDrawer({ mobileOpen, handleDrawerToggle, window }) {
  const { logout, isLoading } = useAuth0();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleLogout = () => {
    dispatch(logout(navigate));
  };
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { label: "Profile", link: "user/profile" },
          { label: "Tasks", link: "user/tasks" },
        ].map(({ label, link }, index) => (
          <Link key={index} to={link}>
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: 1 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {/* <Link to="auth/registration">
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText primary="Register" sx={{ opacity: 1 }} />
            </ListItemButton>
          </ListItem>
        </Link> */}
        <Link to="auth/login">
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                }}
              >
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ opacity: 1 }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: "initial",
              px: 2.5,
            }}
            onClick={logout}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 3,
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: 1 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      {BackDrop(isLoading)}
      <Box
        component="nav"
        sx={{
          display: { xs: "none", md: "block" },
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <CssBaseline />
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
