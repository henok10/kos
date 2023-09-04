import Kasur from "../data/Fasilitas/Kasur.png";
import Wc from "../data/Fasilitas/Wc.png";
import Ac from "../data/Fasilitas/Ac.png";
import Lemari from "../data/Fasilitas/Lemari.png";
import Meja_Belajar from "../data/Fasilitas/Meja_Belajar.png";
import Kursi from "../data/Fasilitas/Kursi.png";
import Tempat_Tidur from "../data/Fasilitas/Tempat_Tidur.png";
import Parkiran from "../data/Fasilitas/Parkiran.png";
import Kolam from "../data/Fasilitas/Kolam.png";
import Dapur_Umum from "../data/Fasilitas/Dapur_Umum.png";
import Tangga from "../data/Fasilitas/Tangga.png";
import Lift from "../data/Fasilitas/Lift.png";
import CCTV from "../data/Fasilitas/CCTV.png";
import Lapangan from "../data/Fasilitas/Lapangan.png";
import Wifi from "../data/Fasilitas/Wifi.png";
import Tv_Umum from "../data/Fasilitas/Tv_Umum.png";
import Security from "../data/Fasilitas/Security.png";
import Fasilitas_Olahraga from "../data/Fasilitas/Fasilitas_Olahraga.png";
import Jasa_Laundry from "../data/Fasilitas/Jasa_Laundry.png";
import Kantin_Umum from "../data/Fasilitas/Kantin_Umum.png";
import Sarana_Hiburan from "../data/Fasilitas/Sarana_Hiburan.png";
import Cleaning_Service from "../data/Fasilitas/Cleaning_Service.png";

export function choices() {
  const choice_kamar = [
    {
      value: "",
      label: "",
    },
    {
      value: "Wc",
      label: "Wc",
      icon: `${Wc}`,
    },
    {
      value: "Lemari",
      label: "Lemari",
      icon: `${Lemari}`,
    },
    {
      value: "Meja Belajar",
      label: "Meja Belajar",
      icon: `${Meja_Belajar}`,
    },
    {
      value: "Kursi",
      label: "Kursi",
      icon: `${Kursi}`,
    },
    {
      value: "Tempat Tidur",
      label: "Tempat Tidur",
      icon: `${Tempat_Tidur}`,
    },
    {
      value: "Ac",
      label: "Ac",
      icon: `${Ac}`,
    },
    {
      value: "Kasur",
      label: "Kasur",
      icon: `${Kasur}`,
    },
  ];

  const choice_rumah = [
    {
      value: "",
      label: "",
    },
    {
      value: "Parkiran",
      label: "Parkiran",
      icon: `${Parkiran}`,
    },
    {
      value: "Kolam",
      label: "Kolam",
      icon: `${Kolam}`,
    },
    {
      value: "Dapur Umum",
      label: "Dapur Umum",
      icon: `${Dapur_Umum}`,
    },
    {
      value: "Wc Umum",
      label: "Wc Umum",
      icon: `Wc_Umum`,
    },
    {
      value: "Tangga",
      label: "Tangga",
      icon: `${Tangga}`,
    },
    {
      value: "Lift",
      label: "Lift",
      icon: `${Lift}`,
    },
    {
      value: "CCTV",
      label: "CCTV",
      icon: `${CCTV}`,
    },
    {
      value: "Lapangan",
      label: "Lapangan",
      icon: `${Lapangan}`,
    },
    {
      value: "Wifi",
      label: "Wifi",
      icon: `${Wifi}`,
    },
    {
      value: "Tv Umum",
      label: "Tv Umum",
      icon: `${Tv_Umum}`,
    },
    {
      value: "Fasilitas Olahraga",
      label: "Fasilitas Olahraga",
      icon: `${Fasilitas_Olahraga}`,
    },
    {
      value: "Security",
      label: "Security",
      icon: `${Security}`,
    },
    {
      value: "Jasa Laundry",
      label: "Jasa Laundry",
      icon: `${Jasa_Laundry}`,
    },
    {
      value: "Kantin Umum",
      label: "Kantin Umum",
      icon: `${Kantin_Umum}`,
    },
    {
      value: "Sarana Hiburan",
      label: "Sarana Hiburan",
      icon: `${Sarana_Hiburan}`,
    },
    {
      value: "Cleaning Service",
      label: "Cleaning Service",
      icon: `${Cleaning_Service}`,
    },
  ];

  return { choice_rumah, choice_kamar };
}
