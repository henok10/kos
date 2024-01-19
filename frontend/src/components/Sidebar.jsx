import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { logout } from "../actions/auth";
import { Box, Grid, Typography } from "@mui/material";
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
    <MenuItem component={<Link to="/login" />} icon={<LoginIcon style={{fill: "gray"}} />}>
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
  const [selected, setSelected] = useState("Dashboard");
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const isOwner = useSelector((state) => state.auth.isOwner);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      backgroundColor="white"
      breakPoint="md"
      zIndex={9999}
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
            flexDirection: "column", 
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box fontSize={"12px"} paddingTop={10} style={{ flex: 1 }}>
            {!isAuthenticated && (
              <Item
                icon={<HomeIcon style={{fill: "gray"}}/>}
                title="Dashboard"
                to="/"
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isOwner && isAuthenticated && (
              <Item
                icon={<HomeIcon style={{fill: "gray"}}/>}
                title="Dashboard"
                to="/owner/home"
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                icon={<HomeIcon  style={{fill: "gray"}}/>}
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
                icon={<FolderIcon  style={{fill: "gray"}}/>}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Pencarian Rumah Kos"
                to="/listings"
                icon={<PageviewIcon style={{fill: "gray"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {!isAuthenticated && (
              <Item
                title="Pencarian Rumah Kos"
                to="/listings"
                icon={<PageviewIcon style={{fill: "gray"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Profile"
                to="/profileCustomer"
                icon={<AccountBoxIcon style={{fill: "gray"}} />}
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
                icon={<AccountBoxIcon style={{fill: "gray"}} />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {isCustomer && isAuthenticated && (
              <Item
                title="Riwayat Pemesanan"
                to="/riwayatTransaksi"
                icon={<Shop2Icon style={{fill: "gray"}} />}
                fill="gray"
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
