import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import ListingsMap from "./ListingsMap";
import ListingsList from "./ListingsList";

function Listings() {
  const navigate = useNavigate();
  const isOwner = useSelector((state) => state.auth.isOwner);
  const [FlyToMap, setFlyToMap] = useState([]);

  useEffect(() => {
    if (isOwner) {
      navigate("/owner/home");
    }
  }, [isOwner, navigate]);

  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const response = await Axios.get(
          "https://mikos03.onrender.com/api/listings/",
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
          <ListingsList onFlyToMap={setFlyToMap} />
        </Grid>

        <Grid item lg={6.5} md={5.5} sm={12} xs={12}>
          <ListingsMap
            allListings={allListings}
            flyTo={FlyToMap}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Listings;
