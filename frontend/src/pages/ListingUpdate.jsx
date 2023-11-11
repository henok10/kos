import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useSelector } from "react-redux";
import { choices } from "../components/Choice";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// MUI
import { Grid, Typography, Button, TextField, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const areaOptions = [
  {
    value: "",
    label: "",
  },
  { value: "Biringkanaya", label: "Biringkanaya" },
  { value: "Bontoala", label: "Bontoala" },
  { value: "Makassar", label: "Makassar" },
  { value: "Mamajang", label: "Mamajang" },
  { value: "Manggala", label: "Manggala" },
  { value: "Mariso", label: "Mariso" },
  { value: "Panakkukang", label: "Panakkukang" },
  { value: "Rappocini", label: "Rappocini" },
  { value: "Tallo", label: "Tallo" },
  { value: "Tamalanrea", label: "Tamalanrea" },
  { value: "Tamalate", label: "Tamalate" },
  { value: "Ujung Pandang", label: "Ujung Pandang" },
  { value: "Ujung Tanah", label: "Ujung Tanah" },
  { value: "Wajo", label: "Wajo" },
];

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
    color: "white",
    fontSize: "0.8rem",
    marginLeft: "1rem",
  },
});

function ListingUpdate(props) {
  const userId = useSelector((state) => state.auth.userId);
  const params = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { choice_rumah } = choices();
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
    priceMonthValue: "",
    no_rekeningValue: "",
    addressValue: "",
    latitudeValue: "",
    longitudeValue: "",
    boroughValue: "",
    picture1Value: [],
    picture2Value: [],
    picture3Value: [],
    picture4Value: [],
    listingInfo: "",
    fasilitasInfo: [],
    facilities: [],
    newFacility: "",
    ruleInfo: [],
    nameRuleValue: "",
    rules: [],
    newRule: "",
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,
    pictures: {
      // uploadPicture1: picture1Value,
    },
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;

      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;

      case "catchNo_RekeningChange":
        draft.no_rekeningValue = action.no_rekeningChosen;
        break;

      case "catchPriceMonthChange":
        draft.priceMonthValue = action.priceMonthChosen;
        break;

      case "catchBoroughChange":
        draft.boroughValue = action.boroughChosen;
        break;

      case "catchAddressChange":
        draft.addressValue = action.addressChosen;
        break;

      case "catchLatitudeChange":
        draft.latitudeValue = action.LatitudeChosen;
        break;

      case "catchLongitudeChange":
        draft.longitudeValue = action.LongitudeChosen;
        break;

      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        draft.titleValue = action.listingObject.title;
        draft.descriptionValue = action.listingObject.description;
        draft.addressValue = action.listingObject.address;
        draft.priceMonthValue = action.listingObject.price_per_month;
        draft.no_rekeningValue = action.listingObject.no_rekening;
        draft.latitudeValue = action.listingObject.latitude;
        draft.longitudeValue = action.listingObject.longitude;
        draft.boroughValue = action.listingObject.borough;
        draft.picture1Value = action.listingObject.picture1;
        draft.picture2Value = action.listingObject.picture2;
        draft.picture3Value = action.listingObject.picture3;
        draft.picture4Value = action.listingObject.picture4;

        break;

      case "catchFasilitasInfo":
        draft.fasilitasInfo = action.fasilitasObject;
        draft.nameFasilitasValue = action.fasilitasObject.name;
        break;

      case "catchFasilitasChange":
        draft.fasilitasInfo[action.index].name = action.fasilitasChosen;
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

      case "catchRuleChange":
        draft.ruleInfo[action.index].aturan = action.ruleChosen;
        break;

      case "catchNewRule":
        draft.newRule = action.newRuleChosen;
        break;

      case "removeRule":
        draft.rules.splice(action.indexToRemove, 1);
        break;

      case "removeFacility":
        draft.facilities.splice(action.indexToRemove, 1);
        break;

      case "addRule":
        if (action.newRuleChosen.trim()) {
          draft.rules.push(action.newRuleChosen.trim());
          draft.newRule = ""; // Reset the newFacility state after adding to facilities
        }
        break;

      case "catchRuleInfo":
        draft.ruleInfo = action.ruleObject;
        draft.nameRuleValue = action.ruleObject.aturan;
        break;

      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;

      case "openTheSnack":
        draft.openSnack = true;
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

      case "disableTheButton":
        draft.disabledBtn = true;
        break;

      case "allowTheButton":
        draft.disabledBtn = false;
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

  function handleRuleAdd(event) {
    dispatch({
      type: "catchNewRule",
      newRuleChosen: event.target.value,
    });
  }

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
        `https://mikos03.onrender.com/api/fasilitas-rumah/${facilityId}/delete`
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

  async function deleteRule(ruleId) {
    try {
      await Axios.delete(
        `https://mikos03.onrender.com/api/rule-rumah/${ruleId}/delete`
      );
      // Kemudian perbarui state atau lakukan tindakan lain yang sesuai
      // Misalnya, dapat Anda hapus fasilitas dari state fasilitasInfo
      // atau perbarui tampilan fasilitas.
      const updatedRuleInfo = state.ruleInfo.filter(
        (rule) => rule.id !== ruleId
      );
      dispatch({
        type: "catchRuleInfo",
        ruleObject: updatedRuleInfo,
      });
    } catch (error) {
      // Handle error jika terjadi kesalahan saat menghapus fasilitas
      console.error("Error deleting facility:", error);
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  function FormSubmit(e) {
    e.preventDefault();

    dispatch({ type: "changeSendRequest" });
    dispatch({ type: "disableTheButton" });
  }
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/listings/${params.id}/`
        );

        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
        });
      } catch (e) {}
    }
    GetListingInfo();
  }, [dispatch, params.id]);
  console.log(state.titleValue);

  useEffect(() => {
    async function GetFasilitasInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/fasilitas-rumah/${params.id}/`
        );

        dispatch({
          type: "catchFasilitasInfo",
          fasilitasObject: response.data,
        });
      } catch (e) {}
    }
    GetFasilitasInfo();
  }, [params.id, dispatch]);

  useEffect(() => {
    async function GetRuleInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/rule-rumah/${params.id}/`
        );

        dispatch({
          type: "catchRuleInfo",
          ruleObject: response.data,
        });
      } catch (e) {}
    }
    GetRuleInfo();
  }, [dispatch, params.id]);
  console.log(params.id);
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

  function handleRuleChange(newValue, index) {
    // Salin objek fasilitas yang akan diubah
    const updatedRules = [...state.ruleInfo];
    const updatedRule = updatedRules[index];

    // Buat salinan objek dengan nilai properti 'name' yang diubah
    const updatedRuleCopy = {
      ...updatedRule,
      name: newValue,
    };

    // Perbarui fasilitas di dalam array dengan salinan yang telah diubah
    updatedRules[index] = updatedRuleCopy;

    // Perbarui fasilitas di state dan panggil fungsi untuk memperbarui fasilitas di backend.
    dispatch({
      type: "catchRuleChange",
      index: index,
      ruleChosen: newValue,
    });
  }
  useEffect(() => {
    if (state.sendRequest) {
      async function UpdateProperty() {
        const formData = new FormData();
        if (
          typeof state.picture1Value === "string" ||
          state.picture1Value === null
        ) {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("user", userId);
        } else {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("picture1", state.picture1Value);
          formData.append("user", userId);
        }
        if (
          typeof state.picture2Value === "string" ||
          state.picture2Value === null
        ) {
          formData.append("title", state.titleValue);
          formData.append("property_status", state.propertyStatusValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("user", userId);
        } else {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("picture2", state.picture2Value);
          formData.append("user", userId);
        }
        if (
          typeof state.picture3Value === "string" ||
          state.picture3Value === null
        ) {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("user", userId);
        } else {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_day", state.priceDayValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("picture3", state.picture3Value);
          formData.append("user", userId);
        }
        if (
          typeof state.picture4Value === "string" ||
          state.picture4Value === null
        ) {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("user", userId);
        } else {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("address", state.addressValue);
          formData.append("price_per_month", state.priceMonthValue);
          formData.append("no_rekening", state.no_rekeningValue);
          formData.append("latitude", state.latitudeValue);
          formData.append("longitude", state.longitudeValue);
          formData.append("borough", state.boroughValue);
          formData.append("picture4", state.picture4Value);
          formData.append("user", userId);
        }

        const facilitiesArray = state.facilities.map((facility) => ({
          name: facility,
        }));

        const facilitiesUpdate = state.fasilitasInfo.map((facilitas) => ({
          name: facilitas.name,
          id: facilitas.id,
        }));

        const rulesArray = state.rules.map((rule) => ({
          aturan: rule,
        }));

        const rulesUpdate = state.ruleInfo.map((ruless) => ({
          aturan: ruless.aturan,
          id: ruless.id,
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
            const response = await Axios.patch(
              `https://mikos03.onrender.com/api/listings/${params.id}/update/`,
              formData
            );

            // Now, use the created Kamar instance's ID to associate the FasilitasKamar instances
            const rumahId = response.data.id;

            for (const facility of facilitiesArray) {
              await Axios.post(
                "https://mikos03.onrender.com/api/fasilitas-rumah/create",
                {
                  rumah: rumahId,
                  name: facility.name,
                }
              );
            }

            for (const facilitas of facilitiesUpdate) {
              // Perbarui fasilitas dengan menggunakan Axios.put
              console.log("Facilitas ID:", facilitas.id);
              await Axios.put(
                `https://mikos03.onrender.com/api/fasilitas-rumah/${facilitas.id}/update`,
                { name: facilitas.name }
              );
            }

            for (const rule of rulesArray) {
              await Axios.post(
                "https://mikos03.onrender.com/api/rule-rumah/create",
                {
                  rumah: rumahId,
                  aturan: rule.aturan,
                }
              );
            }

            for (const ruless of rulesUpdate) {
              // Perbarui fasilitas dengan menggunakan Axios.put
              // console.log("Facilitas ID:", facilitas.id);
              await Axios.put(
                `https://mikos03.onrender.com/api/rule-rumah/${ruless.id}/update`,
                { aturan: ruless.aturan }
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
      UpdateProperty();
    }
  }, [
    state.sendRequest,
    params.id,
    dispatch,
    userId,
    state.picture4Value,
    state.picture1Value,
    state.picture3Value,
    state.picture2Value,
    state.boroughValue,
    state.longitudeValue,
    state.latitudeValue,
    state.no_rekeningValue,
    state.priceMonthValue,
    state.addressValue,
    state.descriptionValue,
    state.titleValue,
    state.facilities,
    state.priceDayValue,
    state.propertyStatusValue,
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
          <Typography variant="h4">UPDATE RUMAH KOS</Typography>
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
            ></TextField>
          </Grid>

          <Grid item xs={5} container style={{ marginTop: "1rem" }}>
            <TextField
              id="borough"
              label="Borough"
              variant="standard"
              fullWidth
              value={state.boroughValue}
              onChange={(e) =>
                dispatch({
                  type: "catchBoroughChange",
                  boroughChosen: e.target.value,
                })
              }
              select
              SelectProps={{
                native: true,
              }}
            >
              {areaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
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
          />
        </Grid>
        <Grid item container>
          <Grid item container style={{ marginTop: "1rem" }}>
            <TextField
              id="alamat"
              label="Address"
              variant="standard"
              fullWidth
              value={state.addressValue}
              onChange={(e) =>
                dispatch({
                  type: "catchAddressChange",
                  addressChosen: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>

        <Grid item container justifyContent={"space-between"}>
          <Grid item xs={5} container style={{ marginTop: "1rem" }}>
            <TextField
              id="latitude"
              label="Latitude"
              variant="standard"
              fullWidth
              value={state.latitudeValue}
              onChange={(e) =>
                dispatch({
                  type: "catchLatitudeChange",
                  LatitudeChosen: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={5} container style={{ marginTop: "1rem" }}>
            <TextField
              id="longitude"
              label="Longitude"
              variant="standard"
              fullWidth
              value={state.longitudeValue}
              onChange={(e) =>
                dispatch({
                  type: "catchLongitudeChange",
                  LongitudeChosen: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>

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
                {choice_rumah.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>

        <Grid item container xs={6}>
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
            {choice_rumah.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddFacility}
            style={{ marginTop: "5px" }}
            disabled={!state.newFacility.trim()}
          >
            Tambahkan Fasilitas
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

        <Typography style={{ marginTop: "1rem" }}>
          Aturan Kamar Kos :{" "}
        </Typography>
        <Grid item xs={12} container justifyContent="space-between">
          {state.ruleInfo.map((rule, index) => (
            <Grid
              item
              xs={5.5}
              key={index}
              style={{ marginRight: "5px", marginTop: "10px" }}
            >
              <Typography>
                {rule.aturan}{" "}
                <IconButton
                  onClick={() => deleteRule(rule.id)}
                  aria-label="Remove Facility Info"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Typography>
              <TextField
                id={`Rule${index}`}
                label="Peraturan"
                variant="standard"
                fullWidth
                value={rule.aturan}
                onChange={(e) => handleRuleChange(e.target.value, index)}
              ></TextField>
            </Grid>
          ))}
        </Grid>

        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          marginTop="2rem"
        >
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <TextField
              id="newRule"
              label="Aturan Baru"
              variant="standard"
              fullWidth
              value={state.newRule}
              onChange={handleRuleAdd}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddRule}
              style={{ marginTop: "5px", width: "6rem" }}
              disabled={!state.newRule.trim()}
            >
              Add
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid item container>
              {state.rules.map((rule, index) => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                  <Grid item xs={6}>
                    <Typography
                      style={{
                        justifyContent: "space-between",
                        width: "15rem",
                      }}
                    >
                      {rule}{" "}
                      <IconButton
                        onClick={() => handleRemoveRule(index)}
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

        <Grid item container>
          <Grid item xs={6}>
            <Grid
              item
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
            <Grid item xs={12} style={{ marginLeft: "10%" }}>
              <Grid item container>
                <Grid item xs={1.5} marginLeft="0">
                  <img
                    style={{
                      border: "2px solid lightblue",
                      marginTop: "1rem",
                      height: "4rem",
                      width: "3rem",
                    }}
                    alt="gambar1"
                    src={state.listingInfo.picture1}
                  />
                </Grid>
                <Grid item xs={10.5}>
                  <Typography style={{ marginTop: "1rem" }}>
                    {state.picture1Value ? (
                      <p>{state.picture1Value.name}</p>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              style={{
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
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
            <Grid item xs={12} style={{ marginLeft: "10%" }}>
              <Grid item container>
                <Grid item xs={1.5} marginLeft="0">
                  <img
                    style={{
                      border: "2px solid lightblue",
                      marginTop: "1rem",
                      height: "4rem",
                      width: "3rem",
                    }}
                    alt="gambar2"
                    src={state.listingInfo.picture2}
                  />
                </Grid>
                <Grid item xs={10.5}>
                  <Typography style={{ marginTop: "1rem" }}>
                    {state.picture2Value ? (
                      <p>{state.picture2Value.name}</p>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid
              item
              container
              xs={12}
              style={{
                marginTop: "1rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
              }}
              alt="gambar4"
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
            <Grid item xs={12} style={{ marginLeft: "10%" }}>
              <Grid item container>
                <Grid item xs={1.5} marginLeft="0">
                  <img
                    style={{
                      border: "2px solid lightblue",
                      marginTop: "1rem",
                      height: "4rem",
                      width: "3rem",
                    }}
                    alt="gambar3"
                    src={state.listingInfo.picture3}
                  />
                </Grid>
                <Grid item xs={10.5}>
                  <Typography style={{ marginTop: "1rem" }}>
                    {state.picture3Value ? (
                      <p>{state.picture3Value.name}</p>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              xs={12}
              style={{
                marginTop: "1rem",
                width: "50%",
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
            <Grid item xs={12} style={{ marginLeft: "10%" }}>
              <Grid item container>
                <Grid item xs={1.5} marginLeft="0">
                  <img
                    style={{
                      border: "2px solid lightblue",
                      marginTop: "1rem",
                      height: "4rem",
                      width: "3rem",
                    }}
                    alt="gambar4"
                    src={state.listingInfo.picture4}
                  />
                </Grid>
                <Grid item xs={10.5}>
                  <Typography style={{ marginTop: "1rem" }}>
                    {state.picture4Value ? (
                      <p>{state.picture4Value.name}</p>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={8}
          style={{ marginTop: "4rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className={classes.registerBtn}
            disabled={state.disabledBtn}
          >
            UPDATE
          </Button>
        </Grid>
      </form>
      <Snackbar
        open={state.openSnack}
        message="You have successfully updated this listing!"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </div>
  );
}

export default ListingUpdate;
