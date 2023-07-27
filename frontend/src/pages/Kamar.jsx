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

function Kamar() {
    const navigate = useNavigate();
    const params = useParams();
    const [allRoom, setAllRoom] = useState([]);
    

    useEffect(() => {
        let isMounted = true; // Gunakan variabel untuk menandai apakah komponen masih mounted
        async function GetAllRoom() {
            try {
                const response = await Axios.get(
                    `https://mykos2.onrender.com/api/kamar/${params.id}/`
                );
                const data = response.data;
                if (isMounted) {
                    setAllRoom(data);
                }
            } catch (error) {
                // Tangani error jika diperlukan
                console.error('Error:', error);
            }
        }

        GetAllRoom();

        // Cleanup function untuk membatalkan request jika komponen dibongkar sebelum request selesai
        return () => {
            isMounted = false;
        };
    }, [params.id]); // Tambahkan params.id sebagai dependency agar useEffect dipanggil ulang ketika params.id berubah

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
                            <TableCell>{row.fat}</TableCell>
                            <TableCell>{row.room_size}</TableCell>
                            <TableCell>{row.price_day}</TableCell>
                            <TableCell>{row.price_month}</TableCell>
                            <TableCell>{row.price_year}</TableCell>
                            <TableCell>
                                <Button 
                                    variant="contained"
                                    onClick={() => navigate(`/order/${row.id}`)}
                                    >
                                    Order
                                </Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Kamar;
