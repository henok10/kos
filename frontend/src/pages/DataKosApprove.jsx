// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Box, Button, CircularProgress} from '@mui/material';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";


export default function DataTableApprove() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCostumer = useSelector((state) => state.auth.isCostumer);
  const isPemilikKos = useSelector((state) => state.auth.isPemilikKos);
  const [allKos, setAllKos] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const params = useParams();

	useEffect(() => {
		if (!isAuthenticated) {
		  navigate("/login");
		}
	  }, [isAuthenticated, navigate]);
	
	  useEffect(() => {
		if (isCostumer) {
		  navigate("/profileCustomer");
		}
	  }, [isPemilikKos, navigate]);


	// request to get profile info
	useEffect(() => {
    const source = Axios.CancelToken.source();
		async function GetAllKos() {
			try {
				const response = await Axios.get(
					`https://mykos2.onrender.com/api/transaction/${params.id}/list`
				);
                
				setAllKos(response.data);
        setDataIsLoading(false);
      } catch (error) {}
    }   
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, []);

  async function deleteKos(id) {
    try {
      await Axios.delete(`https://mykos2.onrender.com/api/transaction/${id}/delete`);
  
      setAllKos(prevState => {
        const index = prevState.findIndex(kos => kos.id === id);
        if (index >= 0) {
          const updatedKos = [...prevState];
          updatedKos.splice(index, 1);
          return updatedKos;
        } else {
          return prevState;
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  async function updateApprove(id, newValue) {
    try {
        const response = await Axios.patch(`https://mykos2.onrender.com/api/transaction/${id}/update`, {approve: newValue});
    
        const updatedKos = {
          ...response.data,
          approve: newValue,
        };
        window.location.reload();
      } catch (error) {
        console.error(error);
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
    { field: 'buktiTransfer', 
      headerName: 'Bukti Transfer', 
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="product" style={{ width: '80%', height: '80%', objectFit: 'cover', margin: 'auto' }} />
      ),
    },
    { field: 'fullName', 
      headerName: 'Name', 
      width: 240,
    },
      
    { field: 'phoneNumber', headerName: 'No. Telp', width: 120 },
    { field: 'rentalFrequency', headerName: 'Frequensi Sewa', width: 115 },
    { field: 'nominal', headerName: 'Jumlah Pembayaran', width: 120 },
    { field: 'date', headerName: 'Date', width: 180 },
    {
        field: 'approve',
        headerName: 'Aksi',
        width: 195,
        renderCell: (params) => {
          if (params.value === true) {
            return (
              <div>
                <Button 
                  variant="contained" 
                  color="primary"
                  disabled
                >
                  Setuju
                </Button>
              </div>
            );
          } else {
            return (
              <Box style={{display: 'flex', justifyContent: 'space-between', width: '95%'}}> 
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => updateApprove(params.id, true)} 
                >
                  Approve
                </Button>
                <Button 
                  variant="contained" 
                  color="error"
                  onClick={() => deleteKos(params.id)}
                >
                  Tolak
                </Button>
              </Box>
            );
          }
        },
      },
      
      
  ];
  return (
    <>
    <Grid height={'60%'}>
      <Grid marginTop={'2rem'}>
        <Button 
          color='success' 
          variant='contained'  
          onClick={() => navigate("/datakos")
                            }>
          Pilih Kos
        </Button>
      </Grid>
      <Grid style={{ height: 480, width: '100%', marginTop:'2rem' }}>
        <DataGrid
          rows={allKos}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowHeight={() => 180}
        />
      </Grid>
    </Grid>
    
    </>
    
  );
}
