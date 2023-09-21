import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import city from "../data/minions.png";
import Search from "./Search";
import Axios from "axios";
import { Grid, CircularProgress, Box } from "@mui/material";
import Listing from "./HomeListing";

const useStyles = makeStyles(() => ({
  hero: {
    backgroundImage: `url(${city})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "65vh",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Tambahkan ini agar elemen <Search /> berada di tengah
  },
  searchWrapper: {
    marginTop: "240px", // Atur jarak antara gambar dan elemen <Search />
  },
}));

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
      } catch (error) {
        // Tangani error dengan baik di sini
        console.error("Error fetching data: ", error);
      }
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
      <Grid container justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <>
      <Grid contained >
        <Grid item xs={12} className={classes.hero}>
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
            position="relative"
            marginTop="10rem"
          >
            <h1>Recent Rumah Kos Listed</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
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
