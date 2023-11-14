import React, { useEffect } from "react";
import { getCustomerUser } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import HomeImg from "../components/HomeImg";
import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerUser());
  }, [dispatch]);

  const isOwner = useSelector((state) => state.auth.isOwner);

  
  useEffect(() => {
    if (isOwner) {
      navigate("/owner/home");
    }
  }, [isOwner, navigate]);

  const isauthentication = useSelector((state) => state.auth.isAuthenticated);
  const customer = useSelector((state) => state.auth.isCustomer);
  console.log(customer);
  console.log(isauthentication);
  return (
    <>
      <HomeImg />
    </>
  );
}

export default CustomerHome;
