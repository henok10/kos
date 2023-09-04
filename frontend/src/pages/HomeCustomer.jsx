import React, { useEffect } from "react";
import { getCustomerUser } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import HouseList from "../components/HomeList";

function CustomerHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerUser());
  }, [dispatch]);

  const isauthentication = useSelector((state) => state.auth.isAuthenticated);
  const customer = useSelector((state) => state.auth.isCustomer);
  console.log(customer);
  console.log(isauthentication);
  return (
    <>
      <HouseList />
    </>
  );
}

export default CustomerHome;
