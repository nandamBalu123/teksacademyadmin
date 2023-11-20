import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBranch.css";
import { useState } from "react";
import { Update } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useBranchContext } from "../../../../hooks/useBranchContext";
const CreateBranch = () => {
  const { dispatch } = useBranchContext();
  const navigate = useNavigate();
  const [branch_name, setbranch] = useState("");
  //   const [description, setDescription] = useState("");
  const [BasicAccess, setBasicAccess] = useState({
    Read: false,
    Update: false,
    Delete: false,
    Create: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      branch_name,
    };

    // console.log("User Data:", user); // Log the user data being sent
    user = [user];
    const dataWithTitleCase = user.map((item) => {
      const newItem = {};

      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (typeof item[key] === "string" && key !== "email") {
            newItem[key] = item[key]
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          } else {
            newItem[key] = item[key];
          }
        }
      }

      return newItem;
    });
    user = dataWithTitleCase[0];
    const response = await fetch(`${process.env.REACT_APP_API_URL}/addbranch`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Response:", response); // Log the response from the server

    const json = await response.json();

    // console.log("JSON Response:", json); // Log the parsed JSON response

    if (response.ok) {
      console.log("User created successfully.");
      dispatch({ type: "CREATE_BRANCH", payload: json });
      // Reset the form fields
      // setbranch("");
      //   setDescription("");
      navigate("/branch");
    }
    // handleCheckboxChange();
    // console.log(role, description);
    // navigate("/roles");
  };
  return (
    <div  className="container mt-3">
      
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="createrole">

            <div className="row">
            <h4 className="text-center">Create Branch</h4>
              <div className="col-12 col-md-6 col-lg-6 ">
              <TextField
                label="Branch Name"
                className=" mar w-75"
                variant="standard"
                name="branchname"
                type="text"
                onChange={(e) => setbranch(e.target.value)}
              
            />
                {/* <input
                  className="form-control"
                  placeholder="Branch Name"
                  type="text"
                  value={branch_name}
                  onChange={(e) => setbranch(e.target.value)}
                  style={{ padding: "15px" }}
                /> */}
                {/* <TextField id="outlined-search" label="Role Name" type="text" value={role} onChange={(e) => setRoleName(e.target.value)} className="w-100" /> */}
              </div>
              <div className="col-12 col-md-6 col-lg-4 ">
                {/* <input
                  className="form-control"
                  placeholder="Role Description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ padding: "15px" }}
                /> */}
                {/* <TextField id="outlined-search" label="Role Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-100"  /> */}
              </div>
            </div>
            <div className="container ">
              <button
                type="submit"
                class="btn btn-primary my-4 "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
        {/* <label>Role Description :</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="col-12 col-md-6 col-lg-6"
          />
         */}
      </form>
    </div>
  );
};

export default CreateBranch;
