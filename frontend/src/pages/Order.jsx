import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useImmerReducer } from "use-immer";
import Swal from "sweetalert2";
// MUI
import {
  Grid,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  formContainer: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    border: "5px solid lightWhite",
    padding: "1rem",
  }
});
function Order() {
  const classes = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const userId = useSelector((state) => state.auth.userId);
  const customerId = useSelector((state) => state.auth.customerId);
  const isOwner = useSelector((state) => state.auth.isOwner);
  const params = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isCustomer) {
      navigate("/login");
    }
  }, [isCustomer, navigate]);

  useEffect(() => {
    if (isOwner) {
      navigate("/owner/home");
    }
  }, [isOwner, navigate]);

  const initialState = {
    fullNameValue: "",
    phoneNumberValue: "",
    noRekeningValue: "",
    buktiTransferValue: "",
    nominalValue: "",
    uploadedPicture: [],
    openSnack: false,
  };
  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);
  // Use effect to cath uplaoded picture

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchUserOrderInfo":
        draft[action.name] = action.value;
        break;

      case "catchOrderInfo":
        draft.buktiTransferValue = action.profileOrder.buktiTransfer;
        break;
      case "catchUploadedPicture":
        draft.uploadedPicture = action.pictureChosen;
        break;

      case "catchProfilePictureChange":
        draft.buktiTransferValue = action.buktiTransferChosen;
        break;

      case "catchUserProfileInfo":
        draft.userProfile.fullName = action.profileObject.full_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.noRekeningValue = action.profileObject.no_rekening

        break;

      case "openTheSnack":
        draft.openSnack = true;
        break;

      case "sendRequest":
        draft.sendRequest = true;
        break;
      case "requestSent":
        draft.sendRequest = false;
        break;
      default:
        return draft;
    }
  }

  useEffect(() => {
    if (state.uploadedPicture[0]) {
      dispatch({
        type: "catchProfilePictureChange",
        buktiTransferChosen: state.uploadedPicture[0],
      });
    }
  }, [state.uploadedPicture, dispatch]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch({ type: "catchUserOrderInfo", name, value });
    },
    [dispatch]
  );
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      dispatch({ type: "sendRequest" });

      const formData = new FormData();
      formData.append("fullName", state.fullNameValue);
      formData.append("phoneNumber", state.phoneNumberValue);
      formData.append("rentalFrequency", state.rentalFrequencyValue);
      formData.append("nominal", state.nominalValue);
      formData.append("buktiTransfer", state.buktiTransferValue);
      formData.append("kamar", params.id);
      formData.append("customer", customerId);
      formData.append("user", userId);
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to order this room?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, ordered it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await Axios.post(
              `https://mikos03.onrender.com/api/transaction/create`,
              formData
            );
            await updateKamar(params.id, true);
            Swal.fire(
              'Ordered!',
              'Your ordered has been success.',
              'success'
            )
            dispatch({ type: "openTheSnack" });
          } catch (error) {
            console.error(error);
            dispatch({ type: "requestSent" });
          }
        }
      });
    },
    [
      dispatch,
      state.fullNameValue,
      state.phoneNumberValue,
      state.nominalValue,
      state.buktiTransferValue,
      state.rentalFrequencyValue,
      params.id,
      customerId,
      userId,
    ]
  );

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/profiles/customer/${userId}/`
        );

        dispatch({
          type: "catchUserOrderInfo",
          name: "fullNameValue",
          value: response.data.full_name,
        });

        dispatch({
          type: "catchUserOrderInfo",
          name: "phoneNumberValue",
          value: response.data.phone_number,
        });
      } catch (e) {}
    }
    GetProfileInfo();
  }, [userId, dispatch]);

  useEffect(() => {
    async function GetRumahInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/listings/${params.rumah}/`
        );

        dispatch({
          type: "catchUserOrderInfo",
          name: "noRekeningValue",
          value: response.data.no_rekening
          ,
        });
      } catch (e) {}
    }
    GetRumahInfo();
  }, [params.rumah, dispatch]);

  async function updateKamar(id, newValue) {
    try {
      await Axios.patch(`https://mikos03.onrender.com/api/kamar/${id}/update/`, {
        barang_dipesan: newValue,
      });
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function SubmitButtonDisplay() {
    if (
      isAuthenticated &&
      state.fullNameValue !== null &&
      state.fullNameValue !== "" &&
      state.phoneNumberValue !== null &&
      state.phoneNumberValue !== ""
    ) {
      return (
        <Button
          variant="contained"
          fullWidth
          type="submit"
          className={classes.loginBtn}
          disabled={state.disabledBtn}
        >
          SUBMIT
        </Button>
      );
    } else if (
      isAuthenticated &&
      (state.fullNameValue === null ||
        state.fullNameValue === "" ||
        state.phoneNumberValue === null ||
        state.phoneNumberValue === "")
    ) {
      return (
        <Button
          variant="outlined"
          fullWidth
          className={classes.loginBtn}
          onClick={() => navigate("/profileCustomer")}
        >
          COMPLETE YOUR PROFILE TO ORDER KAMAR
        </Button>
      );
    } else if (!isAuthenticated) {
      return (
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/login")}
          className={classes.loginBtn}
        >
          SIGN IN TO ADD A PROPERTY
        </Button>
      );
    }
  }


  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(`/riwayatTransaksi`);
      }, 1500);
    }
  }, [state.openSnack, navigate]);
  return (
    <>
      <Box width="40%" margin="auto" border="4px solid white" marginTop='20px'>
        <Box
          height="40px"
          backgroundColor="#1E90FF"
          justifyContent='center'
          alignItems="center"
          display="flex"
        >
          <Typography style={{ marginLeft: "10px", color: 'white' }}>
            Pesan Kamar Kos Sekarang
          </Typography>
        </Box>
        <Box height="550px" backgroundColor="#F8F8FF">
          <div className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
              <Grid item container style={{ marginTop: "1rem" }}>
                <TextField
                  id="username"
                  label="Nama Penyewa"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={state.fullNameValue}
                  onChange={handleChange}
                  name="fullNameValue"
                />
              </Grid>
              <Grid item container style={{ marginTop: "1rem" }}>
                <TextField
                  id="username"
                  label="No. Telp"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={state.phoneNumberValue}
                  onChange={handleChange}
                  name="phoneNumberValue"
                />
              </Grid>
              <Grid item container style={{ marginTop: "1rem" }}>
                <TextField
                  id="no_rekening"
                  label="No. Rekening Tujuan"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={state.noRekeningValue}
                  onChange={handleChange}
                  name="noRekeningValue"
                />
              </Grid>
              <Grid margin="auto" marginTop="1rem">
                <TextField
                  id="number"
                  label="Durasi Penyewaan"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={state.rentalFrequencyValue}
                  onChange={handleChange}
                  name="rentalFrequencyValue"
                  select
                >
                  <MenuItem value="Year">Year</MenuItem>
                  <MenuItem value="Month">Month</MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                </TextField>
              </Grid>
              <Grid item container style={{ marginTop: "1rem" }}>
                <TextField
                  id="nominal pembayaran"
                  label="Jumlah Pembayaran"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={state.nominalValue}
                  onChange={handleChange}
                  name="nominalValue"
                />
              </Grid>
              <Grid
                item
                container
                xs={6}
                style={{
                  marginTop: "1rem"
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  style={{ textAlign: "center" }}
                >
                 upload struk
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    hidden
                    onChange={(e) =>
                      dispatch({
                        type: "catchUploadedPicture",
                        pictureChosen: e.target.files,
                      })
                    }
                  />
                </Button>
                <Typography style={{ marginTop: "1rem" }}>
                  {state.buktiTransferValue ? (
                    <p>{state.buktiTransferValue.name}</p>
                  ) : (
                    ""
                  )}
                </Typography>
              </Grid>

              <Grid
                style={{ marginTop: "1rem" }}
              >
                {SubmitButtonDisplay()}
              </Grid>
              <Grid
                item
                container
                style={{ marginTop: "1rem" }}
              >
                <Typography variant="small">
                  Sudah memesan?{" "}
                  <span
                    onClick={() => navigate(`/riwayatTransaksi`)}
                    style={{ color: "#2F80ED", cursor: "pointer" }}
                  >
                    Lihat transaksi kamu disini
                  </span>
                </Typography>
              </Grid>
            </form>
            <Snackbar
              open={state.openSnack}
              message="You have successfully Order Rumah Kos!"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}

export default Order;
