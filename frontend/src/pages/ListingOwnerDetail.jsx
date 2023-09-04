import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import L from "leaflet";
import "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import { useImmerReducer } from "use-immer";
// Assets
import stadiumIconPng from "../data/Mapicons/stadium.png";
import hospitalIconPng from "../data/Mapicons/hospital.png";
import universityIconPng from "../data/Mapicons/university.png";
// React Leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import {
  Grid,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Link,
  Box,
  Avatar,
  Stack,
  Button,
  Dialog,
} from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RoomIcon from "@mui/icons-material/Room";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ListingUpdate from "./ListingUpdate";
import TheMapComponent from "../components/TheMapComponent";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  sliderContainer: {
    position: "relative",
    marginTop: "1rem",
  },

  leftArrow: {
    borderRadius: "100%",
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    left: "27.5%",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  rightArrow: {
    position: "absolute",
    borderRadius: "100%",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    right: "27.5%",
    "&:hover": {
      backgroundColor: "white",
    },
  },
});

function ListingOwnerDetail() {
  const userId = useSelector((state) => state.auth.userId);
  const ownerId = useSelector((state) => state.auth.ownerId);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCostumer = useSelector((state) => state.auth.isCostumer);
  const isPemilikKos = useSelector((state) => state.auth.isPemilikKos);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isCostumer) {
      navigate("/listing");
    }
  }, [isPemilikKos, navigate]);

  const classes = useStyles();
  const params = useParams();

  const stadiumIcon = new Icon({
    iconUrl: stadiumIconPng,
    iconSize: [40, 40],
  });

  const hospitalIcon = new Icon({
    iconUrl: hospitalIconPng,
    iconSize: [40, 40],
  });

  const universityIcon = new Icon({
    iconUrl: universityIconPng,
    iconSize: [40, 40],
  });

  const initialState = {
    dataIsLoading: true,
    listingInfo: "",
    userProfileInfo: "",
    openSnack: false,
    disabledBtn: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;

      case "catchUserProfileInfo":
        draft.userProfileInfo = action.profileObject;
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
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get listing info
  useEffect(() => {
    async function GetListingInfo() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/listings/${params.id}/`
        );

        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
        });
      } catch (e) {}
    }
    GetListingInfo();
  }, []);

  // request to get profile info
  useEffect(() => {
    if (state.listingInfo) {
      async function GetProfileInfo() {
        try {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/profiles/owner/${state.listingInfo.user}/`
          );

          dispatch({
            type: "catchUserProfileInfo",
            profileObject: response.data,
          });
          dispatch({ type: "loadingDone" });
        } catch (e) {}
      }
      GetProfileInfo();
    }
  }, [state.listingInfo]);

  async function DeleteHandler() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmDelete) {
      try {
        const response = await Axios.delete(
          `https://mykos2.onrender.com/api/listings/${params.id}/delete/`
        );

        dispatch({ type: "openTheSnack" });
        dispatch({ type: "disableTheButton" });
      } catch (e) {
        dispatch({ type: "allowTheButton" });
      }
    }
  }

  const [allFasilitas, setAllFasilitas] = useState([]);
  const [loadingFasilitas, setLoadingFasilitas] = useState(true);
  const [errorFasilitas, setErrorFasilitas] = useState(null);

  useEffect(() => {
    if (state.listingInfo) {
      async function GetFasilitasInfo() {
        try {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/fasilitas-rumah/${state.listingInfo.id}/`
          );

          const data = response.data;
          setAllFasilitas(data);
          setLoadingFasilitas(false);
        } catch (e) {
          setErrorFasilitas("Error fetching facilities information.");
          setLoadingFasilitas(false);
        }
      }
      GetFasilitasInfo();
    }
  }, [state.listingInfo]);
  console.log(state.listingInfo);

  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture !== null);

  const [currentPicture, setCurrentPicture] = useState(0);

  function NextPicture() {
    if (currentPicture === listingPictures.length - 1) {
      return setCurrentPicture(0);
    } else {
      return setCurrentPicture(currentPicture + 1);
    }
  }

  function PreviousPicture() {
    if (currentPicture === 0) {
      return setCurrentPicture(listingPictures.length - 1);
    } else {
      return setCurrentPicture(currentPicture - 1);
    }
  }

  const date = new Date(state.listingInfo.date_posted);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/datakos");
      }, 1500);
    }
  }, [state.openSnack]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(true);
  };

  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <div
      style={{ marginLeft: "2rem", marginRight: "2rem", marginBottom: "2rem" }}
    >
      <Grid container>
        <Grid item xs={6} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid
            item
            container
            style={{
              padding: "1rem",
              borderBottom: "1px solid grey",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            <Grid item container xs={7} direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h5">{state.listingInfo.title}</Typography>
              </Grid>
              <Grid item>
                <RoomIcon />{" "}
                <Typography varaiant="h6">
                  {state.listingInfo.borough}
                </Typography>
              </Grid>
              <Grid item>
                <Typography varaiant="subtitle1">{formattedDate}</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={5} alignItems="center">
              <Typography
                variant="h6"
                style={{
                  fontWeight: "bolder",
                  color: "black",
                  fontSize: "18px",
                }}
              >
                Rp{state.listingInfo.price_per_month}/Month
              </Typography>
            </Grid>
          </Grid>

          {/* Alamat */}

          {state.listingInfo.address ? (
            <Grid
              item
              style={{
                padding: "1rem",
                borderBottom: "1px solid grey",
                marginTop: "0.3rem",
              }}
            >
              <Typography variant="h6" style={{ fontSize: "16px" }}>
                Alamat :
              </Typography>
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                {state.listingInfo.address}
              </Typography>
            </Grid>
          ) : (
            ""
          )}

          <Grid
            container
            style={{ padding: "1rem", borderBottom: "1px solid grey" }}
          >
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Fasilitas Kamar:
            </Typography>
            <Button
              variant="outlined"
              style={{ marginLeft: "20px" }}
              onClick={() => navigate(`/listingupdate/${params.row.id}`)}
            >
              Tambahkan Fasilitas
            </Button>
            <Grid container marginTop={"1rem"}>
              <Grid item xs={12} md={6} style={{ paddingRight: "1rem" }}>
                {loadingFasilitas ? (
                  <CircularProgress />
                ) : errorFasilitas ? (
                  <Typography variant="body1" color="error">
                    {errorFasilitas}
                  </Typography>
                ) : allFasilitas.length === 0 ? (
                  <Typography variant="body1">
                    No facilities available.
                  </Typography>
                ) : (
                  allFasilitas.slice(0, 4).map((listing, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      style={{ fontSize: "15px" }}
                    >
                      {listing.nama_fasilitas}
                    </Typography>
                  ))
                )}
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}
              >
                {/* Baris-baris selanjutnya ditampilkan di samping kanan */}
                {allFasilitas.slice(4).map((listing, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    style={{ fontSize: "15px" }}
                  >
                    {listing.nama_fasilitas}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            {/* <Grid item xs={6} columns={{ xs: 6, sm: 6, md: 12 }}> */}
            <Grid
              item
              container
              style={{
                padding: "1rem",
                borderBottom: "1px solid grey",
                marginTop: "0.3rem",
                width: "100%",
              }}
            >
              <div>
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Kamar Yang Tersedia :
                </Typography>
                <Typography variant="body1" style={{ fontSize: "15px" }}>
                  1 Kamar Tersedia
                </Typography>
              </div>
            </Grid>
            {/* </Grid> */}

            {/* Description */}
            {state.listingInfo.description ? (
              <Grid
                item
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid grey",
                  marginTop: "0.3rem",
                }}
              >
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Description :
                </Typography>
                <Typography variant="body1" style={{ fontSize: "15px" }}>
                  {state.listingInfo.description}
                </Typography>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <Grid item xs={6} style={{ marginTop: "2rem" }} columns={{ sm: 6 }}>
          {/* Image slider */}
          {listingPictures.length > 0 ? (
            <Box
              style={{
                paddingLeft: "0.5rem",
                paddingTop: "0.7rem",
                paddingRight: "0.5rem",
              }}
            >
              <Grid
                item
                container
                justifyContent="center"
                className={classes.sliderContainer}
              >
                {listingPictures.map((picture, index) => {
                  return (
                    <div key={index}>
                      {index === currentPicture ? (
                        <img
                          src={picture}
                          style={{ width: "100%", height: "31rem" }}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
                <ArrowCircleLeftIcon
                  onClick={PreviousPicture}
                  className={classes.leftArrow}
                />
                <ArrowCircleRightIcon
                  onClick={NextPicture}
                  className={classes.rightArrow}
                />
              </Grid>
            </Box>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      {/* Map */}
      <Grid
        item
        container
        style={{ marginTop: "1rem" }}
        spacing={1}
        justifyContent="space-between"
      >
        <Grid item xs={3} style={{ overflow: "auto", height: "35rem" }}>
          {state.listingInfo.listing_pois_within_10km.map((poi) => {
            function DegreeToRadian(coordinate) {
              return (coordinate * Math.PI) / 180;
            }

            function CalculateDistance() {
              const latitude1 = DegreeToRadian(state.listingInfo.latitude);
              const longitude1 = DegreeToRadian(state.listingInfo.longitude);

              const latitude2 = DegreeToRadian(poi.location.coordinates[0]);
              const longitude2 = DegreeToRadian(poi.location.coordinates[1]);
              // The formula
              const latDiff = latitude2 - latitude1;
              const lonDiff = longitude2 - longitude1;
              const R = 6371000 / 1000;

              const a =
                Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
                Math.cos(latitude1) *
                  Math.cos(latitude2) *
                  Math.sin(lonDiff / 2) *
                  Math.sin(lonDiff / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

              const d = R * c;

              const dist =
                Math.acos(
                  Math.sin(latitude1) * Math.sin(latitude2) +
                    Math.cos(latitude1) *
                      Math.cos(latitude2) *
                      Math.cos(lonDiff)
                ) * R;
              return dist.toFixed(2);
            }
            return (
              <div
                key={poi.id}
                style={{ marginBottom: "0.5rem", border: "1px solid black" }}
              >
                <Typography variant="h6">{poi.name}</Typography>
                <Typography variant="subtitle1">
                  {poi.type} |{" "}
                  <span style={{ fontWeight: "bolder", color: "green" }}>
                    {CalculateDistance()} Kilometers
                  </span>
                </Typography>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={9} style={{ height: "35rem" }}>
          <MapContainer
            center={[state.listingInfo.latitude, state.listingInfo.longitude]}
            zoom={16}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {state.listingInfo.listing_pois_within_10km.map((poi) => {
              function PoiIcon() {
                if (poi.type === "Stadium") {
                  return stadiumIcon;
                } else if (poi.type === "Hospital") {
                  return hospitalIcon;
                } else if (poi.type === "University") {
                  return universityIcon;
                }
              }
              return (
                <Marker
                  key={poi.id}
                  position={[
                    poi.location.coordinates[0],
                    poi.location.coordinates[1],
                  ]}
                  icon={PoiIcon()}
                >
                  <Popup>{poi.name}</Popup>
                </Marker>
              );
            })}
            <TheMapComponent />
          </MapContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListingOwnerDetail;
