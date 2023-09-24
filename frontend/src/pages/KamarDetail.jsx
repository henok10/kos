import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { makeStyles } from "@mui/styles";
import { useImmerReducer } from "use-immer";
import RoomIcon from "@mui/icons-material/Room";
import { choices } from "../components/Choice";

// MUI
import { Grid, Typography, CircularProgress, Box, Paper } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const useStyles = makeStyles({
  sliderContainer: {
    position: "relative",
  },

  leftArrow: {
    borderRadius: "100%",
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    left: "27.5%",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  rightArrow: {
    position: "absolute",
    borderRadius: "100%",
    cursor: "pointer",
    fontSize: "3rem",
    color: "white",
    top: "50%",
    right: "27.5%",
    "&:hover": {
      backgroundColor: "white",
    },
  },
});

function KamarDetail() {
  const classes = useStyles();
  const params = useParams();
  const [allFasilitas, setAllFasilitas] = useState([]);
  const [allRule, setAllRule] = useState([]);
  const initialState = {
    dataIsLoading: true,
    kamarInfo: "",
    listingInfo: "",
  };
  function ReducerFuction(draft, action) {
    switch (action.type) {
      case "catchKamarInfo":
        draft.kamarInfo = action.kamarObject;
        break;

      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
        break;

      case "loadingDone":
        draft.dataIsLoading = false;
        break;

      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFuction, initialState);

  useEffect(() => {
    async function GetKamarInfo() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/kamar/${params.id}/detail/`
        );

        dispatch({
          type: "catchKamarInfo",
          kamarObject: response.data,
        });
      } catch (e) {}
    }
    GetKamarInfo();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (state.kamarInfo) {
      async function GetListingInfo() {
        try {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/listings/${state.kamarInfo.rumah}/`
          );

          dispatch({
            type: "catchListingInfo",
            listingObject: response.data,
          });
          dispatch({ type: "loadingDone" });
        } catch (e) {}
      }
      GetListingInfo();
    }
  }, [state.kamarInfo, dispatch]);

  useEffect(() => {
    if (state.kamarInfo) {
      async function GetFasilitasInfo() {
        try {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/fasilitas-kamar/${state.kamarInfo.id}/`
          );

          const data = response.data;
          setAllFasilitas(data);
        } catch (e) {}
      }
      GetFasilitasInfo();
    }
  }, [state.kamarInfo]);
  console.log(allFasilitas);

  useEffect(() => {
    if (state.kamarInfo) {
      async function GetRuleInfo() {
        try {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/rule-kamar/${state.kamarInfo.id}/`
          );
          const data = response.data;
          setAllRule(data);
        } catch (e) {}
      }
      GetRuleInfo();
    }
  }, [params.id]);

  const kamarPictures = [
    state.kamarInfo.picture_room,
    // state.kamarInfo.picture2,
    // state.kamarInfo.picture3,
    // state.kamarInfo.picture4,
    // state.kamarInfo.picture5,
  ].filter((picture) => picture !== null);

  const [currentPicture, setCurrentPicture] = useState(0);

  function NextPicture() {
    if (currentPicture === kamarPictures.length - 1) {
      return setCurrentPicture(0);
    } else {
      return setCurrentPicture(currentPicture + 1);
    }
  }

  function PreviousPicture() {
    if (currentPicture === 0) {
      return setCurrentPicture(kamarPictures.length - 1);
    } else {
      return setCurrentPicture(currentPicture - 1);
    }
  }
  const date = new Date(state.listingInfo.date_posted);
  const formattedDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  const { choice_kamar, choice_rumah } = choices();

  // Find the appropriate icon URL based on the value in allFasilitas array
  function getIconUrl(value) {
    const kamarIcon = choice_kamar.find((item) => item.value === value);
    const rumahIcon = choice_rumah.find((item) => item.value === value);

    if (kamarIcon) {
      return kamarIcon.icon;
    } else if (rumahIcon) {
      return rumahIcon.icon;
    } else {
      return ""; // Return a default icon URL or an empty string
    }
  }

  // console.log(state.kamarInfo.rumah)
  return (
    <div style={{ height: 550, margin: "auto", padding: "1rem" }}>
      <Grid
        container
        width={"80%"}
        margin="auto"
        marginTop="1rem"
        backgroundColor="#F8F8FF"
      >
        <Grid item lg={7} md={7} sm={12} xs={12}>
          <Grid
            style={{
              padding: "1rem",
              // marginTop: "1rem",
            }}
          >
            <Grid item container xs={12} direction="column" spacing={1}>
              <Grid item>
                <Typography variant="h6">{state.listingInfo.title}</Typography>
              </Grid>
              <Grid item>
                <Typography varaiant="h6">
                  <RoomIcon /> {state.listingInfo.borough} | {formattedDate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              paddingLeft: "1rem",
            }}
          >
            <Typography
              variant="h6"
              style={{ fontSize: "16px", display: "inline" }}
            >
              Alamat Kamar :
            </Typography>
            <p style={{ display: "inline", marginLeft: "4px" }}>
              {state.kamarInfo.address_room}
            </p>
          </Grid>

          <Grid
            item
            style={{
              paddingLeft: "1rem",
            }}
          >
            <Typography
              variant="h6"
              style={{ fontSize: "16px", display: "inline" }}
            >
              Ukuran Kamar :
            </Typography>
            <p style={{ display: "inline", marginLeft: "4px" }}>
              {state.kamarInfo.room_size}
            </p>
          </Grid>

          <Grid container style={{ paddingLeft: "1rem" }}>
            <Typography variant="h6" style={{ fontSize: "16px" }}>
              Fasilitas Kamar :
            </Typography>
            <Grid container>
              <Grid item xs={12} md={6} style={{ paddingRight: "1rem" }}>
                {allFasilitas.slice(0, 4).map((listing, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <img
                      src={getIconUrl(listing.name)}
                      alt={listing.name}
                      style={{
                        marginLeft: "0.5rem",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                    <Typography style={{ marginLeft: "6px" }}>
                      {listing.name}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{
              padding: "1rem",
              marginTop: "0.3rem",
            }}
          >
            <Grid>
              <div>
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Peraturan Kamar Kos :
                </Typography>
              </div>

              <Grid container>
                <Grid item xs={12} md={12} style={{ paddingRight: "1rem" }}>
                  {allRule.slice(0, 4).map((rule, index) => (
                    <Box key={index} display="flex" alignItems="center">
                      <ErrorIcon
                        style={{
                          marginLeft: "0.5rem",
                          width: "24px",
                          height: "24px",
                        }}
                      />
                      <Typography style={{ marginLeft: "6px" }}>
                        {rule.aturan}
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={5}
          md={5}
          sm={12}
          xs={12}
          width={"100%"}
          // height={'60%'}
        >
          <img
            src={state.kamarInfo.picture_room}
            alt="kamar"
            style={{
              width: "98%",
              border: "25px solid #F8F8FF",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default KamarDetail;
