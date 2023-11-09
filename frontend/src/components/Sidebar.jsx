import { useState, useEffect } from "react";
import { useProSidebar, Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { logout } from "../actions/auth";
import { Box, Grid, IconButton, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FolderIcon from "@mui/icons-material/Folder";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PageviewIcon from "@mui/icons-material/Pageview";
import Shop2Icon from "@mui/icons-material/Shop2";

function AuthLinks() {
  const dispatch = useDispatch();
  return (
    <MenuItem onClick={() => dispatch(logout())} icon={<LogoutIcon />}>
      Logout
    </MenuItem>
  );
}

function PublicLinks() {
  return (
    <MenuItem component={<Link to="/login" />} icon={<LoginIcon />}>
      Login
    </MenuItem>
  );
}

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      fontSize="10px"
      onClick={() => setSelected(title)}
      component={<Link to={to} />}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const isOwner = useSelector((state) => state.auth.isOwner);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { collapseSidebar } = useProSidebar();

  useEffect(() => {
    // Use media query to detect Android devices
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      setIsCollapsed(false); // Sidebar will remain open for Android devices
    } else {
      setIsCollapsed(true); // Sidebar will collapse for other devices
    }
  }, []);

  return (
    <Sidebar
      // className="fixed-sidebar"s
      defaultCollapsed={isCollapsed}
      style={{ height: "100%", top: "auto" }}
      breakPoint="md"
      // backgroundColor="white"
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            return {
              backgroundColor: active ? "white" : undefined,
            };
          },
        }}
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "column", // Corrected typo here
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box fontSize={"12px"} paddingTop={10} style={{ flex: 1 }}>
            {!isAuthenticated && (
              <Item
                icon={<HomeIcon />}
                title="Dashboard"
                to="/"
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isOwner && isAuthenticated && (
              <Item
                icon={<HomeIcon />}
                title="Dashboard"
                to="/owner/home"
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                icon={<HomeIcon />}
                title="Dashboard"
                to="/customer/home"
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {isOwner && isAuthenticated && (
              <Item
                title="Data Rumah Kos"
                to="/datakos"
                icon={<FolderIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Pencarian Rumah Kos"
                to="/listings"
                icon={<PageviewIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {!isAuthenticated && (
              <Item
                title="Pencarian Rumah Kos"
                to="/listings"
                icon={<PageviewIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Profile"
                to="/profileCustomer"
                // to="/profileCustomer"
                icon={<AccountBoxIcon />}
                selected={selected}
                setSelected={setSelected}
              >
                <Typography>Profile</Typography>
              </Item>
            )}
            {isOwner && isAuthenticated && (
              <Item
                title="Profile"
                to="/profileOwner"
                icon={<AccountBoxIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Riwayat Pemesanan"
                to="/riwayatTransaksi"
                icon={<Shop2Icon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </Box>

          <Box style={{ display: "flex", position: "relative" }}>
            {isAuthenticated ? <AuthLinks /> : <PublicLinks />}
          </Box>
        </Grid>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;
