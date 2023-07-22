import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';

const RulesContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  }));

const RulesPage = () => {
  return (
    <Grid container spacing={2}>
       <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules registrasi dan login</Typography>
            <Typography variant="body1">
            Rules untuk registrasi dan login meliputi berbagai hal, diantaranya sebagai berikut:
            </Typography>
            <ol>
            <li>Alamat email tidak boleh mengandung spasi.</li>
            <li>Alamat email harus memiliki setidaknya satu karakter sebelum tanda "@".</li>
            <li>Setelah tanda "@", alamat email harus memiliki setidaknya satu karakter sebelum tanda ".".</li>
            <li>Setelah tanda ".", alamat email harus terdiri dari 2 hingga 6 karakter.</li>

            <li>Kata sandi harus mengandung setidaknya satu angka (\d).</li>
            <li>Kata sandi harus mengandung setidaknya satu huruf kecil ([a-z]).</li>
            <li>Kata sandi harus mengandung setidaknya satu huruf besar ([A-Z]).</li>
            <li>Hanya karakter alfanumerik yang diperbolehkan dalam kata sandi ([a-zA-Z0-9]).</li>
            




            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Pendaftaran Pemilik Kost</Typography>
            <Typography variant="body1">
            Rules untuk pendaftaran pemilik kost meliputi berbagai hal, diantaranya sebagai berikut:
            </Typography>
            <ol>
            <li>Pemilik kost melakukan registrasi pada halaman utama website.</li>
            <li>Pengguna setidaknya memiliki 1 atau lebih rumah kos sebelum mendaftar atau membuat akun pemilik kos.</li>
            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules login pengguna website</Typography>
            <Typography variant="body1">
            Rules login meliputi berbagai hal, diantaranya sebagai berikut:
            </Typography>
            <ol>
            <li>Pemilik kost melakukan registrasi pada halaman utama website.</li>
            <li>Pengguna setidaknya memiliki 1 atau lebih rumah kos sebelum mendaftar atau membuat akun pemilik kos.</li>
            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Pencarian Rumah Kos</Typography>
            <Typography variant="body1">
            Rules login meliputi berbagai hal, diantaranya sebagai berikut:
            </Typography>
            <ol>
            <li>Pemilik kost melakukan registrasi pada halaman utama website.</li>
            <li>Pengguna setidaknya memiliki 1 atau lebih rumah kos sebelum mendaftar atau membuat akun pemilik kos.</li>
            </ol>
        </RulesContainer>
      </Grid>
      {/* <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Pembayaran Pendaftaran</Typography>
            <Typography variant="body1">
            Rules yang penulis buat untuk pembayaran dari pendaftaran pemilik kost tersebut adalah sebagai berikut:
            </Typography>
            <ol>
            <li>Pendaftaran pemilik kost dikenakan biaya sekali sampai masa aktif keanggotaan habis dan melakukan perpanjangan.</li>
            <li>Setelah melakukan pendaftaran online, calon member melakukan transfer biaya pendaftaran.</li>
            <li>Masa aktifasi untuk calon member paling lama 1 x 24 jam dari saat konfirmasi transfer.</li>
            <li>Aktifasi member akan diberitahukan melalui sms dan member mendapatkan user baru.</li>
            <li>Member telah aktif, dan siap untuk mempromosikan rumah kost.</li>
            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Managemen Rumah Kost</Typography>
            <Typography variant="body1">
            Rules yang dibuat untuk melakukan managemen terhadap rumah kost tersebut adalah sebagai berikut:
            </Typography>
            <ol>
            <li>Member yang telah aktif dapat login dan memulai melakukan entrian rumah kost yang dipromosikan.</li>
            <li>Entrian terhadap rumah kost ini saat ini masih unlimited, artinya member dapat sebanyak mungkin mengiklankan rumah kost yang dimiliki.</li>
            <li>Pada media iklan di sistem ini diberlakukan Open Off iklan, artinya iklan yang tampil adalah yang merupakan rumah kost yang masih dapat disewa.</li>
            <li>Maka dari itu Member Owner diharuskan untuk melakukan update status dari setiap kamar, yaitu update status pada jumlah kamar yang tersewa.</li>
            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Pencarian Kost</Typography>
            <Typography variant="body1">
            Pencarian rumah kost yang dilakukan oleh calon penyewa juga memiliki beberapa rules/aturan yang harus diketahui oleh calon penyewa kost, diantaranya adalah sebagai berikut:
            </Typography>
            <ol>
            <li>Pencari Kost dapat memanfaatkan sistem ini dalam mencari rumah kost yang sesuai kebutuhan dengan memasukkan kata kunci pencarian sedetail mungkin.</li>
            <li>Dalam mencari kost yang ditampilkan dalam sistem ini adalah rumah kost yang masih terdapat kamar kosong. Artinya jika rumah kost tersebut sudah penuh maka tidak akan muncul dalam hasil pencarian.</li>
            <li>Pencarian kost dapat dilakukan oleh member dan non-member, tetapi memiliki perbedaaan, yaitu pencari rumah kost member dapat melakukan pemesanan dari kamar yang telah dipilihnya.</li>
            </ol>
        </RulesContainer>
      </Grid>
      <Grid item xs={12}>
        <RulesContainer>
            <Typography variant="h5">Rules Reservasi Rumah Kost</Typography>
            <Typography variant="body1">
            Rules yang penulis buat untuk reservasi rumah kost adalah sebagai berikut:
            </Typography>
            <ol>
            <li>Pencari Kost dapat menjadi member pada sistem ini untuk bisa memanfaatkan fitur reservasi rumah kost melalui online ataupun SMS (Short Message Service).</li>
            <li>Setiap pemesanan dari rumah kost, member hanya diperbolehkan melakukan pemesanan sebanyak 3 kamar kost disetiap masa aktif pemesanan, dan member tidak diperbolehkan untuk memesan kamar yang sama secara berulang.</li>
            <li>Masa aktif dari pemesanan adalah 2 hari dari saat melakukan reservasi sampai saat pemilik kost melakukan update pada kamar.</li>
            <li>Setiap kamar kost dapat dipesan sebanyak jumlah qty dari kamar tersebut.</li>
            <li>Pemesanan disistem ini dibuat agar pencari kost dapat melakukan lock terhadap rumah kost yang telah direservasi, agar tidak dilakukan reservasi oleh member lain. Walaupun nantinya pencari kost akan berhubungan langsung dengan pemilik kost tersebut.</li>
            <li>Proses syarat pemesanan, seperti pembayaran uang muka dan lain-lain, langsung bisa berhubungan dengan pemilik kost melalui nomor handphone pemilik kost yang telah disediakan.</li>
            <li>Pemilik rumah kost diharuskan memenuhi waktu tenggang selama 2 hari masa pemesanan tersebut sebelum melakukan penyewaan terhadap pihak lain. Dan pemilik kost dapat menghubungi pihak yang melakukan reservasi jika memerlukan konfirmasi.</li>
            </ol>
        </RulesContainer>
      </Grid> */}
    </Grid>
  );
};

export default RulesPage;
