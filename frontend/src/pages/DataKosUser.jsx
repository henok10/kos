// import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function DataTableUser() {
  const navigate = useNavigate();
  const [allKos, setAllKos] = useState([]);
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

  // request to get profile info
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllKos() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/transaction/${params.id}/user`
        );

        setAllKos(response.data);
      } catch (error) {}
    }
    GetAllKos();
    return () => {
      source.cancel();
    };
  }, [params.id]);

  async function updateApprove(id, newValue) {
    try {
      const response = await Axios.patch(
        `https://mykos2.onrender.com/api/kamar/${id}/update/`,
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

  const handleDelete = async (id, kamar) => {
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
        await updateApprove(id, false);
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
  };

  console.log(allKos);
  const columns = [
    { field: "fullName", headerName: "Name", width: 200 },
    { field: "addressRoom", headerName: "No. Kamar", width: 100 },
    { field: "phoneNumber", headerName: "No. Telp", width: 120 },
    { field: "rentalFrequency", headerName: "Frequensi Sewa", width: 120 },
    { field: "nominal", headerName: "Jumlah Pembayaran", width: 100 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "barang_dibeli",
      headerName: "Aksi",
      width: 150,
      renderCell: (params) => {
        const kamar = params.row.kamar;
        return (
          <div>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: "red",
                color: "white",
                marginLeft: "0.2rem",
              }}
              onClick={() => handleDelete(params.id, kamar)}
            >
              Hapus
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Grid height={"100vh"} width= "90%" margin= "auto">
        <Grid marginTop={"2rem"}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/datakos")}
          >
            Pilih Kos
          </Button>
        </Grid>
        <Grid style={{ height: "75vh", marginTop: '10px', margin: "auto" }}>
          <DataGrid
            rows={allKos}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </Grid>
      </Grid>
    </>
  );
}
