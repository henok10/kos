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

    const transactionDate = new Date(transaction.date);

    // Mendapatkan tahun, bulan, dan tanggal dari objek Date
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1; // Ingat bahwa indeks bulan dimulai dari 0, jadi tambahkan 1.
    const day = transactionDate.getDate();

    // Membuat string dengan format yang diinginkan (misalnya, "2023-09-08")
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

    

    divToConvert.innerHTML = `
        <div class="receipt">
          <h2>Payment Receipt</h2>
          <h2>MyKoss</h2>
          <div class='kamars'>
              <p><strong>Transaction ID:</strong> ${transaction.id}</p>
              <p><strong>Name:</strong> ${transaction.fullName}</p>
              <p><strong>No Rekening Tujuan:</strong> ${
                transaction.noRekening
              }</p>
              <p><strong>Frekuensi Sewa:</strong> ${
                transaction.rentalFrequency
              }</p>
              <p><strong>Total Bayar:</strong> ${transaction.nominal}</p>
          </div>
          

          <div class='kamar'>
            <p>Alamat Kamar: ${transaction.addressRoom}</p>
            <p>Alamar Rumah: ${transaction.listing_title}</p>
            <p>Date: ${formattedDate}</p>
            <p>Status: ${
              transaction.approve
                ? "<span class='approved'>Approved</span>"
                : "<span class='processing'>Processing</span>"
            }</p>
          </div>
         
        </div>
  
          <style>
              div {
                width: 23rem;
                background-color: #87CEFA;

              }
              div.receipt {
                padding: 20px;
 
              }
  
              h2 {
                  font-size: 20px;
                  font-weight: bolt;
                  text-align: center; 
              }
  
              div.receipt div.kamars{
                
                display: fixed;
                border: 1px solid gray;
                width: 90%;
                margin: auto;
                margin-top: 30px;
                padding: 10px;
              }

              div.receipt div.kamars p{
                  // border-bottom: 1px solid gray
              }

              div.receipt div.kamar {
                margin-top: 3rem;
              }
              div.receipt div.kamar p { 
               
                line-height: 0.2;
                font-size: 12px;
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
