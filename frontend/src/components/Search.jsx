// Search.jsx
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Axios from "axios";
import Slider, { SliderThumb } from "@mui/material/Slider";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  MenuItem,
  TextField,
} from "@mui/material";

const useStyles = makeStyles(() => {
  const baseTypography = {
    fontFamily: "Arial, sans-serif",
  };

  return {
    form: {
      display: "flex",
      alignItems: "center",
      marginTop: "25px",
      padding: "35px",
      margin: "auto",
      width: "90%",
      borderRadius: "30px",
      backgroundColor: "white",
    },
    box: {
      width: "100%",
      padding: "5px",
    },
    label: {
      ...baseTypography,
      fontWeight: "bold",
      fontSize: "16px",
      // margin: "10px 0",
      color: "lightblue",
    },
    textField: {
      height: "50%",
    },
    styleSlider: {
      color: "#3a8589",
      height: 3,
      padding: "13px 0",
      "& .MuiSlider-thumb": {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        "&:hover": {
          boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
        },
        "& .airbnb-bar": {
          height: 9,
          width: 1,
          backgroundColor: "currentColor",
          marginLeft: 1,
          marginRight: 1,
        },
      },
      "& .MuiSlider-track": {
        height: 3,
      },
    },
  };
});

function Search({ setSearchResults, filtered, dataIsLoading }) {
  const [cityArea, setCityArea] = useState("");
  const [poi, setPoi] = useState("");
  const [poiList, setPoiList] = useState([]);
  const [listingList, setListingList] = useState([]);
  const [priceRange, setPriceRange] = useState([1000000, 4000000]); // Nilai default

  const classes = useStyles();

  const handleSearch = () => {
    const searchFilter = {
      cityArea,
      priceRange,
      poi,
    };

    setSearchResults(searchFilter);
  };

  useEffect(() => {
    async function GetPoiList() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/poi-list`
        );

        const data = response.data;
        setPoiList(data);
      } catch (e) {}
    }
    GetPoiList();
  }, []);

  useEffect(() => {
    async function GetListingList() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/listings/`
        );

        const data = response.data;
        setListingList(data);
      } catch (e) {}
    }
    GetListingList();
  }, []);
  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }
  return (
    <Grid container marginBottom={0}>
      <Grid item sm={12} md={12} lg={12} width="100%">
        <form className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  City/area
                </Typography>
                <Box>
                  <Autocomplete
                    id="area-select"
                    size="small"
                    fullWidth
                    value={cityArea  || ""}
                    onChange={(e, newValue) => setCityArea(newValue)}
                    options={[
                      "", // Tambahkan opsi kosong
                      ...new Set(
                        listingList.map((listingItem) => listingItem.borough)
                      ),
                    ]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pilih City/Area"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  Point of Interest
                </Typography>
                <Box>
                  <Autocomplete
                    id="poi-select"
                    size="small"
                    fullWidth
                    value={poi || ""} // Menambahkan opsi kosong jika poi kosong
                    onChange={(e, newValue) => setPoi(newValue)}
                    options={[
                      "", // Tambahkan opsi kosong
                      ...new Set(poiList.map((poiItem) => poiItem.name)),
                    ]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Pilih PoI"
                        variant="outlined"
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  Price
                </Typography>
                <Slider
                  className={classes.styleSlider}
                  value={priceRange}
                  onChange={(event, newPrice) => setPriceRange(newPrice)}
                  min={0}
                  max={10000000}
                  step={500000}
                  size="small"
                  valueLabelDisplay="auto"
                  slots={{ thumb: AirbnbThumbComponent }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Box className={classes.box}>
                <Typography
                  className={classes.label}
                  variant="body1"
                  style={{ textAlign: "center" }}
                >
                  Filter
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    margin: "auto",
                    display: "block",
                    width: "8rem",
                  }}
                  color="primary"
                  onClick={handleSearch}
                >
                  search
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default Search;
