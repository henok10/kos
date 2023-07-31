import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
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
  greenButton: {
    backgroundColor: "green",
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
    const [allRoom, setAllRoom] = useState([]);
    

    useEffect(() => {
        async function GetAllRoom() {
            try {
                const response = await Axios.get(
                    `https://mykos2.onrender.com/api/kamar/${params.id}/`
                );
                const data = response.data;
                    setAllRoom(data);
                
            } catch (error) {
                // Tangani error jika diperlukan
                console.error('Error:', error);
            }
        }

        GetAllRoom();

        
    }, []); // Tambahkan params.id sebagai dependency agar useEffect dipanggil ulang ketika params.id berubah
console.log()
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
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
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.address_room}
                            </TableCell>
                            <TableCell >
                                {row.picture_room && <img src={row.picture_room} alt="Room Picture" style={{ maxWidth: "100px" }} />}
                            </TableCell>
                            <TableCell>
                                <div
                                className={`${classes.buttonCell} ${
                                    row.barang_dipesan ? classes.yellowButton : classes.greenButton
                                }`}
                                >
                                {row.barang_dipesan ? "Sudah Dipesan" : "Belum Dipesan"}
                                </div>
                            </TableCell>
                            <TableCell>{row.room_size}</TableCell>
                            <TableCell>{row.price_day}</TableCell>
                            <TableCell>{row.price_month}</TableCell>
                            <TableCell>{row.price_year}</TableCell>
                            <TableCell>{
                                <Button
                                    variant="outlined"
                                    onClick={'w'}
                                >
                                    Detail
                                </Button>}
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
                                        onClick={() => navigate(`/order/${row.id}`)}
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
    )
}

export default Kamar;
