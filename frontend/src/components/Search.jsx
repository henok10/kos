// Search.jsx
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import Slider, { SliderThumb } from "@mui/material/Slider";
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
import { styled } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "32px",
    margin: "auto",
    textAlign: "center",
    color: "white",
  },
  subtitle: {
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    margin: "auto",
    textAlign: "center",
  },
  form: {
    padding: "0",
    margin: "100px auto",
    maxWidth: "70%",
    height: "75%",
    marginBottom: 0,
    backgroundColor: "white",
  },
  box: {
    margin: "20px",
  },
  label: {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "16px",
    margin: "10px 0",
    color: "lightblue",
  },
  heading: {
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "48px",
    margin: "10px",
  },
  textField: {
    height: "50%",
  },
}));

function Search({ setSearchResults }) {
  const [cityArea, setCityArea] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const classes = useStyles();

  const handleSearch = () => {
    // Menggabungkan nilai cityArea dan priceRange menjadi satu objek
    console.log("City/Area:", cityArea);
    console.log("Price Range:", priceRange);
    const searchFilter = {
      cityArea,
      priceRange,
    };

    setSearchResults(searchFilter);
  };

  function ValueLabelComponent(props) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };

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

  const AirbnbSlider = styled(Slider)(({ theme }) => ({
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
    "& .MuiSlider-rail": {
      color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
      opacity: theme.palette.mode === "dark" ? undefined : 1,
      height: 3,
    },
  }));

  AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
  };

  return (
    <>
      <Container>
        <Box className={classes.title}>
          <Typography style={{ margin: "auto", textAlign: "center" }}>
            <Typography className={classes.heading} variant="h1">
              Search Rumah Kos
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle1">
              Find new &amp; featured property located in your local city.
            </Typography>
          </Typography>
        </Box>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4.5}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  City/area
                </Typography>
                <Paper>
                  <TextField
                    style={{ height: "50%" }}
                    id="outlined-basic"
                    label="City/Street..."
                    size="small"
                    fullWidth
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    select
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="tamalanrea">tamalanrea</MenuItem>
                    {/* Tambahkan pilihan kota lainnya di sini */}
                  </TextField>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={4.5}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  Price
                </Typography>
                <AirbnbSlider
                  value={priceRange}
                  slots={{ thumb: AirbnbThumbComponent }}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  min={0}
                  max={15000000}
                  step={500000}
                  size="small"
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Box className={classes.box}>
                <Typography
                  className={classes.label}
                  variant="body1"
                  style={{ textAlign: "center" }}
                >
                  Filter
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  style={{ margin: "auto", display: "block" }}
                  color="primary"
                  onClick={handleSearch}
                >
                  <i className="fa fa-search">Search</i>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default Search;
