import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";

const Register = () => {
  return (
    <>
      <Grid
        container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "auto",
          height: "80vh"
        }}
      >
        <Box textAlign={"center"}>
          <Typography variant="h6">Signup as a customer</Typography>
          <Link to="/customer/signup" className="btn btn-warning">
            Signup
          </Link>
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h6" style={{textAlign: "center"}}>Signup as a owner</Typography>
          <Link to="/owner/signup" className="btn btn-warning m-auto" >
            Signup
          </Link>
        </Box>
      </Grid>
    </>
  );
};

export default Register;
