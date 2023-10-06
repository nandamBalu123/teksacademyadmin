import React, { useEffect, useState } from "react";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

import "./UsersData.css";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
const UsersData = () => {
  // profile filter

  const [profiles, setProfiles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/getuserroles");

      console.log("Response status:", response.status); // Log response status

      if (!response.ok) {
        console.error(
          "Network response error:",
          response.status,
          response.statusText
        );
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data.Result); // Log the fetched data
      const profileData = data.Result.map((item) => item.role);

      setProfiles(profileData); // Update the state with the extracted role data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
    setProfiles(profiles);
  }, []); // Empty dependency array means it runs once after the initial render

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:3030/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res2.status === 404) {
        console.log("User not found");
      } else if (res2.status === 422) {
        console.log("Unprocessable Entity");
      } else if (res2.status === 200) {
        const deletedata = await res2.json();
        console.log("User deleted successfully", deletedata);
      } else {
        console.log("Unexpected error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const deleteuser = async (id) => {
  //   try{
  //     const response = await fetch(`http://localhost:3030/deleteuser/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if(response.status === 200){
  //       console.log("User delete successfully");
  //     }else{
  //       console.log("Failed to delete user: ", response.statusText);
  //     }

  //   }catch (error){
  //     console.log("An error occurred:", error)
  //   }
  // }

  // const deleteuser = async (id) => {
  //   const res2 = await fetch(`http://localhost:3030/deleteuser/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const deletedata = await res2.json();
  //   console.log(deletedata);

  //   if (res2.status === 422 || !deletedata) {
  //     console.log("error");
  //   } else {
  //     console.log("user deleted");
  //     // setDLTdata(deletedata)
  //     // getdata();
  //   }
  // };
  // const deleteuser = async () => {
  //   if (!user) {
  //     return;
  //   }
  //   const response = await fetch("http://localhost:3030/deleteuser/delete", {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "DELETE_USER", payload: json });
  //   }
  // };

  // const [userData, setUserData] = useState([]);
  const [initialData, setData] = useState([{ name: "" }]);
  const [filteredData, setFilteredData] = useState(initialData);

  // const [filteredData, setFilteredData] = useState(userData);
  const [error, setError] = useState(null);
  // const [open, setOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    branch: "",
    profile: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3030/userdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data.Result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);
  // console.log(userData);
  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
      const branchCondition = filterCriteria.branch
        ? item.branch === filterCriteria.branch
        : true;

      const profileCondition = filterCriteria.profile
        ? item.profile === filterCriteria.profile
        : true;

      return profileCondition && branchCondition;
    });

    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleedit = () => {
    navigate("/edit");
  };
  const handleview = () => {
    navigate("/userview");
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // style={{ margin: "30px 0px 0px 20px" }}
    <div className="container-fluid">
      <h2 className="ms-3">Users List</h2>
      <div className="mb-2">
        <div className="user-data">
          <input
            type="text"
            placeholder="Search Here......"
            style={{
              height: "55px",

              padding: "10px",
              margin: "3px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
            name="search"
            value={filterCriteria.search}
            onChange={handleInputChange}
          />
          {/* For Filter */}
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <button
              className="btn btn-primary mr-20 ms-2 mb-2"
              style={{ textTransform: "capitalize" }}
            >
              {" "}
              Filter{" "}
            </button>
          </Button>
        </div>

        {/* For Filter */}
        {/* <Button
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <h6 className="filters" style={{ textTransform: "capitalize" }}>
            {" "}
            Filter{" "}
          </h6>
        </Button> */}

        <Menu
          className="mt-5"
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem>
            {" "}
            <h6> Filter</h6>
          </MenuItem>
          <hr />
          <MenuItem>
            <label className="mt-3 me-3">Profile:</label>
            <select
              className="mt-3"
              id=""
              required
              style={{
                height: "45px",

                paddingRight: "145px",
                border: "1.5px solid black",
                borderRadius: "5px",
              }}
              name="profile"
              value={filterCriteria.profile}
              onChange={handleInputChange}
            >
              <option value="">--select--</option>
              {profiles.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
          </MenuItem>
          <MenuItem>
            <label className="mt-3 me-3"> Branch: </label>
            <select
              className="mt-3"
              id=""
              required
              style={{
                height: "45px",
                paddingLeft: "10px",
                paddingRight: "115px",
                border: "1.5px solid black",
                borderRadius: "5px",
              }}
              name="branch"
              value={filterCriteria.branch}
              onChange={handleInputChange}
            >
              <option value="">--select--</option>

              <option value="hitechcity">Hi-tech City</option>
              <option value="dilsukhnagar">dilshukanagar</option>
              <option value="ameerpet">ameerpet</option>
              <option value="gachibowli">gachibowli</option>
            </select>
          </MenuItem>
        </Menu>

        {/* <button className="Filter" onAuxClick={()=>setOpen(true)}> </button> */}
        {/* <button  className="Filter"  onClick={()=> setOpen(true)}> Fillter</button>
          <Dialog  
         
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="dialog-title"
          aria-describedby="dialogue-description"
        >
          <DialogTitle> Filter Users</DialogTitle>
          <DialogContent>
            <DialogContentText id="dialog description">
              <label htmlFor="">Enter Date</label>
              <input type='date' className='col-12 felids ' 
              id=""
              required
            style={{
              height: "45px",
              
              padding: "15px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          />
          <label htmlFor="" >Filter Branch</label>
          <select
            className="col-12  felids"
            id=""
          
            required
            style={{
              height: "45px",
              
               border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Hitech"> Hitech</option>
          </select>
          <label htmlFor="">Lead Source</label>
          <select
            className="col-12 felids "
            id=""
            placeholder='Lead Source'
            required
            style={{
              height: "45px",
             
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Walkin"> Walkin</option>
          </select>
          <label htmlFor="">Mode of Traning</label>
          <select
            className="col-12 felids"
            id=""
            placeholder='Mode of Traning'
            required
            style={{
              height: "45px",
              
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="online"> Online</option>
            <option value="offline"> Offline</option>
          </select>
            
              
               </DialogContentText>
            </DialogContent>
            <DialogActions> 
              <Button onClick={()=>setOpen(false)}>Cancel</Button>
              <Button autoFocus onClick={()=> setOpen}>Submit</Button>
            </DialogActions>
          </Dialog> */}
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className=" bg-primary fs-6">
                  Name
                </StyledTableCell>
                <StyledTableCell className=" bg-primary fs-6" align="center">
                  Email
                </StyledTableCell>
                <StyledTableCell className="  bg-primary fs-6" align="center">
                  Phone No
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6 " align="center">
                  Designation
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6 " align="center">
                  Department
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6" align="center">
                  Report To
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6 " align="center">
                  Profile
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6 " align="center">
                  Branch
                </StyledTableCell>
                <StyledTableCell className="bg-primary fs-6" align="center">
                  Action
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData &&
                filteredData.map((user) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {user.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      {user.phonenumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.designation}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.department}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.reportto}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.profile}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      {user.branch}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* <RemoveRedEyeIcon onClick={handleview}/> */}
                      <Link
                        to={`/userview/${user.id}`}
                        style={{ width: "40px" }}
                      >
                        <VisibilityIcon className="iconn" />
                      </Link>
                      <ModeEditIcon onClick={handleedit} />
                      <DeleteIcon onClick={() => deleteuser(user.id)} />{" "}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* <table className="table">
       
        <tbody>
    
          {userData &&
            userData.map((user) => (
              <tr>
                
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.designation}</td>
                <td>{user.department}</td>
                <td>{user.reportto}</td>
                <td>{user.profile}</td>
                <td>{user.branch}</td>
                <td>
                <button onClick={handleview}>View</button>
              <button onClick={handleedit}>Edit</button>

              <button onClick={() => deleteuser(user.id)}>Delete</button>
              </td>
              </tr>
            ))}
        </tbody>
      </table> */}
      {/* {userData &&
      userData.map((user) => (
        <tr>
        <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.phonenumber}</td>
          <td>{user.designation}</td>
          <td>{user.department}</td>
          <td>{user.reportto}</td>
          <td>{user.profile}</td>
          <td>{user.branch}</td>
          <td>
          <button onClick={handleview}>View</button>
        <button onClick={handleedit}>Edit</button>

        <button onClick={() => deleteuser(user.id)}>Delete</button>
        </td>
        </tr>
      ))} */}
    </div>
  );
};

export default UsersData;
