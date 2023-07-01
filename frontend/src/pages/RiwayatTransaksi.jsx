// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Button, Typography} from '@mui/material';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";


export default function RiwayatTransaksi() {
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
					`https://mykos2.onrender.com/api/transaction/${customerId}/userdetail`
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


  const columns = [
    { field: 'fullName', headerName: 'Name', width: 200,},  
    { field: 'listing_title', headerName: 'Nama Kos', width: 220 }, 
    { field: 'phoneNumber', headerName: 'No. Telp', width: 130 },
    { field: 'rentalFrequency', headerName: 'Frequensi Sewa', width: 130 },
    { field: 'date', headerName: 'Date', width: 250 },
    { field: '', headerName: 'Aksi', width: 250 },
  ];
  return (
    <>
    <Grid container style={{ width: '100%', height: '60%', marginLeft: '3rem'}}>
      <Grid marginTop={'2rem'}>
        <Typography variant={'h4'} style={{textAlign: 'center'}}>
            Pemesanan Kamar Kos
        </Typography>
      </Grid>
      <div style={{height: 480, marginTop:'2rem', width: '85%' }}>
        <DataGrid
          rows={allKos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </Grid>   
    </>    
  );
}
