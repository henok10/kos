import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOwnerUser } from "../actions/auth";
import { useDispatch } from "react-redux";
import HomeImg from "../components/HomeImg";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import Axios from "axios";

function OwnerHome() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOwner = useSelector((state) => state.auth.isOwner);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [allKos, setAllKos] = useState([]);
  const [allKamar, setAllKamar] = useState([]);
  const [allPerson, setAllPerson] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  const [dataKos, setDataKos] = useState([]);
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

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllKos() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/listings/${userId}/list`
        );
        const data = response.data;
        const totalData = data.length;
        const rumahkos = data.map((listing) => listing.user_username);
        setAllKos(totalData);
        setDataKos(rumahkos[1]);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, [userId]);
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllKamar() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/kamar/${userId}/user`
        );
        const data = response.data;
        const totalKamar = data.length;
        setAllKamar(totalKamar);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllKamar();
    return () => {
      source.cancel();
    };
  }, [userId]);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllPerson() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/transaction/${userId}/listu`
        );
        const data = response.data;
        const totalPerson = data.length;
        setAllPerson(totalPerson);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllPerson();
    return () => {
      source.cancel();
    };
  }, [userId]);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllOrder() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/transaction/${userId}/listorder`
        );
        const data = response.data;
        const totalOrder = data.length;
        setAllOrder(totalOrder);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllOrder();
    return () => {
      source.cancel();
    };
  }, [userId]);

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
      <Grid style={{ padding: "2rem" }}>
        <Typography variant="h4" style={{ fontWeight: "bold", color: "gray" }}>
          Dashboard
        </Typography>
      </Grid>

      <Grid
        container
        style={{
          // flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100vh",
          padding: "0 2rem",
        }}
      >
        <Grid item xs={12} sm={12} md={3} lg={3} style={{ gap: 15 }}>
          <Grid item xs={12}>
            <Card sx={{ height: 80, maxWidth: 265, marginTop: "0.5rem" }}>
              <CardContent style={{ height: 100 }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      color="secondary"
                      variant="body1"
                      style={{ fontWeight: "bold" }}
                    >
                      Rumah Kos
                    </Typography>
                    {allKos && (
                      <Typography gutterBottom variant="body2">
                        {allKos} unit
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="#f50057"
                      >
                        <path d="M200-160v-320H80l400-360 160 144v-104h120v212l120 108H760v320H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-312L480-732 280-552v312Zm80-240h240-240Zm40-79h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Z" />
                      </svg>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ height: 80, maxWidth: 265, marginTop: "0.5rem" }}>
              <CardContent style={{ height: 100 }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      color="primary"
                      variant="body1"
                      style={{ fontWeight: "bold" }}
                    >
                      Kamar Kos
                    </Typography>
                    {allKamar && (
                      <Typography gutterBottom variant="body2">
                        {allKamar} kamar
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="#2196f3"
                      >
                        <path d="M80-200v-240q0-27 11-49t29-39v-112q0-50 35-85t85-35h160q23 0 43 8.5t37 23.5q17-15 37-23.5t43-8.5h160q50 0 85 35t35 85v112q18 17 29 39t11 49v240h-80v-80H160v80H80Zm440-360h240v-80q0-17-11.5-28.5T720-680H560q-17 0-28.5 11.5T520-640v80Zm-320 0h240v-80q0-17-11.5-28.5T400-680H240q-17 0-28.5 11.5T200-640v80Zm-40 200h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z" />
                      </svg>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ height: 80, maxWidth: 265, marginTop: "0.5rem" }}>
              <CardContent style={{ height: 100 }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      color="#ffc107"
                      variant="body1"
                      style={{ fontWeight: "bold" }}
                    >
                      Penghuni Kos
                    </Typography>
                    {allPerson && (
                      <Typography gutterBottom variant="body2">
                        {allPerson} orang
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="#ffc107"
                      >
                        <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                      </svg>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card sx={{ height: 80, maxWidth: 265, marginTop: "0.5rem" }}>
              <CardContent style={{ height: 100 }}>
                <Grid
                  container
                  style={{
                    display: "flex",
                    height: "100%",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Grid item xs={8}>
                    <Typography
                      color="#009688"
                      variant="body1"
                      style={{ fontWeight: "bold" }}
                    >
                      transaction message
                    </Typography>
                    {allOrder? (
                      <Typography gutterBottom variant="body2">
                        {allOrder} message
                      </Typography>
                    ) : (
                      <Typography gutterBottom variant="body2">
                        0 message
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="#009688"
                      >
                        <path d="M320-520q17 0 28.5-11.5T360-560q0-17-11.5-28.5T320-600q-17 0-28.5 11.5T280-560q0 17 11.5 28.5T320-520Zm160 0q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm160 0q17 0 28.5-11.5T680-560q0-17-11.5-28.5T640-600q-17 0-28.5 11.5T600-560q0 17 11.5 28.5T640-520ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                      </svg>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} width="95%">
          <Grid container>
            <Box
              style={{
                display: "flex",
                width: "80%",
                height: "10rem",
                flexDirection: "column",
                backgroundColor: "#e3f2fd",
                borderRadius: "40px",
                margin: "auto",
                justifyContent: "center",
                alignContent: "center",
                // paddingTop: "2rem"
              }}
            >
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Hai, <strong>{username}</strong>
              </Typography>
              <Typography variant="h6" style={{ textAlign: "center" }}>
                Selamat Datang Di Website Mikos untuk Pemilik Kos
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default OwnerHome;
