// import React from 'react'
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
    Snackbar,
    Grid,
  } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Kamar() {
    const params = useParams();
    const [allRoom, setAllRoom] = useState([]);
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('https://mykos2.onrender.com/api/review/create', {
    //         price_day: price_day,
    //         price_month: price_month,
    //         price_year: price_month,
    //         picture_room: picture_room,
    //         room_size: room_size,
    //         address_room: address_room,
    //         rumah: params.id,
    //         // customer: customerId,
    //     }).then(response => {
    //         setSuccess(true);
    //     }).catch(error => {
    //         setError('There was an error submitting your review');
    //     });
    // }
    useEffect(() => {
        const source = Axios.CancelToken.source();
            async function GetAllRoom() {
                try {
                    const response = await Axios.get(
                        `https://mykos2.onrender.com/api/kamar/${params.id}/`
                    );
            const data = response.data;
            // const listingIds = data.map(listing => parseInt(listing.id));
            setAllRoom(data);
            // setListingIds(listingIds);
            // setDataIsLoading(false);
            
          } catch (error) {}
        }
        GetAllRoom();
        return () => {
          source.cancel();
        };
      }, []);
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

export default Kamar



