import React, { useEffect } from "react";
import { getOwnerUser } from "../actions/auth";
import { useDispatch } from "react-redux";
import HouseList from "../components/HomeList";

function OwnerHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnerUser());
  }, [dispatch]);
  return (
    <>
      <HouseList />
    </>
  );
}

export default OwnerHome;
