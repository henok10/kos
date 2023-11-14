import React, {useEffect} from "react";
import HomeImg from "../components/HomeImg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const isOwner = useSelector((state) => state.auth.isOwner);
  const navigate = useNavigate();


  useEffect(() => {
    if (isOwner) {
      navigate("/owner/home");
    }
  }, [isOwner, navigate]);
  return (
    <>
      <HomeImg />
    </>
  );
};

export default HomePage;
