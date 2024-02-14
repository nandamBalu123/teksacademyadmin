import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RoleAccess.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRoleContext } from '../../../../hooks/useRoleContext';
import Switch from '@mui/material/Switch';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const RoleAccess = () => {
  // const { dispatch } = useRoleContext();
  const navigate = useNavigate();
  const [usermanagement, setUsermanagement] = useState(false);
  const handleusermanagement = () => {
    setUsermanagement((e) => !e);
  }

  const [studentmanagement, setStudentmanagement] = useState(false);
  const handlestudentmanagement = () => {
    setStudentmanagement((e) => !e);
  }

  const { id } = useParams();
  console.log(id);

  const [role, setrole] = useState();

  const [permissions, setPermissions] = useState();
  if (role) {
    console.log("lksdjflkjdf", role.role)
  }
  useEffect(() => {
    if (role) {
      setPermissions(role.permissions);
    }
  }, [role])
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setrole((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  // get method from usecontext
  const { roles } = useRoleContext();


  useEffect(() => {
    if (roles && id) {
      const filteredResults = roles.filter((item) => {
        const singleUserCondition = id ? item.id === parseInt(id) : true;

        return singleUserCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setrole(filteredResults[0]);
    }
  }, [roles, id]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      permissions
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
    console.log("User Data:", user);

    try {
      const userId = id; // Replace with the actual user ID
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updaterolespermissions/${userId}`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/roles');

      console.log('Response:', response.data);
      if (response.status === 200) {
        console.log('User roles and permissions updated successfully.');
        // Handle success scenarios here
      }

    } catch (error) {
      console.error('Error updating user roles and permissions:', error);
      // Handle error scenarios here
    }
  };

  //   useEffect(() => {
  // console.log("filteredResults1", filteredResults)
  // }, [roles])

  const [selectedPermission, setSelectedPermission] = useState(null);
  const handlePermissionClick = (permission) => {

    setSelectedPermission(selectedPermission === permission ? null : permission);
    // setSelectedCounsellor(null); // Reset selected counsellor when a branch is clicked
  };


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
  return (
    <div className='container'>
      <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <h3 style={{ fontFamily: "italic" }}> {role && role.role}</h3>
      <div className='access'>


        <h5 className='my-4 ms-2'> Permissions</h5>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell className="table-cell-heading w-25" align="center" > Name</TableCell>
                <TableCell className="table-cell-heading" style={{ width: "15%" }} align="center">ALL</TableCell>
                <TableCell colSpan={4} className="table-cell-heading" align="center">Access</TableCell>

              </TableRow>
              <TableRow>


                <TableCell className="Table-cell text-center" ></TableCell>
                <TableCell className="Table-cell text-center" >ALL</TableCell>
                <TableCell className="Table-cell text-center"> Read</TableCell>
                <TableCell className="Table-cell text-center">Update</TableCell>
                <TableCell className="Table-cell text-center"> Delete</TableCell>
                <TableCell className="Table-cell text-center"> Create</TableCell>

              </TableRow>
            </TableHead>

            <TableBody>
              {permissions && permissions.map((permission, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell style={{ cursor: "pointer" }} className="Table-cell" onClick={() => handlePermissionClick(permission.feature)}>
                      {permission.feature}
                    </TableCell>
                    <TableCell className='text-center'>
                      <Switch
                        checked={permission.all}
                        className='text-center'
                        onChange={() => handleChange(index, null, 'all')}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="info"
                      />
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ borderRight: "1px solid #e3eee3" }}></TableCell>
                  </TableRow>
                  {selectedPermission === permission.feature &&
                    permission.submenus.map((submenu, subIndex) => (
                      <TableRow key={subIndex}>
                        <TableCell className="Table-cell text-center">{submenu.subfeature}</TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell className='text-center'>
                          <Switch
                            className='text-center'
                            checked={submenu.read || permission.all}  // Updated line here
                            onChange={() => handleChange(index, subIndex, 'read')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Switch
                            className='text-center'
                            checked={submenu.update || permission.all}
                            onChange={() => handleChange(index, subIndex, 'update')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Switch
                            className='text-center'
                            checked={submenu.delete || permission.all}
                            onChange={() => handleChange(index, subIndex, 'delete')}
                            inputProps={{ 'aria-label': 'controlled' }}
                            color="info"
                          />
                        </TableCell>
                        <TableCell className='text-center'>
                          <Switch
                            className='text-center'
                            checked={submenu.create || permission.all}
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




          </Table>
        </TableContainer>

        {/* <TableContainer component={Paper}>
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
        </TableContainer> */}


      </div>
      <div className="d-flex justify-content-end m-3"> <button className="btn btn-color " onClick={handleSubmit}>Save</button></div>
    </div>

  )
}

export default RoleAccess