import React, { useState, useEffect } from 'react';
import {getOwnerUser} from "../actions/auth"
import {useDispatch} from "react-redux"
import { makeStyles } from "@mui/styles";
import city from "../data/minion.jpg";
import { Box, Typography } from '@mui/material';


const useStyles = makeStyles(() => ({
    hero: {
      backgroundImage: `url(${city})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '32px',
      margin: 'auto',
      textAlign: 'center',
      color: 'white'
    },
    subtitle: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      margin: 'auto',
      textAlign: 'center',
    },
    heading: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '48px',
      margin: '10px',
    },
}));
 function OwnerHome() {
     const classes = useStyles();
     const dispatch=useDispatch()
     useEffect(()=>{
         dispatch(getOwnerUser())
     }, [dispatch])
    return (
      <>
       <section className={classes.hero}>
            <Box className={classes.title}>
                <Typography style={{margin: "auto", textAlign: "center" }}> 
                    <Typography className={classes.heading} variant="h2">
                    Search Rumah Kos
                    </Typography>
                    <Typography className={classes.subtitle} variant="subtitle1">
                    Find new & featured property located in your local city.
                    </Typography>
                </Typography>
            </Box>
        </section>
      </>
    )
}



export default OwnerHome;