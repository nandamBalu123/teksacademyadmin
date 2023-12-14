import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRole.css";
import { useState } from "react";
import { Update } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRoleContext } from "../../../../hooks/useRoleContext";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const CreateRole = () => {
  const [usermanagement, setUsermanagement] = useState(false);
  const handleusermanagement = () => {
    setUsermanagement((e) => !e);
  }

  const [studentmanagement, setStudentmanagement] = useState(false);
  const handlestudentmanagement = () => {
    setStudentmanagement((e) => !e);
  }
  const { dispatch } = useRoleContext();
  const navigate = useNavigate();
  const [role, setRoleName] = useState("");
  const [description, setDescription] = useState("");

  const [BasicAccess, setBasicAccess] = useState({
    Read: false,
    Update: false,
    Delete: false,
    Create: false,
  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    let user = {
      role,
      description,
    };
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
    console.log("User Data:", user); // Log the user data being sent

    const response = await fetch(`${process.env.REACT_APP_API_URL}/userroles`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response); // Log the response from the server

    const json = await response.json();

    console.log("JSON Response:", json); // Log the parsed JSON response

    if (response.ok) {
      console.log("User created successfully.");
      dispatch({ type: "CREATE_ROLE", payload: json });
      // Reset the form fields
      setRoleName("");
      setDescription("");
      navigate("/roles");
    }
    // handleCheckboxChange();
    console.log(role, description);
    navigate("/roles");

  };
  return (
    <div className="container mt-3">
      <div className=" createrole mt-3">
        <form>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >

            <h5 className="text-center mt-3">CreateRole</h5>
            <div className="row text-center">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                <TextField
                  label={<span className="label-family">Role Name</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="rolename"
                  type="text"
                  value={role}
                  onChange={(e) => setRoleName(e.target.value)}
                />
                {/* <input
                  className="form-control"
                  placeholder="Role Name"
                  type="text"
                  value={role}
                  onChange={(e) => setRoleName(e.target.value)}
                  style={{ padding: "15px" }}
                /> */}
                {/* <TextField id="outlined-search" label="Role Name" type="text" value={role} onChange={(e) => setRoleName(e.target.value)} className="w-100" /> */}
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                <TextField
                  label={<span className="label-family">Role Description</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="roledescription"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />

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
            <div className="mb-3 me-4 text-end ">
              <button
                type="submit"
                class="btn btn-color"
                onClick={handleSubmit}
              >
                Submit
              </button>
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

        <div >
          <h4 className="ps-3"> Branch Manager</h4>
          <div className='access'>


            <h5 className='my-4'> Modele & Object Permissions</h5>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>

                    <TableCell className="table-cell-heading w-25" align="center" > Name</TableCell>
                    <TableCell colSpan={4} className="table-cell-heading" align="center">Access</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow>


                    <TableCell className="Table-cell text-center" ></TableCell>
                    <TableCell className="Table-cell text-center"> Read</TableCell>
                    <TableCell className="Table-cell text-center">Update</TableCell>
                    <TableCell className="Table-cell text-center"> Delete</TableCell>
                    <TableCell className="Table-cell text-center"> Create</TableCell>

                  </TableRow>
                  <TableRow>
                    <TableCell onClick={handleusermanagement} className="Table-cell "> User Management</TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                  {usermanagement && (
                    <>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center"> Create User</TableCell>
                        <TableCell className="Table-cell text-center">NA </TableCell>
                        <TableCell className="Table-cell text-center">NA </TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                        <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                      </TableRow>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center"> User Details</TableCell>
                        <TableCell className="Table-cell text-center" ><Switch {...label} color="info" /> </TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                      </TableRow>


                    </>
                  )}
                  <TableRow>
                    <TableCell onClick={handlestudentmanagement} className="Table-cell "> Student Management</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {studentmanagement && (
                    <>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center">Student Details</TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                        <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>

                      </TableRow>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center"> Registration</TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                        <TableCell className="Table-cell text-center">NA</TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>

                      </TableRow>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center">Fee Details</TableCell>
                        <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                        <TableCell className="Table-cell text-center" >NA</TableCell>
                        <TableCell className="Table-cell text-center">NA</TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                      </TableRow>
                      <TableRow colSpan={4}>
                        <TableCell className="Table-cell text-center">Certificate</TableCell>
                        <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                        <TableCell className="Table-cell text-center"> NA </TableCell>
                        <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>

                      </TableRow>


                    </>
                  )}

                </TableBody>
              </Table>
            </TableContainer>


          </div>

        </div>


      </div>

      {/* <div>
          <h2>Module & Object Permissions</h2>
        </div> */}
      {/* <div>
          <table class="table" border="1">
            <thead border="1">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Basic Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <tr>
                    <th>Read</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>Create</th>
                  </tr>
                </td>
              </tr>
              <tr>
                <td>Student</td>
                <td>
                  <tr>
                    <div style={{ display: "flex" }}>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Read"
                          value={BasicAccess.Read}
                          checked={BasicAccess.Read}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Update"
                          value={BasicAccess.Update}
                          checked={BasicAccess.Update}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Delete"
                          value={BasicAccess.Delete}
                          checked={BasicAccess.Delete}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Create"
                          value={BasicAccess.Create}
                          checked={BasicAccess.Create}
                          // onChange={(event) => handleCheckboxChange(event)}
                        />
                      </div>
                    </div>
                  </tr>
                </td>
              </tr>
              <tr>
                <td>employee</td>
                <td>
                  <tr>
                    <div style={{ display: "flex" }}>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(read)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(update)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(update)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(delete)"
                        />
                      </div>
                    </div>
                  </tr>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}








    </div>
  );
};

export default CreateRole;
