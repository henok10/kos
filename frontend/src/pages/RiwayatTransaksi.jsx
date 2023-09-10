import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import html2canvas from "html2canvas";
import { canvasToBlob } from "blob-util";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import ImageConverter from "../components/ImageConverter";

// Komponen terpisah untuk mengkonversi elemen HTML menjadi gamb

export default function RiwayatTransaksi() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const [allKos, setAllKos] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

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
        const listings = response.data.filter((listings) => listings.listing);
        console.log(listings);
      } catch (error) {}
    }
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, [userId]);

  return (
    <>
      <Grid
        container
        style={{ width: "100%", height: "60%", marginLeft: "1rem" }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Typography variant="h4" align="center">
            Pemesanan Kamar Kos
          </Typography>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Nama Kos</TableCell>
                <TableCell>Address Room</TableCell>
                <TableCell>No. Telp</TableCell>
                <TableCell>Frequensi Sewa</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allKos.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.fullName}</TableCell>
                  <TableCell>
                    <Link to={`/listings/${row.rumah}`}>
                      {row.listing_title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/kamar-detail/${row.kamar}`}>
                      {row.addressRoom}
                    </Link>
                  </TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{row.rentalFrequency}</TableCell>
                  <TableCell>{row.nominal}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                  <ImageConverter transaction={row} />
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          marginRight: "2%",
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}
