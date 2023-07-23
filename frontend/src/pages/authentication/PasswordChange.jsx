import React, { useState } from 'react';
import { Grid, TextField, Button, Alert, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { change_user_password } from '../../actions/auth';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [changeSuccess, setChangeSuccess] = useState(false); // State for reset success message
  const error = useSelector((state) => state.auth.error); // Get the error state from Redux store
  const { password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(change_user_password(password, password2));
      // Reset password success
      setChangeSuccess(true); // Set reset success message
    } catch (err) {
      // Reset password error
      setChangeSuccess(false); // Clear reset success message
    }
  };

  console.log(error)
  return (
    <Grid contained width={'40%'} margin='auto' height='100%'>
      <Typography variant='h5' marginTop={'2rem'} textAlign={'center'}>
        Reset Password Anda
      </Typography>
     
      <form onSubmit={onSubmit} style={{ marginTop: '2rem' }}>
      {changeSuccess && (
        <Alert severity="success" style={{ marginTop: '10px' }}>
          Password reset successful
        </Alert>
      )}
      {error && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          {error}
        </Alert>
      )}
        <Grid item container marginTop={'1rem'}>
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
        <Grid item container marginTop={'0.5rem'}>
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
        <Grid style={{ marginTop: '4px', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color='primary'
            style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
            type='submit'>
            Reset Password
          </Button>
        </Grid>
        <div></div>
      </form>
    </Grid>
  );
};

export default ChangePassword;
