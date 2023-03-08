import * as React from "react";
import { Link } from "react-router-dom";
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

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const drawerWidth = 240;

export default function MiniDrawer({ mobileOpen, handleDrawerToggle, window }) {
  const theme = useTheme();
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
        {[
          {
            lable: "Register",
            Icon: PersonAddAlt1Icon,
            link: "auth/registration",
          },
          { lable: "Login", Icon: LoginIcon, link: "auth/login" },
          { lable: "Logout", Icon: LogoutIcon, link: "" },
        ].map(({ lable, Icon, link }, index) => (
          <Link to={link} key={index}>
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
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={lable} sx={{ opacity: 1 }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{display: { xs: "none", md: "block" }, width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
