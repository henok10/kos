import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  CUSTOMER_USER_LOADED,
  CUSTOMER_USER_FAILED,
  OWNER_USER_LOADED,
  OWNER_USER_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_CUSER_SUCCESS,
  REGISTER_FUSER_FAILED,
  REGISTER_FUSER_SUCCESS,
  REGISTER_CUSER_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from "../actions/types";
import Swal from "sweetalert2";

function getTokenExpirationDate(token) {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.exp) return null;
  const expirationDate = new Date(0);
  expirationDate.setUTCSeconds(decodedToken.exp);
  return expirationDate;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate && expirationDate < new Date();
}

export const getCustomerUser = () => (dispatch, getState) => {
  const access_token = getState().auth.access_token;
  const isCustomer = getState().auth.isCustomer;

  const config = {
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };

  if (access_token && isCustomer) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  axios
    .get("https://mikos03.onrender.com/api/customer/dashboard", config)
    .then((res) => {
      dispatch({
        type: CUSTOMER_USER_LOADED,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: CUSTOMER_USER_FAILED,
      });
    });
};

// check token and load freelance user
export const getOwnerUser = () => (dispatch, getState) => {
  const access_token = getState().auth.access_token;
  const isOwner = getState().auth.isOwner;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (access_token && isOwner) {
    config.headers["Authorization"] = `Bearer ${access_token}`;
  }

  axios
    .get("https://mikos03.onrender.com/api/owner/dashboard", config)
    .then((res) => {
      dispatch({
        type: OWNER_USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: OWNER_USER_FAILED,
      });
    });
};

// actions/auth.js

export const create_customeruser =
  ({ username, email, password, password2, tc }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password, password2, tc });

    // Return the axios promise
    return axios
      .post("https://mikos03.onrender.com/api/signup/customer/", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_CUSER_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          title: "Successful!",
          text: "You have successfully created a customer account.",
          icon: "success",
        });
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.email) {
          // The server sent an error message for the email field
          dispatch({
            type: REGISTER_CUSER_FAILED,
            payload: err.response.data.email[0],
          });
        } else {
          dispatch({
            type: REGISTER_CUSER_FAILED,
            payload: "An error occurred during signup: " + err.message,
          });
          Swal.fire({
            title: "Error",
            text: "An error occurred while processing your account.",
            icon: "error",
          });
        }
      });
  };

export const create_owneruser =
  ({ username, email, password, password2, tc }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password, password2, tc });

    axios
      .post("https://mikos03.onrender.com/api/signup/owner/", body, config)
      .then((res) => {
        dispatch({
          type: REGISTER_FUSER_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          title: "Successful!",
          text: "You have successfully created a owner account.",
          icon: "success",
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FUSER_FAILED,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.email) {
          // The server sent an error message for the email field
          dispatch({
            type: REGISTER_FUSER_FAILED,
            payload: err.response.data.email[0],
          });
        } else {
          dispatch({
            type: REGISTER_FUSER_FAILED,
            payload: "An error occurred during signup: " + err.message,
          });
        }
      });
  };

export const login =
  ({ email, password }) =>
  (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    axios
      .post("https://mikos03.onrender.com/api/login/", body, config)
      .then((response) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
        Swal.fire({
          title: "Login",
          text: "you have successfully logged in.",
          icon: "success",
        });
        // dispatch(getCustomerUser());
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.email) {
          // The server sent an error message for the email field
          dispatch({
            type: LOGIN_FAILED,
            payload: err.response.data.email[0],
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
            payload: err.response?.data?.non_field_errors[0],
          });
        }
      });
  };

// Fungsi logout yang akan dijalankan saat token kedaluwarsa atau pengguna logout manual
export const logout = () => async (dispatch, getState) => {
  // Cek apakah token sudah kedaluwarsa
  const access_token = getState().auth.access_token;

  if (access_token && isTokenExpired(access_token)) {
    // Token sudah kedaluwarsa, lakukan logout
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } else {
    const confirmUpdate = await Swal.fire({
      title: "Do you want to Logout??",
      showCancelButton: true,
      confirmButtonText: "Logout",
    });

    if (confirmUpdate.isConfirmed) {
      try {
        dispatch({
          type: LOGOUT_SUCCESS,
        });

        Swal.fire({
          title: "Logout!",
          text: "you have successfully logged out.",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Logout!",
          text: "terjadi kesalahan saat logged out.",
          icon: "warning",
        });
      }
    }
  }
};

export const sendPasswordResetEmail = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `https://mikos03.onrender.com/api/send-reset-password-email/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

export const change_user_password =
  (password, password2) => async (dispatch, getState) => {
    const access_token = getState().auth.access_token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${access_token}`,
      },
    };

    const body = JSON.stringify({ password, password2 });

    try {
      await axios.post(
        `https://mikos03.onrender.com/api/changepassword/`,
        body,
        config
      );
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        payload: "Password changed successfully!",
      });
      Swal.fire({
        title: "Successful!",
        text: "you have successfully changed your password.",
        icon: "success",
      });
    } catch (err) {
      // Handle errors and dispatch appropriate actions

      if (err.response && err.response.data && err.response.data.password) {
        // The server sent an error message for the email field
        dispatch({
          type: PASSWORD_CHANGE_FAIL,
          payload: err.response.data.password[0],
        });
      } else {
        // If there are other errors, check for 'non_field_errors'
        dispatch({
          type: PASSWORD_CHANGE_FAIL,
          payload:
            err.response?.data?.non_field_errors[0] ||
            "An error occurred while changing the password.",
        });
      }

      // Re-throw the error for the error case
      throw err;
    }
  };

export const reset_password =
  (id, token, password, password2) => async (dispatch) => {
    // const { access } = getState().auth.token;
    // const userId = getState().auth.userId;

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${access}`
      },
    };

    const body = JSON.stringify({ id, token, password, password2 });

    try {
      await axios.post(
        `https://mikos03.onrender.com/api/reset-password/${id}/${token}/`,
        body,
        config
      );

      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        payload: "Password changed successfully!",
      });
    } catch (err) {
      // Handle errors and dispatch appropriate actions

      if (err.response && err.response.data && err.response.data.password) {
        // The server sent an error message for the email field
        dispatch({
          type: PASSWORD_RESET_CONFIRM_FAIL,
          payload: err.response.data.password[0],
        });
      } else {
        // If there are other errors, check for 'non_field_errors'
        dispatch({
          type: PASSWORD_RESET_CONFIRM_FAIL,
          payload:
            err.response?.data?.non_field_errors[0] ||
            "An error occurred while changing the password.",
        });
      }

      // Re-throw the error for the error case
      throw err;
    }
  };

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS,
  };
};
