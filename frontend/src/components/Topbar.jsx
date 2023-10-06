import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import mikos from "../data/mikos.png";
import mikos1 from "../data/mikos.png";

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
    <AppBar position="static" color="transparent" elevation={4}>
      <Toolbar
        style={{ display: "flex", left: 0, justifyContent: "space-between" }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "5px"
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: "10rem",
              left: 0,
              top: 0,
              alignItems: "center",
            }}
            color="inherit"
            onClick={() => navigate("/")}
          >
            <img style={{ width: "100%"}} src={mikos1} alt="" />
          </div>
          {/* <Button color="inherit" onClick={() => navigate("/syarat_ketentuan")}>
            Syarat dan Ketentuan
          </Button> */}
        </Box>
        {isAuthenticated ? authLinks : publicLinks}
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
