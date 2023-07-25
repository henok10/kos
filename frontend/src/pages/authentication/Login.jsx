import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/auth';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

// MUI
import { Grid, Typography, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import {Validation} from './validation';

const useStyles = makeStyles({
  formContainer: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3rem',
    border: '5px solid lightWhite',
    padding: '3rem',
    height: '100%',
  },
  loginBtn: {
    marginTop: '1rem',
    backgroundColor: 'green',
    color: 'white',
    fontSize: '1.1rem',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
});

function Login({ login, isAuthenticated, isCustomer, isOwner, clearErrors }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const loginError = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang
    clearErrors();
  }, []);

  const loginChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const logins = {
        email,
        password
    }
    setErrors({});
    const validationErrors = Validation({ user: user });
    setErrors(validationErrors);

    if (Object.keys(errors).length === 0) {
      // Hanya melakukan login jika tidak ada kesalahan validasi
      clearErrors();
      login(logins);
    }
  };

  if (isAuthenticated && isCustomer) {
    return <Navigate to="/customer/home" />;
  } else if (isAuthenticated && isOwner) {
    return <Navigate to="/owner/home" />;
  } else {
// console.log(clearErrors())
    return (
      <div className={classes.formContainer}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <Grid item container justifyContent="center">
              <Typography variant="h4">SIGN IN</Typography>
            </Grid>
            {loginError && (
              <Typography variant="body1" color="error">
                {loginError}
              </Typography>
            )}
            <form onSubmit={handleLoginSubmit}>
              <Grid item container style={{ marginTop: '1rem' }}>
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                <TextField
                  id="email"
                  label="Email"
                  fullWidth
                  name="email"
                  variant="outlined"
                  value={user.email}
                  onChange={loginChange}
                />
              </Grid>
              <Grid item container style={{ marginTop: '1rem' }}>
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                <TextField
                  id="password"
                  label="Password"
                  fullWidth
                  name="password"
                  variant="outlined"
                  type="password"
                  value={user.password}
                  onChange={loginChange}
                />
              </Grid>
              <NavLink to="/sendpasswordresetemail">Forgot Password ?</NavLink>
              <Grid
                item
                container
                xs={8}
                style={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
              >
                <Button variant="contained" fullWidth type="submit">
                  SIGN IN
                </Button>
              </Grid>
            </form>

            <Grid item container justifyContent="center" style={{ marginTop: '1rem' }}>
              <Typography variant="small">
                Don't have an account yet?{' '}
                <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'green' }}>
                  SIGN UP
                </span>
              </Typography>
            </Grid>
          </div>
        </div>
      </div>
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
