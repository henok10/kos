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
                        <TableCell>address room</TableCell>
                        <TableCell>picture room</TableCell>
                        <TableCell>type</TableCell>
                        <TableCell>room size</TableCell>
                        <TableCell>price(day)</TableCell>
                        <TableCell>price(month)</TableCell>
                        <TableCell>price(year)</TableCell>
                        <TableCell>order</TableCell>
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
                            <TableCell align="right">{row.picture_room}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.room_size}</TableCell>
                            <TableCell align="right">{row.price_day}</TableCell>
                            <TableCell align="right">{row.price_month}</TableCell>
                            <TableCell align="right">{row.price_year}</TableCell>
                            <TableCell align="right"><Button>Order</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Kamar;
