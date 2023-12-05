import { Box, usef } from "@mui/material";
// import { tokens } from "../../../theme";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Header from "../../common/Header/Header";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./Dashboard.css";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
// require("dotenv").config();
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useStudentsContext } from "../../../hooks/useStudentsContext";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

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

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const { user } = useAuthContext();
  const { students, dispatch } = useStudentsContext();

  const [getUsersData, setUsersData] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [getstudentData, setStudentData] = useState([]);
  const [DisplayData, setDisplayData] = useState({
    enrollments: false,
    fee: false,
    feefollowup: false,
    users: false,
    // dueAndReceivedAmount: false,
  });
  const [Branchwise, setBranchwise] = useState({
    enrollments: false,
    bookingamount: false,
    feerecevied: false,
    feeyettorecevied: false,
    branchusers: false,
  });

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",
    todate: "",
    monthdataCondition: true,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({
      ...filterCriteria,
      monthdataCondition: false,
      [name]: value,
    });
  };
  //// reset filters
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",
      todate: "",
      monthdataCondition: true,
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (students) {
      setStudentData(students);
      setinitialData(students);
    }
  }, [students]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/userdata`)
      .then((res) => {
        setUsersData(res.data);
        console.log("res user data: ", res.data);
      })
      .catch((err) => {
        console.error("Get User Data: ", err);
      });
  }, []);

  console.log("fliter", filterCriteria);
  useEffect(() => {
    if (initialData) {
      const filteredResults = initialData.filter((item) => {
        let admissionDate = new Date(item.admissiondate);
        let today = new Date();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        const dateCondition =
          filterCriteria.fromdate && filterCriteria.todate
            ? item.admissiondate >= filterCriteria.fromdate &&
              item.admissiondate <= filterCriteria.todate
            : true;

        const monthdataCondition = filterCriteria.monthdataCondition
          ? admissionDate.getMonth() === parseInt(month) - 1
          : true;

        return dateCondition && monthdataCondition;
      });

      setStudentData(filteredResults);
    }
  }, [filterCriteria, initialData]);
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  ></Box>;
  // this is for progress bar
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 100 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const groupDataAndCalculatePercentage = (data, key) => {
    if (!Array.isArray(data)) {
      return {}; // Return an empty object if data is not an array
    }

    return data.reduce((result, item) => {
      const value = item[key];
      if (!result[value]) {
        result[value] = [];
      }
      result[value].push(item);
      return result;
    }, {});
  };
  const branchwiseAllstudentsData = groupDataAndCalculatePercentage(
    students,
    "branch"
  );
  const CounsellorrwiseAllstudentsData = groupDataAndCalculatePercentage(
    students,
    "enquirytakenby"
  );
  const CounsellorwisestudentsData = groupDataAndCalculatePercentage(
    getstudentData,
    "enquirytakenby"
  );

  const branchStudentData = groupDataAndCalculatePercentage(
    getstudentData,
    "branch"
  );
  const branchUserData = groupDataAndCalculatePercentage(
    getUsersData,
    "branch"
  );

  const finalTotalByBranch = {};
  const finalDueAndReceivedByBranch = {};
  const counsellorwisedataByBranch = {};
  const finalCounsellorWiseDueAndReceivedByBranch = {};
  let totalAmount = 0;
  // Calculate the total amount and handle NaN values
  getstudentData.forEach((student) => {
    const amount = parseFloat(student.finaltotal);
    if (!isNaN(amount)) {
      totalAmount += amount;
    }
  });

  Object.keys(branchStudentData).forEach((branch) => {
    let branchTotalAmount = 0;

    // Calculate the total amount for each branch and handle NaN values
    branchStudentData[branch].forEach((student) => {
      const amount = parseFloat(student.finaltotal);
      if (!isNaN(amount)) {
        branchTotalAmount += amount;
      }
    });

    const branchPercentage = (branchTotalAmount / totalAmount) * 100;

    finalTotalByBranch[branch] = {
      totalAmount: branchTotalAmount,
      percentage: branchPercentage,
    };
  });
  Object.keys(CounsellorwisestudentsData).forEach((counsellor) => {
    let counsellorTotalCount = 0;

    // Calculate the total amount for each branch and handle NaN values
    CounsellorwisestudentsData[counsellor].forEach((student) => {
      const amount = parseFloat(student.finaltotal);
      if (!isNaN(amount)) {
        counsellorTotalCount += amount;
      }
    });

    const counsellorPercentage = (counsellorTotalCount / totalAmount) * 100;

    counsellorwisedataByBranch[counsellor] = {
      totalcount: counsellorTotalCount,
      percentage: counsellorPercentage,
    };
  });
  const [filterDeuAndReceived, setfilterDeuAndReceived] = useState({
    fromdate: "",

    todate: "",

    monthdataCondition: true,
  });
  const handleDeuAndReceivedInputChange = (e) => {
    const { name, value } = e.target;

    setfilterDeuAndReceived({
      ...filterDeuAndReceived,
      monthdataCondition: false,
      [name]: value,
    });
  };
  //// reset filters
  const filterDeuAndReceivedreset = () => {
    setfilterDeuAndReceived({
      fromdate: "",
      todate: "",
      monthdataCondition: true,
    });
  };

  // Object.keys(branchwiseAllstudentsData).forEach((branch) => {
  //   const currentDate = new Date();
  //   const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
  //   const currentYear = currentDate.getFullYear();

  //   let totalDueAmount = 0;
  //   let totalreceivedAmount = 0;

  //   // Calculate the total amount for each branch and handle NaN values
  //   branchwiseAllstudentsData[branch].forEach((student) => {
  //     student.installments.forEach((installment) => {
  //       if (installment.duedate && installment.paidamount === "") {
  //         const dueDate = new Date(installment.duedate);
  //         const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
  //         const dueYear = dueDate.getFullYear();

  //         if (dueMonth === currentMonth && dueYear === currentYear) {
  //           totalDueAmount += parseInt(installment.dueamount, 10);
  //         }
  //       }
  //       if (installment.paiddate) {
  //         const dueDate = new Date(installment.paiddate);
  //         const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
  //         const dueYear = dueDate.getFullYear();

  //         if (dueMonth === currentMonth && dueYear === currentYear) {
  //           totalreceivedAmount += parseInt(installment.paidamount, 10);
  //         }
  //       }
  //     });
  //     student.initialpayment.forEach((payment) => {
  //       if (payment.paiddate) {
  //         const dueDate = new Date(payment.paiddate);
  //         const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
  //         const dueYear = dueDate.getFullYear();

  //         if (dueMonth === currentMonth && dueYear === currentYear) {
  //           totalreceivedAmount += parseInt(payment.initialamount, 10);
  //         }
  //       }
  //     });
  //   });

  //   finalDueAndReceivedByBranch[branch] = {
  //     totalDueAmount: totalDueAmount,
  //     totalreceivedAmount: totalreceivedAmount,
  //   };
  // });
  Object.keys(CounsellorrwiseAllstudentsData).forEach((counsellor) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalDueAmount = 0;
    let totalreceivedAmount = 0;

    // Calculate the total amount for each branch and handle NaN values

    CounsellorrwiseAllstudentsData[counsellor].forEach((student) => {
      student.installments.forEach((installment) => {
        if (
          (installment.duedate && installment.paidamount === 0) ||
          installment.paidamount === ""
        ) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.duedate >= filterDeuAndReceived.fromdate &&
              installment.duedate <= filterDeuAndReceived.todate
            ) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          } else {
            const dueDate = new Date(installment.duedate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          }
        }
        if (installment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.paiddate >= filterDeuAndReceived.fromdate &&
              installment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          } else {
            const dueDate = new Date(installment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          }
        }
      });
      student.initialpayment.forEach((payment) => {
        if (payment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              payment.paiddate >= filterDeuAndReceived.fromdate &&
              payment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          } else {
            const dueDate = new Date(payment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          }
        }
      });
    });

    finalCounsellorWiseDueAndReceivedByBranch[counsellor] = {
      totalDueAmount: totalDueAmount,
      totalreceivedAmount: totalreceivedAmount,
    };
  });
  Object.keys(branchwiseAllstudentsData).forEach((branch) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalDueAmount = 0;
    let totalreceivedAmount = 0;

    // Calculate the total amount for each branch and handle NaN values
    branchwiseAllstudentsData[branch].forEach((student) => {
      student.installments.forEach((installment) => {
        if (
          (installment.duedate && installment.paidamount === 0) ||
          installment.paidamount === ""
        ) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.duedate >= filterDeuAndReceived.fromdate &&
              installment.duedate <= filterDeuAndReceived.todate
            ) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          } else {
            const dueDate = new Date(installment.duedate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          }
        }
        if (installment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.paiddate >= filterDeuAndReceived.fromdate &&
              installment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          } else {
            const dueDate = new Date(installment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          }
        }
      });
      student.initialpayment.forEach((payment) => {
        if (payment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              payment.paiddate >= filterDeuAndReceived.fromdate &&
              payment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          } else {
            const dueDate = new Date(payment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          }
        }
      });
    });

    finalDueAndReceivedByBranch[branch] = {
      totalDueAmount: totalDueAmount,
      totalreceivedAmount: totalreceivedAmount,
    };
  });
  const calculateDueAmountForCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalDueAmount = 0;

    students.forEach((item) => {
      item.installments.forEach((installment) => {
        if (
          (installment.duedate && installment.paidamount === 0) ||
          installment.paidamount === ""
        ) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.duedate >= filterDeuAndReceived.fromdate &&
              installment.duedate <= filterDeuAndReceived.todate
            ) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          } else {
            const dueDate = new Date(installment.duedate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalDueAmount += parseInt(installment.dueamount, 10);
            }
          }
        }
      });
    });

    return totalDueAmount;
  };
  const calculatePaidAmountForCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalreceivedAmount = 0;
    students.forEach((item) => {
      item.initialpayment.forEach((payment) => {
        if (payment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              payment.paiddate >= filterDeuAndReceived.fromdate &&
              payment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          } else {
            const dueDate = new Date(payment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(payment.initialamount, 10);
            }
          }
        }
      });
    });
    students.forEach((item) => {
      item.installments.forEach((installment) => {
        if (installment.paiddate) {
          if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
            if (
              installment.paiddate >= filterDeuAndReceived.fromdate &&
              installment.paiddate <= filterDeuAndReceived.todate
            ) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          } else {
            const dueDate = new Date(installment.paiddate);
            const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
            const dueYear = dueDate.getFullYear();

            if (dueMonth === currentMonth && dueYear === currentYear) {
              totalreceivedAmount += parseInt(installment.paidamount, 10);
            }
          }
        }
      });
    });

    return totalreceivedAmount;
  };
  let AllbranchesDueAmount;
  let AllbranchesreceivedAmount;
  if (students) {
    AllbranchesDueAmount = calculateDueAmountForCurrentMonth();
    AllbranchesreceivedAmount = calculatePaidAmountForCurrentMonth();
  }
  return (
    <div className="container main-dashboard">
      {/* Header */}
      <div>
        <Box className="text-center  mt-3">
          {user && <h4>{"Hi " + user.fullname}</h4>}
          <h5>
            {" "}
            Welcome to{" "}
            <span style={{ color: "#e96228", fontSize: "25px" }}>TEKS </span>
            <span style={{ color: "#195489", fontSize: "25px" }}> ACADEMY</span>
          </h5>

          {/* <h6 onClick={handleClick} style={{ cursor: "pointer" }}>
              Filter
            </h6>
            <Menu
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
            >
              <div className="d-flex justify-content-between">
                <MenuItem> Filter</MenuItem>
                <MenuItem>
                  {" "}
                  <CloseIcon
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                  />
                </MenuItem>
              </div>
              <hr />
              <div className="row">
                <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                  <MenuItem>
                    <label> From: </label>
                    <input
                      type="date"
                      className="w-100 ps-2"
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
                </div>
                <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                  <MenuItem>
                    <label> To: </label>

                    <input
                      type="date"
                      className="w-100 ps-2"
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
                </div>
              </div>

              <MenuItem className="d-flex justify-content-between">
               

                <button
                  className="clear"
                  onClick={filterreset}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu> */}
        </Box>
      </div>

      <div className="contianer Dashboard">
        <div className="row">
          <div
            className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({
                enrollments: true,
                fee: false,
                feefollowup: false,
                users: false,
                // dueAndReceivedAmount: false,
              })
            }
          >
            <Card
              style={{
                background: "#004493",
                textAlign: "center",
                borderRadius: "8px",
                color: "white",
                boxShadow: "3px 3px 6px  gray",
              }}
            >
              <p className="pt-3">Total Enrollments</p>
              <p>
                {/* <b>
               
                  {Number(
                    parseFloat(getstudentData.length).toFixed(2)
                  ).toLocaleString("en-IN")}
                </b> */}
              </p>
            </Card>
          </div>
          <div
            className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({
                enrollments: false,
                fee: true,
                feefollowup: false,
                users: false,
                // dueAndReceivedAmount: false,
              })
            }
          >
            <Card
              style={{
                background: "#ff9f24",
                textAlign: "center",
                borderRadius: "8px",
                color: "white",
                boxShadow: "3px 3px 6px  gray",
              }}
            >
              <p className="pt-3">Fee Details</p>
              <p>
                {/* <CurrencyRupeeIcon /> */}
                <b>
                  {/* {Number(parseFloat(totalAmount).toFixed(2)).toLocaleString(
                    "en-IN"
                  )} */}
                </b>
                {/* <b>{sumDueAmount},</b>
                <b>{sumreceivedAmount},</b> */}
              </p>
            </Card>
          </div>
          <div
            className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({
                enrollments: false,
                fee: false,
                feefollowup: true,
                users: false,
                // dueAndReceivedAmount: false,
              })
            }
          >
            <Link to="/feedetails">
              <Card
                style={{
                  background: "#008959",
                  textAlign: "center",
                  borderRadius: "8px",
                  color: "white",
                  boxShadow: "3px 3px 6px  gray",
                }}
              >
                <p className="text-center pt-3">Fee Followups</p>
              </Card>
            </Link>

            {/* <b>
               
                  {Number(
                    parseFloat(getstudentData.length).toFixed(2)
                  ).toLocaleString("en-IN")}
                </b> */}
          </div>
          {/* <div
            className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({
                enrollments: false,
                fee: false,
                users: false,
                dueAndReceivedAmount: true,
              })
            }
          >
            <Card
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplayData({
                  enrollments: false,
                  fee: false,
                  feefollowup: true,
                })
              }
            >
              <p className="pt-3">
                <b>
                  Received Amount :
                  <CurrencyRupeeIcon />
                  {Number(
                    parseFloat(AllbranchesreceivedAmount).toFixed(2)
                  ).toLocaleString("en-IN")}
                </b>
                <b>{sumreceivedAmount},</b>
              </p>
              <p>
                <b>
                  Pending Amount : <CurrencyRupeeIcon />
                  {Number(
                    parseFloat(AllbranchesDueAmount).toFixed(2)
                  ).toLocaleString("en-IN")}
                </b>
              </p>
            </Card>
          </div> */}

          {role === "admin" && (
            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3 "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplayData({
                  enrollments: false,
                  fee: false,
                  users: true,
                  // dueAndReceivedAmount: false,
                })
              }
            >
              <Card
                style={{ backgroundColor: "#e6acb4 " }}
                className="rounded rounded-3"
              >
                <p className="pt-3">Total Users</p>
                {/* <p>
                  <b>
                    {Number(
                      parseFloat(getUsersData.length).toFixed(2)
                    ).toLocaleString("en-IN")}
                  </b>
                </p> */}
              </Card>
            </div>
          )}
          {/* <div
            className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3 "
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({
                enrollments: false,
                fee: false,
                users: true,
              })
            }
          >
            <Card
              style={{ backgroundColor: "#e6acb4 " }}
              className="rounded rounded-3"
            >
              <p className="pt-3">Due amount and Received Amount</p>
              <p>
                <b> {getUsersData.length} </b>
              </p>
            </Card>
          </div> */}
        </div>
        <div className="row">
          {/* <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3">
            <Card
              style={{ backgroundColor: "#d9e9e9" }}
              className="rounded rounded-3"
            >
              <p className="pt-3">Pending Fee Records</p>
              <p>
                <b>20</b>
              </p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3">
            <Card
              style={{ backgroundColor: "#b7e9da" }}
              className="rounded rounded-3"
            >
              <p className="pt-3">Fee Followups</p>
              <p>
                <b>20</b>
              </p>
            </Card>
          </div> */}
        </div>
      </div>

      {/* This is for progress bar */}

      {DisplayData.enrollments && (
        <div className="">
          <div className="d-flex justify-content-between">
            <h5 className="pt-4  enrollment ps-4">
              {" "}
              Current Month Enrollment Details
            </h5>
            <div className="pt-2 pe-4">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <button
                  className="btn btn-color"
                  style={{ textTransform: "capitalize" }}
                >
                  {" "}
                  Filter{" "}
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

                </div>

                <MenuItem className="text-end">
                  {/* <button className="save"> Save</button> */}
                  <button className="btn btn-color" onClick={filterreset}>
                    {" "}
                    Clear
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
          {role === "branch manager" && (
            <div>
              <div className="row  ">
                <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card
                   
                    onClick={(e) =>
                      setBranchwise({
                        enrollments: true,
                        bookingamount: false,
                        feerecevied: false,
                        feeyettorecevied: false,
                        branchusers: false,
                      })
                    }
                    style={{
                      background: "#fd746e",
                      textAlign: "center",
                      borderRadius: "8px",
                      cursor:"pointer",
                      color: "white",
                      boxShadow: "3px 3px 6px  gray",
                    }}
                  >
                    <p className="text-center pt-3">
                      No. of Enrollments
                      <p>
                        {Number(
                          parseFloat(getstudentData.length).toFixed(2)
                        ).toLocaleString("en-IN")}{" "}
                      </p>
                    </p>
                  </Card>
                </div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card
                   
                    onClick={(e) =>
                      setBranchwise({
                        enrollments: false,
                        bookingamount: true,
                        feerecevied: false,
                        feeyettorecevied: false,
                        branchusers: false,
                      })
                    }
                    style={{
                      background: "#7fa1e4",
                      textAlign: "center",
                      cursor: "pointer" ,
                      borderRadius: "8px",
                      color: "white",
                      boxShadow: "3px 3px 6px  gray",
                    }}
                  >
                    <p className="text-center pt-3">
                      Booking Amount
                      <p>
                        {Number(
                          parseFloat(totalAmount).toFixed(2)
                        ).toLocaleString("en-IN")}{" "}
                      </p>
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          )}

          <div className="justify-content-around pt-4 row progreebar-show">
            {role !== "branch manager" &&
              Object.entries(branchStudentData).map(([branch, students]) => {
                const enrollmentPercentage =
                  (students.length / getstudentData.length) * 100;
                const totalCount = students.length;
                return (
                  <div>
                    <div className="row  ">
                      <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
                      <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                        <Card
                          
                          onClick={(e) =>
                            setBranchwise({
                              enrollments: true,
                              bookingamount: false,
                              feerecevied: false,
                              feeyettorecevied: false,
                              branchusers: false,
                            })
                          }
                          style={{
                            background: "#fd746e",
                            textAlign: "center",
                            borderRadius: "8px",
                            color: "white",
                            boxShadow: "3px 3px 6px  gray",
                            cursor: "pointer" ,
                          }}
                        >
                          <p className="text-center pt-3">
                            No. of Enrollments
                            <p>
                              {Number(
                                parseFloat(getstudentData.length).toFixed(2)
                              ).toLocaleString("en-IN")}{" "}
                            </p>
                          </p>
                        </Card>
                      </div>
                      <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                        <Card
                         
                          onClick={(e) =>
                            setBranchwise({
                              enrollments: false,
                              bookingamount: true,
                              feerecevied: false,
                              feeyettorecevied: false,
                              branchusers: false,
                            })
                          }
                          style={{
                            background: "#7fa1e4",
                            textAlign: "center",
                            borderRadius: "8px",
                            color: "white",
                            boxShadow: "3px 3px 6px  gray",
                            cursor: "pointer" ,
                          }}
                        >
                          <p className="text-center pt-3">
                            Booking Amount
                            <p>
                              {Number(
                                parseFloat(totalAmount).toFixed(2)
                              ).toLocaleString("en-IN")}{" "}
                            </p>
                          </p>
                        </Card>
                      </div>
                    </div>
                    {/* <div
                    key={`student-${branch}`}
                    className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                  >

                    
                  
                    <h6>{branch}</h6>
                    <BorderLinearProgress
                      variant="determinate"
                      value={enrollmentPercentage}
                    />
                    <span>Total Count: </span>

                    {Number(parseFloat(totalCount).toFixed(2)).toLocaleString(
                      "en-IN"
                    )}
                    <span>({enrollmentPercentage.toFixed(2)}%)</span>
                  </div> */}
                  </div>
                );
              })}
            {Branchwise.enrollments && (
              <div className="">
                {role !== "counsellor" && role !== "branch manager" && (
                  <div className="d-flex justify-content-between">
                    <h5 className="pt-4 ps-4">
                      {" "}
                      Current Month Branchwise Enrollment Data
                    </h5>
                    {/* <div className="pt-2 pe-4">
                      <Button
                        id="demo-positioned-button"
                        aria-controls={
                          open ? "demo-positioned-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <button
                          className="btn btn-color"
                          style={{ textTransform: "capitalize" }}
                        >
                          {" "}
                          Filter{" "}
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
                        </div>

                        <MenuItem className="text-end">
                         
                          <button
                            className="btn btn-color"
                            onClick={filterreset}
                          >
                            {" "}
                            Clear
                          </button>
                        </MenuItem>
                      </Menu>
                    </div> */}
                  </div>
                )}

                <div className="justify-content-around ">
                  {role !== "branch manager" && role !== "counsellor" && (
                    <Paper>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell className="table-cell-heading">
                                Branch
                              </StyledTableCell>
                              <StyledTableCell className="table-cell-heading">
                                Total Count
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {role !== "branch manager" &&
                              role !== "counsellor" &&
                              Object.entries(branchStudentData).map(
                                ([branch, students]) => {
                                  const enrollmentPercentage =
                                    (students.length / getstudentData.length) *
                                    100;
                                  const totalCount = students.length;
                                  return (
                                    <StyledTableRow key={`student-${branch}`}>
                                      <StyledTableCell className="Table-cell">
                                        {branch}
                                      </StyledTableCell>

                                      <StyledTableCell className="Table-cell">
                                        {Number(
                                          parseFloat(totalCount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  );
                                }
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  )}

                  {role !== "admin" &&  role !== "counsellor" && role !== "Regional Manager" &&
                  <div className="justify-content-around">
                  <div className="d-flex justify-content-between">
                    <h5 className="pt-4  enrollment ps-4">
                      {" "}
                      Current Month Consellor Wise Enrollment Details
                    </h5>
                 
                  </div>
                  <Paper>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell className="table-cell-heading">
                              Counsellor Name
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-heading">
                              No. of Enrollments
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {role === "branch manager" &&
                            Object.entries(CounsellorwisestudentsData).map(
                              ([counsellor, students]) => {
                                const enrollmentPercentage =
                                  (students.length / getstudentData.length) *
                                  100;
                                const totalCount = students.length;
                                return (
                                  <StyledTableRow
                                    key={`student-${counsellor}`}
                                  >
                                    <StyledTableCell className="Table-cell">
                                      {counsellor}{" "}
                                    </StyledTableCell>
                                    <StyledTableCell className="Table-cell">
                                      {" "}
                                      {Number(
                                        parseFloat(totalCount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              }
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>}

                  {/* {role === "branch manager" &&
                    Object.entries(CounsellorwisestudentsData).map(
                      ([counsellor, students]) => {
                        const enrollmentPercentage =
                          (students.length / getstudentData.length) * 100;
                        const totalCount = students.length;
                        return (
                          <div
                            key={`student-${counsellor}`}
                            className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                          >
                            <h6>{counsellor}</h6>
                            <BorderLinearProgress
                              variant="determinate"
                              value={enrollmentPercentage}
                            />
                            <span>Total Count: </span>
                            {}{" "}
                            {Number(
                              parseFloat(totalCount).toFixed(2)
                            ).toLocaleString("en-IN")}
                            <span>({enrollmentPercentage.toFixed(2)}%)</span>
                          </div>
                        );
                      }
                    )} */}
                </div>
              </div>
            )}
            {Branchwise.bookingamount && (
              <div>
                {" "}
                <div className="">
                  {role !== "counsellor" && role !== "branch manager" && (
                    <div className="d-flex justify-content-between">
                      <h5 className="pt-4 ps-4">
                        {" "}
                        Current Month Branchwise Booking Amount Data
                      </h5>
               
                    </div>
                  )}

                  <div className="justify-content-around ">
                    {role !== "branch manager" && role !== "counsellor" && (
                      <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Branch
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Total Amount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(finalTotalByBranch).map(
                                ([branch, { totalAmount, percentage }]) => {
                                  return (
                                    <StyledTableRow key={branch}>
                                      <StyledTableCell className="Table-cell">
                                        {branch}
                                      </StyledTableCell>
                                      <StyledTableCell className="Table-cell">
                                        {Number(
                                          parseFloat(totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                    // <div

                                    //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                                    // >
                                    //   <h6>{branch}</h6>
                                    //   <BorderLinearProgress
                                    //     variant="determinate"
                                    //     value={percentage}
                                    //   />
                                    //   <div>
                                    //     Total Amount:
                                    //     {Number(
                                    //       parseFloat(totalAmount).toFixed(2)
                                    //     ).toLocaleString("en-IN")}
                                    //     <span>({percentage.toFixed(2)}%)</span>
                                    //   </div>
                                    // </div>
                                  );
                                }
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    )}
                    <div>
                      {role === "branch manager" && (
                        <div className="d-flex justify-content-between">
                          <h5 className="pt-4 ps-4">
                            {" "}
                            Current Month Counsellor Wise Booking Amount Data
                          </h5>
                       
                        </div>
                      )}
                      {role === "branch manager" && 
                        <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Cousellor Name
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Booking AMount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {role === "branch manager" &&
                                Object.entries(counsellorwisedataByBranch).map(
                                  ([
                                    counsellor,
                                    { totalcount, percentage },
                                  ]) => {
                                    return (
                                      <StyledTableRow
                                        key={`student-${counsellor}`}
                                      >
                                        <StyledTableCell className="Table-cell">
                                          {counsellor}
                                        </StyledTableCell>
                                        <StyledTableCell className="Table-cell">
                                          {Number(
                                            parseFloat(totalcount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    );
                                  }
                                )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                      }
                      
                     
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {DisplayData.fee && (
        <div className=" rounded rounded-5  pb-4">
          <div className="d-flex justify-content-between">
            <h5 className="pt-4 ps-4"> Current Month Fee Details</h5>
            <div className="pt-2 pe-4">
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
                  {" "}
                  Filter{" "}
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
                </div>

                <MenuItem className="text-end">
                  {/* <button className="save"> Save</button> */}
                  <button className="btn btn-color" onClick={filterreset}>
                    {" "}
                    Clear
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="row  ">
            <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
            <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
              <Card
            
                onClick={(e) =>
                  setBranchwise({
                    enrollments: false,
                    bookingamount: false,
                    feerecevied: true,
                    feeyettorecevied: false,
                    branchusers: false,
                  })
                }
                style={{
                  background: "#fd746e",
                  textAlign: "center",
                  borderRadius: "8px",
                  color: "white",
                  boxShadow: "3px 3px 6px  gray",
                  cursor: "pointer" ,
                }}
              >
                <p className="text-center pt-3">
                  Fee Received
                  <p>
                    {" "}
                    {Number(
                      parseFloat(AllbranchesreceivedAmount).toFixed(2)
                    ).toLocaleString("en-IN")}
                  </p>
                </p>
              </Card>
            </div>
            <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
              <Card
               
                onClick={(e) =>
                  setBranchwise({
                    enrollments: false,
                    bookingamount: false,
                    feerecevied: false,
                    feeyettorecevied: true,
                    branchusers: false,
                  })
                }
                style={{
                  background: "#7fa1e4",
                  textAlign: "center",
                  borderRadius: "8px",
                  color: "white",
                  boxShadow: "3px 3px 6px  gray",
                  cursor: "pointer",
                }}
              >
                <p className="text-center pt-3">
                  Fee Yet To Received
                  <p>
                    {" "}
                    {Number(
                      parseFloat(AllbranchesDueAmount).toFixed(2)
                    ).toLocaleString("en-IN")}{" "}
                  </p>
                </p>
              </Card>
            </div>
          </div>
          {/* <div className="  justify-content-around pt-4 row progreebar-show">
            {role !== "branch manager" &&
              Object.entries(finalTotalByBranch).map(
                ([branch, { totalAmount, percentage }]) => {
                  return (
                    <div
                      key={branch}
                      className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                    >
                      <h6>{branch}</h6>
                      <BorderLinearProgress
                        variant="determinate"
                        value={percentage}
                      />
                      <div>
                        Total Amount:
                        {Number(
                          parseFloat(totalAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({percentage.toFixed(2)}%)</span>
                      </div>
                    </div>
                  );
                }
              )}

            {role === "branch manager" &&
              Object.entries(counsellorwisedataByBranch).map(
                ([counsellor, { totalcount, percentage }]) => {
                  return (
                    <div
                      key={counsellor}
                      className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                    >
                      <h6>{counsellor}</h6>
                      <BorderLinearProgress
                        variant="determinate"
                        value={percentage}
                      />
                      <div>
                        Total Amount:{" "}
                        {Number(
                          parseFloat(totalcount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({percentage.toFixed(2)}%)</span>
                      </div>
                    </div>
                  );
                }
              )}
          </div> */}
          {Branchwise.feerecevied && (
            <div>
              <div className="">
                {role !== "counsellor" &&  role !== "branch manager" && (
                  <div className="d-flex justify-content-between">
                    <h5 className="pt-4 ps-4">
                      {" "}
                      Current Month Branchwise Recevied Amount Data
                    </h5>
                    
                  </div>
                )}

                <div className="  justify-content-around">
                  {role !== "branch manager" && role !== "counsellor" && (
                    <Paper>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell className="table-cell-heading">
                                Branch
                              </StyledTableCell>
                              <StyledTableCell className="table-cell-heading">
                                Recevied Amount
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Object.entries(finalDueAndReceivedByBranch).map(
                              ([
                                branch,
                                { totalDueAmount, totalreceivedAmount },
                              ]) => {
                                const Receivedpercentage =
                                  (totalreceivedAmount /
                                    AllbranchesreceivedAmount) *
                                  100;
                                const Pendingpercentage =
                                  (totalDueAmount / AllbranchesDueAmount) * 100;
                                return (
                                  <StyledTableRow key={branch}>
                                    <StyledTableCell className="Table-cell">
                                      {branch}
                                    </StyledTableCell>
                                    <StyledTableCell className="Table-cell">
                                      {Number(
                                        parseFloat(totalreceivedAmount).toFixed(
                                          2
                                        )
                                      ).toLocaleString("en-IN")}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                  // <div

                                  //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                                  // >
                                  //   <h6>
                                  //     <b>{branch}</b>
                                  //   </h6>
                                  //   <BorderLinearProgress
                                  //     variant="determinate"
                                  //     value={Receivedpercentage}
                                  //   />

                                  //   <div>
                                  //     Received :{" "}
                                  //     {Number(
                                  //       parseFloat(totalreceivedAmount).toFixed(2)
                                  //     ).toLocaleString("en-IN")}
                                  //     <span>({Receivedpercentage.toFixed(2)}%)</span>
                                  //   </div>
                                  //   <BorderLinearProgress
                                  //     variant="determinate"
                                  //     value={Pendingpercentage}
                                  //   />
                                  //   <div>
                                  //     Pending :{" "}
                                  //     {Number(
                                  //       parseFloat(totalDueAmount).toFixed(2)
                                  //     ).toLocaleString("en-IN")}
                                  //     <span>({Pendingpercentage.toFixed(2)}%)</span>
                                  //   </div>
                                  // </div>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  )}
                  <div>   
                    {role === 'branch manager' && 
                      <div> 
                       <div className="d-flex justify-content-between">
                     <h5 className="pt-4 ps-4">
                       {" "}
                       Current Month Counsellorwise Recevied Amount Data
                     </h5>
                
                   </div>
                   <Paper> 
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow> 
                              <StyledTableCell className="table-cell-heading">
                                    Counsellor Name
                                   </StyledTableCell>
                                   <StyledTableCell className="table-cell-heading">
                                  Receviced Amount
                                   </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {role === "branch manager" &&
                    Object.entries(
                      finalCounsellorWiseDueAndReceivedByBranch
                    ).map(
                      ([
                        counsellor,
                        { totalDueAmount, totalreceivedAmount },
                      ]) => {
                        const Receivedpercentage =
                          (totalreceivedAmount / AllbranchesreceivedAmount) *
                          100;
                        const Pendingpercentage =
                          (totalDueAmount / AllbranchesDueAmount) * 100;
                        return (
                          <StyledTableRow  key={counsellor}> 
                           <StyledTableCell className="Table-cell"> 
                           {counsellor}
                             </StyledTableCell>
                             <StyledTableCell className="Table-cell"> 
                          
                             {Number(
                                parseFloat(totalreceivedAmount).toFixed(2)
                              ).toLocaleString("en-IN")}
                             </StyledTableCell></StyledTableRow>
                          // <div
                          //   key={counsellor}
                          //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                          // >
                          //   <h6>
                          //     <b>{counsellor}</b>
                          //   </h6>
                          //   <BorderLinearProgress
                          //     variant="determinate"
                          //     value={Receivedpercentage}
                          //   />

                          //   <div>
                          //     Received : {}{" "}
                          //     {Number(
                          //       parseFloat(totalreceivedAmount).toFixed(2)
                          //     ).toLocaleString("en-IN")}
                          //     <span>({Receivedpercentage.toFixed(2)}%)</span>
                          //   </div>
                          //   <BorderLinearProgress
                          //     variant="determinate"
                          //     value={Pendingpercentage}
                          //   />
                          //   <div>
                          //     Pending : {}{" "}
                          //     {Number(
                          //       parseFloat(totalDueAmount).toFixed(2)
                          //     ).toLocaleString("en-IN")}
                          //     <span>({Pendingpercentage.toFixed(2)}%)</span>
                          //   </div>
                          // </div>
                        );
                      }
                    )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>

                      </div>
                    
                     
                    }
                     </div>
                 
                </div>
                {/* <div className="justify-content-around ">
                  <Paper>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell className="table-cell-heading">
                              Branch
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-heading">
                             Recevied Amount
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {role !== "branch manager" &&
                            Object.entries(branchStudentData).map(
                              ([branch, students]) => {
                                const enrollmentPercentage =
                                  (students.length / getstudentData.length) *
                                  100;
                                const totalCount = students.length;
                                return (
                                  <StyledTableRow key={`student-${branch}`}>
                                    <StyledTableCell className="Table-cell">
                                      {branch}
                                    </StyledTableCell>

                                    <StyledTableCell className="Table-cell">
                                      {Number(
                                        parseFloat(totalCount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              }
                            )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                  {role === "branch manager" &&
                    Object.entries(CounsellorwisestudentsData).map(
                      ([counsellor, students]) => {
                        const enrollmentPercentage =
                          (students.length / getstudentData.length) * 100;
                        const totalCount = students.length;
                        return (
                          <div
                            key={`student-${counsellor}`}
                            className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                          >
                            <h6>{counsellor}</h6>
                            <BorderLinearProgress
                              variant="determinate"
                              value={enrollmentPercentage}
                            />
                            <span>Total Count: </span>
                            {}{" "}
                            {Number(
                              parseFloat(totalCount).toFixed(2)
                            ).toLocaleString("en-IN")}
                            <span>({enrollmentPercentage.toFixed(2)}%)</span>
                          </div>
                        );
                      }
                    )}
                </div> */}
              </div>
            </div>
          )}

          {Branchwise.feeyettorecevied && (
            <div>
              <div className="">
                {role !== "counsellor" && role !== "branch manager"  && (
                  <div className="d-flex justify-content-between">
                    <h5 className="pt-4 ps-4">
                      {" "}
                      Current Month Branchwise Fee Yet to Recevied Amount Data
                    </h5>
                
                  </div>
                )}

                <div className="  justify-content-around">
                  {role !== "branch manager" && role !== "counsellor" && (
                    <Paper>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell className="table-cell-heading">
                                Branch
                              </StyledTableCell>
                              <StyledTableCell className="table-cell-heading">
                                Pending Amount
                              </StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {role !== "branch manager" &&
                              Object.entries(finalDueAndReceivedByBranch).map(
                                ([
                                  branch,
                                  { totalDueAmount, totalreceivedAmount },
                                ]) => {
                                  const Receivedpercentage =
                                    (totalreceivedAmount /
                                      AllbranchesreceivedAmount) *
                                    100;
                                  const Pendingpercentage =
                                    (totalDueAmount / AllbranchesDueAmount) *
                                    100;
                                  return (
                                    <StyledTableRow key={branch}>
                                      <StyledTableCell className="Table-cell">
                                        {branch}
                                      </StyledTableCell>
                                      <StyledTableCell className="Table-cell">
                                        {Number(
                                          parseFloat(totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                    // <div

                                    //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                                    // >
                                    //   <h6>
                                    //     <b>{branch}</b>
                                    //   </h6>
                                    //   <BorderLinearProgress
                                    //     variant="determinate"
                                    //     value={Receivedpercentage}
                                    //   />

                                    //   <div>
                                    //     Received :{" "}
                                    //     {Number(
                                    //       parseFloat(totalreceivedAmount).toFixed(2)
                                    //     ).toLocaleString("en-IN")}
                                    //     <span>({Receivedpercentage.toFixed(2)}%)</span>
                                    //   </div>
                                    //   <BorderLinearProgress
                                    //     variant="determinate"
                                    //     value={Pendingpercentage}
                                    //   />
                                    //   <div>
                                    //     Pending :{" "}
                                    //     {Number(
                                    //       parseFloat(totalDueAmount).toFixed(2)
                                    //     ).toLocaleString("en-IN")}
                                    //     <span>({Pendingpercentage.toFixed(2)}%)</span>
                                    //   </div>
                                    // </div>
                                  );
                                }
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  )}
                  {role === "branch manager" && 
                  <div > 
  <div className="d-flex justify-content-between">
                     <h5 className="pt-4 ps-4">
                       {" "}
                       Current Month Counsellorwise Fee Yet To Recevied Data 
                     </h5>
                 
                   </div>
                   <Paper>
                   <TableContainer>
                     <Table>
                       <TableHead>
                         <TableRow>
                         <StyledTableCell className="table-cell-heading">
                                    Counsellor Name
                                   </StyledTableCell>
                                   <StyledTableCell className="table-cell-heading">
                                    Fee Yet to Received
                                   </StyledTableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody> 
                       {role === "branch manager" &&
                    Object.entries(
                      finalCounsellorWiseDueAndReceivedByBranch
                    ).map(
                      ([
                        counsellor,
                        { totalDueAmount, totalreceivedAmount },
                      ]) => {
                        const Receivedpercentage =
                          (totalreceivedAmount / AllbranchesreceivedAmount) *
                          100;
                        const Pendingpercentage =
                          (totalDueAmount / AllbranchesDueAmount) * 100;
                        return (
<StyledTableRow      key={counsellor}> 
                           <StyledTableCell className="Table-cell"> 
                           {counsellor}
                             </StyledTableCell>
                             <StyledTableCell className="Table-cell"> 
                             {Number(
                                parseFloat(totalDueAmount).toFixed(2)
                              ).toLocaleString("en-IN")} 
                             </StyledTableCell></StyledTableRow>

                          // <div
                          //   key={counsellor}
                          //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                          // >
                          //   <h6>
                          //     <b>{counsellor}</b>
                          //   </h6>
                          //   <BorderLinearProgress
                          //     variant="determinate"
                          //     value={Receivedpercentage}
                          //   />

                          //   <div>
                          //     Received : {}{" "}
                          //     {Number(
                          //       parseFloat(totalreceivedAmount).toFixed(2)
                          //     ).toLocaleString("en-IN")}
                          //     <span>({Receivedpercentage.toFixed(2)}%)</span>
                          //   </div>
                          //   <BorderLinearProgress
                          //     variant="determinate"
                          //     value={Pendingpercentage}
                          //   />
                          //   <div>
                          //     Pending : {}{" "}
                          //     {Number(
                          //       parseFloat(totalDueAmount).toFixed(2)
                          //     ).toLocaleString("en-IN")}
                          //     <span>({Pendingpercentage.toFixed(2)}%)</span>
                          //   </div>
                          // </div>
                        );
                      }
                    )}   


                       </TableBody>
                     </Table>
                   </TableContainer>
                 </Paper>

                  </div>
                   
                  
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   
                   }
                   
                </div>
                {/* <div className="justify-content-around ">
                 <Paper>
                   <TableContainer>
                     <Table>
                       <TableHead>
                         <TableRow>
                           <StyledTableCell className="table-cell-heading">
                             Branch
                           </StyledTableCell>
                           <StyledTableCell className="table-cell-heading">
                            Recevied Amount
                           </StyledTableCell>
                         </TableRow>
                       </TableHead>
                       <TableBody>
                         {role !== "branch manager" &&
                           Object.entries(branchStudentData).map(
                             ([branch, students]) => {
                               const enrollmentPercentage =
                                 (students.length / getstudentData.length) *
                                 100;
                               const totalCount = students.length;
                               return (
                                 <StyledTableRow key={`student-${branch}`}>
                                   <StyledTableCell className="Table-cell">
                                     {branch}
                                   </StyledTableCell>

                                   <StyledTableCell className="Table-cell">
                                     {Number(
                                       parseFloat(totalCount).toFixed(2)
                                     ).toLocaleString("en-IN")}
                                   </StyledTableCell>
                                 </StyledTableRow>
                               );
                             }
                           )}
                       </TableBody>
                     </Table>
                   </TableContainer>
                 </Paper>
                 {role === "branch manager" &&
                   Object.entries(CounsellorwisestudentsData).map(
                     ([counsellor, students]) => {
                       const enrollmentPercentage =
                         (students.length / getstudentData.length) * 100;
                       const totalCount = students.length;
                       return (
                         <div
                           key={`student-${counsellor}`}
                           className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                         >
                           <h6>{counsellor}</h6>
                           <BorderLinearProgress
                             variant="determinate"
                             value={enrollmentPercentage}
                           />
                           <span>Total Count: </span>
                           {}{" "}
                           {Number(
                             parseFloat(totalCount).toFixed(2)
                           ).toLocaleString("en-IN")}
                           <span>({enrollmentPercentage.toFixed(2)}%)</span>
                         </div>
                       );
                     }
                   )}
               </div> */}
              </div>
            </div>
          )}
        </div>
      )}

      {DisplayData.dueAndReceivedAmount && (
        <div className="progreebar rounded rounded-5  pb-4">
          <div className="d-flex justify-content-between">
            <h4 className="pt-4 enrollment ps-4">
              {" "}
              Received Amount and Pending Amount
            </h4>
            <div className="pt-2 pe-4">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <button
                  className="btn btn-color"
                  style={{ textTransform: "capitalize" }}
                >
                  {" "}
                  Filter{" "}
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
                      value={filterDeuAndReceived.fromdate}
                      onChange={handleDeuAndReceivedInputChange}
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
                      value={filterDeuAndReceived.todate}
                      onChange={handleDeuAndReceivedInputChange}
                    />
                  </div>
                </div>

                <MenuItem className="text-end">
                  {/* <button className="save"> Save</button> */}
                  <button
                    className="btn btn-color"
                    onClick={filterDeuAndReceivedreset}
                  >
                    {" "}
                    Clear
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="  justify-content-around pt-4 row progreebar-show">
            {role !== "branch manager" &&
              Object.entries(finalDueAndReceivedByBranch).map(
                ([branch, { totalDueAmount, totalreceivedAmount }]) => {
                  const Receivedpercentage =
                    (totalreceivedAmount / AllbranchesreceivedAmount) * 100;
                  const Pendingpercentage =
                    (totalDueAmount / AllbranchesDueAmount) * 100;
                  return (
                    <div
                      key={branch}
                      className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                    >
                      <h6>
                        <b>{branch}</b>
                      </h6>
                      <BorderLinearProgress
                        variant="determinate"
                        value={Receivedpercentage}
                      />

                      <div>
                        Received :{" "}
                        {Number(
                          parseFloat(totalreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({Receivedpercentage.toFixed(2)}%)</span>
                      </div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={Pendingpercentage}
                      />
                      <div>
                        Pending :{" "}
                        {Number(
                          parseFloat(totalDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({Pendingpercentage.toFixed(2)}%)</span>
                      </div>
                    </div>
                  );
                }
              )}
            {role === "branch manager" &&
              Object.entries(finalCounsellorWiseDueAndReceivedByBranch).map(
                ([counsellor, { totalDueAmount, totalreceivedAmount }]) => {
                  const Receivedpercentage =
                    (totalreceivedAmount / AllbranchesreceivedAmount) * 100;
                  const Pendingpercentage =
                    (totalDueAmount / AllbranchesDueAmount) * 100;
                  return (
                    <div
                      key={counsellor}
                      className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                    >
                      <h6>
                        <b>{counsellor}</b>
                      </h6>
                      <BorderLinearProgress
                        variant="determinate"
                        value={Receivedpercentage}
                      />

                      <div>
                        Received : {}{" "}
                        {Number(
                          parseFloat(totalreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({Receivedpercentage.toFixed(2)}%)</span>
                      </div>
                      <BorderLinearProgress
                        variant="determinate"
                        value={Pendingpercentage}
                      />
                      <div>
                        Pending : {}{" "}
                        {Number(
                          parseFloat(totalDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                        <span>({Pendingpercentage.toFixed(2)}%)</span>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      )}
      {DisplayData.users && (
        <div className=" rounded rounded-5  pb-4">
          <div className="d-flex justify-content-between">
            <h5 className="pt-4   ps-4"> Current Month Total Users</h5>
            <div className="pt-2 pe-4">
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <button
                  className="btn btn-color"
                  style={{ textTransform: "capitalize" }}
                >
                  {" "}
                  Filter{" "}
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
                </div>

                <MenuItem className="text-end">
                  {/* <button className="save"> Save</button> */}
                  <button className="btn btn-color" onClick={filterreset}>
                    {" "}
                    Clear
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="row  ">
            <div className="col-12 col-md-4 col-xl-4 col-lg-4"></div>
            <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
              <Card
             
                onClick={(e) =>
                  setBranchwise({
                    enrollments: false,
                    bookingamount: false,
                    feerecevied: false,
                    feeyettorecevied: false,
                    branchusers: true,
                  })
                }
                style={{
                  background: "#fd746e",
                  textAlign: "center",
                  borderRadius: "8px",
                  color: "white",
                  boxShadow: "3px 3px 6px  gray",
                  cursor: "pointer" ,
                }}
              >
                <p className="text-center pt-3">
                  No. of Users
                  <p>
                    {Number(
                      parseFloat(getUsersData.length).toFixed(2)
                    ).toLocaleString("en-IN")}
                  </p>
                </p>
              </Card>
            </div>
            <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2"></div>
          </div>
          {Branchwise.branchusers && (
            <div className="justify-content-around ">
              {role === "admin" && (
                <div>
                  <div className="d-flex justify-content-between">
                    <h5 className="pt-4 ps-4">
                      {" "}
                      Current Month Branchwise User Data
                    </h5>
                    
                  </div>
                  <Paper>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell className="table-cell-heading">
                              Branch
                            </StyledTableCell>
                            <StyledTableCell className="table-cell-heading">
                              No. of Users
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.entries(branchUserData).map(
                            ([branch, users]) => {
                              const enrollmentPercentage =
                                (users.length / getUsersData.length) * 100;
                              const totalCount = users.length;
                              return (
                                <StyledTableRow key={`user-${branch}`}>
                                  <StyledTableCell className="Table-cell">
                                    {branch}{" "}
                                  </StyledTableCell>
                                  <StyledTableCell className="Table-cell">
                                    {" "}
                                    {Number(
                                      parseFloat(totalCount).toFixed(2)
                                    ).toLocaleString("en-IN")}{" "}
                                  </StyledTableCell>
                                </StyledTableRow>
                                // <div

                                //   className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                                // >
                                //   <h6></h6>
                                //   <BorderLinearProgress
                                //     variant="determinate"
                                //     value={enrollmentPercentage}
                                //   />
                                //   <span>Total Count: </span>
                                //   {Number(parseFloat(totalCount).toFixed(2)).toLocaleString(
                                //     "en-IN"
                                //   )}
                                //   <span>({enrollmentPercentage.toFixed(2)}%)</span>
                                // </div>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* for Counsellor dashboard start */}

      {/* {profile === "counsellor" &&( 
        <div> 


        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
