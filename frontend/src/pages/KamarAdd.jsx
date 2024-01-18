import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { choices } from "../components/Choice";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Typography, Button, TextField, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  formContainer: {
    width: "75%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3rem",
    padding: "3rem",
  },

  registerBtn: {
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "primary",
    },
  },
});
function KamarAdd() {
  const { choice_kamar } = choices();
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOwner = useSelector((state) => state.auth.isOwner);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  const initialState = {
    addressRoomValue: "",
    priceDayValue: "",
    priceMonthValue: "",
    priceYearValue: "",
    roomSizeValue: "",
    facilities: [],
    newFacility: "",
    rules: [],
    newRule: "",
    pictureRoomValue: [],
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    addressRoomErrors: {
      hasErrors: false,
      errorMessage: "",
    },

    priceMonthErrors: {
      hasErrors: false,
      errorMessage: "",
    },

    priceDayErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    priceYearErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    roomSizeErrors: {
      hasErrors: false,
      errorMessage: "",
    },
  };

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchAddressRoomChange":
        draft.addressRoomValue = action.addressRoomChosen;
        draft.addressRoomErrors.hasErrors = false;
        draft.addressRoomErrors.errorMessage = "";
        break;

      case "catchPriceDayChange":
        draft.priceDayValue = action.priceDayChosen;
        draft.priceDayErrors.hasErrors = false;
        draft.priceDayErrors.errorMessage = "";
        break;

      case "catchPriceMonthChange":
        draft.priceMonthValue = action.priceMonthChosen;
        draft.priceMonthErrors.hasErrors = false;
        draft.priceMonthErrors.errorMessage = "";
        break;

      case "catchPriceYearChange":
        draft.priceYearValue = action.priceYearChosen;
        draft.priceYearErrors.hasErrors = false;
        draft.priceYearErrors.errorMessage = "";
        break;

      case "catchRoomSizeChange":
        draft.roomSizeValue = action.roomSizeChosen;
        draft.roomSizeErrors.hasErrors = false;
        draft.roomSizeErrors.errorMessage = "";
        break;

      case "catchUploadedPicture":
        draft.pictureRoomValue = action.pictureRoomChosen;
        break;

      case "catchNewFacility":
        draft.newFacility = action.newFacilityChosen;
        break;

      case "catchNewRule":
        draft.newRule = action.newRuleChosen;
        break;

      case "addFacility":
        if (action.newFacilityChosen.trim()) {
          draft.facilities.push(action.newFacilityChosen.trim());
          draft.newFacility = "";
        }
        break;

      case "addRule":
        if (action.newRuleChosen.trim()) {
          draft.rules.push(action.newRuleChosen.trim());
          draft.newRule = "";
        }
        break;

      case "removeFacility":
        draft.facilities.splice(action.indexToRemove, 1);
        break;
      case "removeRule":
        draft.rules.splice(action.indexToRemove, 1);
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      case "openTheSnack":
        draft.openSnack = true;
        break;

      case "disableTheButton":
        draft.disabledBtn = true;
        break;

      case "allowTheButton":
        draft.disabledBtn = false;
        break;

      case "catchAddressRoomErrors":
        if (action.addressRoomChosen.length === 0) {
          draft.addressRoomErrors.hasErrors = true;
          draft.addressRoomErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchPriceDayErrors":
        if (action.priceDayChosen.length === 0) {
          draft.priceDayErrors.hasErrors = true;
          draft.priceDayErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchPriceMonthErrors":
        if (action.priceMonthChosen.length === 0) {
          draft.priceMonthErrors.hasErrors = true;
          draft.priceMonthErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchPriceYearErrors":
        if (action.priceYearChosen.length === 0) {
          draft.priceYearErrors.hasErrors = true;
          draft.priceYearErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchRoomSizeErrors":
        if (action.roomSizeChosen.length === 0) {
          draft.roomSizeErrors.hasErrors = true;
          draft.roomSizeErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "emptyAddressRoom":
        draft.addressRoomErrors.hasErrors = true;
        draft.addressRoomErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyPriceDay":
        draft.priceDayErrors.hasErrors = true;
        draft.priceDayErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyPriceMonth":
        draft.priceMonthErrors.hasErrors = true;
        draft.priceMonthErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyRoomSize":
        draft.roomSizeErrors.hasErrors = true;
        draft.roomSizeErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyPriceYear":
        draft.priceYearErrors.hasErrors = true;
        draft.priceYearErrors.errorMessage = "This field must not be empty";
        break;

      default:
        break;
    }
  }

  function handleFacilityChange(event) {
    dispatch({
      type: "catchNewFacility",
      newFacilityChosen: event.target.value,
    });
  }

  const handleAddFacility = () => {
    if (state.newFacility && state.newFacility.trim()) {
      dispatch({ type: "addFacility", newFacilityChosen: state.newFacility });
      dispatch({ type: "catchNewFacility", newFacilityChosen: "" });
    }
  };

  function handleRemoveFacility(indexToRemove) {
    dispatch({
      type: "removeFacility",
      indexToRemove,
    });
  }

  function FormSubmit(e) {
    e.preventDefault();

    if (
      !state.addressRoomErrors.hasErrors &&
      !state.priceDayErrors.hasErrors &&
      !state.priceMonthErrors.hasErrors &&
      !state.roomSizeErrors.hasErrors &&
      !state.priceYearErrors.hasErrors &&
      state.facilities.length > 0
    ) {
      dispatch({ type: "changeSendRequest" });
      dispatch({ type: "disableTheButton" });
    } else if (state.addressRoomValue === "") {
      dispatch({ type: "emptyAddressRoom" });
      window.scrollTo(0, 0);
    } else if (state.priceDayValue === "") {
      dispatch({ type: "emptyPriceDay" });
      window.scrollTo(0, 0);
    } else if (state.roomSizeValue === "") {
      dispatch({ type: "emptyNo_Rekening" });
      window.scrollTo(0, 0);
    } else if (state.priceMonthValue === "") {
      dispatch({ type: "emptyPriceMonth" });
      window.scrollTo(0, 0);
    } else if (state.priceYearValue === "") {
      dispatch({ type: "emptyPriceYear" });
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData();
        formData.append("address_room", state.addressRoomValue);
        formData.append("price_day", state.priceDayValue);
        formData.append("price_month", state.priceMonthValue);
        formData.append("price_year", state.priceYearValue);
        formData.append("picture_room", state.pictureRoomValue);
        formData.append("room_size", state.roomSizeValue);
        formData.append("rumah", params.id);
        const facilitiesArray = state.facilities.map((facility) => ({
          name: facility,
        }));

        Swal.fire({
          title: "Are you sure?",
          text: "Are you sure you want to add this Kamar?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const kamarResponse = await Axios.post(
                "https://mikos03.onrender.com/api/kamar/create",
                formData
              );
              const kamarId = kamarResponse.data.id;

              for (const facility of facilitiesArray) {
                await Axios.post(
                  "https://mikos03.onrender.com/api/fasilitas-kamar/create",
                  {
                    kamar: kamarId,
                    name: facility.name,
                  }
                );
              }
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Kamar telah berhasil disimpan",
                showConfirmButton: false,
                timer: 2500,
              });

              dispatch({ type: "openTheSnack" });
            } catch (e) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Terjadi kesalahan saat menyimpan Kamar",
                showConfirmButton: false,
                timer: 2500,
              });
              dispatch({ type: "allowTheButton" });
            }
          }
        });
      }
      AddProperty();
    }
  }, [
    state.sendRequest,
    dispatch,
    params.id,
    state.addressRoomValue,
    state.facilities,
    state.pictureRoomValue,
    state.priceDayValue,
    state.priceMonthValue,
    state.priceYearValue,
    state.roomSizeValue,
  ]);

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate(`/data-kamar/${params.id}`);
      }, 1500);
    }
  }, [state.openSnack, navigate, params.id]);
  return (
    <div className={classes.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h4">Tambahkan Kamar Kos</Typography>
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="address_room"
            label="Alamat Kamar*"
            variant="standard"
            fullWidth
            value={state.addressRoomValue}
            onChange={(e) =>
              dispatch({
                type: "catchAddressRoomChange",
                addressRoomChosen: e.target.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "catchAddressRoomErrors",
                addressRoomChosen: e.target.value,
              })
            }
            error={state.addressRoomErrors.hasErrors ? true : false}
            helperText={state.addressRoomErrors.errorMessage}
          />
        </Grid>

        <Grid item container justifyContent="space-between">
          <Grid item xs={3} style={{ marginTop: "1rem" }}>
            <TextField
              id="price_day"
              type="number"
              label="Harga per Hari*"
              variant="standard"
              fullWidth
              value={state.priceDayValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPriceDayChange",
                  priceDayChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchPriceDayErrors",
                  priceDayChosen: e.target.value,
                })
              }
              error={state.priceDayErrors.hasErrors ? true : false}
              helperText={state.priceDayErrors.errorMessage}
            />
          </Grid>
          <Grid item xs={3} style={{ marginTop: "1rem" }}>
            <TextField
              id="price_month"
              type="number"
              label="Harga per Bulan"
              variant="standard"
              fullWidth
              value={state.priceMonthValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPriceMonthChange",
                  priceMonthChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchPriceMonthErrors",
                  priceMonthChosen: e.target.value,
                })
              }
              error={state.priceMonthErrors.hasErrors ? true : false}
              helperText={state.priceMonthErrors.errorMessage}
            />
          </Grid>

          <Grid item xs={3} style={{ marginTop: "1rem" }}>
            <TextField
              id="price_year"
              label="Harga per Tahun*"
              variant="standard"
              fullWidth
              value={state.priceYearValue}
              onChange={(e) =>
                dispatch({
                  type: "catchPriceYearChange",
                  priceYearChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchPriceYearErrors",
                  priceYearChosen: e.target.value,
                })
              }
              error={state.priceYearErrors.hasErrors ? true : false}
              helperText={state.priceYearErrors.errorMessage}
            />
          </Grid>
        </Grid>

        <Grid item container xs={3} style={{ marginTop: "1rem" }}>
          <TextField
            id="room_size"
            label="Ukuran Kamar"
            variant="standard"
            fullWidth
            value={state.roomSizeValue}
            onChange={(e) =>
              dispatch({
                type: "catchRoomSizeChange",
                roomSizeChosen: e.target.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "catchRoomSizeErrors",
                roomSizeChosen: e.target.value,
              })
            }
            error={state.roomSizeErrors.hasErrors ? true : false}
            helperText={state.roomSizeErrors.errorMessage}
          />
        </Grid>
        <Grid item container xs={12} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TextField
              id="newFacility"
              label="Fasilitas Baru"
              variant="standard"
              fullWidth
              value={state.newFacility}
              onChange={handleFacilityChange}
              select
              SelectProps={{
                native: true,
              }}
            >
              {choice_kamar.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFacility}
              style={{ marginTop: "5px", width: "7rem" }}
              disabled={!state.newFacility.trim()}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid item container>
              {state.facilities.map((facility, index) => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                  <Grid
                    item
                    xs={6}
                    justifyContent="space-between"
                    width="15rem"
                  >
                    <Typography>
                      {facility}{" "}
                      <IconButton
                        onClick={() => handleRemoveFacility(index)}
                        aria-label="Remove Facility"
                        color="secondary"
                      >
                        <DeleteIcon />{" "}
                        {/* You can use an appropriate delete icon */}
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={3}>
            <Grid
              item
              container
              xs={12}
              style={{ marginTop: "1rem", width: "10rem" }}
            >
              <Button variant="contained" component="label">
                UPLOAD PICTURES
                <input
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    dispatch({
                      type: "catchUploadedPicture",
                      pictureRoomChosen: e.target.files[0],
                    });
                  }}
                />
              </Button>
              <Typography>
                {state.pictureRoomValue ? (
                  <span>{state.pictureRoomValue.name}</span>
                ) : (
                  ""
                )}
              </Typography>
            </Grid>
            <Button
              variant="contained"
              type="submit"
              style={{
                marginTop: "4rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "10rem",
              }}
              className={classes.registerBtn}
              disabled={state.disabledBtn}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={state.openSnack}
        message="You have successfully added your property!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </div>
  );
}

export default KamarAdd;
