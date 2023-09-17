import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Grid, CircularProgress, Box } from "@mui/material";
import Listing from "./HomeListing";
import HomeImg from "./HomeImg";

function HouseList() {
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
      <Grid container width="80%" margin="auto">
        <Grid item xs={12}>
          <Grid container spacing={1} marginTop="17rem">
            <Box textAlign="center">
              <h1>Recent Rumah Kos Listed</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
            </Box>
            <Listing filtered={filtered} isLoading={dataIsLoading} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HouseList;
