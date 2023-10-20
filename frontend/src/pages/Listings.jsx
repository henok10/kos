import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
// React leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
// MUI
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  CardActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

// Map icons
import houseIconPng from "../data/Mapicons/house.png";

const useStyles = makeStyles({
  cardStyle: {
    overflow: "hidden",
    border: "4px solid white",
    width: "98%",
    position: "relative",
    height: "21rem",
    marginBottom: "0.5rem",
  },

  pictureStyle: {
    height: "10rem",
    cursor: "pointer",
  },
  priceLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "skyblue",
    height: "8px",
  },
});
function Listings() {
  const navigate = useNavigate();
  const classes = useStyles();

  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });

  const initialState = {
    mapInstance: null,
  };

  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "getMap":
        draft.mapInstance = action.mapData;
        break;
      default:
        return draft;
    }
  }
  
  function TheMapComponents() {
    const map = useMap();
    useEffect(() => {
      dispatch({ type: "getMap", mapData: map });
    }, [map]);
    return null;
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  const [allListings, setAllListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const setSearchResults = useState([]);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "https://mykos2.onrender.com/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllListings();
    return () => {
      source.cancel();
    };
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    setSearchResults(allListings);
  }

  function fuzzySearch(needle, haystack) {
    // Split the search term into words
    const words = needle.toLowerCase().split(" ");

    // Check if any of the words match any part of the haystack
    return words.every((word) => {
      return haystack.toLowerCase().includes(word);
    });
  }

  const filteredListings = allListings.filter((listing) => {
    return (
      fuzzySearch(searchTerm, listing.title) ||
      // fuzzySearch(searchTerm, listing.price_month) ||
      fuzzySearch(searchTerm, listing.description) ||
      fuzzySearch(searchTerm, listing.borough)
    );
  });

  if (dataIsLoading === true) {
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
    <>
      <Grid
        container
        paddingTop={"0.5rem"}
        display="flex"
        boxSizing="border-box"
        marginTop={2}
      >
        <Grid item lg={5.5} md={5.5} sm={12}>
          <Grid item xs={12} padding="0.5rem">
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                // width: '100%',
                paddingLeft: "0.8rem",
              }}
              onSubmit={handleSearch}
            >
              <InputBase
                style={{ height: "100%" }}
                id="outlined-basic"
                placeholder="Silakan Cari Di Sini..."
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          <Grid container padding="0.5rem" spacing={0}>
            {filteredListings.slice(0, 10).map((listing) => {
              return (
                <Grid item key={listing.id} xs={12} sm={6} md={12} lg={6}>
                  <Card key={listing.id} className={classes.cardStyle}>
                    <CardMedia
                      className={classes.pictureStyle}
                      component="img"
                      height="160"
                      image={listing.picture1}
                      alt={listing.title}
                      onClick={() => navigate(`/listings/${listing.id}`)}
                    />
                    <CardHeader
                      title={
                        <Typography
                          gutterBottom
                          variant="h6"
                          style={{ fontSize: "18px" }}
                        >
                          {listing.title.substring(0, 36)}
                        </Typography>
                      }
                      action={
                        <IconButton
                          aria-label="settings"
                          onClick={() => {
                            if (state.mapInstance) {
                              state.mapInstance.flyTo(
                                [listing.latitude, listing.longitude],
                                18
                              );
                            }
                          }}
                        >
                          <RoomIcon />
                        </IconButton>
                      }
                    />
                    <CardContent style={{ marginTop: "-30px" }}>
                      <Typography
                        gutterBottom
                        variant="body4"
                        component="div"
                        style={{ fontSize: "13px" }}
                      >
                        {listing.address.substring(0, 90)}...
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                      }}
                    >
                      <Box
                        width="100%"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "2px",
                        }}
                      >
                        <Typography
                          className={classes.priceLabel}
                          component="span"
                        >
                          {listing.price_month
                            ? `Rp${listing.price_month.toLocaleString(
                                "id-ID"
                              )}/bulan`
                            : "Harga tidak tersedia"}
                        </Typography>

                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => navigate(`/listings/${listing.id}`)}
                        >
                          Details
                        </Button>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item lg={6.5} md={5.5} sm={12} xs={12}>
          <Box position="sticky" top="0">
            <Box backgroundColor="white" height="70vh" border="8px solid white">
              <div style={{ height: "100%" }}>
                <MapContainer
                  center={[-5.133746047427556, 119.4875580004916]}
                  zoom={16}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {allListings.map((listing) => {
                    return (
                      <Marker
                        key={listing.id}
                        icon={houseIcon}
                        position={[listing.latitude, listing.longitude]}
                      >
                        <Popup>
                          <Typography variant="h5">{listing.title}</Typography>
                          <img
                            alt="popup"
                            src={listing.picture1}
                            style={{
                              height: "14rem",
                              width: "18rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate(`/listings01/${listing.id}`)
                            }
                          />
                          <Typography variant="body1">
                            {listing.description.substring(0, 150)}...
                          </Typography>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() =>
                              navigate(`/listings01/${listing.id}`)
                            }
                          >
                            Details
                          </Button>
                        </Popup>
                      </Marker>
                    );
                  })}
                  <TheMapComponents />
                </MapContainer>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Listings;
