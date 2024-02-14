import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { NavLink, Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Certificate.css";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import axios from "axios";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { GolfCourseSharp } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,

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

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Certificate = () => {
  const { students, dispatch } = useStudentsContext();
  const { getcourses } = useCourseContext();
  const { branches } = useBranchContext();
  const { users } = useUsersContext();
  // const {dispatch}= useStudentsContext()
  const [filteredData, setFilteredData] = useState(students);
  const [courseStartDate, setcourseStartDate] = useState();
  const [courseEndDate, setcourseEndDate] = useState();
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);
  const [itemsPerPage, setrecordsPerPage] = useState(10);
  useEffect(() => {
    if (users) {
      const filteruser = users.filter((user) => {
        const filtercounsellar = user.profile === "counsellor";
        return filtercounsellar;
      });
      setfilteredcounsellor(filteruser);
    }
  }, [users]);
  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };
  ////filters
  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    course: "",

    enquirytakenby: "",

    search: "",
    certificate_Status: "",
  });
  const [dummyFilterCriteria, setDummyFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    course: "",

    enquirytakenby: "",

    search: "",
    certificate_Status: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDummyFilterCriteria({
      ...dummyFilterCriteria, [name]: value
    });
    if (name == "search") {
      setFilterCriteria({
        ...filterCriteria, [name]: value
      });
    }
  };
  const handleSave = (e) => {


    setFilterCriteria(dummyFilterCriteria);

  };
  useEffect(() => {
    if (students) {
      const filteredResults = students.filter((item) => {
        const searchCondition = filterCriteria.search
          ? item.name
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.branch
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.registrationnumber
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.courses
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase())

          : true;

        const dateCondition =
          filterCriteria.fromdate && filterCriteria.todate
            ? item.admissiondate >= filterCriteria.fromdate &&
            item.admissiondate <= filterCriteria.todate
            : true;

        const branchCondition = filterCriteria.branch
          ? item.branch === filterCriteria.branch
          : true;

        const courseCondition = filterCriteria.course
          ? item.courses === filterCriteria.course
          : true;

        const counsellarCondition = filterCriteria.enquirytakenby
          ? item.enquirytakenby === filterCriteria.enquirytakenby
          : true;
        const certificate_status_condition = filterCriteria.certificate_Status
          ? item.certificate_status[0].certificateStatus ===
          filterCriteria.certificate_Status
          : true;

        return (
          searchCondition &&
          dateCondition &&
          branchCondition &&
          courseCondition &&
          counsellarCondition &&
          certificate_status_condition
        );
      });

      setFilteredData(filteredResults);
    }
  }, [students, filterCriteria]);
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      course: "",

      enquirytakenby: "",

      search: "",
      certificate_Status: "",
    });
    setDummyFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      course: "",

      enquirytakenby: "",

      search: "",
      certificate_Status: "",
    });
  };
  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  ////////////////////pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let records;
  let initialDataCount;
  let recordCount;
  if (filteredData) {
    records = filteredData.slice(startIndex, endIndex);
    initialDataCount = filteredData.length;
    recordCount = filteredData.length;
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  ////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRequest = (id) => {
    if (courseStartDate && courseEndDate) {
      let certificate_status = [
        {
          courseStartDate: courseStartDate,
          courseEndDate: courseEndDate,
          certificateStatus: "request Submitted",
        },
      ];
      const updatedData = {
        certificate_status,
      };
      const uploadcontext = { certificate_status, id };
      console.log("certificate_status", updatedData);
      console.log("id", id);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/certificatestatus/${id}`,
          updatedData
        )
        .then((res) => {
          if (res.data.updated) {
            // alert("Certificate updated successfully");
            dispatch({
              type: "UPDATE_CERTIFICATE_STATUS",
              payload: uploadcontext,
            });
          } else {
            alert("Error please Try Again");
          }
        });
      setcourseStartDate("");
      setcourseEndDate("");
    } else {
      alert("enter course start and end dates");
    }
  };

  return (
    <div className="container">
      <div className=" main-certificate mt-3">
        <div className="certificate mt-2">
          <h5 className="mx-2 mt-3  text-center"> Certificate </h5>
          <div className="row pb-1">
            <div className="col-12 col-md-6 col-lg-8 col-xl-8">
              <input
                type="text"
                className="input-field ms-2"
                placeholder="Search Here...."
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
              <hr className="w-75 ms-2" />
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-1">
              <div className="d-flex justify-content-evenly">
                <p className="mt-2">
                  {recordCount}/{initialDataCount}
                </p>
                <p className="mt-2">
                  <select onChange={handlerecorddata}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                  </select>
                </p>
                <span>
                  <button
                    className="btn btn-color"
                    onClick={handleClick}
                    style={{ textTransform: "capitalize" }}
                  >
                    Filter
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    style={{
                      width: "",
                      borderRadius: "25px",
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <div className="d-flex justify-content-between m-2">
                      <div> Filter</div>

                      <div>
                        {" "}
                        <CloseIcon onClick={handleClose} />{" "}
                      </div>
                    </div>
                    <hr />
                    <div className="row m-2">
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                        <TextField
                          label=" From:"
                          type="date"
                          variant="standard"
                          className="  w-100"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="fromdate"
                          value={dummyFilterCriteria.fromdate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                        <TextField
                          label=" To:"
                          type="date"
                          variant="standard"
                          className="w-100"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          name="todate"
                          value={dummyFilterCriteria.todate}
                          onChange={handleInputChange}
                        />
                      </div>

                      {/* <div>
                  <label> From: </label>
                </div>
                <div>
                  <input
                    type="date"
                    className="w-100"
                    style={{
                      height: "45px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="fromdate"
                    value={filterCriteria.fromdate}
                    onChange={handleInputChange}
                  />
                </div> */}
                    </div>
                    {/* <MenuItem className="pt-3 ">
                <label className="ms-"> To: </label>

                <div>
                  <input
                    type="date"
                    className="w-100"
                    style={{
                      height: "45px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="todate"
                    value={filterCriteria.todate}
                    onChange={handleInputChange}
                  />
                </div>
              </MenuItem> */}
                    <div className="row m-2">
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>Course</InputLabel>
                          <Select
                            name="course"
                            value={dummyFilterCriteria.course}
                            onChange={handleInputChange}
                          >
                            <MenuItem value="select"> ---select---</MenuItem>
                            {getcourses &&
                              getcourses.map((item, index) => (
                                <MenuItem
                                  key={item.id}
                                  value={item.course_name}
                                >
                                  {item.course_name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>

                      {/* <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",
                    paddingRight: "145px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="course"
                  value={filterCriteria.course}
                  onChange={handleInputChange}
                >
                  <option>Course</option>
                  {getcourses &&
                    getcourses.map((item, index) => (
                      <option key={item.id} value={item.course_name}>
                        {item.course_name}
                      </option>
                    ))}
                </select> */}
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>Branch</InputLabel>
                          <Select
                            name="branch"
                            value={dummyFilterCriteria.branch}
                            onChange={handleInputChange}
                          >
                            <MenuItem value="select"> ---select---</MenuItem>
                            {branches &&
                              branches.map((branch, index) => (
                                <MenuItem
                                  key={branch.id}
                                  value={branch.branch_name}
                                >
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
                            value={dummyFilterCriteria.enquirytakenby}
                            onChange={handleInputChange}
                          >
                            {filteredcounsellor &&
                              filteredcounsellor.map((user, index) => (
                                <MenuItem value={user.fullname}>
                                  {" "}
                                  {user.fullname}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>Certificate Status</InputLabel>
                          <Select
                            name="enquirytakenby"
                            value={dummyFilterCriteria.enquirytakenby}
                            onChange={handleInputChange}
                          >
                            <MenuItem value="request Submitted">
                              Request Submitted
                            </MenuItem>
                            <MenuItem value="issued">Issued </MenuItem>
                            <MenuItem value="">Pending</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    {/* <MenuItem>
                <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",

                    paddingRight: "50px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="branch"
                  value={filterCriteria.branch}
                  onChange={handleInputChange}
                >
                  <option value="">Branch</option>
                  {branches &&
                    branches.map((branch, index) => (
                      <option key={branch.id} value={branch.branch_name}>
                        {branch.branch_name}
                      </option>
                    ))}
                </select>
              </MenuItem> */}
                    {/* <MenuItem>
                <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",

                    paddingRight: "50px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="enquirytakenby"
                  value={filterCriteria.enquirytakenby}
                  onChange={handleInputChange}
                >
                  <option value="">Counsellor</option>
                  {filteredcounsellor &&
                    filteredcounsellor.map((user, index) => (
                      <option value={user.fullname}> {user.fullname}</option>
                    ))}
                </select>
              </MenuItem> */}
                    {/* <MenuItem>
                <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",

                    paddingRight: "50px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="certificate_Status"
                  value={filterCriteria.certificate_Status}
                  onChange={handleInputChange}
                >
                  <option value="">---Status---</option>
                  <option value="request Submitted">Request Submitted</option>
                  <option value="issued">Issued</option>
                  <option value="">Pending</option>
                </select>
              </MenuItem> */}
                    <MenuItem className="d-flex justify-content-between">
                      <button className="btn btn-color" onClick={filterreset}>

                        Clear
                      </button>
                      <button onClick={handleSave} className="btn btn-color" >

                        Save
                      </button>
                    </MenuItem>
                  </Menu>
                </span>
              </div>
            </div>
          </div>

          {/* <div class="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  Fillter
  </a>

  <ul class="dropdown-menu ">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div> */}


          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell-heading">
                    S. No
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Name
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Course
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Registration ID
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Course StartDate
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Course EndDate
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Certificate Status
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    PDF
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records &&
                  records.map((student, index) => {
                    const certificate_Status = student.certificate_status;
                    const courseStartDate = certificate_Status
                      .map((item) => item.courseStartDate)
                      .join(", ");
                    const courseEndDate = certificate_Status
                      .map((item) => item.courseEndDate)
                      .join(", ");
                    const certificateStatus = certificate_Status
                      .map((item) => item.certificateStatus)
                      .join(", ");

                    return (
                      <TableRow key={student.id}>
                        <TableCell className="Table-cell text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="Table-cell">
                          <span
                            title={student.name}
                            style={{
                              width: "5rem",

                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {student.name}
                          </span>
                        </TableCell>
                        <TableCell className="Table-cell">
                          <span
                            title={student.courses}
                            style={{
                              width: "4rem",

                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {student.courses}
                          </span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span
                            title={student.registrationnumber}
                            style={{
                              width: "8rem",

                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {student.registrationnumber}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            style={{
                              fontSize: "0.8rem",
                              background: "none",
                            }}
                          >
                            <input
                              type="date"
                              name="startdate"
                              style={{ background: "transparent" }}
                              className="startdate"
                              onChange={(e) =>
                                setcourseStartDate(e.target.value)
                              }
                              value={
                                courseStartDate !== ""
                                  ? courseStartDate
                                  : undefined
                              }
                            />
                          </span>
                        </TableCell>
                        <TableCell className="Table-cell">
                          <span
                            style={{
                              fontSize: "0.8rem",
                            }}
                          >
                            <input
                              style={{ background: "transparent" }}
                              type="date"
                              name="enddate"
                              className="enddate"
                              onChange={(e) =>
                                setcourseEndDate(e.target.value)
                              }
                              value={
                                courseEndDate !== ""
                                  ? courseEndDate
                                  : undefined
                              }
                            />
                          </span>
                        </TableCell>
                        <TableCell className="Table-cell">
                          {certificateStatus === "" && (
                            <button
                              className="btn btn-color text-center m-0 px-1"
                              onClick={(e) => handleRequest(student.id)}
                            >
                              Request Certificate
                            </button>
                          )}
                          {certificateStatus === "request Submitted" && (
                            <button
                              className="btn btn-warning center  m-0 px-1"
                            // onClick={(e) => handleRequest(student.id)}
                            >
                              Request Submitted
                            </button>
                          )}
                          {certificateStatus === "issued" && (
                            <button className="btn  btn-success center  m-0 px-1">
                              Certificate Issued
                            </button>
                          )}
                        </TableCell>
                        <TableCell>
                        <NavLink to={`/getcertificate/${student.id}`}>
                        <div style={{ color: "#2a619d", width: "30px", cursor: "pointer" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                              </svg>
                              </div>
                      </NavLink>
                        
                          
                           
                          
                   

                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-3"
          >
            {filteredData && (
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(filteredData.length / itemsPerPage)}
                  onChange={handlePageChange}
                  color="info"
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
