import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
import "./Certificate.css";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import axios from "axios";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { GolfCourseSharp } from "@mui/icons-material";
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

    status: "",

    enquirytakenby: "",

    search: "",
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

        const statusCondition = filterCriteria.status
          ? item.status === filterCriteria.status
          : true;

        const counsellarCondition = filterCriteria.enquirytakenby
          ? item.enquirytakenby === filterCriteria.enquirytakenby
          : true;

        return (
          searchCondition &&
          dateCondition &&
          branchCondition &&
          statusCondition &&
          courseCondition &&
          counsellarCondition
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

      status: "",

      enquirytakenby: "",

      search: "",
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
          // dispatch({ type: "UPDATE_STUDENT", payload: certificate_status });
          // window.location.reload();
        } else {
          alert("Error please Try Again");
        }
      });
    setcourseStartDate("");
    setcourseEndDate("");
  };

  return (
    <div className="container main-certificate mt-3">
      <div className="certificate mt-2">
        <h3 className="mx-3 mt-3"> Certificate </h3>
        <div className="row mb-3 px-4 pt-2">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8">
            <input
              type="text"
              className="input-field ps-2"
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
            <hr className="w-75" />
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-xl-1 pt-3">
            <h6>
              {" "}
              {recordCount}/{initialDataCount}
            </h6>
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-xl-1  pt-3">
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
                className="btn btn-primary mr-20 ms-2 mb-2"
                style={{ textTransform: "capitalize" }}
              >
                Filter
              </button>
            </Button>

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
              <MenuItem className="pt-3 ">
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
              </MenuItem>
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
              </MenuItem>
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
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
              <MenuItem>
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
              </MenuItem>
              <MenuItem className="d-flex justify-content-between">
                <button className="clear" onClick={filterreset}>
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }} className="my-4">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    S. No
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Name
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Registration ID
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    ValidityStartDate <br />
                    validityenddate
                  </TableCell>

                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course StartDate
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    Course EndDate
                  </TableCell>

                  <TableCell className="bg-primary text-light fs-6">
                    Certificate Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records &&
                  records.map((student, index) => {
                    const validitystartdate = student.validitystartdate;
                    const dateTime = new Date(validitystartdate);
                    const startdate = dateTime.toISOString().slice(0, 10);
                    const validityenddate = student.validityenddate;
                    const dateTimee = new Date(validitystartdate);
                    const enddate = dateTimee.toISOString().slice(0, 10);

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
                        <TableCell className="border border 1 ">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border border 1">
                          {student.name}
                        </TableCell>
                        <TableCell className="border border 1 ">
                          {student.courses}
                        </TableCell>
                        <TableCell className="border border 1 ">
                          {student.registrationnumber}
                        </TableCell>
                        <TableCell className="border border 1 ">
                          {startdate}
                          <br />
                          {enddate}
                        </TableCell>

                        <TableCell className="border border 1 ">
                          <input
                            type="date"
                            name="startdate"
                            className="startdate"
                            onChange={(e) => setcourseStartDate(e.target.value)}
                            value={
                              courseStartDate !== ""
                                ? courseStartDate
                                : undefined
                            }
                          />
                        </TableCell>
                        <TableCell className="border border 1 ">
                          <input
                            type="date"
                            name="enddate"
                            className="enddate"
                            onChange={(e) => setcourseEndDate(e.target.value)}
                            value={
                              courseEndDate !== "" ? courseEndDate : undefined
                            }
                          />
                        </TableCell>
                        <TableCell className="border border 1  text-center fs-6">
                          {certificateStatus === "" && (
                            <button
                              className="btn btn-primary center"
                              onClick={(e) => handleRequest(student.id)}
                            >
                              Request Certificate
                            </button>
                          )}
                          {certificateStatus === "request Submitted" && (
                            <button
                              className="btn btn-warning center"
                              onClick={(e) => handleRequest(student.id)}
                            >
                              Request Submitted
                            </button>
                          )}
                          {certificateStatus === "issued" && (
                            <button
                              className="btn  btn-success center"
                              onClick={(e) => handleRequest(student.id)}
                            >
                              Certificate Issued
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="mt-3"
        >
          {filteredData && (
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
