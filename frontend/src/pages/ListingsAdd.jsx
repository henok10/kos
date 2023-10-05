import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { choices } from "../components/Choice";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
// MUI
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
    backgroundColor: "green",
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "primary",
    },
  },

  picturesBtn: {
    // backgroundColor: "blue",
    color: "white",
    fontSize: "0.8rem",
    textAlign: "center",
    marginLeft: "1rem",
  },
});

function ListingAdd() {
  const { choice_rumah } = choices();
  const userId = useSelector((state) => state.auth.userId);
  const classes = useStyles();
  const navigate = useNavigate();

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
    titleValue: "",
    descriptionValue: "",
    addressValue: "",
    boroughValue: "",
    latitudeValue: "",
    longitudeValue: "",
    no_rekeningValue: "",
    facilities: [],
    newFacility: "", // State untuk menyimpan fasilitas baru yang akan dimasukkan
    rules: [],
    newRule: "",
    picture1Value: [],
    picture2Value: [],
    picture3Value: [],
    picture4Value: [],
    sendRequest: 0,
    userProfile: {
      agencyName: "",
      phoneNumber: "",
    },
    openSnack: false,
    disabledBtn: false,
    titleErrors: {
      hasErrors: false,
      errorMessage: "",
    },

    priceMonthErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    no_rekeningErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    boroughErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    addressErrors: {
      hasErrors: false,
      errorMessage: "",
    },
    descriptionErrors: {
      hasErrors: false,
      errorMessage: "",
    },
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        draft.titleErrors.hasErrors = false;
        draft.titleErrors.errorMessage = "";
        break;

      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        draft.descriptionErrors.hasErrors = false;
        draft.descriptionErrors.errorMessage = "";
        break;

      case "catchAddressChange":
        draft.addressValue = action.addressChosen;
        draft.addressErrors.hasErrors = false;
        draft.addressErrors.errorMessage = "";
        break;

      case "catchNo_RekeningChange":
        draft.no_rekeningValue = action.no_rekeningChosen;
        draft.no_rekeningErrors.hasErrors = false;
        draft.no_rekeningErrors.errorMessage = "";
        break;

      case "catchBoroughChange":
        draft.boroughValue = action.boroughChosen;
        draft.boroughErrors.hasErrors = false;
        draft.boroughErrors.errorMessage = "";
        break;
      case "catchNewFacility":
        draft.newFacility = action.newFacilityChosen;
        break;

      case "addFacility":
        if (action.newFacilityChosen.trim()) {
          draft.facilities.push(action.newFacilityChosen.trim());
          draft.newFacility = ""; // Reset the newFacility state after adding to facilities
        }
        break;

      case "removeFacility":
        draft.facilities.splice(action.indexToRemove, 1);
        break;

      case "catchNewRule":
        draft.newRule = action.newRuleChosen;
        break;

      case "addRule":
        if (action.newRuleChosen.trim()) {
          draft.rules.push(action.newRuleChosen.trim());
          draft.newRule = ""; // Reset the newFacility state after adding to facilities
        }
        break;
      case "removeRule":
        draft.rules.splice(action.indexToRemove, 1);
        break;

      case "catchNewRule":
        draft.newRule = action.newRuleChosen;
        break;

      case "catchLatitudeChange":
        draft.latitudeValue = action.latitudeChosen;
        break;

      case "catchLongitudeChange":
        draft.longitudeValue = action.longitudeChosen;
        break;

      case "catchUploadedPicture1":
        draft.picture1Value = action.picture1Chosen;
        break;

      case "catchUploadedPicture2":
        draft.picture2Value = action.picture2Chosen;
        break;

      case "catchUploadedPicture3":
        draft.picture3Value = action.picture3Chosen;
        break;

      case "catchUploadedPicture4":
        draft.picture4Value = action.picture4Chosen;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
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

      case "catchTitleErrors":
        if (action.titleChosen.length === 0) {
          draft.titleErrors.hasErrors = true;
          draft.titleErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchBoroughErrors":
        if (action.boroughChosen.length === 0) {
          draft.boroughErrors.hasErrors = true;
          draft.boroughErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchDescriptionErrors":
        if (action.descriptionChosen.length === 0) {
          draft.descriptionErrors.hasErrors = true;
          draft.descriptionErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchAddressErrors":
        if (action.addressChosen.length === 0) {
          draft.addressErrors.hasErrors = true;
          draft.addressErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchNo_RekeningErrors":
        if (action.no_rekeningChosen.length === 0) {
          draft.no_rekeningErrors.hasErrors = true;
          draft.no_rekeningErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "catchPriceMonthErrors":
        if (action.priceMonthChosen.length === 0) {
          draft.priceMonthErrors.hasErrors = true;
          draft.priceMonthErrors.errorMessage = "This field must not be empty";
        }
        break;

      case "emptyTitle":
        draft.titleErrors.hasErrors = true;
        draft.titleErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyBorough":
        draft.boroughErrors.hasErrors = true;
        draft.boroughErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyDescription":
        draft.descriptionErrors.hasErrors = true;
        draft.descriptionErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyNo_Rekening":
        draft.no_rekeningErrors.hasErrors = true;
        draft.no_rekeningErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyAddressStatus":
        draft.addressErrors.hasErrors = true;
        draft.addressErrors.errorMessage = "This field must not be empty";
        break;

      case "emptyPriceMonth":
        draft.priceMonthErrors.hasErrors = true;
        draft.priceMonthErrors.errorMessage = "This field must not be empty";
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get profile info
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/profiles/owner/${userId}/`
        );

        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
        });
      } catch (e) {}
    }
    GetProfileInfo();
  }, [userId, dispatch]);
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

  function handleRuleChange(event) {
    dispatch({
      type: "catchNewRule",
      newRuleChosen: event.target.value,
    });
  }

  const handleAddRule = () => {
    if (state.newRule && state.newRule.trim()) {
      dispatch({ type: "addRule", newRuleChosen: state.newRule });
      dispatch({ type: "catchNewRule", newRuleChosen: "" });
    }
  };

  function handleRemoveRule(indexToRemove) {
    dispatch({
      type: "removeRule",
      indexToRemove,
    });
  }

  function FormSubmit(e) {
    e.preventDefault();

    if (
      !state.titleErrors.hasErrors &&
      !state.boroughErrors.hasErrors &&
      !state.addressErrors.hasErrors &&
      !state.no_rekeningErrors.hasErrors &&
      !state.priceMonthErrors.hasErrors &&
      !state.boroughErrors.hasErrors &&
      !state.descriptionErrors.hasErrors &&
      state.latitudeValue &&
      state.longitudeValue &&
      state.facilities.length > 0
    ) {
      dispatch({ type: "changeSendRequest" });
      dispatch({ type: "disableTheButton" });
    } else if (state.titleValue === "") {
      dispatch({ type: "emptyTitle" });
      window.scrollTo(0, 0);
    } else if (state.addressValue === "") {
      dispatch({ type: "emptyAddress" });
      window.scrollTo(0, 0);
    } else if (state.no_rekeningValue === "") {
      dispatch({ type: "emptyNo_Rekening" });
      window.scrollTo(0, 0);
    } else if (state.boroughValue === "") {
      dispatch({ type: "emptyBorough" });
      window.scrollTo(0, 0);
    } else if (state.descriptionValue === "") {
      dispatch({ type: "emptyDescription" });
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData();
        formData.append("title", state.titleValue);
        formData.append("description", state.descriptionValue);
        formData.append("address", state.addressValue);
        formData.append("borough", state.boroughValue);
        formData.append("no_rekening", state.no_rekeningValue);
        formData.append("latitude", state.latitudeValue);
        formData.append("longitude", state.longitudeValue);
        formData.append("picture1", state.picture1Value);
        formData.append("picture2", state.picture2Value);
        formData.append("picture3", state.picture3Value);
        formData.append("picture4", state.picture4Value);
        formData.append("user", userId);

        // const facilitiesArray = state.facilities.map((facility) => ({ name: facility }));
        const facilitiesArray = state.facilities.map((facility) => {
          const icon = choices().choice_kamar.find(
            (item) => item.value === facility
          )?.icon;
          return { name: facility, icon };
        });

        const rulesArray = state.rules.map((rule) => ({
          aturan: rule,
        }));

        Swal.fire({
          title: "Are you sure?",
          text: "Are you sure you want to add this Rumah?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, add it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const rumahResponse = await Axios.post(
                "https://mykos2.onrender.com/api/listings/create/",
                formData
              );

              const rumahId = rumahResponse.data.id;

              for (const facility of facilitiesArray) {
                await Axios.post(
                  "https://mykos2.onrender.com/api/fasilitas-rumah/create",
                  {
                    rumah: rumahId,
                    name: facility.name,
                  }
                );
              }
              for (const rule of rulesArray) {
                console.log(rule);
                await Axios.post(
                  "https://mykos2.onrender.com/api/rule-rumah/create",
                  {
                    rumah: rumahId,
                    aturan: rule.aturan,
                  }
                );
              }

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Rumah telah berhasil disimpan",
                showConfirmButton: false,
                timer: 2000,
              });

              dispatch({ type: "openTheSnack" });
            } catch (e) {
              // Menampilkan notifikasi kesalahan jika terjadi kesalahan
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Terjadi kesalahan saat menyimpan Rumah",
                showConfirmButton: false,
                timer: 2000,
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
    state.picture1Value,
    state.picture2Value,
    state.picture3Value,
    state.picture4Value,
    state.longitudeValue,
    state.latitudeValue,
    state.priceMonthValue,
    state.no_rekeningValue,
    state.titleValue,
    state.descriptionValue,
    state.addressValue,
    state.boroughValue,
    state.facilities,
    userId,
  ]);

  function SubmitButtonDisplay() {
    if (
      isAuthenticated &&
      state.userProfile.agencyName !== null &&
      state.userProfile.agencyName !== "" &&
      state.userProfile.phoneNumber !== null &&
      state.userProfile.phoneNumber !== ""
    ) {
      return (
        <Button
          variant="contained"
          fullWidth
          type="submit"
          className={classes.registerBtn}
          disabled={state.disabledBtn}
        >
          SUBMIT
        </Button>
      );
    } else if (
      isAuthenticated &&
      (state.userProfile.agencyName === null ||
        state.userProfile.agencyName === "" ||
        state.userProfile.phoneNumber === null ||
        state.userProfile.phoneNumber === "")
    ) {
      return (
        <Button
          variant="outlined"
          fullWidth
          className={classes.registerBtn}
          onClick={() => navigate("/profileOwner")}
        >
          COMPLETE YOUR PROFILE TO ADD A PROPERTY
        </Button>
      );
    } else if (!isAuthenticated) {
      return (
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/login")}
          className={classes.registerBtn}
        >
          SIGN IN TO ADD A PROPERTY
        </Button>
      );
    }
  }

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/datakos");
      }, 1500);
    }
  }, [state.openSnack, navigate]);

  return (
    <div className={classes.formContainer}>
      <form onSubmit={FormSubmit}>
        <Grid item container justifyContent="center">
          <Typography variant="h4">Tambahkan Rumah Kos</Typography>
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="title"
            label="Title*"
            variant="standard"
            fullWidth
            value={state.titleValue}
            onChange={(e) =>
              dispatch({
                type: "catchTitleChange",
                titleChosen: e.target.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "catchTitleErrors",
                titleChosen: e.target.value,
              })
            }
            error={state.titleErrors.hasErrors ? true : false}
            helperText={state.titleErrors.errorMessage}
          />
        </Grid>

        <Grid item container justifyContent="space-between">
          <Grid item xs={5} style={{ marginTop: "1rem" }}>
            <TextField
              id="no_rekening"
              label="No. Rekening*"
              variant="standard"
              fullWidth
              value={state.no_rekeningValue}
              onChange={(e) =>
                dispatch({
                  type: "catchNo_RekeningChange",
                  no_rekeningChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchNo_RekeningErrors",
                  no_rekeningChosen: e.target.value,
                })
              }
              error={state.no_rekeningErrors.hasErrors ? true : false}
              helperText={state.no_rekeningErrors.errorMessage}
            />
          </Grid>

          <Grid item xs={5} style={{ marginTop: "1rem" }}>
            <TextField
              id="borough"
              label="Borough*"
              variant="standard"
              fullWidth
              value={state.boroughValue}
              onChange={(e) =>
                dispatch({
                  type: "catchBoroughChange",
                  boroughChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchBoroughErrors",
                  boroughChosen: e.target.value,
                })
              }
              error={state.boroughErrors.hasErrors ? true : false}
              helperText={state.boroughErrors.errorMessage}
            ></TextField>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={12} style={{ marginTop: "1rem" }}>
            <TextField
              id="alamat"
              label="Address*"
              variant="standard"
              fullWidth
              value={state.addressValue}
              onChange={(e) =>
                dispatch({
                  type: "catchAddressChange",
                  addressChosen: e.target.value,
                })
              }
              onBlur={(e) =>
                dispatch({
                  type: "catchAddressErrors",
                  addressChosen: e.target.value,
                })
              }
              error={state.addressErrors.hasErrors ? true : false}
              helperText={state.addressErrors.errorMessage}
            />
          </Grid>
        </Grid>

        <Grid item container style={{ marginTop: "1rem" }}>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            value={state.descriptionValue}
            onChange={(e) =>
              dispatch({
                type: "catchDescriptionChange",
                descriptionChosen: e.target.value,
              })
            }
            onBlur={(e) =>
              dispatch({
                type: "catchDescriptionErrors",
                descriptionChosen: e.target.value,
              })
            }
            error={state.descriptionErrors.hasErrors ? true : false}
            helperText={state.descriptionErrors.errorMessage}
          />
        </Grid>

        {/* Map */}
        <Grid
          item
          container
          justifyContent="space-between"
          style={{ marginTop: "1rem" }}
        >
          <Grid item xs={5} style={{ marginTop: "1rem" }}>
            <TextField
              id="latitude"
              label="Latitude: "
              variant="standard"
              fullWidth
              value={state.latitudeValue}
              onChange={(e) =>
                dispatch({
                  type: "catchLatitudeChange",
                  latitudeChosen: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={5} style={{ marginTop: "1rem" }}>
            <TextField
              id="longitude"
              label="Longitude: "
              variant="standard"
              fullWidth
              value={state.longitudeValue}
              onChange={(e) =>
                dispatch({
                  type: "catchLongitudeChange",
                  longitudeChosen: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        <Typography style={{ marginTop: "1rem" }}>Fasilitas : </Typography>
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          marginTop="2rem"
        >
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
              {choice_rumah.map((option) => (
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
                  <Grid item xs={6} justifyContent="space-between">
                    <Typography style={{ width: "15rem" }}>
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

        <Grid item container xs={12} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TextField
              id="newRule"
              label="Rule Baru"
              variant="standard"
              fullWidth
              value={state.newRule}
              onChange={handleRuleChange}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRule}
              style={{ marginTop: "5px", width: "7rem" }}
              disabled={!state.newRule.trim()}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid item container>
              {state.rules.map((rule, index) => (
                <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                  <Grid item xs={6} justifyContent="space-between">
                    <Typography>
                      {rule}{" "}
                      <IconButton
                        onClick={() => handleRemoveRule(index)}
                        aria-label="Remove Rule Kamar"
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
          <Grid item xs={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                width: "50%",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                className={classes.picturesBtn}
              >
                UPLOAD PICTURES 1
                <input
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    dispatch({
                      type: "catchUploadedPicture1",
                      picture1Chosen: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
            <Typography style={{ height: "5rem" }}>
              {state.picture1Value ? <p>{state.picture1Value.name}</p> : ""}
            </Typography>
            <Grid
              item
              container
              xs={12}
              style={{
                width: "50%",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                className={classes.picturesBtn}
              >
                UPLOAD PICTURES 2
                <input
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    dispatch({
                      type: "catchUploadedPicture2",
                      picture2Chosen: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
            <Typography style={{ height: "5rem" }}>
              {state.picture2Value ? <p>{state.picture2Value.name}</p> : ""}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                width: "50%",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                className={classes.picturesBtn}
              >
                UPLOAD PICTURES 3
                <input
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    dispatch({
                      type: "catchUploadedPicture3",
                      picture3Chosen: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
            <Typography style={{ height: "5rem" }}>
              {state.picture3Value ? <p>{state.picture3Value.name}</p> : ""}
            </Typography>
            <Grid
              item
              container
              xs={12}
              style={{
                width: "50%",
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                component="label"
                fullWidth
                className={classes.picturesBtn}
              >
                UPLOAD PICTURES 4
                <input
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    dispatch({
                      type: "catchUploadedPicture4",
                      picture4Chosen: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
            <Typography style={{ height: "5rem" }}>
              {state.picture4Value ? <p>{state.picture4Value.name}</p> : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={8}
          style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto" }}
        >
          {SubmitButtonDisplay()}
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

export default ListingAdd;
