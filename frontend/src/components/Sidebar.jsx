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

function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    // Gunakan media query untuk mendeteksi perangkat Android
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      setIsCollapsed(false); // Sidebar akan tetap terbuka untuk perangkat Android
    } else {
      setIsCollapsed(true); // Sidebar akan terlipat untuk perangkat lainnya
    }
  }, []);

  return (
    <Sidebar
      defaultCollapsed={isCollapsed}
      style={{
        top: 60, // Adjust the top position as needed
        height: "100vh",
        backgroundColor: "white",
      }}
      breakPoint="md"
      // backgroundColor="white"
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              backgroundColor: active ? "white" : undefined,
            };
          },
        }}
      >
        <Grid
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box fontSize={"12px"} justifyContent={"center"} paddingTop={5}>
            <MenuItem
              // title="Dashboard"
              fontSize="10px"
              // to="/"
              component={<Link to="/" />}
              icon={<HomeIcon />}
              // selected={selected}
              // setSelected={setSelected}
            >
              <Typography>Dashboard</Typography>
            </MenuItem>

            {!isCustomer && isAuthenticated && (
              <MenuItem
                active={window.location.pathname === "/datakos"}
                component={<Link to="/datakos" />}
                icon={<FolderIcon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Data Rumah Kos</Typography>
              </MenuItem>
            )}
            {isCustomer && isAuthenticated && (
              <MenuItem
                // title="Pencarian Rumah Kos"
                active={window.location.pathname === "/listings"}
                component={<Link to="/listings" />}
                icon={<PageviewIcon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Pencarian Rumah Kos</Typography>
              </MenuItem>
            )}
            {!isAuthenticated && (
              <MenuItem
                // title="Pencarian Rumah Kos"
                active={window.location.pathname === "/listings"}
                component={<Link to="/listings" />}
                icon={<PageviewIcon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Pencarian Rumah Kos</Typography>
              </MenuItem>
            )}
            {isCustomer && isAuthenticated && (
              <MenuItem
                // title="Profile"
                active={window.location.pathname === "/profileCustomer"}
                component={<Link to="/profileCustomer" />}
                // to="/profileCustomer"
                icon={<AccountBoxIcon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Profile</Typography>
              </MenuItem>
            )}
            {!isCustomer && isAuthenticated && (
              <MenuItem
                // title="Profile"
                active={window.location.pathname === "/profileOwner"}
                component={<Link to="/profileOwner" />}
                icon={<AccountBoxIcon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Profile</Typography>
              </MenuItem>
            )}
            {isCustomer && isAuthenticated && (
              <MenuItem
                // title="Riwayat Pemesanan"
                active={window.location.pathname === "/riwayatTransaksi"}
                component={<Link to="/riwayatTransaksi" />}
                icon={<Shop2Icon />}
                // selected={selected}
                // setSelected={setSelected}
              >
                <Typography>Riwayat Pemesanan</Typography>
              </MenuItem>
            )}
          </Box>

          <Box style={{ display: "flex", position: "relative", top: 250 }}>
            {isAuthenticated ? <AuthLinks /> : <PublicLinks />}
          </Box>
        </Grid>
      </Menu>
    </Sidebar>
  );
}

export default SidebarNav;
