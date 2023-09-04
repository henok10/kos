import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="flex-fill text-center">
        <h3>Signup as a customer</h3>
        <Link to="/customer/signup" className="btn btn-warning">
          Signup
        </Link>
      </div>
      <div className="flex-fill text-center">
        <h3>Signup as a property owner</h3>
        <Link to="/owner/signup" className="btn btn-warning">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Register;
