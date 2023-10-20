import React from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const HandleWhatsApp = ({ listingInfo, phoneNumbers }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isCustomer = useSelector((state) => state.auth.isCustomer);
  const phoneNumber = phoneNumbers;
  const message = encodeURIComponent(
    `Halo, saya ingin memesan kamar kos (${listingInfo.title})`
  );
  const formattedPhoneNumber = phoneNumber.startsWith("0")
    ? `62${phoneNumber.substr(1)}`
    : phoneNumber;

  const handleWhatsAppClick = () => {
    if (!isAuthenticated || !isCustomer) {
      Swal.fire({
        title: "Error",
        text: "Silakan Buat Account Customer Untuk Memulai Percakapan!",
        icon: "error",
      });
    } else {
      window.open(
        `https://wa.me/${formattedPhoneNumber}?text=${message}`,
        "_blank"
      );
    }
  };

  return (
    <>
      <Button
        onClick={handleWhatsAppClick}
        variant="outlined"
        color="success"
        size="small"
        style={{ marginLeft: "0.5rem", width: "48%" }}
      >
        Chat Pemilik Kos
      </Button>
    </>
  );
};

export default HandleWhatsApp;
