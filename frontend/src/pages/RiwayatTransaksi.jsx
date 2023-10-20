import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  CircularProgress,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import ImageConverter from "../components/ImageConverter";

// Komponen terpisah untuk mengkonversi elemen HTML menjadi gamb

export default function RiwayatTransaksi() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const [allKos, setAllKos] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isCustomer) {
      navigate("/");
    }
  }, [isCustomer, navigate]);

  // request to get profile info
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllKos() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/transaction/${userId}/userdetail`
        );

        setAllKos(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }
    GetAllKos();
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
      <Grid style={{ height: 650 }}>
        <Grid
          container
          style={{ width: "90%", margin: "auto", marginTop: "2rem" }}
        >
          <Grid
            container
            alignItems="center"
            paddingLeft="1rem"
            height="3rem"
            backgroundColor="#1E90FF"
          >
            <Typography variant="h5" color="white" fontWeight="bold">
              Pemesanan Kamar Kos
            </Typography>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Nama Kos</TableCell>
                  <TableCell>Alamat Kos</TableCell>
                  <TableCell>Address Room</TableCell>
                  <TableCell>No. Telp</TableCell>
                  <TableCell>Frequensi Sewa</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allKos.map((row) => {
                  const transactionDate = new Date(row.date);

                  const year = transactionDate.getFullYear();
                  const month = transactionDate.getMonth() + 1;
                  const day = transactionDate.getDate();
                  const hours = transactionDate
                    .getHours()
                    .toString()
                    .padStart(2, "0");
                  const minutes = transactionDate
                    .getMinutes()
                    .toString()
                    .padStart(2, "0");

                  const formattedDate = `${year}/${
                    month < 10 ? "0" : ""
                  }${month}/${day < 10 ? "0" : ""}${day}  ${hours}:${minutes}`;

                  function formatPrice(price) {
                    if (typeof price !== "number") {
                      return "Harga tidak tersedia";
                    }
                    return `Rp${price.toLocaleString("id-ID")}`;
                  }

                  console.log(typeof row.nominal);

                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.fullName}</TableCell>
                      <TableCell>
                        <Link to={`/listings/${row.rumah}`}>
                          {row.listing_title}
                        </Link>
                      </TableCell>
                      <TableCell>{row.addressKamar}</TableCell>
                      <TableCell>
                        <Link to={`/kamar-detail/${row.kamar}`}>
                          {row.addressRoom}
                        </Link>
                      </TableCell>
                      <TableCell>{row.phoneNumber}</TableCell>
                      <TableCell>{row.rentalFrequency}</TableCell>
                      <TableCell>
                        {typeof row.nominal === "string"
                          ? `Rp${parseInt(row.nominal, 10).toLocaleString(
                              "id-ID"
                            )}`
                          : "Harga tidak tersedia"}
                      </TableCell>
                      <TableCell>{formattedDate}</TableCell>

                      <TableCell>
                        <Grid
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <ImageConverter transaction={row} />
                          <Button
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              width: "5rem",
                              marginLeft: "2%", // Menggunakan marginLeft agar ada jarak antara elemen
                              color: "white",
                              fontWeight: "bold",
                              textAlign: "center",
                              backgroundColor: row.approve ? "green" : "orange",
                            }}
                          >
                            {row.approve !== undefined
                              ? row.approve
                                ? "Approve"
                                : "Proses"
                              : "Data not available"}
                          </Button>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
