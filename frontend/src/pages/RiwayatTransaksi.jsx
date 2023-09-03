// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Button, Typography} from '@mui/material';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const useStyles = makeStyles({
  cellSuccess: {
    backgroundColor: '#4caf50', // Ubah dengan kode warna tombol yang diinginkan
  },
  cellProcess: {
    backgroundColor: '#ffc107', // Ubah dengan kode warna tombol yang diinginkan
  },
});

export default function RiwayatTransaksi() {
  const classes = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const [allKos, setAllKos] = useState([]);
  const userId = useSelector(state => state.auth.userId)
  const customerId = useSelector(state => state.auth.customerId)
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const params = useParams();

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
                const listings = response.data.filter(listings => listings.listing)
                console.log(listings)
        setDataIsLoading(false);
      } catch (error) {}
    }   
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, []);


  // const columns = [
  //   { field: 'fullName', headerName: 'Name', width: 200,},  
  //   { field: 'listing_title', headerName: 'Nama Kos', width: 220 }, 
  //   { field: 'phoneNumber', headerName: 'No. Telp', width: 130 },
  //   { field: 'rentalFrequency', headerName: 'Frequensi Sewa', width: 130 },
  //   { field: 'nominal', headerName: 'Total', width: 100 },
  //   { field: 'date', headerName: 'Date', width: 250 },
  //   {
  //     field: 'approve',
  //     headerName: 'Status',
  //     width: 130,
  //     // valueGetter: (params) => params.row.approve ? 'Sukses' : 'Proses',
  //     renderCell: (params) => (
  //       <div
  //               style={{
  //                 padding: '4px 8px',
  //                 borderRadius: '4px',
  //                 color: 'white',
  //                 fontWeight: 'bold',
  //                 textAlign: 'center',
  //                 backgroundColor: params.row.approve ? 'green' : 'orange',
  //               }}
  //             >
  //               {params.row.approve !== undefined
  //                 ? params.row.approve
  //                   ? "Approve"
  //                   : "Proses"
  //                 : "Data not available"}
  //             </div>
  //     )
  //     // params.row.barang_dibeli ? classes.cellSuccess : classes.cellProcess,
  //   },
  // ];
  return (
    <>
    <Grid container style={{ width: '100%', height: '60%', marginLeft: '1rem'}}>
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h4" align="center">
          Pemesanan Kamar Kos
        </Typography>
      </Grid>
      {/* <div style={{height: 480, marginTop:'2rem', width: '85%' }}>
        <DataGrid
          rows={allKos}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div> */}


<TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Nama Kos</TableCell>
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.fullName}
                            </TableCell>
                            <TableCell>{row.listing_title}</TableCell>
                            <TableCell>{row.phoneNumber}</TableCell>
                            <TableCell>{row.rentalFrequency}</TableCell>
                            <TableCell>{row.nominal}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>
                            
                            <div
                              style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                color: 'white',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                backgroundColor: row.approve ? 'green' : 'orange',
                              }}
                            >
                              {row.approve !== undefined
                                ? row.approve
                                  ? "Approve"
                                  : "Proses"
                                : "Data not available"}
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
