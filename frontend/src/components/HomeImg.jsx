import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
// import city from "../data/minions.png";
import image from "../data/image.jpeg";
import Search from "./Search";
import Axios from "axios";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import Listing from "./HomeListing";

const useStyles = makeStyles(() => {
  const baseTypography = {
    fontFamily: "Arial, sans-serif",
  };

  return {
    hero: {
      backgroundImage: `url(${image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "100%",
      height: "65vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center", // Menengahkan elemen <Search />
    },
    searchWrapper: {
      marginTop: "240px", // Atur jarak antara gambar dan elemen <Search />
    },
    title: {
      ...baseTypography,
      fontWeight: "bold",
      margin: "auto",
      textAlign: "center",
      color: "white",
    },
    heading: {
      ...baseTypography,
      fontWeight: "bold",
      textAlign: "center",
    },
    subtitle: {
      ...baseTypography,
      fontSize: "16px",
      margin: "auto",
      textAlign: "center",
    },
  };
});

const HomeImg = () => {
  // Ganti setSearchTerm menjadi setSearchResults
  const classes = useStyles();
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    async function getAllListings() {
      try {
        const response = await Axios.get(
          "https://mykos2.onrender.com/api/listings/",
          { cancelToken: source.token }
        );

        setAllListings(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }

    getAllListings();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const filterListings = () => {
      const filteredListings = allListings.filter((listing) => {
        const cityAreaMatch =
          !searchResults.cityArea ||
          listing.borough
            .toLowerCase()
            .includes(searchResults.cityArea.toLowerCase());

        const priceMatch =
          !searchResults.priceRange ||
          (parseInt(listing.price_month) >= searchResults.priceRange[0] &&
            parseInt(listing.price_month) <= searchResults.priceRange[1]) ||
          (parseInt(listing.price_day) >= searchResults.priceRange[0] &&
            parseInt(listing.price_day) <= searchResults.priceRange[1]) ||
          (parseInt(listing.price_year) >= searchResults.priceRange[0] &&
            parseInt(listing.price_year) <= searchResults.priceRange[1]);

        const poiMatch =
          !searchResults.poi ||
          searchResults.poi.length === 0 ||
          listing.listing_pois_within_10km.some((poi) =>
            poi.name.toLowerCase().includes(searchResults.poi.toLowerCase())
          );

        return cityAreaMatch && priceMatch && poiMatch;
      });

      setFiltered(filteredListings);
    };

    filterListings();
  }, [allListings, searchResults]);

  if (dataIsLoading) {
    return (
      <Grid container style={{display:"flex", justifyContent:"center", margin: "auto", alignItems:"center", height:"100%"}}>
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12} className={classes.hero}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className={classes.title}>
              <Box
                style={{
                  marginTop: "25rem",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Typography
                  style={{ fontWeight: "bold" }}
                  className={classes.heading}
                  variant="h2"
                >
                  Search Rumah Kos
                </Typography>
                <Typography className={classes.subtitle} variant="subtitle1">
                  Find new &amp; featured property located in your local city.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          style={{
            display: "flex",
            margin: "-5rem auto 0",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <Search
            setSearchResults={setSearchResults}
            filtered={filtered}
            isLoading={dataIsLoading}
          />{" "}
        </Grid>

        <Grid item xs={12}>
          <Grid
            textAlign="center"
            width="80%"
            margin="auto"
            // position="relative"
            marginTop="5rem"
          >
            <Typography variant="h4">Recent Rumah Kos Listed</Typography>

            <Typography variant="body">
              {" "}
              Mencari tempat tinggal sementara dengan nyaman dan sesuai kebutuhan
            </Typography>
          </Grid>
          <Grid container width="80%" margin="auto">
            <Listing filtered={filtered} isLoading={dataIsLoading} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeImg;
