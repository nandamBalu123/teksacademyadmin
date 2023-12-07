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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./FeeDetails.css";
import axios from "axios";
import Card from "@mui/material/Card";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBranchContext } from "../../../../hooks/useBranchContext";

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
const FeeDetails = () => {
  const { branches } = useBranchContext();
  const { students, dispatch } = useStudentsContext();
  const navigator = useNavigate();

  const [getstudentData, setData] = useState([{ name: "" }]);
  const [studentFeeRecordss, setFeerecords] = useState(getstudentData);
  const [itemsPerPage, setrecordsPerPage] = useState(10);

  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };
  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const records = studentFeeRecordss.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const role = localStorage.getItem("role");
  let userId = localStorage.getItem("id");
  userId = parseInt(userId);
  useEffect(() => {
    if (students) {
      setData(students); // Update the data state with the fetched data
      setFeerecords(students);
    }
  }, [students]);

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    search: "",
    modeoftraining: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  useEffect(() => {
    const filteredResults = getstudentData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.name
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.branch
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.registrationnumber.includes(filterCriteria.search) ||
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

      // const sourceCondition = filterCriteria.leadsource
      //   ? item.leadsource === filterCriteria.leadsource
      //   : true;

      const modeCondition = filterCriteria.modeoftraining
        ? item.modeoftraining === filterCriteria.modeoftraining
        : true;

      const counsellarCondition = filterCriteria.enquirytakenby
        ? item.enquirytakenby === filterCriteria.enquirytakenby
        : true;

      return (
        searchCondition &&
        dateCondition &&
        branchCondition &&
        // sourceCondition &&
        modeCondition &&
        counsellarCondition
      );
    });
    setFeerecords(filteredResults);
  }, [filterCriteria, getstudentData]);
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      search: "",
      modeoftraining: "",
    });
  };
  const noDueRecords = () => {
    const filteredResults = getstudentData.filter((item) => {
      const dueamount = item.dueamount === 0;

      return dueamount;
    });
    setFeerecords(filteredResults);
  };
  const studentFeeRecords = () => {
    // setData(studentFeeRecordss);
    setFeerecords(getstudentData);
  };
  // style for paid status
  const dynamicStyle = {
    color: getstudentData.dueamount < 1 ? "green" : "red",
    fontSize: getstudentData.dueamount < 1 ? "20px" : "16px",
    fontWeight: getstudentData.dueamount < 1 ? "900" : "900",
  };
  const IconStyle = {
    display: getstudentData.dueamount < 1 ? true : "none",
    marginLeft: "10px",
  };
  let initialDataCount = getstudentData.length;
  let recordCount = studentFeeRecordss.length;
  return (
    <div className="container">
      <div className="main-feedetails  mt-3">
        <div>
          <h5 className="mt-3 ms-2 text-center"> Fee Management</h5>
          <div className="row py-2 px-5">
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 mb-2">
              <Card
                className="cardcolor"
                // style={{
                //   background: "#195489",
                //   textAlign: "center",
                //   borderRadius: "8px",
                //   color: "white",
                //   boxShadow: "3px 3px 6px  gray",
                // }}
                onClick={studentFeeRecords}
              >
                <p className="text-center pt-3">Fee Records</p>
              </Card>
              {/* <button className="feebtn" onClick={studentFeeRecords}>
                Fee Records
              </button> */}
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 mb-2 ">
              <Card
                className="cardcolor"
                // style={{
                //   background: "#ff9f24",
                //   textAlign: "center",
                //   borderRadius: "8px",
                //   color: "white",
                //   boxShadow: "3px 3px 6px  gray",
                // }}
                onClick={noDueRecords}
              >
                <p className="text-center pt-3">No Due Records</p>
              </Card>
              {/* <button
                className="btn bg-success text-light"
                onClick={noDueRecords}
              >
                No Due Records
              </button> */}
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 mb-2">
              <Card
                className="cardcolor"
                // style={{
                //   background: "#008959",
                //   textAlign: "center",
                //   borderRadius: "8px",
                //   color: "white",
                //   boxShadow: "3px 3px 6px  gray",
                // }}
                onClick={() => navigator("/feefollowup")}
              >
                <p className="text-center pt-3">Fee followups</p>
              </Card>
              {/* <button
                className="feebtn "
                onClick={() => navigator("/feefollowup")}
              >
                
                Fee FollowUps
              </button> */}
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 mb-2">
              <Card
                className="cardcolor"
                // style={{
                //   background: "#195489",
                //   textAlign: "center",
                //   borderRadius: "8px",
                //   color: "white",
                //   boxShadow: "3px 3px 6px  gray",
                // }}
              >
                <p className="text-center pt-3">Fee Received</p>
              </Card>
            </div>
          </div>
          <div className="row  pb-3">
            <div className="col-12 col-md-8 col-lg-8 col-xl-8 ">
              <input
                type="text"
                className="input-field ms-2 "
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
              <hr className="w-75 ms-2" />
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mt-1">
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
                    onClick={handleClick}
                    className="btn btn-color"
                    style={{ textTransform: "capitalize" }}
                  >
                    Filter
                  </button>
                  {/* <h6 onClick={handleClick}> Filter</h6> */}
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
                    {/* <div className="d-flex justify-content-between">
                  <MenuItem>
                    <label> From: </label>
                    <input
                      type="date"
                      style={{
                        height: "45px",
                        border: "1.5px solid black",
                        borderRadius: "5px",
                      }}
                      name="fromdate"
                      value={filterCriteria.fromdate}
                      onChange={handleInputChange}
                    />
                  </MenuItem>
                  <MenuItem>
                    <label> To: </label>
                    <input
                      type="date"
                      style={{
                        height: "45px",
                        border: "1.5px solid black",
                        borderRadius: "5px",
                      }}
                      name="todate"
                      value={filterCriteria.todate}
                      onChange={handleInputChange}
                    />
                  </MenuItem>
                </div> */}
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
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>Mode of Traning</InputLabel>
                          <Select
                            name="modeoftraining"
                            value={filterCriteria.modeoftraining}
                            onChange={handleInputChange}
                          >
                            <MenuItem value="online"> Online</MenuItem>

                            <MenuItem value="offline">Offline</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>

                    {/* <div className="d-flex justify-content-between">
                  <MenuItem>
                    <select
                      id=""
                      className="ms-1"
                      style={{
                        height: "45px",
                        paddingRight: "4rem",
                        border: "1.5px solid black",
                        borderRadius: "5px",
                      }}
                      name="branch"
                      value={filterCriteria.branch}
                      onChange={handleInputChange}
                    >
                      <option value="">Branch</option>
                      {branches &&
                        branches.map((item, index) => (
                          <option key={item.id} value={item.branch_name}>
                            {item.branch_name}
                          </option>
                        ))}
                    </select>
                  </MenuItem>
                  <MenuItem>
                    <select
                      id=""
                      style={{
                        height: "45px",
                        paddingRight: "2rem",
                        border: "1.5px solid black",
                        borderRadius: "5px",
                      }}
                      name="modeoftraining"
                      value={filterCriteria.modeoftraining}
                      onChange={handleInputChange}
                    >
                      
                      <option value="online"> Online</option>
                      <option value="offline"> Offline</option>
                    </select>
              </MenuItem>
                </div> */}
                    <div className="text-end me-2 mt-4">
                      <button className="btn btn-color" onClick={filterreset}>
                        Clear
                      </button>
                    </div>
                  </Menu>
                </span>
              </div>
            </div>
          </div>
       
            <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-cell-heading">
                      S.NO
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Name
                      <br /> Branch <br />
                      Counsellor
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Contact
                      <br />
                      Email
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Course <br /> Date of Joining
                      <br /> Total Fee
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Paid Fee
                      <br /> Due Amount
                      <br /> Next Due Date
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Total <br />
                      Installments
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      Paid <br /> Installments
                    </TableCell>
                    <TableCell className="table-cell-heading">
                      View
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(records) && records.length > 0 ? (
                    records.map((item, index) => {
                      let AdmissionDate = new Date(item.admissiondate);
                      const day = AdmissionDate.getUTCDate();
                      const monthIndex = AdmissionDate.getUTCMonth();
                      const year = AdmissionDate.getUTCFullYear();
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
                      let NextDueDate;
                      if (item.nextduedate) {
                        NextDueDate = new Date(item.nextduedate);
                        const NextDueday = NextDueDate.getUTCDate();
                        const NextDuemonthIndex = NextDueDate.getUTCMonth();
                        const NextDueyear = NextDueDate.getUTCFullYear();
                        NextDueDate = `${
                          NextDueday < 10 ? "0" : ""
                        }${NextDueday}-${
                          monthAbbreviations[NextDuemonthIndex]
                        }-${NextDueyear}`;
                      }

                      // Formatting the date
                      AdmissionDate = `${day < 10 ? "0" : ""}${day}-${
                        monthAbbreviations[monthIndex]
                      }-${year}`;

                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          key={item.id}
                        >
                          <TableCell className="Table-cell ">
                            {index + 1}
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={item.name}
                              style={{
                                width: "9rem",

                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.name}
                            </span>

                            <span
                              title={item.branch}
                              style={{
                                width: "9rem",

                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.branch}
                            </span>

                            <span
                              title={item.enquirytakenby}
                              style={{
                                width: "9rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.enquirytakenby}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={item.mobilenumber}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.mobilenumber}
                            </span>
                            <span
                              title={item.email}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.email}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={item.courses}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {item.courses}
                            </span>
                            <span
                              title={AdmissionDate}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {AdmissionDate}
                            </span>
                            <span
                              title={Number(
                                parseFloat(item.finaltotal).toFixed(2)
                              ).toLocaleString("en-IN")}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {Number(
                                parseFloat(item.finaltotal).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            <span
                              title={Number(
                                parseFloat(item.totalpaidamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {Number(
                                parseFloat(item.totalpaidamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </span>
                            <span
                              title={Number(
                                parseFloat(item.dueamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {Number(
                                parseFloat(item.dueamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </span>
                            <span
                              title={NextDueDate}
                              style={{
                                width: "8rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "15px",
                                display: "block",
                              }}
                            >
                              {NextDueDate ? NextDueDate : "No NextDue Date"}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell ">
                            <span>
                              {item.totalinstallments &&
                                item.totalinstallments.length > 0 &&
                                item.totalinstallments.map((items, index) => {
                                  const dynamicStyle = {
                                    color: item.dueamount < 1 ? "green" : "red",
                                    fontSize:
                                      item.dueamount < 1 ? "20px" : "16px",
                                    fontWeight:
                                      item.dueamount < 1 ? "900" : "900",
                                  };
                                  const IconStyle = {
                                    display: item.dueamount < 1 ? true : "none",
                                    marginLeft: "10px",
                                  };
                                  if (true) {
                                    // settotalleft(item.totalinstallmentsleft);
                                    // totalleft = item.totalinstallmentsleft;
                                    return (
                                      <div>
                                        <span style={dynamicStyle}>
                                          {items.totalinstallments}
                                        </span>
                                        <span style={dynamicStyle}>
                                          <CheckCircleIcon
                                            style={IconStyle}
                                            className="icon-color"
                                          />
                                        </span>
                                      </div>
                                    );
                                  }
                                })}
                            </span>
                          </TableCell>
                          <TableCell className="Table-cell">
                            {item.totalinstallments &&
                              item.totalinstallments.length > 0 &&
                              item.totalinstallments.map((items, index) => {
                                const dynamicStyle = {
                                  color: item.dueamount < 1 ? "green" : "red",
                                  fontSize:
                                    item.dueamount < 1 ? "20px" : "16px",
                                  fontWeight:
                                    item.dueamount < 1 ? "900" : "900",
                                };
                                const IconStyle = {
                                  display: item.dueamount < 1 ? true : "none",
                                  marginLeft: "10px",
                                };
                                if (true) {
                                  // settotalleft(item.totalinstallmentsleft);
                                  // totalleft = item.totalinstallmentsleft;
                                  return (
                                    <div>
                                      <span style={dynamicStyle}>
                                        {items.totalinstallmentspaid}
                                      </span>
                                      <span style={dynamicStyle}>
                                        <CheckCircleIcon
                                          style={IconStyle}
                                          className="icon-color"
                                        />
                                      </span>
                                    </div>
                                  );
                                }
                              })}
                          </TableCell>
                          <TableCell className="Table-cell">
                            <Link to={`/feeview/${item.id}`}>
                              <VisibilityIcon className="icon-color" />
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell className="Table-cell">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-3"
          >
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(studentFeeRecordss.length / itemsPerPage)}
                onChange={handlePageChange}
                color="info"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeeDetails;
