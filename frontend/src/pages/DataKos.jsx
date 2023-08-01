// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Box, Button, CircularProgress} from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';


export default function DataTable() {
  const userId = useSelector(state => state.auth.userId)
  const ownerId = useSelector(state => state.auth.ownerId)
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
	const isOwner = useSelector((state) => state.auth.isOwner);
  const [allKos, setAllKos] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const params = useParams();
  const [listingIds, setListingIds] = useState([]);

	useEffect(() => {
		if (!isAuthenticated) {
		  navigate("/login");
		}
	  }, [isAuthenticated, navigate]);
	
	  useEffect(() => {
		if (isCustomer) {
		  navigate("/profileCustomer");
		}
	  }, [isOwner, navigate]);


	// request to get profile info
	useEffect(() => {
    const source = Axios.CancelToken.source();
		async function GetAllKos() {
			try {
				const response = await Axios.get(
					`https://mykos2.onrender.com/api/listings/${userId}/list`
				);
        const data = response.data;
        const listingIds = data.map(listing => parseInt(listing.id));
        setAllKos(data);
        setListingIds(listingIds);
        setDataIsLoading(false);
        
      } catch (error) {}
    }
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, [userId]);
  const [numItemsBoughtByListingId, setNumItemsBoughtByListingId] = useState({});
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetTransaksiKos() {
      try {
        const numItemsBoughtByListingId = {};
        for (const listingId of listingIds) {
          console.log(listingId)
          const response = await Axios.get(`https://mykos2.onrender.com/api/transaction/${listingId}/user`);
          const data = response.data;
          const numItemsBought = data.filter(transaksi => transaksi.barang_dibeli).length;
          numItemsBoughtByListingId[listingId] = numItemsBought;
         
        }
        setNumItemsBoughtByListingId(numItemsBoughtByListingId);
        setDataIsLoading(false);
      } catch (error) {}
    }   
    GetTransaksiKos();
    return () => {
      source.cancel();
    };
  }, [listingIds]);

  
  
  async function DeleteHandler() {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this listing?"
		);
		if (confirmDelete) {
			try {
				const response = await Axios.delete(
					`https://mykos2.onrender.com/api/listings/${params.id}/delete/`
				);

	
			} catch (error) {}
		}
	}



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

  const columns = [
    { 
      field: 'title', 
      headerName: 'Name', 
      width: 180,
      renderCell: (params) => (
        <Link to={`/listingsOwner/${params.row.id}`}>{params.value}</Link>
      ),
    },
    { 
      field: 'address', 
      headerName: 'Alamat', 
      width: 180 
    },
    { 
      field: 'rooms', 
      headerName: 'Rooms', 
      width: 60 
    },
    { 
      field: 'available_rooms', 
      headerName: 'Rooms Kosong', 
      width: 110, 
      renderCell: (params) => {
        const numItemsBoughts = numItemsBoughtByListingId[params.row.id];
        return(
          <div>{params.row.rooms - numItemsBoughts}</div>
        )  
      }
      
    },
    { 
      field: 'borough', 
      headerName: 'Borough', 
      width: 120 
    },
    {
      field: 'data kamar',
      headerName: 'Data Kamar',
      width: 100,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/data-kamar/${params.row.id}`)}>
            Detail
          </Button>
          {/* <Button variant="contained" color="success" onClick={() => navigate(`/datakosUser/${params.row.id}`)}>
            Penghuni Kos
          </Button> */}
        </div>
        
        
      ),
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
          <Button variant="contained" color="primary" onClick={() => navigate(`/listingupdate/${params.row.id}`)}>
            Update
          </Button>
          <Button variant="contained" color="error" onClick={DeleteHandler}>
            Hapus
          </Button>
        </div>
        
        
      ),
    }
    
  ];
  
  return (
    <>
   <Grid container style={{position: 'absolute', height: '60%', width: '85%'}}>
    <Grid item xs={12} style={{ marginTop: '2rem' }}>
      <Button 
        color='primary' 
        variant='contained'  
        onClick={() => navigate("/listingadd")}
      >
        Tambahkan Kos
      </Button>
    </Grid>
    <div  className="responsive-table" style={{ height: 480, marginTop:'0.5rem'}}>
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
