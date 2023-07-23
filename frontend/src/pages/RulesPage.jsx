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
            <Typography variant="h5">Rules Pemilik Kost</Typography>
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
            <Typography variant="h5">Rules Customer</Typography>
            <Typography variant="body1">
            Rules login meliputi berbagai hal, diantaranya sebagai berikut:
            </Typography>
            <ol>
            <li>Pemilik kost melakukan registrasi pada halaman utama website.</li>
            <li>Pengguna setidaknya memiliki 1 atau lebih rumah kos sebelum mendaftar atau membuat akun pemilik kos.</li>
            </ol>
        </RulesContainer>
      </Grid>
    </Grid>
  );
};

export default RulesPage;
