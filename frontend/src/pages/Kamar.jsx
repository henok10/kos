import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  CircularProgress,
  TableRow,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  buttonCell: {
    width: "100px",
    height: "30px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    cursor: "pointer",
  },
  greyButton: {
    backgroundColor: "grey",
    color: "white",
  },
  yellowButton: {
    backgroundColor: "yellow",
    color: "black",
  },
}));

function Kamar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const [allRoom, setAllRoom] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isCustomer) {
    navigate("/");
  }

  useEffect(() => {
    async function GetAllRoom() {
      try {
        const response = await Axios.get(
          `https://mikos03.onrender.com/api/kamar/${params.id}/`
        );
        const data = response.data;
        setAllRoom(data);
        setDataIsLoading(false);
      } catch (error) {
        // Tangani error jika diperlukan
        console.error("Error:", error);
      }
    }

    GetAllRoom();
  }, [params.id]); // Tambahkan params.id sebagai dependency agar useEffect dipanggil ulang ketika params.id berubah
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
    <Grid container style={{ width: "90%",margin: "2rem auto", height: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#F8F8FF" }}>
              <TableCell>Address room</TableCell>
              <TableCell>Picture room</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Room size</TableCell>
              <TableCell>Price(day)</TableCell>
              <TableCell>Price(month)</TableCell>
              <TableCell>Price(year)</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRoom.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.address_room}
                </TableCell>
                <TableCell>
                  {row.picture_room && (
                    <img
                      src={row.picture_room}
                      alt="Room"
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div
                    className={`${classes.buttonCell} ${
                      row.barang_dipesan
                        ? classes.yellowButton
                        : classes.greyButton
                    }`}
                  >
                    {row.barang_dipesan ? "Sudah Dipesan" : "Belum Dipesan"}
                  </div>
                </TableCell>
                <TableCell>{row.room_size}</TableCell>
                <TableCell>
                  {typeof row.price_day === "string"
                    ? `Rp${parseInt(row.price_day, 10).toLocaleString("id-ID")}`
                    : "Harga tidak tersedia"}
                </TableCell>
                <TableCell>
                  {typeof row.price_month === "string"
                    ? `Rp${parseInt(row.price_month, 10).toLocaleString(
                        "id-ID"
                      )}`
                    : "Harga tidak tersedia"}
                </TableCell>
                <TableCell>
                 {typeof row.price_year === "string"
                    ? `Rp${parseInt(row.price_year, 10).toLocaleString(
                        "id-ID"
                      )}`
                    : "Harga tidak tersedia"}
                </TableCell>
                <TableCell>
                  {
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/kamar-detail/${row.id}`)}
                    >
                      Detail
                    </Button>
                  }
                </TableCell>
                <TableCell>
                  {/* Tambahkan kondisi untuk menonaktifkan tombol "Order" */}
                  {row.barang_dipesan ? (
                    <Button variant="contained" disabled>
                      Order
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/order/${row.id}/${row.rumah}`)}
                    >
                      Order
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default Kamar;
