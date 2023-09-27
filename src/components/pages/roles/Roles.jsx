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
      <p>Roles</p>
      <button onClick={handleSubmit}>Add Role</button>
    </div>
  );
};

export default Roles;
