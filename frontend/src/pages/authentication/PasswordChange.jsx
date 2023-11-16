import React, { useState, useEffect } from "react";
import { Grid, TextField, Box,  Button, Alert, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch, useSelector, connect } from "react-redux";
import { clearErrors, clearSuccess } from "../../actions/auth";
import { change_user_password } from "../../actions/auth";
import { Validation2 } from "./validation";
import { useNavigate } from "react-router-dom";



const ChangePassword = ({
  change_user_password,
  clearErrors,
  clearSuccess,
}) => {

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang atau website direfresh
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang atau website direfresh
    clearSuccess();
  }, [clearSuccess]);

  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const dispatch = useDispatch();
  const [changeSuccess, setChangeSuccess] = useState(false); // State for reset success message
  const { password, password2 } = formData;
  const [errors, setErrors] = useState({});
  const changeError = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = Validation2({ formData });
    setErrors(validationErrors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(change_user_password(password, password2));
        // Reset password success
        setChangeSuccess(true); // Set reset success message
      } catch (err) {
        // Reset password error
        setChangeSuccess(false); // Clear reset success message
      }
    }
  };

  console.log(changeSuccess);
  console.log(success);
  return (
    <Grid contained width={"40%"} margin="4rem auto" height="100%">
      <Box width="100%"display="flex" justifyContent={"center"} flexDirection={"column"}>
      <Typography variant="h5" marginTop={"2rem"} textAlign={"center"}>
        Reset Password Anda
      </Typography>
      <Typography variant="body"  textAlign={"center"} color="primary">
        masukkan sandi baru dan konfirmasi
      </Typography>
      </Box>
    

      <form onSubmit={onSubmit} style={{ marginTop: "2rem" }}>
        {success && (
          <Alert severity="success" style={{ marginTop: "10px" }}>
            Password reset successful
          </Alert>
        )}
        {changeError && (
          <Typography variant="body1" color="error">
            {changeError}
          </Typography>
        )}
        <Grid item container marginTop={"1rem"}>
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <TextField
            id="password"
            label="Password"
            fullWidth
            name="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={onChange}
          />
        </Grid>
        <Grid item container marginTop={"0.5rem"}>
          {errors.password2 && (
            <p style={{ color: "red" }}>{errors.password2}</p>
          )}
          <TextField
            id="password2"
            label="Konfirmasi Password"
            fullWidth
            name="password2"
            variant="outlined"
            type="password"
            value={password2}
            onChange={onChange}
          />
        </Grid>
        <Grid
          style={{
            marginTop: "4px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
            type="submit"
          >
            Reset Password
          </Button>
        </Grid>
        <div></div>
      </form>
    </Grid>
  );
};
ChangePassword.propTypes = {
  change_user_password: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isCustomer: PropTypes.bool,
  isOwner: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCustomer: state.auth.isCustomer,
  isOwner: state.auth.isOwner,
});

export default connect(mapStateToProps, {
  change_user_password,
  clearErrors,
  clearSuccess,
})(ChangePassword);
