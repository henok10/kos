import React, { useState } from "react";
import html2canvas from "html2canvas";
import { canvasToBlob } from "blob-util";
import { Button } from "@mui/material";

function ImageConverter({ transaction }) {
  const convertToImage = async (element) => {
    try {
      const canvas = await html2canvas(element);
      const blob = await canvasToBlob(canvas);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error converting HTML to image", error);
      return null;
    }
  };

  const handleDownloadClick = async () => {
    console.log("Mengklik tombol unduh");
    console.log(transaction.noRekening);
    // Membuat elemen div baru dengan konten yang ingin Anda konversi menjadi gambar
    const divToConvert = document.createElement("div");
    divToConvert.innerHTML = `
        <div class="receipt">
          <h2>Payment Receipt</h2>
          <h2>MyKoss</h2>
          <div class='kamars'>
              <p><strong>Transaction ID:</strong> ${transaction.id}</p>
              <p><strong>Name:</strong> ${transaction.fullName}</p>
              <p><strong>No Rekening Tujuan:</strong> ${transaction.noRekening}</p>
              <p><strong>Frekuensi Sewa:</strong> ${transaction.rentalFrequency}</p>
              <p><strong>Total Bayar:</strong> ${transaction.nominal}</p>
          </div>
          

          <div class='kamar'>
            <p><strong>Alamat Kamar:</strong> ${transaction.addressRoom}</p>
            <p><strong>Alamar Rumah:</strong> ${transaction.listing_title}</p>
            <p><strong>Date:</strong> ${transaction.date}</p>
            <p><strong>Status:</strong> ${
              transaction.approve
                ? "<span class='approved'>Approved</span>"
                : "<span class='processing'>Processing</span>"
            }</p>
          </div>
         
        </div>
  
          <style>
              div {
                width: 25rem;
                padding: 20px;
              }
  
              h2 {
                  font-size: 20px;
                  margin-bottom: 10px;
                  text-align: center; 
              }
  
              div.receipt div.kamars p{
                  width: 90%;
                  border-bottom: 1px solid gray
              }

              div.receipt div.kamar p { 
                line-height: 0.2;
            }
  
              strong {
                  font-weight: bold;
              }
  
              .approved {
                  color: green;
                  font-weight: bold;
              }
  
              .processing {
                  color: orange;
                  font-weight: bold;
              }
          </style>
        `;

    // Menambahkan elemen div ke dalam body dokumen
    document.body.appendChild(divToConvert);

    // Mengkonversi elemen div menjadi gambar
    const scale = 1; // Faktor perbesaran kanvas, sesuaikan sesuai kebutuhan
    convertToImage(divToConvert, transaction, scale)
      .then((imageUrl) => {
        console.log("Gambar diubah:", imageUrl);
        if (imageUrl) {
          const a = document.createElement("a");
          a.href = imageUrl;
          a.download = `receipt_${transaction.id}.png`;

          // Menambahkan atribut 'download' agar pengguna dapat mengklik untuk mengunduh
          a.setAttribute("download", `receipt_${transaction.id}.png`);

          // Menambahkan tautan ke dokumen
          document.body.appendChild(a);

          // Mengklik tautan untuk mengunduh
          a.click();

          // Membersihkan URL objek setelah pengunduhan
          URL.revokeObjectURL(imageUrl);

          // Menghapus elemen div yang baru saja dibuat
          document.body.removeChild(divToConvert);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          padding: "4px 8px",
          borderRadius: "4px",
          marginRight: "2%",
          //   color: "white",
          fontWeight: "bold",
          textAlign: "center",
        }}
        onClick={handleDownloadClick}
      >
        unduh
      </Button>
    </div>
  );
}

export default ImageConverter;
