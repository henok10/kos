import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    color: "white",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    "&:hover": {
      backgroundColor: "primary",
    },
  },
});
function KamarUpdate() {
  const { choice_kamar } = choices();
  const classes = useStyles();

  const params = useParams();

  const [fasilitass, setFasilitass] = useState([]);
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
    kamarInfo: "",
    addressRoomValue: "",
    priceDayValue: "",
    priceMonthValue: "",
    priceYearValue: "",
    roomSizeValue: "",
    fasilitasInfo: [],
    ruleInfo: [],
    nameFasilitasValue: "",
    nameRuleValue: "",
    facilities: [],
    rules: [],
    newFacility: "",
    newRule: "", // State untuk menyimpan fasilitas baru yang akan dimasukkan
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

      case "catchNewFacility":
        draft.newFacility = action.newFacilityChosen;
        break;

      case "catchNewRule":
        draft.newRule = action.newRuleChosen;
        break;

      case "catchKamarInfo":
        draft.kamarInfo = action.kamarObject;
        draft.addressRoomValue = action.kamarObject.address_room;
        draft.priceDayValue = action.kamarObject.price_day;
        draft.priceMonthValue = action.kamarObject.price_month;
        draft.priceYearValue = action.kamarObject.price_year;
        draft.roomSizeValue = action.kamarObject.room_size;
        draft.pictureRoomValue = action.kamarObject.picture_room;
        break;

      case "catchUploadedPicture":
        draft.pictureRoomValue = action.pictureRoomChosen;
        break;

      case "catchFasilitasInfo":
        draft.fasilitasInfo = action.fasilitasObject;
        draft.nameFasilitasValue = action.fasilitasObject.name;
        break;

      case "catchRuleInfo":
        draft.ruleInfo = action.ruleObject;
        draft.nameRuleValue = action.ruleObject.aturan;
        break;

      case "catchFasilitasChange":
        draft.fasilitasInfo[action.index].name = action.fasilitasChosen;
        break;

      case "catchRuleChange":
        draft.ruleInfo[action.index].aturan = action.ruleChosen;
        break;

      case "addFacility":
        if (action.newFacilityChosen.trim()) {
          draft.facilities.push(action.newFacilityChosen.trim());
          draft.newFacility = ""; // Reset the newFacility state after adding to facilities
        }
        break;

      case "addRule":
        if (action.newRuleChosen.trim()) {
          draft.rules.push(action.newRuleChosen.trim());
          draft.newRule = ""; // Reset the newFacility state after adding to facilities
        }
        break;

      case "removeFacility":
        draft.facilities.splice(action.indexToRemove, 1);
        break;

      case "removeRule":
        draft.rules.splice(action.indexToRemove, 1);
        break;

      case "removeFacilityInfo":
        draft.fasilitasInfo.splice(action.indexToRemove, 1);
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

  function handleFacilityAdd(event) {
    dispatch({
      type: "catchNewFacility",
      newFacilityChosen: event.target.value,
    });
  }

  function handleRuleAdd(event) {
    dispatch({
      type: "catchNewRule",
      newRuleChosen: event.target.value,
    });
  }

  const handleAddFacility = () => {
    if (state.newFacility && state.newFacility.trim()) {
      dispatch({ type: "addFacility", newFacilityChosen: state.newFacility });
      dispatch({ type: "catchNewFacility", newFacilityChosen: "" });
    }
  };

  const handleAddRule = () => {
    if (state.newRule && state.newRule.trim()) {
      dispatch({ type: "addRule", newRuleChosen: state.newRule });
      dispatch({ type: "catchNewRule", newRuleChosen: "" });
    }
  };

  function handleRemoveFacility(indexToRemove) {
    dispatch({
      type: "removeFacility",
      indexToRemove,
    });
  }

  function handleRemoveRule(indexToRemove) {
    dispatch({
      type: "removeRule",
      indexToRemove,
    });
  }

  async function deleteFacility(facilityId) {
    try {
      await Axios.delete(
        `https://mikos03.onrender.com/api/fasilitas-kamar/${facilityId}/delete`
      );
      // Kemudian perbarui state atau lakukan tindakan lain yang sesuai
      // Misalnya, dapat Anda hapus fasilitas dari state fasilitasInfo
      // atau perbarui tampilan fasilitas.
      const updatedFasilitasInfo = state.fasilitasInfo.filter(
        (facility) => facility.id !== facilityId
      );
      dispatch({
        type: "catchFasilitasInfo",
        fasilitasObject: updatedFasilitasInfo,
      });
    } catch (error) {
      // Handle error jika terjadi kesalahan saat menghapus fasilitas
      console.error("Error deleting facility:", error);
    }
  }

  function FormSubmit(e) {
    e.preventDefault();

    if (
      !state.addressRoomErrors.hasErrors &&
      !state.priceDayErrors.hasErrors &&
      !state.priceMonthErrors.hasErrors &&
      !state.roomSizeErrors.hasErrors &&
      !state.priceYearErrors.hasErrors
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

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  useEffect(() => {
    async function GetKamarInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/kamar/${params.id}/detail/`
        );

        dispatch({
          type: "catchKamarInfo",
          kamarObject: response.data,
        });
      } catch (e) {}
    }
    GetKamarInfo();
  }, [params.id, dispatch]);

  useEffect(() => {
    async function GetFasilitasInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/fasilitas-kamar/${params.id}/`
        );

        dispatch({
          type: "catchFasilitasInfo",
          fasilitasObject: response.data,
        });
      } catch (e) {}
    }
    GetFasilitasInfo();
  }, [dispatch, params.id]);

  // Untuk mengubah fasilitas, Anda perlu membuat fungsi yang memperbarui fasilitas yang diperlukan dalam state dan kemudian memanggil fungsi updateFacilities dengan fasilitas yang diperbarui.
  function handleFacilityChange(newValue, index) {
    // Salin objek fasilitas yang akan diubah
    const updatedFacilities = [...state.fasilitasInfo];
    const updatedFacility = updatedFacilities[index];

    // Buat salinan objek dengan nilai properti 'name' yang diubah
    const updatedFacilityCopy = {
      ...updatedFacility,
      name: newValue,
    };

    // Perbarui fasilitas di dalam array dengan salinan yang telah diubah
    updatedFacilities[index] = updatedFacilityCopy;

    // Perbarui fasilitas di state dan panggil fungsi untuk memperbarui fasilitas di backend.
    dispatch({
      type: "catchFasilitasChange",
      index: index,
      fasilitasChosen: newValue,
    });
  }

  useEffect(() => {
    if (state.sendRequest) {
      async function AddProperty() {
        const formData = new FormData();
        if (
          typeof state.pictureRoomValue === "string" ||
          state.pictureRoomValue === null
        ) {
          formData.append("address_room", state.addressRoomValue);
          formData.append("price_day", state.priceDayValue);
          formData.append("price_month", state.priceMonthValue);
          formData.append("price_year", state.priceYearValue);
          formData.append("room_size", state.roomSizeValue);
        } else {
          formData.append("address_room", state.addressRoomValue);
          formData.append("price_day", state.priceDayValue);
          formData.append("price_month", state.priceMonthValue);
          formData.append("price_year", state.priceYearValue);
          formData.append("picture_room", state.pictureRoomValue);
          formData.append("room_size", state.roomSizeValue);
        }
        // formData.append("rumah", params.id);

        // Convert the facilities array into the appropriate format
        const facilitiesArray = state.facilities.map((facility) => ({
          name: facility,
        }));

        const facilitiesUpdate = state.fasilitasInfo.map((facilitas) => ({
          name: facilitas.name,
          id: facilitas.id,
        }));

        const confirmUpdate = await Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        });
        if (confirmUpdate.isConfirmed) {
          try {
            // First, create the Kamar instance
            const kamarResponse = await Axios.patch(
              `https://mikos03.onrender.com/api/kamar/${params.id}/update/`,
              formData
            );

            // Now, use the created Kamar instance's ID to associate the FasilitasKamar instances
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
            for (const facilitas of facilitiesUpdate) {
              // Perbarui fasilitas dengan menggunakan Axios.put
              console.log("Facilitas ID:", facilitas.id);
              await Axios.put(
                `https://mikos03.onrender.com/api/fasilitas-kamar/${facilitas.id}/update`,
                { name: facilitas.name }
              );
            }

            Swal.fire("Saved!", "", "success");
            dispatch({ type: "openTheSnack" });
          } catch (e) {
            dispatch({ type: "allowTheButton" });
          }
        } else if (confirmUpdate.isDenied) {
          // Handle the case where the user chooses not to save the changes
          Swal.fire("Changes are not saved", "", "info");
        }
      }

      AddProperty();
    }
  }, [
    state.sendRequest,
    params.id,
    dispatch,
    state.addressRoomValue,
    state.priceDayValue,
    state.priceMonthValue,
    state.priceYearValue,
    state.roomSizeValue,
    state.facilities,
    state.pictureRoomValue,
  ]);

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
          <Typography variant="h4">Update Kamar Kos</Typography>
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

        {/* ##  */}
        <Typography style={{ marginTop: "1rem" }}>Fasilitas : </Typography>
        <Grid item xs={12} container justifyContent="space-between">
          {state.fasilitasInfo.map((facility, index) => (
            <Grid
              item
              xs={5.5}
              key={index}
              style={{ marginRight: "5px", marginTop: "10px" }}
            >
              <Typography>
                {facility.name}{" "}
                <IconButton
                  onClick={() => deleteFacility(facility.id)}
                  aria-label="Remove Facility Info"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
              <TextField
                id={`Facility-${index}`}
                label="Fasilitas"
                variant="standard"
                fullWidth
                value={facility.name}
                onChange={(e) => handleFacilityChange(e.target.value, index)}
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
            </Grid>
          ))}
        </Grid>
        {/* ## */}

        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          marginTop="2rem"
        >
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TextField
              id="newFacility"
              label="Fasilitas Baru"
              variant="standard"
              fullWidth
              value={state.newFacility}
              onChange={handleFacilityAdd}
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
              style={{ marginTop: "5px", width: "6rem" }}
              disabled={!state.newFacility.trim()}
            >
              Add
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid item container>
              {state.facilities.map((facility, index) => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                  <Grid item xs={6}>
                    <Typography
                      style={{
                        justifyContent: "space-between",
                        width: "15rem",
                      }}
                    >
                      {facility}{" "}
                      <IconButton
                        onClick={() => handleRemoveFacility(index)}
                        aria-label="Remove Facility"
                        color="error"
                      >
                        <DeleteIcon />
                        {/* You can use an appropriate delete icon */}
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/*  */}

        {/*  */}

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
            </Grid>
            <Grid style={{ marginLeft: "10%" }}>
              <Grid item container>
                <Grid marginLeft="0">
                  <img
                    style={{
                      border: "2px solid lightblue",
                      marginTop: "1rem",
                      height: "4rem",
                      width: "3rem",
                    }}
                    alt="gambar-ruangan"
                    src={state.kamarInfo.picture_room}
                  />
                </Grid>
                <Grid>
                  <Typography style={{ marginTop: "1rem" }}>
                    {state.pictureRoomValue ? (
                      <p>{state.pictureRoomValue.name}</p>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
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

export default KamarUpdate;
