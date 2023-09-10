import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";

import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-routing-machine";
// import { useMap } from 'react-leaflet';
import { useImmerReducer } from "use-immer";
// Assets
import stadiumIconPng from "../data/Mapicons/stadium.png";
import hospitalIconPng from "../data/Mapicons/hospital.png";
import universityIconPng from "../data/Mapicons/university.png";
// React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import {
  Grid,
  Typography,
  CircularProgress,
  Breadcrumbs,
  Link,
  Box,
  Stack,
  Button,
  Paper,
} from "@mui/material";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import RoomIcon from "@mui/icons-material/Room";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AssistantDirectionIcon from "@mui/icons-material/AssistantDirection";
import TheMapComponent from "../components/TheMapComponent";
import { choices } from "../components/Choice";

import { makeStyles } from "@mui/styles";
import Review from "../components/Review";
import ReviewMessage from "../components/ReviewMessage";

const useStyles = makeStyles({
  sliderContainer: {
    position: "relative",
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

function ListingDetail() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const [allFasilitas, setAllFasilitas] = useState([]);
  const [allKamar, setAllKamar] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isCustomer) {
    navigate("/");
  }

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
    orderInfo: "",
    openSnack: false,
    disabledBtn: false,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        break;

      case "catchUserOrderInfo":
        draft.orderInfo = action.orderObject;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;

      case "catchUserProfileInfo":
        draft.userProfileInfo = action.profileObject;
        draft.phoneNumbers = action.profileObject.phone_number;
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
  useEffect(() => {
    async function GetKamarInfo() {
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
    GetKamarInfo();
  }, [params.id, dispatch]);

  // request to get profile info
  useEffect(() => {
    if (state.listingInfo) {
      async function GetListingInfo() {
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
      GetListingInfo();
    }
  }, [state.listingInfo, dispatch]);

  // / request to get profile info
  const [numItemsBoughtByListingId, setNumItemsBoughtByListingId] = useState(
    {}
  );
  useEffect(() => {
    async function GetAllOrderKos() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/transaction/${params.id}/user`
        );
        const data = response.data;
        
      } catch (error) {}
    }
    GetAllOrderKos();
  }, [params.id]);

  useEffect(() => {
    async function GetFasilitasInfo() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/fasilitas-rumah/${params.id}/`
        );
        const data = response.data;
        setAllFasilitas(data);
      } catch (e) {}
    }
    GetFasilitasInfo();
  }, [params.id]);

  useEffect(() => {
    async function GetAllKamar() {
      try {
        const totalRoomsByListing = {};
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/kamar/${params.id}/`
        );
        const dataKamar = response.data;
        const totalRooms = dataKamar.length;
        totalRoomsByListing[params.id] = totalRooms;
        setAllKamar(totalRoomsByListing);

        const numItemsBought = dataKamar.filter(
          (transaksi) => transaksi.barang_dipesan
        ).length;
       
        setNumItemsBoughtByListingId(numItemsBought);
      } catch (error) {
        // Tangani error jika diperlukan
        console.error("Error:", error);
      }
    }

    GetAllKamar();
  }, []); // Tambah

  const kamarKosongByListingId = {};

  const totalKamar = allKamar[params.id];
  const kamarDibeli = numItemsBoughtByListingId;
  const kamarKosong = totalKamar - kamarDibeli;

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

  const roomsLeft = state.listingInfo.rooms - numItemsBoughtByListingId;

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

  function GoogleMapsShortcut() {
    const url = `https://www.google.com/maps/search/?api=1&query=${state.listingInfo.latitude},${state.listingInfo.longitude}`;
    window.open(url, "_blank");
  }
  const handleWhatsApp = () => {
    const phoneNumber = state.phoneNumbers;
    const message = encodeURIComponent(
      `Halo, saya ingin memesan kamar kos (${state.listingInfo.title})`
    );
    const formattedPhoneNumber = phoneNumber.startsWith("0")
      ? `62${phoneNumber.substr(1)}`
      : phoneNumber;
    console.log(formattedPhoneNumber);
    window.open(
      `https://wa.me/${formattedPhoneNumber}?text=${message}`,
      "_blank"
    );
  };

  useEffect(() => {
    if (state.openSnack) {
      setTimeout(() => {
        navigate("/listings");
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
      style={{ margin: 'auto', width: '80%', marginBottom: "2rem" }}
    >
      <Grid item style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/listings")}
            style={{ cursor: "pointer" }}
          >
            Rumah
          </Link>

          <Typography color="text.primary">
            {state.listingInfo.title}
          </Typography>
        </Breadcrumbs>
      </Grid>
      {/* information */}
      <Grid container>
        <Grid
          item
          lg={7.5}
          md={7.5}
          sm={12}
          xs={12}
          width={"100%"}
          backgroundColor="#F8F8FF"
        >
          <Grid
            item
            container
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              // marginTop: "1rem",
              width: "100%",
            }}
          >
            <Grid item container xs={12} direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">{state.listingInfo.title}</Typography>
              </Grid>
              <Grid item>
                <Typography varaiant="h6">
                  <RoomIcon /> {state.listingInfo.borough} | {formattedDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Alamat */}

          <Grid
            item
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              marginTop: "0.3rem",
            }}
          >
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Alamat :
            </Typography>
            {state.listingInfo.address ? (
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                {state.listingInfo.address}
              </Typography>
            ) : (
              ""
            )}
          </Grid>

          <Grid
            item
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              marginTop: "0.3rem",
            }}
          >
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              No Rekening :
            </Typography>
            {state.listingInfo.no_rekening ? (
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                {state.listingInfo.no_rekening}
              </Typography>
            ) : (
              ""
            )}
          </Grid>
          <Grid
            item
            container
            style={{
              padding: "1rem",
              borderBottom: "1px solid gray",
              marginTop: "0.3rem",
              width: "100%",
            }}
          >
            <div>
              <Typography variant="h6" style={{ fontSize: "16px" }}>
                Kamar Yang Tersedia :
              </Typography>
              <Typography variant="body1" style={{ fontSize: "15px" }}>
                {kamarKosong} Rooms
              </Typography>
            </div>
          </Grid>

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
          <Grid>
            {/* Description */}
            {state.listingInfo.description ? (
              <Grid
                item
                style={{
                  padding: "1rem",
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

        <Grid
          item
          lg={4.5}
          md={4.5}
          sm={12}
          xs={12}
          width={"100%"}
          style={{ paddingLeft: "0.5rem" }}
        >
          {/* Image slider */}
          <Box position="sticky" top="0">
            <Paper style={{ border: "2px solid white", backgroundColor: "#F8F8FF" }}>
              {listingPictures.length > 0 ? (
                <Box>
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
                              alt="gambarrumah"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // Adjusts image to cover the container while maintaining aspect ratio
                              }}
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
            </Paper>
            <Paper
              style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem", backgroundColor: "#F8F8FF" }}
            >
              <Grid item container xs={12} alignItems="center">
                <Typography
                  variant="h6"
                  style={{
                    fontWeight: "bolder",
                    color: "black",
                    fontSize: "14px",
                  }}
                >
                  Harga Rp{state.listingInfo.price_per_month}/tahun
                  {/* Rp{state.listingInfo.price_per_month}/Month
                Rp{state.listingInfo.price_per_day}/Day */}
                </Typography>
              </Grid>
              <Grid item container marginTop={"1rem"} justifyContent='space-between' >
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  // onClick={() => navigate(`/order/${state.listingInfo.id}`)}
                  onClick={() =>
                    navigate(`/pesan_kamar/${state.listingInfo.id}`)
                  }
                  style={{width: '48%'}}
                >
                  Pesan Kamar
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outlined"
                  color="success"
                  size="small"
                  style={{ marginLeft: "0.5rem", width: '48%' }}
                >
                  Chat Pemilik Kos
                </Button>
              </Grid>
            </Paper>
          </Box>
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
        <Grid item lg={3} md={3} sm={12} xs={12} style={{ overflow: "auto" }}>
          {state.listingInfo.listing_pois_within_10km.slice(0, 4).map((poi) => {
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
          <Button
            onClick={GoogleMapsShortcut}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
              padding: "10px 20px",
              marginTop: "0.5rem",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            startIcon={<AssistantDirectionIcon />}
          >
            google maps
          </Button>
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} style={{ height: "35rem" }}>
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
      <Grid
        item
        container
        width={"60%"}
        margin={"auto"}
        borderTop={"1px solid gray"}
        marginTop={"1rem"}
      >
        <Grid width={"80%"} margin={"auto"}>
          <Typography
            variant={"h4"}
            style={{ marginTop: "2rem", textAlign: "center" }}
          >
            Review
          </Typography>
          <Box padding={"2px"} border={"2px solid white"}>
            <Review />
          </Box>
          <Box style={{ width: "100%", marginTop: "2rem" }}>
            <ReviewMessage />
          </Box>
        </Grid>
        <Box style={{ borderBottom: "1px solid gray", width: "100%" }} />
      </Grid>
    </div>
  );
}

export default ListingDetail;
