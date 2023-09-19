import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { canvasToBlob } from "blob-util";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import ikon unduh
import { toPng } from "html-to-image";

const useStyles = makeStyles(() => ({
  receipt: {
    padding: 2,
    width: "25rem",
    height: "100%",
    margin: "auto",
    marginTop: 3,
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  kamars: {
    position: "relative",
    border: "4px solid gray",
    width: "90%",
    margin: "auto",
    marginTop: 10,
    padding: 10,
  },
  label: {
    display: "inline-block",
    width: "150px",
    fontWeight: "bold",
  },

  label2: {
    fontSize: "12px",
  },
  kamar: {
    marginTop: 3,
    padding: "10px",
  },
  status: {
    fontSize: "12px",
    lineHeight: "1.2",
  },
  approved: {
    color: "green",
    fontWeight: "bold",
  },
  processing: {
    color: "orange",
    fontWeight: "bold",
  },
}));

function ImageConverter({ transaction }) {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const elementRef = useRef(null);

  console.log(elementRef);

  const transactionDate = new Date(transaction.date);

  const year = transactionDate.getFullYear();
  const month = transactionDate.getMonth() + 1;
  const day = transactionDate.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  const handleDownloadClick = async () => {
    try {
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(imageUrl);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDownloadFromModal = () => {
    html2canvas(elementRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "my-image-name.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
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
          fontWeight: "bold",
          textAlign: "center",
        }}
        onClick={handleDownloadClick}
      >
        Unduh
      </Button>

      <div>
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogContent id="modal-content">
            <Paper ref={elementRef} className={classes.receipt} elevation={3}>
              <Typography variant="h5" className={classes.header}>
                Payment Receipt
              </Typography>
              <Typography variant="h5" textAlign="center">
                MyKoss
              </Typography>
              <div className={classes.kamars}>
                <Typography>
                  <strong className={classes.label}>Transaction ID</strong>:{" "}
                  {transaction.id}
                </Typography>
                <Typography>
                  <strong className={classes.label}>Name</strong>:{" "}
                  {transaction.fullName}
                </Typography>
                <Typography>
                  <strong className={classes.label}>No Rekening Tujuan</strong>:{" "}
                  {transaction.noRekening}
                </Typography>
                <Typography>
                  <strong className={classes.label}>Frekuensi Sewa</strong>:{" "}
                  {transaction.rentalFrequency}
                </Typography>
                <Typography>
                  <strong className={classes.label}>Total Bayar</strong>:{" "}
                  {transaction.nominal}
                </Typography>
              </div>
              <div className={classes.kamar}>
                <Typography className={classes.label2}>
                  Nama Rumah: {transaction.listing_title}
                </Typography>
                <Typography className={classes.label2}>
                  Alamat Rumah: {transaction.listing_title}
                </Typography>
                <Typography className={classes.label2}>
                  Alamat Kamar: {transaction.addressRoom}
                </Typography>

                <Typography className={classes.label2}>
                  Date: {formattedDate}
                </Typography>
                <Typography className={classes.label2}>
                  Status:{" "}
                  {transaction.approve ? (
                    <span className={classes.approved}>Approved</span>
                  ) : (
                    <span className={classes.processing}>Processing</span>
                  )}
                </Typography>
              </div>
            </Paper>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={handleDownloadFromModal}>
              <GetAppIcon />
            </IconButton>
            <Button onClick={handleCloseModal} variant="outlined">
              Tutup
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ImageConverter;
