import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { create_owneruser } from "../../actions/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/auth";
import { Validation } from "./validation";
// MUI
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const OwnerSignup = ({ create_owneruser, isAuthenticated, isOwner }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const regisError = useSelector((state) => state.auth.error);
  const [owner, setOwner] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    tc: "false",
  });

  const handleChange = (e) =>
    setOwner({
      ...owner,
      [e.target.name]: e.target.value,
    });

  const { username, email, password, password2, tc } = owner;
  const handleSubmit = (e) => {
    e.preventDefault();
    //implement the register logic
    const newOwner = {
      username,
      email,
      password,
      password2,
      tc,
    };
    const validationErrors = Validation({ user: newOwner });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(clearErrors());
      create_owneruser(newOwner);
    }
  };
  if (isAuthenticated && isOwner) {
    return <Navigate to="/owner/home" />;
  }
  return (
    <div className="container" style={{ marginTop: "5rem", width: "50%", height: "100%"}}>
      <Grid item container justifyContent="center">
        <Typography variant="h5" style={{fontWeight: "bold"}}>SIGNUP AS A PEMILIK KOS</Typography>
      </Grid>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid item container style={{ marginTop: "2rem" }}>
              {regisError && (
                <Typography variant="body1" color="error">
                  {regisError}
                </Typography>
              )}
              {errors.username && (
                <p style={{fontSize: "10px", color: "red" }}>{errors.username}</p>
              )}
              <TextField
                id="username"
                label="Username"
                name="username"
                variant="outlined"
                size="small"
                fullWidth
                value={username}
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item container style={{ marginTop: "1rem" }}>
              {errors.email && <p style={{  fontSize: "10px", color: "red" }}>{errors.email}</p>}
              <TextField
                id="email"
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item container style={{ marginTop: "1rem" }}>
              {errors.password && (
                <p style={{fontSize: "10px", color: "red" }}>{errors.password}</p>
              )}
              <TextField
                id="password"
                label="Password"
                name="password"
                variant="outlined"
                size="small"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item container style={{ marginTop: "1rem" }}>
              {errors.password2 && (
                <p style={{fontSize: "10px", color: "red" }}>{errors.password2}</p>
              )}
              <TextField
                id="password2"
                label="Confirm password"
                name="password2"
                variant="outlined"
                size="small"
                fullWidth
                type="password"
                value={password2}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  value={true}
                  color="primary"
                  name="tc"
                  id="tc"
                  onChange={(e) => handleChange(e)}
                />
              }
              // value={tc}
              label="I agree to term and condition."
            />
            {errors.tc && <p style={{fontSize: "10px", color: "red" }}>{errors.tc}</p>}
            {/* <button type="submit" className="btn btn-primary">Signup</button> */}
            <Grid
              item
              container
              xs={8}
              style={{
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                className="btn btn-primary"
                fullWidth
                type="submit"
                // className={classes.loginBtn}
                disabled={Object.keys(errors).length > 0} // Menonaktifkan tombol jika ada kesalahan
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
                have an account yet?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  SIGN UP
                </span>
              </Typography>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
};
OwnerSignup.propTypes = {
  create_owneruser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isOwner: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isOwner: state.auth.isOwner,
});

export default connect(mapStateToProps, { create_owneruser })(OwnerSignup);
