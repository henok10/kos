import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Avatar,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import mikos from "../data/mikos.png";
import mikos1 from "../data/mikos.png";

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "none",
  },
}));

function Topbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.email);
  const username = useSelector((state) => state.auth.username);
  const classes = useStyles();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  console.log(username);

  const authLinks = (
    <Grid sx={{ m: "auto", display: "flex" }}>
      {isAuthenticated && (
        <>
          <div style={{ marginRight: "10px" }}>
            <Avatar />
          </div>
          <Grid style={{ margin: "auto 1px" }}>
            <span className={isLargeScreen ? "username" : classes.hidden}>
              {username}
            </span>
          </Grid>
        </>
      )}
    </Grid>
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
