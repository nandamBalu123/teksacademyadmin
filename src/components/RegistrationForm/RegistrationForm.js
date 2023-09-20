import React from "react";
import { Box } from "@mui/material";
const RegistrationForm = () => {
  return (
    <Box>
      <form>
        <h3
          style={{
            textAlign: "left",
            paddingBottom: ".8em",
            fontWeight: "600",
          }}
        >
          Registration form
        </h3>
        <label>Name : </label>
        <input />
        <label>Email : </label>
        <input />
      </form>
    </Box>
  );
};

export default RegistrationForm;
