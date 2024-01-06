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
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { useDepartmentContext } from "../../../../hooks/useDepartmentcontext";
import { useUsersContext } from "../../../../hooks/useUsersContext";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
// import { useUsersContext } from "../../../../hooks/useUsersContext";
// import { transcode } from "buffer";
const UsersData = () => {
  const { roles } = useRoleContext();
  const { branches } = useBranchContext();
  const { departments } = useDepartmentContext();
  const { reporttoo } = useUsersContext();
  const { users, dispatch } = useUsersContext();

  const [opening, setOpening] = React.useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [userstatus, setUser_Status] = useState("");
  const [userremarkshistory, setuser_remarks_history] = useState("");

  useEffect(() => {
    if (users) {
      setData(users);
      console.log("users", users);
    }
  }, [users]);
  const handleClickOpen = (id, userStatus, userRemarksHistory) => {
    setId(id);
    setUser_Status(userStatus);
    setuser_remarks_history(userRemarksHistory);
    setOpening(true);
  };

  const handleClosed = () => {
    setOpening(false);
  };

  const [initialData, setData] = useState([{ name: "" }]);
  const [filteredData, setFilteredData] = useState(initialData);

  console.log("initialData: ", initialData);

  const [deleted, setDeleted] = useState(false);

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

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   fetchData();
  // }, [deleted]);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteuser/${id}`)
      .then(() => setDeleted(!deleted))
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const [error, setError] = useState(null);
  // const [open, setOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    branch: "",
    profile: "",
    department: "",
    reportto: "",
  });

  const [dummyFilterCriteria , setDummyFilterCriteria]= useState({ 
    
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.fullname
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.phonenumber
          .includes(filterCriteria.search.toLowerCase()) ||
        item.email
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.branch
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.reportto
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.designation
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.department
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
      const departmentCondition = filterCriteria.department
        ? item.department === filterCriteria.department
        : true;
      const reporttoCondition = filterCriteria.reportto
        ? item.reportto === filterCriteria.reportto
        : true;

      return (
        profileCondition &&
        branchCondition &&
        searchCondition &&
        departmentCondition &&
        reporttoCondition
      );
    });

    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //   [`&.${tableCellClasses.head}`]: {
  //     backgroundColor: theme.palette.common.black,
  //     color: theme.palette.common.white,
  //   },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
  // }));

  // const StyledTableRow = styled(TableRow)(({ theme }) => ({
  //   "&:nth-of-type(odd)": {
  //     backgroundColor: theme.palette.action.hover,
  //   },

  //   "&:last-child td, &:last-child th": {
  //     border: 0,
  //   },
  // }));

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
      department: "",
      reportto: "",
    });
  };
  let initialDataCount = initialData.length;
  let recordCount = filteredData.length;
  // for filter change numbers 10,25,50
  const handleActivate = () => {
    setOpening(false);

    if (text) {
      let user_status = true;
      let user_remarks_history = userremarkshistory;
      let newObject = {
        Activate_remarks: text,
        date: new Date(),
      };
      user_remarks_history.push(newObject);
      const updatedData = {
        user_status,
        user_remarks_history,
      };
      let uploadcontext = { user_status, user_remarks_history, id };
      // uploadcontext.user_remarks_history = JSON.stringify(
      //   uploadcontext.user_remarks_history
      // );
      axios
        .put(`${process.env.REACT_APP_API_URL}/userstatus/${id}`, updatedData)
        .then((res) => {
          if (res.data.updated) {
            // alert("Certificate updated successfully");
            dispatch({
              type: "UPDATE_USER_REMARKS_HISTORY",
              payload: uploadcontext,
            });
          } else {
            alert("Error please Try Again");
          }
        });
      // setcourseStartDate("");
      setText("");
    } else {
      alert("enter remarks");
    }
  };
  const handleInActivate = () => {
    setOpening(false);

    if (text) {
      let user_status = false;
      let user_remarks_history = userremarkshistory;
      let newObject = {
        Inactivate_remarks: text,
        date: new Date(),
      };
      user_remarks_history.push(newObject);
      const updatedData = {
        user_status,
        user_remarks_history,
      };
      let uploadcontext = { user_status, user_remarks_history, id };
      // uploadcontext.user_remarks_history = JSON.stringify(
      //   uploadcontext.user_remarks_history
      // );
      axios
        .put(`${process.env.REACT_APP_API_URL}/userstatus/${id}`, updatedData)
        .then((res) => {
          if (res.data.updated) {
            // alert("Certificate updated successfully");
            dispatch({
              type: "UPDATE_USER_REMARKS_HISTORY",
              payload: uploadcontext,
            });
          } else {
            alert("Error please Try Again");
          }
        });
      // setcourseStartDate("");
      setText("");
    } else {
      alert("enter remarks");
    }
  };
  // const dynamicStyle = {
  //   color: getstudentData.dueamount < 1 ? "green" : "red",
  //   fontSize: getstudentData.dueamount < 1 ? "20px" : "16px",
  //   fontWeight: getstudentData.dueamount < 1 ? "900" : "900",
  // };
  return (
    // style={{ margin: "30px 0px 0px 20px" }}
    <div className="container">
      <div className="userlist mt-3">
        <h5 className=" mt-3 ms-3 text-center">Users List</h5>

        <div className="row  px-2 mb-1 ">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8">
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
            <hr className="w-100" />
          </div>
          <div className="col-12 col-md-4 col-xl-4 col-lg-4">
            <div className="d-flex justify-content-evenly">
              <h6 className="mt-4">
                {recordCount}/{initialDataCount}
              </h6>
              <span className="mt-3">
                <select onChange={handlerecorddata}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="250">250</option>
                  <option value="500">500</option>
                  <option value="750">750</option>
                  <option value="1000">1000</option>
                </select>
              </span>
              <div>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className="btn btn-color "
                    style={{ textTransform: "capitalize" }}
                  >
                    Filter
                  </button>
                </Button>

                {/* <Menu
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
             <div className="d-flex justify-content-between m-2">
               <div > Filter</div>
             
              <div >
                  
                  <CloseIcon onClick={handleClose} />
                </div>
              </div>
              <hr />
           
             
              <div className="row m-2 w-100">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
                <FormControl variant="standard" className="w-100">
                      <InputLabel>Course</InputLabel>
                      <Select
                      className="w-100 pe-5"
                       name="course"
                        value={filterCriteria.course}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                     
                      </Select>
                    </FormControl>
                </div>
              
             
                <div className="col-12 col-md-6 col-lg-6 col-xl-6 "> 
                <FormControl variant="standard" className="w-100">
                      <InputLabel>Branch</InputLabel>
                      <Select
                      
                      name="branch"
                      value={filterCriteria.branch}
                      onChange={handleInputChange}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {branches &&
                    branches.map((branch, index) => (
                      <MenuItem key={branch.id} value={branch.branch_name}>
                        {branch.branch_name}
                      </MenuItem>
                    ))}
                   
                      </Select>
                    </FormControl>
                </div>
              </div>
              <div className="row m-2">  
              <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
              <FormControl variant="standard" className="w-100">
                      <InputLabel>Counsellor</InputLabel>
                      <Select
                      
                      name="enquirytakenby"
                      value={filterCriteria.enquirytakenby}
                      onChange={handleInputChange}
                      >

                   
                      </Select>
                    </FormControl>
               </div>
               <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
               <FormControl variant="standard" className="w-100">
                      <InputLabel>Certificate Status</InputLabel>
                      <Select
                      
                      name="enquirytakenby"
                      value={filterCriteria.enquirytakenby}
                      onChange={handleInputChange}
                      >
                        
                        <MenuItem value="request Submitted">Request Submitted</MenuItem>
                  <MenuItem value="issued">Issued  </MenuItem>
                  <MenuItem value="">Pending</MenuItem>
                   
                      </Select>
                    </FormControl>
               </div>
              </div>
            

              
            
              <div className="text-end me-2 mt-4">
                <button className="clear" onClick={filterreset}>
                  
                  Clear
                </button>
              </div>
            </Menu> */}

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
                  <div className="d-flex justify-content-between m-2">
                    <div> Filter</div>

                    <div>
                      <CloseIcon onClick={handleClose} />
                    </div>
                  </div>
                  <hr />

                  <div className="row m-2">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Profile</InputLabel>
                        <Select
                          style={{ background: "none" }}
                          className="pe-4 "
                          name="profile"
                          value={filterCriteria.profile}
                          onChange={handleInputChange}
                        >
                          {roles &&
                            roles.map((item, index) => (
                              <MenuItem key={item.id} value={item.role}>
                                {item.role}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Branch</InputLabel>
                        <Select
                          className="pe-3 "
                          name="branch"
                          value={filterCriteria.branch}
                          onChange={handleInputChange}
                        >
                          {branches &&
                            branches.map((item, index) => (
                              <MenuItem key={item.id} value={item.branch_name}>
                                {item.branch_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="row m-2">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Department</InputLabel>
                        <Select
                          className="pe-4"
                          name="department"
                          value={filterCriteria.department}
                          onChange={handleInputChange}
                        >
                          {departments &&
                            departments.map((item, index) => (
                              <MenuItem
                                key={item.id}
                                value={item.department_name}
                              >
                                {item.department_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
              <FormControl variant="standard" className="w-100">
                      <InputLabel>Report to</InputLabel>
                      <Select
                      className="pe-4"
                      name="reportto"
                      value={filterCriteria.reportto}
                      onChange={handleInputChange}
                       >
                    {reporttoo && 
                    reporttoo.map((item,index)=>( 
                      <MenuItem key={item.id} value={item.reportto}> 
                      {item.reportto}
                       </MenuItem>
                    ))}
                      </Select>
                    </FormControl>
               </div> */}
                  </div>

                  <div className="d-flex justify-content-between px-3">
                    <button className="btn btn-color" onClick={filterreset}>
                      Clear
                    </button>
                    <button className="btn btn-color" >

                      Save
                    </button>
                  </div>
                  {/* <div className="text-end me-2 mt-4">
                    <button className="btn btn-color" onClick={filterreset}>
                      Clear
                    </button>
                  </div> */}
                </Menu>
              </div>{" "}
            </div>
          </div>
        </div>
        <div>
          <div className="usertable">

            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className=" table-cell-heading ">
                      S.No
                    </TableCell>
                    <TableCell className=" table-cell-heading ">
                      Name
                    </TableCell>
                    <TableCell className=" table-cell-heading ">
                      Email
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Phone No
                    </TableCell>
                    <TableCell className=" table-cell-heading">
                      Designation
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Department
                    </TableCell>
                    <TableCell className=" table-cell-heading">
                      Report To
                    </TableCell>
                    <TableCell className=" table-cell-heading">
                      Profile
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Branch
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records &&
                    records.map((user, index) => {
                      const dynamicStyle = {
                        backgroundColor:
                          user.user_status == 0 ? "#e3dada" : "",
                      };
                      return (
                        <TableRow >
                          <TableCell className="Table-cell">
                            {((page - 1) * itemsPerPage) + index + 1}
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={user.fullname}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.fullname}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={user.email}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.email}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={user.phonenumber}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.phonenumber}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={user.designation}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.designation}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell ">
                            <span
                              title={user.department}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.department}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell ">
                            <span
                              title={user.reportto}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "5rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.reportto}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell ">
                            <span
                              title={user.profile}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "6rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.profile}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell ">
                            <span
                              title={user.branch}
                              style={{
                                color: user.user_status == 0 ? "#b8b2b2" : "",
                                width: "5rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {user.branch}
                            </span>
                          </TableCell>
                          <TableCell align="center" className="d-flex ">
                            <Link to={`/userview/${user.id}`}>
                              <VisibilityIcon className=" icon-color" />
                            </Link>
                            <Link to={`/edituser/${user.id}`}>
                              <ModeEditIcon className="icon-color" />
                            </Link>
                            {user.user_status !== undefined && (
                              <div class="form-check form-switch ">
                                <input
                                  style={{ cursor: "pointer" }}
                                  class="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  checked={user.user_status ? true : false}
                                  onChange={(e) =>
                                    handleClickOpen(
                                      user.id,
                                      user.user_status,
                                      user.user_remarks_history
                                    )
                                  }
                                />
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={opening} onClose={handleClosed}>
              <DialogContent>
                <DialogContentText>
                  <label> Enter Remarks :</label>
                </DialogContentText>
                <DialogContentText>
                  <textarea
                    rows="4"
                    cols="50"
                    name="comment"
                    form="usrform"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClosed}>Cancel</Button>

                {userstatus === 0 || userstatus === false ? (
                  <Button onClick={(e) => handleActivate()}>Activate</Button>
                ) : null}

                {userstatus === 1 || userstatus === true ? (
                  <Button onClick={(e) => handleInActivate()}>
                    InActivate
                  </Button>
                ) : null}
              </DialogActions>
            </Dialog>
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="my-3"
            >
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredData.length / itemsPerPage)}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </div>

          {/* {user.user_status &&
                              JSON.parse(user.user_status).map(
                              
                                (status, index) => {
                                  let userstatus = status.status;
                                  return (
                                    <div class="form-check form-switch">
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                        checked={userstatus}
                                        onChange={(e) =>
                                          handleClickOpen(
                                            user.id,
                                            userstatus,
                                            status
                                          )
                                        }
                                      />
                                      
                                    </div>
                                  );
                                }
                              )} */}
        </div>
      </div>
    </div>
  );
};

export default UsersData;
