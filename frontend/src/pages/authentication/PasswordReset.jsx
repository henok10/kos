import { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { reset_password, clearErrors, clearSuccess  } from "../../actions/auth";
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Alert } from '@mui/material';
import PropTypes from 'prop-types';
import {Validation2} from './validation';

const ResetPassword = ({reset_password, clearErrors, clearSuccess}) => {

  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [resetSuccess, setResetSuccess] = useState(false); // State for reset success message
  const [errors, setErrors] = useState({})
  const changeError = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang atau website direfresh
    clearErrors();
  }, []);

  useEffect(() => {
    // Dispatch aksi CLEAR_ERRORS saat komponen dimuat ulang atau website direfresh
    clearSuccess();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setErrors({});
    const validationErrors = Validation2({ formData });
    setErrors(validationErrors);
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(reset_password(id, token, password, password2));
        // Reset password success
        setResetSuccess(true); // Set reset success message
      } catch (err) {
        // Reset password error
        setResetSuccess(false); // Clear reset success message
      }
    }
    };
console.log(success)
  return (
    <Grid contained  width={'40%'} margin='auto' height='100%'>  
      <Typography variant='h5' marginTop={'2rem'} textAlign={'center'}>
            Reset Password Anda
      </Typography>
      
      <form onSubmit={onSubmit} style={{marginTop:'2rem'}}>
      {success && (
        <Alert severity="success" style={{ marginTop: '10px' }}>
          Password reset successful
        </Alert>
      )}
       {changeError && (
            <Typography variant="body1" color="error">
                {changeError}
            </Typography>
            )}
        <Grid item container marginTop={'1rem'}>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
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
        <Grid item container marginTop={'4px'}>
        {errors.password2 && <p style={{ color: 'red' }}>{errors.password2}</p>}
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
        <Grid style={{ marginTop: "4px", display: 'flex', justifyContent: 'center' }}>
            <Button 
                variant="contained" 
                color='primary' 
                style={{ marginTop: "1rem", display: 'flex', justifyContent: 'center' }}
                type='submit'>
                    Reset Password
            </Button>
        </Grid>
       
      </form>
    </Grid>
  );
};



ResetPassword.propTypes = {
  reset_password: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isCustomer: PropTypes.bool,
  isOwner: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isCustomer: state.auth.isCustomer,
  isOwner: state.auth.isOwner,
});


export default connect(mapStateToProps, { reset_password, clearErrors, clearSuccess })(ResetPassword);

