import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import { Grid, Typography, CircularProgress, Box, Button } from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RoomIcon from "@mui/icons-material/Room";
import TheMapComponent from "../components/TheMapComponent";
import { makeStyles } from "@mui/styles";
import { choices } from "../components/Choice";
import ErrorIcon from "@mui/icons-material/Error";

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
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOwner = useSelector((state) => state.auth.isOwner);
  const [allRule, setAllRule] = useState([]);

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

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  // request to get listing info
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

  // request to get profile info
  useEffect(() => {
    if (state.listingInfo) {
      async function GetProfileInfo() {
        try {
          const response = await Axios.get(
            `https://mikos03.onrender.com/api/profiles/owner/${state.listingInfo.user}/`
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
  }, [state.listingInfo, dispatch]);

  const [allFasilitas, setAllFasilitas] = useState([]);
  const [loadingFasilitas, setLoadingFasilitas] = useState(true);
  const [errorFasilitas, setErrorFasilitas] = useState(null);

  useEffect(() => {
    if (state.listingInfo) {
      async function GetFasilitasInfo() {
        try {
          const response = await Axios.get(
            `https://mikos03.onrender.com/api/fasilitas-rumah/${state.listingInfo.id}/`
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


  useEffect(() => {
    async function GetRuleInfo() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/rule-rumah/${params.id}/`
        );
        const data = response.data;
        setAllRule(data);
      } catch (e) {}
    }
    GetRuleInfo();
  }, [params.id]);

  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture !== null);

  const [currentPicture, setCurrentPicture] = useState(0);

  const { choice_kamar, choice_rumah } = choices();

  function getIconUrl(value) {
    const kamarIcon = choice_kamar.find((item) => item.value === value);
    const rumahIcon = choice_rumah.find((item) => item.value === value);

    if (kamarIcon) {
      return kamarIcon.icon;
    } else if (rumahIcon) {
      return rumahIcon.icon;
    } else {
      return ""; // Return a default icon URL or an empty string
    }
  }

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
  }, [state.openSnack, navigate]);

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
                Rp{state.listingInfo.price_month}/Month
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
            item
            justifyContent="flex-start"
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              marginTop: "0.3rem",
            }}
          >
            <Grid>
              <div>
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Fasilitas :
                </Typography>
              </div>

              <Grid container>
                <Grid item xs={12} md={6} style={{ paddingRight: "1rem" }}>
                  {allFasilitas.slice(0, 4).map((listing, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <img
                        src={getIconUrl(listing.name)}
                        alt={listing.name}
                        style={{
                          marginLeft: "0.5rem",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <Typography style={{ marginLeft: "6px" }}>
                        {listing.name}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              marginTop: "0.3rem",
            }}
          >
            <Grid>
              <div>
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Peraturan Rumah Kos :
                </Typography>
              </div>

              <Grid container>
                <Grid item xs={12} md={12} style={{ paddingRight: "1rem" }}>
                  {allRule.slice(0, 4).map((rule, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <ErrorIcon
                        style={{
                          marginLeft: "0.5rem",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <Typography style={{ marginLeft: "6px" }}>
                        {rule.aturan}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
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
                          alt="gambar1"
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

              const lonDiff = longitude2 - longitude1;
              const R = 6371000 / 1000;

              // const a =
              //   Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
              //   Math.cos(latitude1) *
              //     Math.cos(latitude2) *
              //     Math.sin(lonDiff / 2) *
              //     Math.sin(lonDiff / 2);
              // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

              // const d = R * c;

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
                style={{
                  marginBottom: "0.5rem",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="h6">{poi.name}</Typography>
                <Typography variant="subtitle1">
                  {poi.type} |{" "}
                  <span style={{ fontWeight: "bolder", color: "black" }}>
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
            <TheMapComponent listingInfo={state.listingInfo} />
          </MapContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default ListingOwnerDetail;
