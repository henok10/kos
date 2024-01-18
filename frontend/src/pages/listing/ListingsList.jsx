import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Paper,
  InputBase,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  CardActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

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
    fontSize: "12px",
    fontWeight: "bold",
    color: "skyblue",
    height: "8px",
  },
});

const ListingsList = ({ onFlyToMap }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [allListings, setAllListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "https://mikos03.onrender.com/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setSearchResults(response.data);
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
    const words = needle.toLowerCase().split(" ");
    return words.every((word) => {
      return haystack.toLowerCase().includes(word);
    });
  }

  const filteredListings = searchResults.filter((listing) => {
    return (
      fuzzySearch(searchTerm, listing.title) ||
      fuzzySearch(searchTerm, listing.address) ||
      fuzzySearch(searchTerm, listing.borough)
    );
  });

  const handleFlyTo = (listing) => {
    onFlyToMap(listing);
  };

  return (
    <>
      <Grid item xs={12} padding="0.5rem">
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
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
                      style={{ fontSize: "16px" }}
                    >
                      {listing.title.substring(0, 35)}
                    </Typography>
                  }
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleFlyTo(listing)}
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
                    style={{ fontSize: "11px" }}
                  >
                    {listing.address.substring(0, 90)}...
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    backgroundColor: "white",
                    zIndex: 99,
                  }}
                >
                  <Box
                    width="100%"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "2px",
                    }}
                  >
                    <Typography
                      className={classes.priceLabel}
                      component="span"
                      zIndex={99}
                      style={{ fontSize: "14px" }}
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
    </>
  );
};

export default ListingsList;
