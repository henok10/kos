import React from "react";
import { makeStyles } from "@mui/styles";
import city from "../data/minions.png";
import Search from "./Search";

const useStyles = makeStyles(() => ({
  hero: {
    backgroundImage: `url(${city})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "65vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // Tambahkan ini agar elemen <Search /> berada di tengah
  },
  searchWrapper: {
    marginTop: "20px", // Atur jarak antara gambar dan elemen <Search />
  },
}));

const HomeImg = ({ setSearchResults }) => {
  // Ganti setSearchTerm menjadi setSearchResults
  const classes = useStyles();
  return (
    <section className={classes.hero}>
      <div className={classes.searchWrapper}></div>
      <Search setSearchResults={setSearchResults} />{" "}
      {/* Ganti setSearchTerm menjadi setSearchResults */}
    </section>
  );
};

export default HomeImg;
