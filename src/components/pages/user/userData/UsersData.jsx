import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./UsersData.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import { transcode } from "buffer";
const UsersData = () => {
  const { roles } = useRoleContext();
  const { branches } = useBranchContext();
  const [initialData, setData] = useState([{ name: "" }]);
  const [filteredData, setFilteredData] = useState(initialData);

  console.log("initialData: ", initialData);

  const [deleted, setDeleted] = useState(false);
  const [profiles, setProfiles] = useState([]);
  // for fillter changing numbers 10,20,30
  const [itemsPerPage, setrecordsPerPage] = useState(10);

  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };
  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const records = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/getuserroles`
      );

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
  useEffect(() => {
    fetchData();
  }, [deleted]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteuser/${id}`)
      .then(() => setDeleted(!deleted))
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // const deleteuser = async (id) => {
  //   try {
  //     const res2 = await fetch(`http://localhost:3030/deleteuser/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res2.status === 404) {
  //       console.log("User not found");
  //     } else if (res2.status === 422) {
  //       console.log("Unprocessable Entity");
  //     } else if (res2.status === 200) {
  //       const deletedata = await res2.json();
  //       console.log("User deleted successfully", deletedata);
  //     } else {
  //       console.log("Unexpected error");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const [userData, setUserData] = useState([]);

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
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/userdata`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);
  // console.log(userData);
  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.fullname
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.branch
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.designation
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.department
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.reportto
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.profile
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase())
        : true;

      const branchCondition = filterCriteria.branch
        ? item.branch === filterCriteria.branch
        : true;

      const profileCondition = filterCriteria.profile
        ? item.profile === filterCriteria.profile
        : true;

      return profileCondition && branchCondition && searchCondition;
    });

    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
  // clear button reset
  const filterreset = () => {
    setFilterCriteria({
      search: "",
      branch: "",
      profile: "",
    });
  };
  let initialDataCount = initialData.length;
  let recordCount = filteredData.length;
  // for filter change numbers 10,25,50

  return (
    // style={{ margin: "30px 0px 0px 20px" }}
    <div className="container">
      <div className="userlist mt-4">
        <h2 className="ms-3 my-3">Users List</h2>

        <div className="row mb-3 px-4 pt-3">
          <div className="col-12 col-md-8 col-lg-8 col-xl-9">
            <input
              type="text"
              className="input-field "
              placeholder="Search Here..."
              autoComplete="off"
              style={{
                height: "45px",
                width: "100%",
                outline: "none",
                borderTop: "none",
                borderBottom: "1.5px solid black",
                background: "none",
                border: "hidden",
                borderRadius: "5px",
              }}
              name="search"
              value={filterCriteria.search}
              onChange={handleInputChange}
            />
            <hr className="w-75" />
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-xl-1 mt-3">
            <h6>
              {" "}
              {recordCount}/{initialDataCount}
            </h6>
          </div>
          <div className="col-3 col-md-1 col-lg-1 col-xl-1 mt-2">
            <select onChange={handlerecorddata}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </select>
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-xl-1 ">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <button
                className="btn btn-primary"
                style={{ textTransform: "capitalize" }}
              >
                {" "}
                Filter{" "}
              </button>
            </Button>

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
              <div className="d-flex justify-content-between">
                <MenuItem> Filter</MenuItem>
                <MenuItem>
                  {" "}
                  <CloseIcon onClick={handleClose} />{" "}
                </MenuItem>
              </div>
              <hr />
              <MenuItem>
                <label className="mt-3 me-2">Profile:</label>
                <select
                  className="mt-3 w-100 "
                  id=""
                  required
                  style={{
                    height: "45px",
                    width: "75%",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="profile"
                  value={filterCriteria.profile}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>
                  {roles &&
                    roles.map((item, index) => (
                      <option key={item.id} value={item.role}>
                        {item.role}
                      </option>
                    ))}
                </select>
              </MenuItem>
              <MenuItem>
                <label className="mt-3 me-2 "> Branch: </label>
                <select
                  className="mt-3 w-100 "
                  id=""
                  required
                  style={{
                    height: "45px",
                    width: "75%",

                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="branch"
                  value={filterCriteria.branch}
                  onChange={handleInputChange}
                >
                  <option value="">--select--</option>

                  {branches &&
                    branches.map((item, index) => (
                      <option key={item.id} value={item.branch_name}>
                        {item.branch_name}
                      </option>
                    ))}
                </select>
              </MenuItem>
              <MenuItem className="d-flex justify-content-between">
                {/* <button className="save"> Save</button> */}
                <button className="clear" onClick={filterreset}>
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div>
          <div className="usertable">
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        className=" bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Name
                      </StyledTableCell>
                      <StyledTableCell
                        className=" bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Email
                      </StyledTableCell>
                      <StyledTableCell
                        className="  bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Phone No
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Designation
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Department
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Report To
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1  "
                        align="center"
                      >
                        Profile
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1  "
                        align="center"
                      >
                        Branch
                      </StyledTableCell>
                      <StyledTableCell
                        className="bg-primary fs-6 border border1 "
                        align="center"
                      >
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records &&
                      records.map((user) => (
                        <StyledTableRow>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {user.fullname}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            <span
                              style={{
                                width: "200px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                              }}
                            >
                              {user.email}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {" "}
                            {user.phonenumber}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {user.designation}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {user.department}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {user.reportto}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {user.profile}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className="p-0 m-0 border border1 "
                          >
                            {" "}
                            {user.branch}
                          </StyledTableCell>
                          <StyledTableCell align="center" className="d-flex ">
                            {/* <RemoveRedEyeIcon onClick={handleview}/> */}
                            <Link
                              to={`/userview/${user.id}`}
                              style={{ width: "40px" }}
                            >
                              <VisibilityIcon className="iconn" />
                            </Link>
                            <Link
                              to={`/edituser/${user.id}`}
                              style={{ width: "40px" }}
                            >
                              <ModeEditIcon />
                            </Link>
                            <DeleteIcon
                              style={{ width: "40px" }}
                              onClick={() => handleDelete(user.id)}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredData.length / itemsPerPage)}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersData;
