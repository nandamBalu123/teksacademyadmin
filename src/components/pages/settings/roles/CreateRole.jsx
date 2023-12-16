import React, { useEffect } from "react";
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
  const [permissions, setPermissions] = useState([
    {
      "feature": "User Management",
      "read": true,
      "update": true,
      "delete": false,
      "create": true,
      "submenus": [
        {
          "subfeature": "Create User",
          "read": true,
          "update": false,
          "delete": true,
          "create": true,
          "actions": [
            {
              "view": true,
              "edit": true,
              "delete": true,
              "create": true
            }
          ]
        },
        {
          "subfeature": "User Details",
          "read": true,
          "update": true,
          "delete": true,
          "create": true,
          "actions": [
            {
              "view": true,
              "edit": true,
              "delete": true,
              "create": true
            }
          ]
        }
      ]
    },
    {
      "feature": "Student Management",
      "read": true,
      "update": true,
      "delete": true,
      "create": true,
      "submenus": [
        {
          "subfeature": "Create Student",
          "read": true,
          "update": true,
          "delete": true,
          "create": true,
          "actions": [
            {
              "view": true,
              "edit": true,
              "delete": true,
              "create": true
            }
          ]
        },
        {
          "subfeature": "Student Details",
          "read": true,
          "update": true,
          "delete": true,
          "create": true,
          "actions": [
            {
              "view": true,
              "edit": true,
              "delete": true,
              "create": true
            }
          ]
        }
      ]
    },
  ]);
  // const handleChange = (index, type) => {
  //   setPermissions(prevPermissions => {
  //     const updatedPermissions = [...prevPermissions];
  //     const permission = { ...updatedPermissions[index] };

  //     // Toggle the specified permission type
  //     permission[type] = !permission[type];

  //     updatedPermissions[index] = permission;

  //     return updatedPermissions;
  //   });
  // };
  const handleChange = (index, subIndex, action) => {
    setPermissions(prevPermissions => {
      const newPermissions = [...prevPermissions];


      if (newPermissions[index]) {
        const permission = newPermissions[index];


        if (typeof subIndex !== 'undefined' && permission.submenus && permission.submenus[subIndex]) {
          const submenu = permission.submenus[subIndex];


          if (submenu.hasOwnProperty(action)) {
            submenu[action] = !submenu[action];
          }
        } else {

          if (permission.hasOwnProperty(action)) {
            permission[action] = !permission[action];
          }
        }
      }

      return newPermissions;
    });
  };
  const [selectedPermission, setSelectedPermission] = useState(null);
  const handlePermissionClick = (permission) => {

    setSelectedPermission(selectedPermission === permission ? null : permission);
    // setSelectedCounsellor(null); // Reset selected counsellor when a branch is clicked
  };

  useEffect(() => { console.log("permissions", permissions) })


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
    user = dataWithTitleCase;
    console.log("User Datagg:", user); // Log the user data being sent

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

              </div>
            </div>
            {/* <div className="mb-3 me-4 text-end ">
              <button
                type="submit"
                class="btn btn-color"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div> */}

          </Box>
        </form>

        <div >

          <div className='access my-2'>

            <h5 > Branch Manager</h5>
            <h6 className='my-4'> Modele & Object Permissions</h6>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>

                    <TableCell className="table-cell-heading w-25" align="center" > Name</TableCell>
                    <TableCell colSpan={4} className="table-cell-heading" align="center">Access</TableCell>

                  </TableRow>
                  <TableRow>


                    <TableCell className="Table-cell text-center" ></TableCell>
                    <TableCell className="Table-cell text-center"> Read</TableCell>
                    <TableCell className="Table-cell text-center">Update</TableCell>
                    <TableCell className="Table-cell text-center"> Delete</TableCell>
                    <TableCell className="Table-cell text-center"> Create</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {permissions.map((permission, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell className="Table-cell" onClick={() => handlePermissionClick(permission.feature)}>{permission.feature}</TableCell>
                        <TableCell>
                          <Switch
                            checked={permission.read}
                            onChange={() => handleChange(index, null, 'read')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={permission.update}
                            onChange={() => handleChange(index, null, 'update')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={permission.delete}
                            onChange={() => handleChange(index, null, 'delete')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={permission.create}
                            onChange={() => handleChange(index, null, 'create')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                      </TableRow>
                      {selectedPermission === permission.feature && permission.submenus.map((submenu, subIndex) => (
                        <TableRow key={subIndex}>
                          <TableCell className="Table-cell">{submenu.subfeature}</TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.read}
                              onChange={() => handleChange(index, subIndex, 'read')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.update}
                              onChange={() => handleChange(index, subIndex, 'update')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.delete}
                              onChange={() => handleChange(index, subIndex, 'delete')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.create}
                              onChange={() => handleChange(index, subIndex, 'create')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>




                {/* {permissions && permissions.map((permission, index) => {
                    return (
                      <TableRow key={index}>

                        <TableCell className="Table-cell "> {permission.feature}</TableCell>
                        <TableCell >
                          <Switch
                            checked={permission.read}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }} color="info"
                          />
                        </TableCell>
                        <TableCell >
                          <Switch
                            checked={permission.update}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }} color="info"
                          />
                        </TableCell>
                        <TableCell >
                          <Switch
                            checked={permission.delete}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }} color="info"
                          />
                        </TableCell>
                        <TableCell >
                          <Switch
                            checked={permission.create}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }} color="info"
                          />
                        </TableCell>
                      </TableRow>

                    );
                  })} */}

                {/* {permissions && permissions.map((permission, index) => (
                  <TableBody>
                    <TableRow key={index}>
                      <TableCell className="Table-cell">{permission.feature}</TableCell>
                      <TableCell>
                        <Switch
                          checked={permission.read}
                          onChange={() => handleChange(index, 'read')}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={permission.update}
                          onChange={() => handleChange(index, 'update')}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={permission.delete}
                          onChange={() => handleChange(index, 'delete')}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color="info"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={permission.create}
                          onChange={() => handleChange(index, 'create')}
                          inputProps={{ 'aria-label': 'controlled' }}
                          color="info"
                        />
                      </TableCell>
                    </TableRow>
                    {permission.submenus.map((submenu, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell className="Table-cell">{submenu.subfeature}</TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.read}
                              onChange={() => handleChange(index, 'read')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.update}
                              onChange={() => handleChange(index, 'update')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.delete}
                              onChange={() => handleChange(index, 'delete')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={submenu.create}
                              onChange={() => handleChange(index, 'create')}
                              inputProps={{ 'aria-label': 'controlled' }}
                              color="info"
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                ))} */}



              </Table>
            </TableContainer>


          </div>
          <div className="d-flex justify-content-end m-3"> <button className="btn btn-color " onClick={handleSubmit}>Submit</button></div>

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
