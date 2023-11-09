import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOwnerUser } from "../actions/auth";
import { useDispatch } from "react-redux";
import HomeImg from "../components/HomeImg";
import { useSelector } from "react-redux";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";

function OwnerHome() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOwner = useSelector((state) => state.auth.isOwner);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnerUser());
  }, [dispatch]);
  return (
    <>
      {/* <HomeImg /> */}
      <Grid container>
        <Grid>
          <Card>
            <CardContent>
              <Typography variant="h5">
                Rumah Kos
              </Typography>
              <Typography gutterBottom variant="body2" color="secondary">
                1 unit
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default OwnerHome;
