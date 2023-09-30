import React from "react";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createrole");
  };
  return (
    <div>
      <p className="fs-5 ms-3">Roles</p>
      <div className="container "><button type="submit" class="btn btn-primary mr-20 " onClick={handleSubmit}>
             Add Role
            </button></div>
      
    </div>
  );
};

export default Roles;
