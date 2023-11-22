import React, {useState, useRef} from "react";
import {
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { styled } from "@mui/system";

const RulesContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const RulesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const elementRef = useRef(null);
  const handleOpenClick = async () => {
    try {
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <Button
          // variant="contained"
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            marginRight: "2%",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%"
          }}
          onClick={handleOpenClick}
        >
          Rule Page
        </Button>
      </div>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogContent id="modal-content">
          <Grid ref={elementRef} container spacing={2}>
            <Grid item xs={12}>
              <RulesContainer>
                <Typography variant="h5">Rules registrasi dan login</Typography>
                <Typography variant="body1">
                  Rules untuk registrasi dan login meliputi berbagai hal,
                  diantaranya sebagai berikut:
                </Typography>
                <ol>
                  <li>Alamat email tidak boleh mengandung spasi.</li>
                  <li>
                    Alamat email harus memiliki setidaknya satu karakter sebelum
                    tanda "@".
                  </li>
                  <li>
                    Setelah tanda "@", alamat email harus memiliki setidaknya
                    satu karakter sebelum tanda ".".
                  </li>
                  <li>
                    Setelah tanda ".", alamat email harus terdiri dari 2 hingga
                    6 karakter.
                  </li>

                  <li>
                    Kata sandi harus mengandung setidaknya satu angka (\d).
                  </li>
                  <li>
                    Kata sandi harus mengandung setidaknya satu huruf kecil
                    ([a-z]).
                  </li>
                  <li>
                    Kata sandi harus mengandung setidaknya satu huruf besar
                    ([A-Z]).
                  </li>
                  <li>
                    Hanya karakter alfanumerik yang diperbolehkan dalam kata
                    sandi ([a-zA-Z0-9]).
                  </li>
                </ol>
              </RulesContainer>
            </Grid>
            <Grid item xs={12}>
              <RulesContainer>
                <Typography variant="h5">Rules Pemilik Kost</Typography>
                <Typography variant="body1">
                  Rules untuk pemilik kost meliputi berbagai hal, diantaranya
                  sebagai berikut:
                </Typography>
                <ol>
                  <li>
                    Pemilik kos dapat melakukan registrasi pada halaman utama
                    website.
                  </li>
                  <li>
                    Pemilik kos setidaknya memiliki 1 atau lebih rumah kos
                    sebelum mendaftar atau membuat akun pemilik kos.
                  </li>
                  <li>
                    Pemilik kos dapat menyetujui pemesanan kamar kos, jika pihak
                    pemilik kos dan customer sudah deal.
                  </li>
                  <li>
                    Pemilik kos diharapkan memasukkan informasi lengkap dan
                    sesuai dengan rumah kos.
                  </li>
                  <li>
                    Pemilik kos diharapkan dapat bertanggung jawab dengan
                    informasi rumah kos/kamar kos yang diberikan kepada
                    customer.
                  </li>
                  <li>
                    Pemilik kos diharapkan memasukkan informasi lengkap dan
                    sesuai dengan rumah kos.
                  </li>
                </ol>
              </RulesContainer>
            </Grid>
            <Grid item xs={12}>
              <RulesContainer>
                <Typography variant="h5">Rules Customer</Typography>
                <Typography variant="body1">
                  Rules untuk customer meliputi berbagai hal, diantaranya
                  sebagai berikut:
                </Typography>
                <ol>
                  <li>
                    Customer dapat melakukan registrasi pada halaman registrasi.
                  </li>
                  <li>
                    Customer dapat melakukan Pencarian pada halaman utama
                    website dan pada halaman pencarian tumah kos.
                  </li>
                  <li>
                    Customer hanya dapat memesan 1 atau lebih kamar kos dalam
                    periode waktu tertentu dan dapat di pertanggungjawabkan.
                  </li>
                  <li>
                    Customer disarankan menghubungi pihak pemilik kos sebelum
                    memesan kamar kos dan melakukan transaksi.
                  </li>
                  <li>
                    Customer dapat secara resmi menyewa kamar kos jika proses
                    transaksi disetujui pihak pemilik kos.
                  </li>
                  <li>
                    Customer dapat memberikan masukan dan lainnya pada kolom
                    review di halaman detail rumah kos.
                  </li>
                </ol>
              </RulesContainer>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RulesPage;
