// import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function DataTable() {
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();
  const [allKos, setAllKos] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [listingIds, setListingIds] = useState([]);
  const [allKamar, setAllKamar] = useState([]);

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
          `https://mykos2.onrender.com/api/listings/${userId}/list`
        );
        const data = response.data;
        const listingIds = data.map((listing) => parseInt(listing.id));
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
  const [numItemsBoughtByListingId, setNumItemsBoughtByListingId] = useState(
    {}
  );

  useEffect(() => {
    async function GetAllKamar() {
      try {
        const totalRoomsByListing = {};
        for (const listingId of listingIds) {
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/kamar/${listingId}/`
          );
          const dataKamar = response.data;
          const totalRooms = dataKamar.length;
          totalRoomsByListing[listingId] = totalRooms;
          setAllKamar(totalRoomsByListing);
        }
      } catch (error) {
        // Tangani error jika diperlukan
        console.error("Error:", error);
      }
    }

    GetAllKamar();
  }, [listingIds]); // Tambah

  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetTransaksiKos() {
      try {
        const numItemsBoughtByListingId = {};
        for (const listingId of listingIds) {
          console.log(listingId);
          const response = await Axios.get(
            `https://mykos2.onrender.com/api/transaction/${listingIds}/user`
          );
          const data = response.data;
          const numItemsBought = data.filter(
            (transaksi) => transaksi.approve
          ).length;
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

  // console.log(numItemsBoughtByListingId)
  // console.log(allKamar)

  const kamarKosongByListingId = {}; // Objek untuk menyimpan jumlah kamar kosong pada setiap rumah kos

  for (const listingId in allKamar) {
    const totalKamar = allKamar[listingId];
    const kamarDibeli = numItemsBoughtByListingId[listingId] || 0;
    const kamarKosong = totalKamar - kamarDibeli;
    kamarKosongByListingId[listingId] = kamarKosong;
  }

  // console.log(kamarKosongByListingId);
  async function DeleteHandler(id) {
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
        await Axios.delete(`https://mykos2.onrender.com/api/listings/${id}/delete/`);
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(() => {
          // Reload halaman setelah penghapusan berhasil
          window.location.reload();
        });
      } catch (error) {
        // Handle error if deletion fails
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
      field: "title",
      headerName: "Name",
      width: 180,
      renderCell: (params) => (
        <Link to={`/listingsOwner/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "address",
      headerName: "Alamat",
      width: 180,
    },
    {
      field: "allKamar",
      headerName: "Rooms",
      width: 60,
      valueGetter: (params) => allKamar[params.row.id] || 0, // Mengambil jumlah kamar dari objek allKamar
    },
    {
      field: "kamarKosongByListingId",
      headerName: "Rooms Kosong",
      width: 110,
      valueGetter: (params) => kamarKosongByListingId[params.row.id] || 0, // Mengambil jumlah kamar dari objek allKamar
    },
    {
      field: "borough",
      headerName: "Area",
      width: 100,
    },
    {
      field: "data kamar",
      headerName: "Data Kamar",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/data-kamar/${params.row.id}`)}
          >
            Detail
          </Button>
          {/* <Button variant="contained" color="success" onClick={() => navigate(`/datakosUser/${params.row.id}`)}>
            Penghuni Kos
          </Button> */}
        </div>
      ),
    },
    {
      field: "aksi",
      headerName: "Aksi",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/listingupdate/${params.row.id}`)}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => DeleteHandler(params.id)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid
        container
        style={{ position: "absolute", height: "60%", width: "85%" }}
      >
        <Grid item xs={12} style={{ marginTop: "2rem" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/listingadd")}
          >
            Tambahkan Kos
          </Button>
        </Grid>
        <div
          className="responsive-table"
          style={{ height: 480, marginTop: "0.5rem" }}
        >
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
