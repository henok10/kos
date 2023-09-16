import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";

function DataKamar() {
  const navigate = useNavigate();
  const params = useParams();
  const [allRoom, setAllRoom] = useState([]);
  // const [approvesData, setApproveData] = useState([]);

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

  useEffect(() => {
    async function GetAllRoom() {
      try {
        const response = await Axios.get(
          `https://mykos2.onrender.com/api/kamar/${params.id}/`
        );
        const data = response.data;
        setAllRoom(data);
        // dispatch({
        //   type: "catchKamarInfo",
        //   kamarObject: response.data,

        // });
      } catch (error) {
        // Tangani error jika diperlukan
        console.error("Error:", error);
      }
    }

    GetAllRoom();
  }, [params.id]); // Tambah
  console.log(allRoom);

  async function updateApprove(id, newValue) {
    try {
      await Axios.patch(`https://mykos2.onrender.com/api/kamar/${id}/update/`, {
        barang_dipesan: newValue,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  async function deleteTransaksi(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateApprove(id, false);
          await Axios.delete(
            `https://mykos2.onrender.com/api/transaction/${id}/delete/kamar`
          );

          // Refresh halaman hanya ketika kedua operasi berhasil
          window.location.reload();
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      }
    });
  }

  async function deleteKamar(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await Axios.delete(
          `https://mykos2.onrender.com/api/kamar/${id}/delete/`
        );
        swalWithBootstrapButtons
          .fire("Deleted!", "Your file has been deleted.", "success")
          .then(() => {
            // Reload halaman setelah penghapusan berhasil
            window.location.reload();
          });
      } catch (error) {
        swalWithBootstrapButtons.fire(
          "Error",
          "An error occurred while deleting the file.",
          "error"
        );
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Handle cancellation
      swalWithBootstrapButtons.fire(
        "Cancelled",
        "Your imaginary file is safe :)",
        "error"
      );
    }
  }

  const columns = [
    {
      field: "address_room",
      headerName: "No. Kamar",
      width: 80,
      renderCell: (params) => (
        <Link to={`/kamar-detail/${params.row.id}`}>{params.value}</Link>
      ),
    },
    {
      field: "picture_room",
      headerName: "Picture",
      width: 150,
      renderCell: (params) => (
        <div>
          <img
            src={params.value}
            alt="product"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        </div>
      ),
    },
    {
      field: "barang_dipesan",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: params.row.barang_dipesan ? "orange" : "gray",
          }}
        >
          {params.row.barang_dipesan !== undefined
            ? params.row.barang_dipesan
              ? "Dipesan"
              : "Belum Dipesan"
            : "Data not available"}
        </div>
      ),
    },

    {
      field: "price_day",
      headerName: "Harga/Hari",
      width: 100,
    },
    {
      field: "price_month",
      headerName: "Harga/Bulan",
      width: 100,
    },
    {
      field: "price_year",
      headerName: "Harga/Tahun",
      width: 100,
    },
    {
      field: "room_size",
      headerName: "Ukuran Kamar",
      width: 110,
    },
    {
      field: "approvekamar",
      headerName: "Status Approve",
      width: 140,
      renderCell: (params) => {
        const approveData = params.row.approvekamar; // Ambil data approvekamar dari baris saat ini
        const approveStatus =
          approveData && approveData.length > 0 ? approveData[0].approve : null;

        console.log(approveStatus);
        return (
          <div
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
              textAlign: "center",
              backgroundColor: approveStatus ? "green" : "grey",
              color: "white",
            }}
          >
            {approveStatus !== null
              ? approveStatus
                ? "Approve"
                : "Not Approve"
              : "Not Approve"}
          </div>
        );
      },
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
            onClick={() => navigate(`/kamar-update/${params.row.id}`)}
          >
            Update
          </Button>
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
            color="warning"
            onClick={() => {
              deleteTransaksi(params.id);
              // updateApprove(params.id, false);
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteKamar(params.id);
            }}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Grid container style={{position: 'absolute', width: "90%", marginLeft: "3rem" }}>
        <Grid item xs={12} style={{ margin: 'auto', marginTop: "2rem" }}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(`/kamar-add/${params.id}`)}
          >
            Tambah Kamar
          </Button>
          <Button
            color="primary"
            variant="contained"
            marginLeft="0.5rem"
            style={{ margin: "0.5rem" }}
            onClick={() => navigate(`/datakosApprove/${params.id}`)}
          >
            Pesan
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate(`/datakosUser/${params.id}`)}
          >
            Penghuni Kos
          </Button>
        </Grid>
        <div className="responsive-table" style={{ height: 480, width: "90%" }}>
          <DataGrid rows={allRoom} columns={columns} checkboxSelection />
        </div>
      </Grid>
    </>
  );
}

export default DataKamar;
