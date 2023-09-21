import React, { useEffect } from "react";
import { getOwnerUser } from "../actions/auth";
import { useDispatch } from "react-redux";
import HomeImg from "../components/HomeImg";

function OwnerHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnerUser());
  }, [dispatch]);
  return (
    <>
      <HomeImg />
    </>
  );
}

export default OwnerHome;
