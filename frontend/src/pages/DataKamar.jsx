import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import {Grid, Box, Button, CircularProgress} from '@mui/material';
import { useNavigate, useParams, Link } from "react-router-dom";
import Axios from 'axios';

function DataKamar() {
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

        
    }, []); // Tambah
    console.log(allRoom.address_room)
    useEffect((approves) => {
        async function GetTransaksi() {
            try {
                const response = await Axios.get(
                    `https://mykos2.onrender.com/api/transaction/${params.id}/user`, {approve: approves}
                );
                // const data = response.data;
                //     setAllRoom(data);
                
            } catch (error) {
                // Tangani error jika diperlukan
                console.error('Error:', error);
            }
        }

        GetTransaksi();

        
    }, []); // Tambah

    async function updateApprove(id, newValue) {
        try {
          const response = await Axios.patch(`https://mykos2.onrender.com/api/kamar/${id}/update/`, {
            barang_dipesan: newValue,
          });
    

         
        } catch (error) {
          console.error(error);
        }

        try {
            const response = await Axios.patch(`https://mykos2.onrender.com/api/transaction/${id}/kamar-update`, {
                approve: newValue,
            });
    

        
        } catch (error) {
        console.error(error);
        }
        window.location.reload();
      }
      
      
      
      
      

    const columns = [
        { 
          field: 'address_room', 
          headerName: 'No. Kamar', 
          width: 80,
        },
        { 
            field: 'picture_room', 
            headerName: 'Picture', 
            width: 80,
            renderCell: (params) => (
                <img src={params.value} alt="product" style={{ width: '80%', height: '80%', objectFit: 'cover', margin: 'auto' }} />
            ),
        },
        {
            field: 'barang_dipesan', 
            headerName: 'Status', 
            width: 120,
            renderCell: (params) => (
              <div
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backgroundColor: params.row.barang_dipesan ? 'orange' : 'gray',
                }}
              >
                {params.row.barang_dipesan !== undefined
                  ? params.row.barang_dipesan
                    ? "Dipesan"
                    : "Belum Dipesan"
                  : "Data not available"}
              </div>
            )
          },
          
        { 
            field: 'price_day', 
            headerName: 'Harga/Hari', 
            width: 100,
        },
        { 
            field: 'price_month', 
            headerName: 'Harga/Bulan', 
            width: 100,
        },
        { 
            field: 'price_year', 
            headerName: 'Harga/Tahun', 
            width: 100,
        },
        { 
            field: 'room_size', 
            headerName: 'Ukuran Kamar', 
            width: 110,
        },
        {
            field: 'kamar_transaksi_approve',
            headerName: 'Status Approve',
            width: 120,
            renderCell: (params) => {
              const approveStatus = params.row.kamar_transaksi && params.row.kamar_transaksi.length > 0
                ? params.row.kamar_transaksi[0].approve
                : false;
          
              return (
                <div
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    backgroundColor: approveStatus ? 'green' : 'grey', // Use 'grey' instead of 'gray'
                  }}
                >
                  {approveStatus !== undefined
                    ? approveStatus
                      ? "Approved"
                      : "Not Approved"
                    : "Data not available"}
                </div>
              );
            },
          },
          
          
          
    
        {
          field: 'data kamar',
          headerName: 'Data Kamar',
          width: 100,
          renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
              <Button variant="contained" color="primary" onClick={() => navigate(`/kamar-update/${params.row.id}`)}>
                Update
              </Button>
            </div>
            
            
          ),
        },
        {
          field: 'aksi',
          headerName: 'Aksi',
          width: 200,
          renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
              <Button variant="contained" color="warning" onClick={() => updateApprove(params.id, false)} >
                Cancel
              </Button>

              <Button variant="contained" color="error" onClick={() => updateApprove(params.id, false)} >
                Hapus
              </Button>
            </div>
            
            
          ),
        }
    ];
        
  return (
    <>
    <Grid container style={{ position: 'absolute', width: '90%', marginLeft: '3rem'}}>
    <Grid item xs={12} style={{ marginTop: '2rem' }}>
      <Button 
        color='primary' 
        variant='contained'  
        onClick={() => navigate("/listingadd")}
      >
        Tambah Kamar
      </Button>
      <Button 
        color='primary' 
        variant='contained'  
        marginLeft='0.5rem'
        style={{margin: '0.5rem'}}
        onClick={() => navigate(`/datakosApprove/${params.id}`)}
      >
        Pesan
      </Button>
      <Button 
        color='primary' 
        variant='contained'  
        onClick={() => navigate(`/datakosUser/${params.id}`)}
      >
        Penghuni Kos
      </Button>
    </Grid>
    <div style={{ height: 480, width: '90%'}}>
      <DataGrid
        rows={allRoom}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  </Grid>
    </>
  )
}

export default DataKamar