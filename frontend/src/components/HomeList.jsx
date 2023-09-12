import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Grid, CircularProgress, Box } from "@mui/material";
import Listing from "./HomeListing";
import HomeImg from "./HomeImg";

function HouseList() {
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [filtered, setFiltered] = useState([]); // Perubahan: Mengganti nama state menjadi 'filtered'

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

  useEffect(() => {
    let filteredListings = [];

    if (
      Array.isArray(searchResults.cityArea) ||
      Array.isArray(searchResults.priceRange)
    ) {
      // Pemfilteran berdasarkan City/Area dan Price
      filteredListings = allListings.filter((listing) => {
        if (Array.isArray(searchResults.cityArea)) {
          if (
            !listing.cityArea
              .toLowerCase()
              .includes(searchResults.cityArea.toLowerCase())
          ) {
            return false;
          }
        }

        if (Array.isArray(searchResults.priceRange)) {
          const price_month = parseInt(listing.price_month);
          const price_day = parseInt(listing.price_day);
          const price_year = parseInt(listing.price_year);

          if (
            (price_month < searchResults.priceRange[0] ||
              price_month > searchResults.priceRange[1]) &&
            (price_day < searchResults.priceRange[0] ||
              price_day > searchResults.priceRange[1]) &&
            (price_year < searchResults.priceRange[0] ||
              price_year > searchResults.priceRange[1])
          ) {
            return false;
          }
        }

        return true;
      });
    } else {
      filteredListings = allListings;
    }

    setFiltered(filteredListings);
  }, [allListings, searchResults]);

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
      <HomeImg setSearchResults={setSearchResults} />
      <Grid container width="80%" margin={"auto"}>
        <Grid item xs={12}>
          <Grid container spacing={1} marginTop="10rem">
            <Box textAlign="center">
              <h1>Recent Rumah Kos Listed</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </Box>
            {/* Ubah properti yang dikirimkan menjadi filtered */}
            <Listing filtered={filtered} isLoading={dataIsLoading} />
          </Grid>
          <div></div>
        </Grid>
      </Grid>
    </>
  );
}

export default HouseList;
