import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import { makeStyles } from "@mui/styles";
import { useImmerReducer } from "use-immer";
import RoomIcon from "@mui/icons-material/Room";

// MUI
import {
    Grid, Typography, CircularProgress, Breadcrumbs, Link, Box, Stack, Button, AccordionDetails, Paper
  } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
 
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
    const [loadingFasilitas, setLoadingFasilitas] = useState(true);
    const [errorFasilitas, setErrorFasilitas] = useState(null);
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
      }, []);

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
    }, [state.kamarInfo]);

    useEffect(() => {
        if (state.kamarInfo) {
          async function GetFasilitasInfo() {
            try {
              const response = await Axios.get(
                `https://mykos2.onrender.com/api/fasilitas-kamar/${state.kamarInfo.id}/`
              );
    
              const data = response.data;
              setAllFasilitas(data);
              setLoadingFasilitas(false);
            } catch (e) {
              setErrorFasilitas("Error fetching facilities information.");
              setLoadingFasilitas(false);
            }
          }
          GetFasilitasInfo();
        }
      }, [state.kamarInfo]);

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



      console.log(state.kamarInfo.rumah)
  return (
    <div>
        
<Grid container>
    <Grid item lg={7} md={7} sm={12} xs={12} width={'100%'}>
    <Grid
        item
        container
        style={{
            padding: "1rem",
            borderBottom: "1px solid gray",
            // marginTop: "1rem",
            width: "100%",
        }}
        >
        <Grid item container xs={12} direction="column" spacing={1}>
            <Grid item>
            <Typography variant="h6" >{state.listingInfo.title}</Typography>
            </Grid>
            <Grid item>
            <RoomIcon />{" "}
            <Typography varaiant="h6">
                {state.listingInfo.borough}
            </Typography>
            </Grid>
            <Grid item>
            <Typography varaiant="subtitle1">{formattedDate}</Typography>
            </Grid>
        </Grid>
        </Grid>        

      <Grid
            item
            style={{
            padding: "1rem",
            borderBottom: "1px solid gray",
            marginTop: "0.3rem",
            }}
        >
            <Typography variant="h6" style={{fontSize: '16px'}}>Alamat Kamar :</Typography>
            {state.kamarInfo.address_room ? (
            <Typography variant="body1" style={{fontSize: '15px'}}>
            {state.kamarInfo.address_room}
            </Typography>
            ) : (
            ""
            )}
        </Grid>

        <Grid
            item
            style={{
            padding: "1rem",
            borderBottom: "1px solid gray",
            marginTop: "0.3rem",
            }}
        >
            <Typography variant="h6" style={{fontSize: '16px'}}>Ukuran Kamar :</Typography>
            {state.kamarInfo.room_size ? (
            <Typography variant="body1" style={{fontSize: '15px'}}>
            {state.kamarInfo.room_size}
            </Typography>
            ) : (
            ""
            )}
        </Grid>

        {loadingFasilitas ? (
            <CircularProgress />
          ) : errorFasilitas ? (
            <Typography variant="body1" color="error">
              {errorFasilitas}
            </Typography>
          ) : allFasilitas.length === 0 ? (
            <Typography variant="body1">No facilities available.</Typography>
          ) : (
            allFasilitas.map((listing, index) => (
              <Grid
                item
                key={index}
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid gray",
                  marginTop: "0.3rem",
                }}
              >
                <Typography variant="h6" style={{ fontSize: "16px" }}>
                  Fasilitas Kamar:
                </Typography>
                <Typography variant="body1" style={{ fontSize: "15px" }}>
                  {listing.name}
                </Typography>
              </Grid>
            ))
          )}


       

    </Grid>
    <Grid item lg={5} md={5} sm={12} xs={12} width={'100%'} style={{ marginTop: "2rem", paddingLeft: '0.5rem'}}>
            <Box position="sticky" top= '0'>
                <Paper style={{ border: '2px solid white' }}>
                {kamarPictures.length > 0 ? (
                <Box>
                    <Grid
                    item
                    container
                    justifyContent="center"
                    className={classes.sliderContainer}
                    >
                    {kamarPictures.map((picture, index) => {
                        return (
                        <div key={index}>
                            {index === currentPicture ? (
                            <img
                                src={picture}
                                style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // Adjusts image to cover the container while maintaining aspect ratio
                                }}
                            />
                            ) : (
                            ""
                            )}
                        </div>
                        );
                    })}
                    <ArrowCircleLeftIcon
                        onClick={PreviousPicture}
                        className={classes.leftArrow}
                    />
                    <ArrowCircleRightIcon
                        onClick={NextPicture}
                        className={classes.rightArrow}
                    />
                    </Grid>
                </Box>
                ) : (
                ""
                )}
            </Paper>
            </Box>
    </Grid>



   
</Grid>
  </div>
  )
}

export default KamarDetail