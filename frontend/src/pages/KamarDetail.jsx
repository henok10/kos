import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
// import { makeStyles } from "@mui/styles";
import { useImmerReducer } from "use-immer";

// MUI
import {
    Grid, Typography, CircularProgress, Breadcrumbs, Link, Box, Stack, Button, AccordionDetails, Paper
  } from "@mui/material";
 
//   const useStyles = makeStyles({
//     sliderContainer: {
//       position: "relative",
//     },

//   });

function KamarDetail() {
    // const classes = useStyles();
    const params = useParams();
    const initialState = {
        kamarInfo: "",   
    };
    function ReducerFuction(draft, action) {
        switch (action.type) {
          case "catchKamarInfo":
            draft.kamarInfo = action.kamarObject;
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
  return (
    <div><Grid container>
    <Grid item lg={12} md={12} sm={12} xs={12} width={'100%'}>
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
            <Typography variant="h6" >{state.kamarInfo.address_room}</Typography>
          </Grid>
          <Grid item>
           
            <Typography varaiant="h6">
              {state.kamarInfo.room_size}
            </Typography>
          </Grid>
          <Grid item>
            {/* <Typography varaiant="subtitle1">{formattedDate}</Typography> */}
          </Grid>
        </Grid>
      </Grid>           




      <Grid>
        {/* <Grid item xs={6} columns={{ xs: 6, sm: 6, md: 12 }}> */}
        
        {/* </Grid> */}

        {/* Description */}
        {state.kamarInfo.price_month ? (
          <Grid
            item
            style={{
              padding: "1rem",
              marginTop: "0.3rem",
            }}
          >
            <Typography variant="h6" style={{fontSize: '16px'}}>Description :</Typography>
            <Typography variant="body1" style={{fontSize: '15px'}}>
              {state.kamarInfo.price_month}
            </Typography>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </Grid>


   
  </Grid>
  </div>
  )
}

export default KamarDetail