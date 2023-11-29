import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
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
import "./Requestedcertificates.css";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import axios from "axios";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";
const label = { inputProps: { "aria-label": "Switch demo" } };
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
const Requestedcertificates = () => {
  const { students, dispatch } = useStudentsContext();

  const { getcourses } = useCourseContext();
  const { branches } = useBranchContext();
  const { users } = useUsersContext();
  const [filteredData, setFilteredData] = useState(students);
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
  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    course: "",

    enquirytakenby: "",

    search: "",
    certificate_Status: "request Submitted",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
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
              .includes(filterCriteria.search.toLowerCase()) ||
            item.enquirytakenby
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
      certificate_Status: "request Submitted",
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
  const handleRequest = (id, courseStartDate, courseEndDate) => {
    let certificate_status = [
      {
        courseStartDate: courseStartDate,
        courseEndDate: courseEndDate,
        certificateStatus: "issued",
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
  };
  const [issuedCertificates, setissuedCertificates] = useState(false);
  const handleRequestedCertificates = () => {
    setissuedCertificates((e) => !e);
    setFilterCriteria({
      ...filterCriteria,
      certificate_Status: "request Submitted",
    });
  };
  const handleIssuedCertificates = () => {
    setissuedCertificates((e) => !e);
    setFilterCriteria({
      ...filterCriteria,
      certificate_Status: "issued",
    });
  };
  return (
    <div className="container">
      <div className=" req-main-certificate mt-3">
        <div className="req-certificate mt-2">
          <div className="row ">
            {!issuedCertificates && (
              <h4 className="col-12 col-md-9 col-lg-9 col-xl-9 ms-3">
                Requested Certificates
              </h4>
            )}
            {issuedCertificates && (
              <h4 className="col-12 col-md-9 col-lg-9 col-xl-9">
                Issued Certificates
              </h4>
            )}

            {issuedCertificates && (
              <button
                className="btn btn-primary col-12 col-md-2 col-lg-2 col-xl-2 "
                onClick={handleRequestedCertificates}
              >
                Requested Certificates
              </button>
            )}
            {!issuedCertificates && (
              <button
                className="btn btn-primary col-12 col-md-2 col-lg-2 col-xl-2 "
                onClick={handleIssuedCertificates}
              >
                Issued Certificates
              </button>
            )}
          </div>

          <div className="row pb-3  ">
            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
              <input
                type="text"
                className="input-field ms-2 "
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
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-1">
              <div className="d-flex justify-content-evenly">
                <p className="mt-2">
                  {" "}
                  {recordCount}/{initialDataCount}{" "}
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
                    className="btn btn-primary mr-20 ms-2 mb-2 mt-1"
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
                          value={filterCriteria.fromdate}
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
                          value={filterCriteria.todate}
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
                    {/* <div className="row m-2 ">
              <div>
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
              </div>
            </div>
            <MenuItem className="pt-3 ">
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
                            value={filterCriteria.course}
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
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
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
                            value={filterCriteria.enquirytakenby}
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
                    </div>
                    {/* 
            <MenuItem>
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
                name="status"
                value={filterCriteria.status}
                onChange={handleInputChange}
              >
                <option value="">---Status---</option>
                <option value="">Request Submitted</option>
                <option value="issued">Issued</option>
                <option value="">Pending</option>
              </select>
            </MenuItem> */}
                    <div className="text-end me-2 my-2">
                      <button className="clear" onClick={filterreset}>
                        {" "}
                        Clear
                      </button>
                    </div>
                  </Menu>
                </span>
              </div>
            </div>
          </div>
          <Paper>
            <TableContainer sx={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="sticky table" borderAxis="both">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="table-cell-heading text-center">
                      S. No
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Name
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Course
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Registration ID
                    </StyledTableCell>

                    <StyledTableCell className="table-cell-heading">
                      Course StartDate
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Course EndDate
                    </StyledTableCell>

                    <StyledTableCell className="table-cell-heading">
                      Certificate Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records &&
                    records.map((student, index) => {
                      const certificate_Status = student.certificate_status;
                      let courseStartDate = certificate_Status
                        .map((item) => item.courseStartDate)
                        .join(", ");
                      let courseEndDate = certificate_Status
                        .map((item) => item.courseEndDate)
                        .join(", ");
                      const certificateStatus = certificate_Status
                        .map((item) => item.certificateStatus)
                        .join(", ");

                      let formattedcourseStartDate = new Date(courseStartDate);
                      const courseStartDateday =
                        formattedcourseStartDate.getUTCDate();
                      const courseStartDatemonthIndex =
                        formattedcourseStartDate.getUTCMonth();
                      const courseStartDateyear =
                        formattedcourseStartDate.getUTCFullYear();
                      //courseEndDate
                      let formattedcourseEndDate = new Date(courseEndDate);
                      const courseEndDateday =
                        formattedcourseEndDate.getUTCDate();
                      const courseEndDatemonthIndex =
                        formattedcourseEndDate.getUTCMonth();
                      const courseEndDateyear =
                        formattedcourseEndDate.getUTCFullYear();
                      const monthAbbreviations = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ];

                      // Formatting the date
                      formattedcourseStartDate = `${
                        courseStartDateday < 10 ? "0" : ""
                      }${courseStartDateday}-${
                        monthAbbreviations[courseStartDatemonthIndex]
                      }-${courseStartDateyear}`;

                      formattedcourseEndDate = `${
                        courseEndDateday < 10 ? "0" : ""
                      }${courseEndDateday}-${
                        monthAbbreviations[courseEndDatemonthIndex]
                      }-${courseEndDateyear}`;
                      return (
                        <StyledTableRow>
                          <StyledTableCell className="Table-cell text-center">
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell className="Table-cell">
                            <span
                              title={student.name}
                              style={{
                                width: "5rem",

                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {student.name}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell className="Table-cell">
                            <span
                              title={student.courses}
                              style={{
                                width: "6rem",

                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {student.courses}
                            </span>
                          </StyledTableCell>{" "}
                          <StyledTableCell className="Table-cell">
                            <span
                              title={student.registrationnumber}
                              // style={{
                              //   width: "6rem",

                              //   whiteSpace: "nowrap",
                              //   overflow: "hidden",
                              //   textOverflow: "ellipsis",
                              //   fontSize: "15px",
                              //   display: "block",
                              // }}
                            >
                              {student.registrationnumber}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell className="Table-cell">
                            <span
                              title={formattedcourseStartDate}
                              // style={{
                              //   width: "6rem",

                              //   whiteSpace: "nowrap",
                              //   overflow: "hidden",
                              //   textOverflow: "ellipsis",
                              //   fontSize: "15px",
                              //   display: "block",
                              // }}
                            >
                              {formattedcourseStartDate}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell className="Table-cell ">
                            <span
                              title={courseEndDate}
                              // style={{
                              //   width: "6rem",

                              //   whiteSpace: "nowrap",
                              //   overflow: "hidden",
                              //   textOverflow: "ellipsis",
                              //   fontSize: "15px",
                              //   display: "block",
                              // }}
                            >
                              {formattedcourseEndDate}
                            </span>
                          </StyledTableCell>
                          <StyledTableCell className="Table-cell">
                            {certificateStatus === "request Submitted" && (
                              <button
                                className="btn btn-warning center m-0 px-1"
                                onClick={(e) =>
                                  handleRequest(
                                    student.id,
                                    courseStartDate,
                                    courseEndDate
                                  )
                                }
                              >
                                Issue Certificate
                              </button>
                            )}
                            {certificateStatus === "issued" && (
                              <button className="btn  btn-success center m-0 px-1">
                                Certificate Issued
                              </button>
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-3 mb-3"
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

export default Requestedcertificates;
