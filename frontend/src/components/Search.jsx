// Search.jsx
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
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

const useStyles = makeStyles(() => {
  const baseTypography = {
    fontFamily: "Arial, sans-serif",
  };

  return {
    title: {
      ...baseTypography,
      fontWeight: "bold",
      fontSize: "32px",
      margin: "auto",
      marginTop: "18rem",
      textAlign: "center",
      color: "white",
    },
    heading: {
      ...baseTypography,
      fontWeight: "bold",
      fontSize: "48px",
      marginTop: "10px",
    },
    subtitle: {
      ...baseTypography,
      fontSize: "16px",
      margin: "auto",
      textAlign: "center",
    },
    form: {
      marginTop: "50px",
      paddingLeft: "40px",
      paddingRight: "40px",
      margin: "auto",
      width: "90%", // Lebar default saat layar penuh
      height: "55%",
      marginBottom: 0,
      backgroundColor: "white",
    },
    box: {
      margin: "15px",
    },
    label: {
      ...baseTypography,
      fontWeight: "bold",
      fontSize: "16px",
      margin: "10px 0",
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

function Search({ setSearchResults }) {
  const [cityArea, setCityArea] = useState("");
  const [poi, setPoi] = useState("");
  const [poiList, setPoiList] = useState([])
  const [priceRange, setPriceRange] = useState([0, 4000000]); // Nilai default

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
          `https://mykos2.onrender.com/api/poi-list`
        );

       data = response.data
       setPoiList(data)
      } catch (e) {}
    }
    GetPoiList();
  }, [params.rumah, dispatch]);
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

  // AirbnbThumbComponent.propTypes = {
  //   children: PropTypes.node,
  // };

  return (
    <>
      <Container style={{}}>
        <Box className={classes.title}>
          <Typography style={{ margin: "auto", textAlign: "center", marginTop: '5rem' }}>
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
            <Grid item xs={12} sm={12} md={3}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  City/area
                </Typography>
                <Box>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    fullWidth
                    value={cityArea}
                    onChange={(e) => setCityArea(e.target.value)}
                    select
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="tamalanrea">tamalanrea</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
              <Box className={classes.box}>
                <Typography className={classes.label} variant="body1">
                  Point of Interest
                </Typography>
                <Box>
                  <TextField
                    id="outlined-basic"
                    size="small"
                    fullWidth
                    value={poi}
                    onChange={(e) => setPoi(e.target.value)}
                  >
                   {poiList}
                  </TextField>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={3}>
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
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  slots={{ thumb: AirbnbThumbComponent }}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={3}
            >
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
                  style={{ margin: "auto", display: "block", width: '8rem' }}
                  color="primary"
                  onClick={handleSearch}
                >
                  search
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
