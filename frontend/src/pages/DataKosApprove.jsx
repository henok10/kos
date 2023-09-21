// import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";

export default function DataTableApprove() {
  const navigate = useNavigate();
  const [allKos, setAllKos] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const params = useParams();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isOwner = useSelector((state) => state.auth.isOwner);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  async function downloadImage(imageUrl, fullName, addressRoom) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Buat nama file yang digabungkan dengan "fullName" dan "addressRoom"
      const fileName = `${fullName}_${addressRoom}_bukti_transfer.png`.replace(/ /g, "_");
      
      // Mengunduh file gambar dengan menggunakan 'file-saver'
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }
  

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
  }, [params.id]);

  async function updateKamars(kamar, newValue) {
    try {
      const response = await Axios.patch(
        `https://mykos2.onrender.com/api/kamar/${kamar}/update/`,
        {
          barang_dipesan: newValue,
        }
      );
      // Tambahkan log atau logika lainnya untuk menangani respons dari server jika diperlukan
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  async function deleteKos(id, kamar) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    const result = await swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      try {
        await updateKamars(kamar, false)
        await Axios.delete(
          `https://mykos2.onrender.com/api/transaction/${id}/delete`
        );
        
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          // Reload halaman setelah penghapusan berhasil
          window.location.reload();
        });
      } catch (error) {
        swalWithBootstrapButtons.fire(
          'Error',
          'An error occurred while deleting the file.',
          'error'
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancellation
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      );
    }
  }

  async function updateApprove(id, newValue) {
    
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to approve this room transactions?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
      try {
        await Axios.patch(
          `https://mykos2.onrender.com/api/transaction/${id}/update`,
          { approve: newValue }
        );
        Swal.fire(
          'Approved!',
          'Your kamar has been approve.',
          'success'
        )
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  });
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
      field: "buktiTransfer",
      headerName: "Bukti Transfer",
      width: 100,
      renderCell: (params) => (
        <div>
          <img
            src={params.value}
            alt="product"
            onClick={() => {downloadImage(params.value, params.row.fullName, params.row.addressRoom);}}
            style={{
              cursor: "pointer", // Tambahkan gaya kursor
              width: "80%",
              height: "80%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </div>
      ),
    },
    { field: "fullName", headerName: "Name", width: 180 },

    { field: "addressRoom", headerName: "address room", width: 100 },

    { field: "phoneNumber", headerName: "No. Telp", width: 100 },
    { field: "rentalFrequency", headerName: "Frequensi Sewa", width: 100 },
    { field: "nominal", headerName: "Jumlah Pembayaran", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    {
      field: "approve",
      headerName: "Aksi",
      width: 210,
      renderCell: (params) => {
        if (params.value === true) {
          return (
            <div>
              <Button variant="contained" color="primary" disabled>
                Setuju
              </Button>
            </div>
          );
        } else {
          const kamar = params.row.kamar;
          return (
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "95%",
              }}
            >
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
                onClick={() => deleteKos(params.id, kamar, false)}
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
      <Grid height={"60%"} margin='auto' width='90%'>
        <Grid marginTop={"2rem"}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/datakos")}
          >
            Pilih Kos
          </Button>
        </Grid>
        <Grid style={{ height: 480, marginTop: "10px" }}>
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
