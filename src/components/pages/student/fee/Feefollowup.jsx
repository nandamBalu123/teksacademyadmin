import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import "./Feefolloup.css";
import axios from "axios";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

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

const Feefollowup = () => {
  const { students } = useStudentsContext();
  const [studentData, setStudentData] = useState(null);
  const [filterType, setFilterType] = useState("today");
  const [filteredInstallments, setFilteredInstallments] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [filtereddata, setfiltereddata] = useState([{ name: "" }]);
  const [getstudentData, setData] = useState([{ name: "" }]);
  const { branches } = useBranchContext();
  const { getcourses } = useCourseContext();
  const [itemsPerPage, setrecordsPerPage] = useState(10);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  ////////////////////pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const records = filtereddata.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };
  const role = localStorage.getItem("role");
  let userId = localStorage.getItem("id");
  userId = parseInt(userId);
  useEffect(() => {
    if (students) {
      setStudentData(students);
    }
  }, [students]);
  const [filterCriteria, setFilterCriteria] = useState({
    dueamount: true,
    todaydate: true,
    upcomingdate: "",
    pendingdate: "",
  });
  const handleFilterChange = (type) => {
    // Reset filteredInstallments to the original installments
    setFilteredInstallments([]);

    // Apply the new filter
    setFilterType(type);
  };
  useEffect(() => {
    if (studentData) {
      const allInstallments = studentData.reduce(
        (accumulatedInstallments, student) => {
          return accumulatedInstallments.concat(
            student.installments.map((installment) => ({
              ...installment,
              name: student.name,
              id: student.id,
              email: student.email,
              branch: student.branch,
              enquirytakenby: student.enquirytakenby,
              mobilenumber: student.mobilenumber,
              courses: student.courses,
            }))
          );
        },
        []
      );

      const updatedInstallments = filterAndSortInstallments(
        allInstallments,
        filterType
      );

      setFilteredInstallments(updatedInstallments);
    }
  }, [studentData, handleFilterChange]);

  const filterAndSortInstallments = (installments, filterType) => {
    const today = new Date();

    const filteredInstallments = installments.filter((installment) => {
      const isPaymentDone = installment.paymentdone;

      if (filterType === "overdue") {
        return (
          new Date(installment.duedate) < today &&
          new Date(installment.duedate).toDateString() !==
          today.toDateString() &&
          !isPaymentDone
        );
      } else if (filterType === "today") {
        return (
          new Date(installment.duedate).toDateString() ===
          today.toDateString() && !isPaymentDone
        );
      } else if (filterType === "upcoming") {
        return new Date(installment.duedate) > today && !isPaymentDone;
      }

      return !isPaymentDone;
    });

    // Sort past dates in descending order and future dates in ascending order
    return filteredInstallments.sort((a, b) => {
      const dateA = new Date(a.duedate);
      const dateB = new Date(b.duedate);
      return filterType === "overdue" ? dateB - dateA : dateA - dateB;
    });
  };

  const sumDueAmount = filteredInstallments.reduce(
    (sum, installment) => sum + installment.dueamount,
    0
  );

  if (!studentData) {
    return <div>Loading...</div>;
  }
  let initialDataCount = getstudentData.length;
  let recordCount = filtereddata.length;
  const dynamicStyle = {
    color: getstudentData.dueamount < 1 ? "green" : "red",
    fontSize: getstudentData.dueamount < 1 ? "20px" : "16px",
    fontWeight: getstudentData.dueamount < 1 ? "900" : "900",
  };
  const IconStyle = {
    display: getstudentData.dueamount < 1 ? true : "none",
    marginLeft: "10px",
  };
  return (
    <div className=" container mt-3">
      <div className="feedetails">
        <h5 className=" ms-2 mt-3 mb-2"> Fee Followups</h5>
        <div className="row">
          <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
            <Card
              // style={{ background:"#ff3741"}}
              style={{
                background: "#dc3545",
                textAlign: "center",
                borderRadius: "8px",
                color: "white",
                boxShadow: "3px 3px 6px  gray",
                cursor: "pointer",
                // boxShadow: "5px 7px 7px  gray",
                paddingTop: "10px",
              }}
              onClick={() => handleFilterChange("overdue")}
            >
              <p>
                <h6>Over Due</h6>
              </p>
            </Card>
          </div>
          <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
            <Card
              // style={{ background:"#ff3741"}}
              style={{
                background: "#ffc107",
                textAlign: "center",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer",
                boxShadow: "3px 3px 6px  gray",
                // boxShadow: "5px 7px 7px  gray",
                paddingTop: "10px",
              }}
              onClick={() => handleFilterChange("today")}
            >
              <p>
                <h6>Today</h6>
              </p>
            </Card>
          </div>
          <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
            <Card
              // style={{ background:"#ff3741"}}
              style={{
                background: "#69757d",
                textAlign: "center",
                borderRadius: "8px",
                cursor: "pointer",
                color: "white",
                boxShadow: "3px 3px 6px  gray",
                // boxShadow: "5px 7px 7px  gray",
                paddingTop: "10px",
              }}
              onClick={() => handleFilterChange("upcoming")}
            >
              <p>
                <h6>Upcoming</h6>
              </p>
            </Card>
          </div>
          {/* <button
            onClick={() => handleFilterChange("upcoming")}
            className="feefollowupbtn bg-secondary"
          >
            Upcoming
          </button>{" "} */}
        </div>

        <div className="row">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8 ">
            <input
              type="text"
              className="input-field ps-2 "
              placeholder="Search Here..."
              autoComplete="off"
              style={{
                height: "45px",
                width: "100%",
                border: "none",
                outline: "none",
                borderTop: "none",

                background: "none",
                borderRadius: "5px",
              }}
            />
            <hr className="w-100" />
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 ">
            <div className="d-flex justify-content-evenly">
              <h6 className="mt-4 me-2">
                {recordCount}/{initialDataCount}
              </h6>
              <span className="mt-3">
                <select onChange={handlerecorddata}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
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
                    className="btn btn-color mb-2"
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
                  {/* <button
            className="btn btn-primary mr-20 ms-2 mb-2"
            style={{ textTransform: "capitalize" }}
            onClick={handleClick}
          >
            {" "}
            Filter{" "}
          </button> */}

                  {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            style={{
              width: "600px",
              borderRadius: "25px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          > */}
                  <div className="d-flex justify-content-between m-2">
                    <div> Filter</div>
                    <div>
                      <CloseIcon onClick={handleClose} />
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

                  <div className="row m-2">
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
                              <MenuItem key={item.id} value={item.course_name}>
                                {item.course_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="text-end me-2 mt-4">
                    <button className="btn btn-color"> Clear</button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <h5 className="col-12 col-md-6 col-lg-6 col-xl-6 ms-2">
            All {filterType.charAt(0).toUpperCase() + filterType.slice(1)}{" "}
            Installments
          </h5>
          <p className="col-12 col-md-5 col-lg-5 col-xl-5">
            <strong> Sum of Due Amounts: </strong> {sumDueAmount}
          </p>
        </div>

        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading">
                  {" "}
                  S.NO
                </TableCell>
                <TableCell className="table-cell-heading">
                  Name
                  <br /> Branch <br /> Counsellor
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Contact
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Email
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Course
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Due Date
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Due Amount{" "}
                </TableCell>
                <TableCell className="table-cell-heading">
                  {" "}
                  Paid Status
                </TableCell>

                <TableCell className="table-cell-heading">
                  {" "}
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(filteredInstallments) &&
                filteredInstallments.length > 0 ? (
                filteredInstallments.map((item, index) => {
                  let NextDueDate = new Date(item.nextduedate);
                  const day = NextDueDate.getUTCDate();
                  const monthIndex = NextDueDate.getUTCMonth();
                  const year = NextDueDate.getUTCFullYear();

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
                  NextDueDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                    }-${year}`;

                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        className="Table-cell text-center"
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.name}
                        <br />
                        {item.branch}
                        <br />
                        {item.enquirytakenby}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.mobilenumber}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.email}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.courses}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.duedate}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {Number(
                          parseFloat(item.dueamount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.totalinstallments &&
                          item.totalinstallments.length > 0 &&
                          item.totalinstallments.map((items, index) => {
                            if (true) {
                              return (
                                <div style={{ display: "flex" }}>
                                  <span style={dynamicStyle}>
                                    {items.totalinstallmentspaid} /
                                    {items.totalinstallments}
                                  </span>
                                  <span style={dynamicStyle}>
                                    <CheckCircleIcon style={IconStyle} />
                                  </span>
                                </div>
                              );
                            }
                          })}
                      </TableCell>
                      <TableCell className="border border 1">
                        <Link to={`/feeview/${item.id}`}>
                          <VisibilityIcon className="icon-color" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No data available</TableCell>
                </TableRow>
              )}
              {/* {filteredInstallments.map((installment) => (
                <tr key={installment.id}>
                  <td>{installment.name}</td>
                  <td>{installment.installmentNumber}</td>
                  <td>{installment.duedate}</td>
                  <td>{installment.dueamount}</td>
                </tr>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Installment Number</th>
            <th>Due Date</th>
            <th>Due Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstallments.map((installment) => (
            <tr key={installment.id}>
              <td>{installment.name}</td>
              <td>{installment.installmentNumber}</td>
              <td>{installment.duedate}</td>
              <td>{installment.dueamount}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
    </div>
  );
};

export default Feefollowup;
