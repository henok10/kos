import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

function Topbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authLinks = (
    <Box sx={{ m: "auto" }}>
      <Button color="inherit" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </Box>
  );

  const publicLinks = (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </Box>
  );

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "85%",
          }}
        >
          <Button color="inherit" onClick={() => navigate("/")}>
            <Typography variant="h5">Kos Saya</Typography>
          </Button>
          <Button color="inherit" onClick={() => navigate("/syarat_ketentuan")}>
            Syarat dan Ketentuan
          </Button>
        </Box>
        <Box style={{ backgroundColor: "red" }} />
        {isAuthenticated ? authLinks : publicLinks}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
