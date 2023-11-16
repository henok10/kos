import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, clearErrors } from "../../actions/auth";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// MUI
import {
  Grid,
  Typography,
  Button,
  TextField,
  Container,
  Alert,
  Avatar,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Validation } from "./validation";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles({
  formContainer: {
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    border: "5px solid lightWhite",
    padding: "3rem",
    height: "100%",
  },
  loginBtn: {
    marginTop: "1rem",
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
});

function Login({ login, isAuthenticated, isCustomer, isOwner, clearErrors }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.auth.error);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [errors, setErrors] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang
    clearErrors();
  }, [clearErrors]);

  const loginChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const logins = {
      email,
      password,
    };
    setErrors({});
    const validationErrors = Validation({ user: user });
    setErrors(validationErrors);

    if (Object.keys(errors).length === 0) {
      // Hanya melakukan login jika tidak ada kesalahan validasi
      clearErrors();
      login(logins);
    } else {
      setOpenSnackbar(true); // Menampilkan Snackbar jika terdapat kesalahan
    }
  };

  if (isAuthenticated && isCustomer) {
    return <Navigate to="/customer/home" />;
  } else if (isAuthenticated && isOwner) {
    return <Navigate to="/owner/home" />;
  } else {
    // console.log(clearErrors())
    return (
      <Container
        maxWidth="xs"
        style={{ display: "flex", position: "relative", height: "100%" }}
      >
        {/* <Alert variant="outlined" severity="warning">
          This is a warning alert — check it out!
        </Alert> */}
        <Box
          style={{
            display: "flex",
            position: "absolute",
            top: 5,
            width: "80%",
            left: 70,
          }}
        >
          {loginError && (
            <Alert variant="outlined" severity="warning">
              <p>{loginError}</p>
            </Alert>
          )}
        </Box>

        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "5rem auto",
            width: "80%",
          }}
          onSubmit={handleLoginSubmit}
          component="form"
        >
          <Avatar sx={{ backgroundColor: "secondary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography style={{ marginBottom: "1rem" }} variant="h4">
            Sign In
          </Typography>

          {errors.email && (
            <p style={{ fontSize: "10px", color: "red", height: "5px", alignSelf: "self-start" }}>
              {errors.email}
            </p>
          )}
          <Grid
            item
            container
            style={{ display: "flex", marginBottom: "1rem", marginTop: "5px" }}
          >
            <TextField
              id="email"
              label="Email"
              size="small"
              fullWidth
              // required
              autoFocus
              type="email"
              name="email"
              variant="outlined"
              value={user.email}
              onChange={loginChange}
            />
          </Grid>
          {errors.password && (
            <p style={{ fontSize: "10px", color: "red", height: "5px", alignSelf: "self-start" }}>
              {errors.password}
            </p>
          )}
          <Grid
            item
            container
            style={{ display: "flex", position: "relative", marginTop: "5px" }}
          >
            <TextField
              id="password"
              label="Password"
              size="small"
              fullWidth
              // required
              autoFocus
              name="password"
              variant="outlined"
              type={isShowPassword ? "text" : "password"}
              value={user.password}
              onChange={loginChange}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                right: 15,
                top: 10,
                cursor: "pointer",
              }}
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </div>
          </Grid>
          <NavLink to="/sendpasswordresetemail">Forgot Password ?</NavLink>
          <Grid
            item
            xs={8}
            style={{
              // marginTop: "1rem",
              // marginLeft: "auto",
              // marginRight: "auto",
              width: "10rem",
              margin: "1rem auto 0",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={Object.keys(errors).length > 0}
            >
              SIGN IN
            </Button>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            style={{ marginTop: "1rem" }}
          >
            <Typography variant="small">
              Don't have an account yet?{" "}
              <span
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", color: "green" }}
              >
                SIGN UP
              </span>
            </Typography>
          </Grid>
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isCustomer: PropTypes.bool,
  isOwner: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCustomer: state.auth.isCustomer,
  isOwner: state.auth.isOwner,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
