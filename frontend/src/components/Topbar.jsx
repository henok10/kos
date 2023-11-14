import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import {
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Box,
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import mikos from "../data/mikos.png";
import mikos1 from "../data/mikos.png";

function Topbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const username = useSelector((state) => state.auth.username);
  console.log(username)

  const authLinks = (
    <Box sx={{ m: "auto", display: "flex" }}>
      <div style={{ marginRight: "10px" }}>
        <Avatar alt="" src="/static/images/avatar/1.jpg" />
      </div>
      <div style={{}}>
        <span>{username}</span>
        <span>{email}</span>
      </div>
    </Box>
  );

  const publicLinks = (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
      {/* <Button color="inherit" component={Link} to="/login">
        Login
      </Button> */}
    </Box>
  );

  return (
    <Box backgroundColor="white">
      <AppBar color="default" elevation={4}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            style={{
              display: "flex",
              width: "100%",
              // padding: "5px",
            }}
          >
            <IconButton
              onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
            <div
              style={{
                display: "flex",
                position: "relative",
                width: "10rem",
                left: 10,
                top: 0,
                // justifyContent: "center",
                // margin: "auto",
                // alignItems: "center",
              }}
              color="inherit"
              onClick={() => navigate("/")}
            >
              <img style={{ width: "100%" }} src={mikos1} alt="" />
            </div>
            {/* <Button color="inherit" onClick={() => navigate("/syarat_ketentuan")}>
            Syarat dan Ketentuan
          </Button> */}
          </Box>
          {isAuthenticated ? authLinks : publicLinks}
          {/* </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topbar;
