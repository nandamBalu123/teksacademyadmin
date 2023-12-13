import React, { useState } from "react";
import { Box, usef } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Header from "../../common/Header/Header";
import TextField from "@mui/material/TextField";
import axios from "axios";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
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

  const [getstudentData, setStudentData] = useState([]);
  const [Displaycards, setDisplaycards] = useState({
    enrollments: false,
    fee: false,
    feefollowup: false,
    users: false,
  });
  const [DisplayTable, setDisplayTable] = useState({
    enrollments: false,
    bookingamount: false,
    enrollmentfeerecevied: false,
    enrollmentfeeyettorecevied: false,
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
    if (students) {
      const filteredResults = students.filter((item) => {
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
  }, [filterCriteria, students]);
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
  const [expandedBranch, setExpandedBranch] = useState(null);
  const [expandedCounselor, setExpandedCounselor] = useState(null);
  let [
    FilteredStudents_BranchWiseAndCounsellorWise,
    setFilteredStudents_BranchWiseAndCounsellorWise,
  ] = useState();
  let [
    AllStudents_BranchWiseAndCounsellorWise,
    setAllStudents_BranchWiseAndCounsellorWise,
  ] = useState();
  let [
    calculations_of_all_students_branchwise_counsellorwise,
    setcalculations_of_all_students_branchwise_counsellorwise,
  ] = useState();
  let [
    calculations_of_filtered_students_branchwise_counsellorwise,
    setcalculations_of_filtered_students_branchwise_counsellorwise,
  ] = useState();
  // console.log(
  //   FilteredStudents_BranchWiseAndCounsellorWise,
  //   AllStudents_BranchWiseAndCounsellorWise,
  //   calculations_of_all_students_branchwise_counsellorwise,
  //   calculations_of_filtered_students_branchwise_counsellorwise
  // );
  useEffect(() => {
    if (students) {
      const groupByCustomFields = (data, groupByField1, groupByField2) => {
        if (!Array.isArray(data)) {
          return {}; // Return an empty object if data is not an array
        }

        const groupedStudents = data.reduce((acc, student) => {
          if (
            !student ||
            !student.hasOwnProperty(groupByField1) ||
            !student.hasOwnProperty(groupByField2)
          ) {
            throw new Error(
              "Invalid student object: Missing required properties."
            );
          }

          // Group by first custom field
          acc[student[groupByField1]] = acc[student[groupByField1]] || {};

          // Group by second custom field within each group of the first custom field
          acc[student[groupByField1]][student[groupByField2]] =
            acc[student[groupByField1]][student[groupByField2]] || [];
          acc[student[groupByField1]][student[groupByField2]].push(student);

          return acc;
        }, {});

        return groupedStudents;
      };
      const FilteredStudents_BranchWiseAndCounsellorWise = groupByCustomFields(
        getstudentData,
        "branch",
        "enquirytakenby"
      );
      const AllStudents_BranchWiseAndCounsellorWise = groupByCustomFields(
        students,
        "branch",
        "enquirytakenby"
      );
      setFilteredStudents_BranchWiseAndCounsellorWise(
        FilteredStudents_BranchWiseAndCounsellorWise
      );
      setAllStudents_BranchWiseAndCounsellorWise(
        AllStudents_BranchWiseAndCounsellorWise
      );
      const calculations_of_all_students_branchwise_counsellorwise = {};
      Object.keys(AllStudents_BranchWiseAndCounsellorWise).forEach((branch) => {
        let branchTotalAmount = 0;
        let branchTotalReceivedAmount = 0;
        let branchTotalDueAmount = 0;

        // Counsellor-wise calculations
        const counsellorWiseTotal = {};

        if (AllStudents_BranchWiseAndCounsellorWise[branch]) {
          Object.keys(AllStudents_BranchWiseAndCounsellorWise[branch]).forEach(
            (counsellor) => {
              counsellorWiseTotal[counsellor] = {
                totalAmount: 0,
                totalReceivedAmount: 0,
                totalDueAmount: 0,
              };

              AllStudents_BranchWiseAndCounsellorWise[branch][
                counsellor
              ].forEach((student) => {
                const totalamount = parseFloat(student.finaltotal);
                if (!isNaN(totalamount)) {
                  branchTotalAmount += totalamount;
                  counsellorWiseTotal[counsellor].totalAmount += totalamount;
                }
                const receivedamount = parseFloat(student.totalpaidamount);
                if (!isNaN(receivedamount)) {
                  branchTotalReceivedAmount += receivedamount;
                  counsellorWiseTotal[counsellor].totalReceivedAmount +=
                    receivedamount;
                }
                const dueamount = parseFloat(student.dueamount);
                if (!isNaN(dueamount)) {
                  branchTotalDueAmount += dueamount;
                  counsellorWiseTotal[counsellor].totalDueAmount += dueamount;
                }
              });
            }
          );
        }

        calculations_of_all_students_branchwise_counsellorwise[branch] = {
          totalAmount: branchTotalAmount,
          totalReceivedAmount: branchTotalReceivedAmount,
          totalDueAmount: branchTotalDueAmount,
          counsellorWiseTotal,
        };
      });
      const calculations_of_filtered_students_branchwise_counsellorwise = {};
      Object.keys(FilteredStudents_BranchWiseAndCounsellorWise).forEach(
        (branch) => {
          let branchTotalAmount = 0;
          let branchTotalReceivedAmount = 0;
          let branchTotalDueAmount = 0;

          // Counsellor-wise calculations
          const counsellorWiseTotal = {};

          if (FilteredStudents_BranchWiseAndCounsellorWise[branch]) {
            Object.keys(
              FilteredStudents_BranchWiseAndCounsellorWise[branch]
            ).forEach((counsellor) => {
              counsellorWiseTotal[counsellor] = {
                totalAmount: 0,
                totalReceivedAmount: 0,
                totalDueAmount: 0,
              };

              FilteredStudents_BranchWiseAndCounsellorWise[branch][
                counsellor
              ].forEach((student) => {
                const totalamount = parseFloat(student.finaltotal);
                if (!isNaN(totalamount)) {
                  branchTotalAmount += totalamount;
                  counsellorWiseTotal[counsellor].totalAmount += totalamount;
                }
                const receivedamount = parseFloat(student.totalpaidamount);
                if (!isNaN(receivedamount)) {
                  branchTotalReceivedAmount += receivedamount;
                  counsellorWiseTotal[counsellor].totalReceivedAmount +=
                    receivedamount;
                }
                const dueamount = parseFloat(student.dueamount);
                if (!isNaN(dueamount)) {
                  branchTotalDueAmount += dueamount;
                  counsellorWiseTotal[counsellor].totalDueAmount += dueamount;
                }
              });
            });
          }

          calculations_of_filtered_students_branchwise_counsellorwise[branch] =
            {
              totalAmount: branchTotalAmount,
              totalReceivedAmount: branchTotalReceivedAmount,
              totalDueAmount: branchTotalDueAmount,
              counsellorWiseTotal,
            };
        }
      );
      setcalculations_of_all_students_branchwise_counsellorwise(
        calculations_of_all_students_branchwise_counsellorwise
      );
      setcalculations_of_filtered_students_branchwise_counsellorwise(
        calculations_of_filtered_students_branchwise_counsellorwise
      );
    }
  }, [students, getstudentData]);
  console.log(
    FilteredStudents_BranchWiseAndCounsellorWise,
    AllStudents_BranchWiseAndCounsellorWise,
    calculations_of_all_students_branchwise_counsellorwise,
    calculations_of_filtered_students_branchwise_counsellorwise
  );
  const handleBranchClick = (branch) => {
    setExpandedBranch(expandedBranch === branch ? null : branch);
    setExpandedCounselor(null); // Collapse counselor when branch is clicked
  };

  const handleCounselorClick = (counselor) => {
    setExpandedCounselor(expandedCounselor === counselor ? null : counselor);
  };
  
  // BranchwiseAllstudentsData will give branch wise all students data
  const BranchwiseAllstudentsData = groupDataAndCalculatePercentage(
    students,
    "branch"
  );
  // BranchwiseFilteredStudentsData will give branch wise  student data for only filtered students
  const BranchwiseFilteredStudentsData = groupDataAndCalculatePercentage(
    getstudentData,
    "branch"
  );
  // BranchwiseUsersData will give branch wise  user data
  const BranchwiseUsersData = groupDataAndCalculatePercentage(
    getUsersData,
    "branch"
  );
  // CounsellorrwiseAllstudentsData will give counsellor wise all students data
  const CounsellorrwiseAllstudentsData = groupDataAndCalculatePercentage(
    students,
    "enquirytakenby"
  );
  // CounsellorwiseFilteredStudentsData will give counsellor wise  student data for only filtered students
  const CounsellorwiseFilteredStudentsData = groupDataAndCalculatePercentage(
    getstudentData,
    "enquirytakenby"
  );

  // calculate the total fee(booking value) of all filtered students
  // start
  let totalAmount = 0;
  // Calculate the total amount and handle NaN values
  getstudentData.forEach((student) => {
    const amount = parseFloat(student.finaltotal);
    if (!isNaN(amount)) {
      totalAmount += amount;
    }
  });

  // end

  // const finalTotalByBranch = {};
  // const finalDueAndReceivedByBranch = {};
  // const counsellorwisedataByBranch = {};
  // const finalCounsellorWiseDueAndReceivedByBranch = {};

  // here we doing are doing calculations of branchwise filtered students

  //  start
  const calculations_of_filtered_students_branchwise = {};
  Object.keys(BranchwiseFilteredStudentsData).forEach((branch) => {
    let branchTotalAmount = 0;
    let branchTotalReceivedAmount = 0;
    let branchTotalDueAmount = 0;
    // Calculate the total amount for each branch and handle NaN values
    BranchwiseFilteredStudentsData[branch].forEach((student) => {
      const totalamount = parseFloat(student.finaltotal);
      if (!isNaN(totalamount)) {
        branchTotalAmount += totalamount;
      }
      const receivedamount = parseFloat(student.totalpaidamount);
      if (!isNaN(receivedamount)) {
        branchTotalReceivedAmount += receivedamount;
      }
      const deuamount = parseFloat(student.dueamount);
      if (!isNaN(deuamount)) {
        branchTotalDueAmount += deuamount;
      }
    });

    const branchPercentage = (branchTotalAmount / totalAmount) * 100;

    calculations_of_filtered_students_branchwise[branch] = {
      totalAmount: branchTotalAmount,
      totalReceivedAmount: branchTotalReceivedAmount,
      totalDueAmount: branchTotalDueAmount,
      percentage: branchPercentage,
    };
  });
  console.log(
    "calculations_of_filtered_students_branchwise",
    calculations_of_filtered_students_branchwise
  );
  const calculations_of_filtered_students_counsellorwise = {};

  Object.keys(CounsellorwiseFilteredStudentsData).forEach((counsellor) => {
    let counsellorTotalAmount = 0;
    let counsellorReceivedAmount = 0;
    let counsellorDueAmount = 0;
    // Calculate the total amount for each branch and handle NaN values
    CounsellorwiseFilteredStudentsData[counsellor].forEach((student) => {
      const Totalamount = parseFloat(student.finaltotal);
      if (!isNaN(Totalamount)) {
        counsellorTotalAmount += Totalamount;
      }
      const Receivedamount = parseFloat(student.totalpaidamount);
      if (!isNaN(Receivedamount)) {
        counsellorReceivedAmount += Receivedamount;
      }
      const Dueamount = parseFloat(student.dueamount);
      if (!isNaN(Dueamount)) {
        counsellorDueAmount += Dueamount;
      }
    });

    const counsellorPercentage = (counsellorTotalAmount / totalAmount) * 100;

    calculations_of_filtered_students_counsellorwise[counsellor] = {
      totalAmount: counsellorTotalAmount,
      totalReceived: counsellorReceivedAmount,
      totalDueAmount: counsellorDueAmount,
      percentage: counsellorPercentage,
    };
  });
  const calculations_of_All_students_counsellorwise = {};

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
          (installment.duedate &&
            installment.dueamount &&
            installment.paidamount === 0) ||
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
        if (installment.paiddate && installment.paidamount) {
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
        if (payment.paiddate && payment.initialamount) {
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

    calculations_of_All_students_counsellorwise[counsellor] = {
      totalDueAmount: totalDueAmount,
      totalreceivedAmount: totalreceivedAmount,
    };
  });
  const calculations_of_All_students_branchwise = {};

  Object.keys(BranchwiseAllstudentsData).forEach((branch) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalDueAmount = 0;
    let totalreceivedAmount = 0;

    // Calculate the total amount for each branch and handle NaN values
    BranchwiseAllstudentsData[branch].forEach((student) => {
      student.installments.forEach((installment) => {
        if (
          (installment.duedate &&
            installment.dueamount &&
            installment.paidamount === 0) ||
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
        if (installment.paiddate && installment.paidamount) {
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
        if (payment.paiddate && payment.initialamount) {
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

    calculations_of_All_students_branchwise[branch] = {
      totalDueAmount: totalDueAmount,
      totalreceivedAmount: totalreceivedAmount,
    };
  });

  // sum of all due amounts of all students
  const calculateDueAmountForCurrentMonthAndOtherDates = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalDueAmount = 0;

    students.forEach((item) => {
      item.installments.forEach((installment) => {
        if (
          (installment.duedate &&
            installment.dueamount &&
            installment.paidamount === 0) ||
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
  // sum of all paid amounts of all students

  const calculatePaidAmountForCurrentMonthAndOtherDates = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
    const currentYear = currentDate.getFullYear();

    let totalreceivedAmount = 0;
    students.forEach((item) => {
      item.initialpayment.forEach((payment) => {
        if (payment.paiddate && payment.initialamount) {
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
        if (installment.paiddate && installment.paidamount) {
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
    AllbranchesDueAmount = calculateDueAmountForCurrentMonthAndOtherDates();
    AllbranchesreceivedAmount =
      calculatePaidAmountForCurrentMonthAndOtherDates();
  }

  // enrollments total  received amount and due amount

  const [enrollmentsTotalReceivedAmount, setEnrollmentsTotalReceivedAmount] =
    useState();
  const [enrollmentsTotalDueAmount, setEnrollmentsDueAmount] = useState();

  useEffect(() => {
    if (getstudentData) {
      // Calculate total received amount
      const totalReceivedAmount = getstudentData.reduce(
        (totalAmount, student) =>
          totalAmount + parseInt(student.totalpaidamount),
        0
      );

      // Calculate total due amount
      const totalDueAmount = getstudentData.reduce(
        (totalAmount, student) => totalAmount + parseInt(student.dueamount),
        0
      );

      setEnrollmentsTotalReceivedAmount(totalReceivedAmount);
      setEnrollmentsDueAmount(totalDueAmount);
    }
  }, [getstudentData]);

  //  enrollments total  received amount and due amount
  // end
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Function to handle branch click
  // const handleBranchClick = (branch) => {
  //   if (selectedBranch === branch) {
  //     setSelectedBranch("");
  //   } else {
  //     setSelectedBranch(branch);
  //   }
  // };
  const AdminDashboard = () => {
    return (
      <div className="container main-dashboard">
        <div className="contianer Dashboard">
          <div className="row ">
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  fee: false,
                  feefollowup: false,
                  users: false,
                  enrollments: !prev.enrollments,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Total Enrollments</p>
              </Card>
            </div>
            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  enrollments: false,
                  fee: !prev.fee,
                  feefollowup: false,
                  users: false,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Fee Details</p>
              </Card>
            </div>
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
            >
              <Link to="/feedetails">
                <Card className="cardcolor">
                  <p className="text-center pt-3">Fee Followups</p>
                </Card>
              </Link>
            </div>

            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3 "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  enrollments: false,
                  fee: false,
                  feefollowup: false,
                  users: !prev.users,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Total Users</p>
              </Card>
            </div>
          </div>
        </div>

        {/* {This is 1st step and 2nd steps} */}

        {/* enrollments dashboard */}
        {Displaycards.enrollments && (
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Enrollment
                Details
              </h5>

              {/* for filter button */}
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className="btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
              {/* filter end  */}
            </div>
            {/* Enrollment cards Display */}
            <div className="row">
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div className="">
                  <h5 className="pt-4 text-center underline">
                    {" "}
                    <span className="fw-bold fs-5">Current Month</span> Branch
                    Wise Enrollment Data
                  </h5>

                  <div className="justify-content-around pt-2 ">
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
                            {/* {Object.entries(FilteredStudents_BranchWiseAndCounsellorWise).map(
                              ([branch, students]) => {
                                const enrollmentPercentage =
                                  (students.length / getstudentData.length) *
                                  100;
                                const totalCount = students.length;
                                return (
                                  <StyledTableRow key={`student-${branch}`}>
                                    <StyledTableCell
                                      className="Table-cell"
                                      onClick={() => handleBranchClick(branch)}
                                    >
                                      {branch}
                                      {selectedBranch === branch && (
                                        <span>
                                          {students.map((student) => (
                                            <StyledTableCell
                                              key={student.id}
                                              style={{ display: "block" }}
                                            >
                                              {student.enquirytakenby}
                                            </StyledTableCell>
                                          ))}
                                        </span>
                                      )}
                                    </StyledTableCell>

                                    <StyledTableCell className="Table-cell">
                                      {Number(
                                        parseFloat(totalCount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              }
                            )} */}
                            {Object.entries(
                              FilteredStudents_BranchWiseAndCounsellorWise
                            ).map(([branch, counselors]) => (
                              <li
                                key={branch}
                                onClick={() => handleBranchClick(branch)}
                              >
                                {branch}
                                {expandedBranch === branch && (
                                  <ul>
                                    {Object.entries(counselors).map(
                                      ([counselor, students]) => (
                                        <li
                                          key={counselor}
                                          onClick={() =>
                                            handleCounselorClick(counselor)
                                          }
                                        >
                                          {counselor} {students.length}

                                          <ul>
                                            {students.map((student) => (
                                              <li key={student.name}>
                                                {student.name}
                                              </li>
                                            ))}
                                          </ul>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Booking Amount Data
                    </h5>

                    <div className="justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(([branch, { totalAmount, percentage }]) => {
                                return (
                                  <StyledTableRow key={branch}>
                                    <StyledTableCell
                                      className="Table-cell"
                                      onClick={() => handleBranchClick(branch)}
                                    >
                                      {branch}
                                      {selectedBranch === branch && (
                                        <span>
                                          {getstudentData
                                            .filter(
                                              (student) =>
                                                student.branch === branch
                                            ) // Filter students by the selected branch
                                            .map((student) => (
                                              <StyledTableCell
                                                key={student.id}
                                                style={{ display: "block" }}
                                              >
                                                {student.name} -{" "}
                                                {student.finaltotal}
                                              </StyledTableCell>
                                            ))}
                                        </span>
                                      )}
                                    </StyledTableCell>
                                    <StyledTableCell className="Table-cell">
                                      {Number(
                                        parseFloat(totalAmount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Enrollment Fee Received Data
                    </h5>

                    <div className="justify-content-around pt-2">
                      <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Branch
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Received Amount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(
                                ([
                                  branch,
                                  { percentage, totalReceivedAmount },
                                ]) => {
                                  return (
                                    <StyledTableRow key={branch}>
                                      <StyledTableCell
                                        className="Table-cell"
                                        onClick={() =>
                                          handleBranchClick(branch)
                                        }
                                      >
                                        {branch}
                                        {selectedBranch === branch && (
                                          <span>
                                            {getstudentData
                                              .filter(
                                                (student) =>
                                                  student.branch === branch
                                              ) // Filter students by the selected branch
                                              .map((student) => (
                                                <StyledTableCell
                                                  key={student.id}
                                                  style={{ display: "block" }}
                                                >
                                                  {student.name} -{" "}
                                                  {student.totalpaidamount}
                                                </StyledTableCell>
                                              ))}
                                          </span>
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell className="Table-cell">
                                        {Number(
                                          parseFloat(
                                            totalReceivedAmount
                                          ).toFixed(2)
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
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Enrollment Fee Yet To Receive Data
                    </h5>

                    <div className="justify-content-around pt-2">
                      <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Branch
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Fee Yet To Receive Amount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(
                                ([branch, { percentage, totalDueAmount }]) => {
                                  return (
                                    <StyledTableRow key={branch}>
                                      <StyledTableCell
                                        className="Table-cell w-50 studentdata-animation"
                                        onClick={() =>
                                          handleBranchClick(branch)
                                        }
                                      >
                                        {branch}
                                        {selectedBranch === branch && (
                                          <span>
                                            {getstudentData
                                              .filter(
                                                (student) =>
                                                  student.branch === branch
                                              ) // Filter students by the selected branch
                                              .map((student) => (
                                                <StyledTableCell
                                                  key={student.id}
                                                  style={{ display: "block" }}
                                                >
                                                  {student.name} -{" "}
                                                  {student.totalpaidamount}
                                                </StyledTableCell>
                                              ))}
                                          </span>
                                        )}
                                      </StyledTableCell>
                                      <StyledTableCell className="Table-cell d-flex justify-content-center">
                                        {Number(
                                          parseFloat(totalDueAmount).toFixed(2)
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
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {Displaycards.fee && (
          <div className=" ">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Fee Details
              </h5>
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className=" btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* Fee Cards Display */}
            <div className="row  ">
              <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: !prev.feerecevied,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: !prev.feeyettorecevied,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
            {/* Fee Cards Display End */}

            {/* Fee Details Table Display */}
            <div>
              {DisplayTable.feerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      {" "}
                      <span className="fw-bold fs-5"> Current Month</span>{" "}
                      Branch Wise Recevied Amount Data
                    </h5>

                    <div className="  justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_All_students_branchwise
                              ).map(
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
                                          parseFloat(
                                            totalreceivedAmount
                                          ).toFixed(2)
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
                    </div>
                  </div>
                </div>
              )}

              {DisplayTable.feeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 underline text-center">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Fee Yet to Recevied Amount Data
                    </h5>

                    <div className="  justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_All_students_branchwise
                              ).map(
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
                                  );
                                }
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {Displaycards.users && (
          <div className=" ">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className=" text-center flex-grow-1 pt-4 underline ms-sm-5 ">
                  <span className="fw-bold fs-5">Current Month</span> Total
                  Users Details
                </h5>
                <div className="">
                  <Button
                    id="demo-positioned-button"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <button
                      className="btn-filter btn-color"
                      title="Filter"
                      style={{ textTransform: "capitalize" }}
                    >
                      <FilterAltIcon />
                    </button>
                  </Button>
                  <Menu
                    className=""
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
                      <button className="btn btn-color" onClick={filterreset}>
                        {" "}
                        Clear
                      </button>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            {/* User Card Display */}
            <div className="row  ">
              <div className="col-12 col-md-4 col-xl-4 col-lg-4"></div>
              <div className="col-12 col-md-3 col-xl-3 col-lg-3 mb-2">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: !prev.branchusers,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-12 col-md-3 col-xl-3 col-lg-3 mb-2"></div>
            </div>
            {/* User Card Display End */}

            {/* user Table Display */}
            {DisplayTable.branchusers && (
              <div className="justify-content-around ">
                <div>
                  <h5 className="pt-4 text-center underline">
                    <span className="fw-bold fs-5">Current Month</span> Branch
                    Wise User Data
                  </h5>

                  <div className="pt-2">
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
                            {Object.entries(BranchwiseUsersData).map(
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
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </div>
                </div>
              </div>
            )}
            {/* User Table Display End */}
          </div>
        )}
      </div>
    );
  };
  const BranchManagerDashboard = () => {
    return (
      <div className="container main-dashboard">
        <div className="contianer Dashboard">
          <div className="row ">
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  fee: false,
                  feefollowup: false,
                  users: false,
                  enrollments: !prev.enrollments,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Total Enrollments</p>
              </Card>
            </div>
            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  enrollments: false,
                  fee: !prev.fee,
                  feefollowup: false,
                  users: false,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Fee Details</p>
              </Card>
            </div>
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
            >
              <Link to="/feedetails">
                <Card className="cardcolor">
                  <p className="text-center pt-3">Fee Followups</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* {This is 1st step and 2nd steps} */}

        {/* enrollments dashboard */}
        {Displaycards.enrollments && (
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Enrollment
                Details
              </h5>

              {/* for filter button */}
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className="btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
              {/* filter end  */}
            </div>
            {/* Enrollment cards Display */}
            <div className="row">
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div className="">
                  <div className="justify-content-around pt-2 ">
                    <div className="justify-content-around">
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5"> Current Month</span>{" "}
                        Consellor Wise Enrollment Details
                      </h5>

                      <div className="pt-2">
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
                                {Object.entries(
                                  CounsellorwiseFilteredStudentsData
                                ).map(([counsellor, students]) => {
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
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Paper>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <div className="justify-content-around pt-2">
                      <div>
                        <h5 className="pt-4 text-center underline">
                          <span className="fw-bold fs-5"> Current Month</span>{" "}
                          Counsellor Wise Booking Amount Data
                        </h5>

                        <div className="pt-2">
                          <Paper>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell className="table-cell-heading">
                                      Cousellor Name
                                    </StyledTableCell>
                                    <StyledTableCell className="table-cell-heading">
                                      Booking Amount
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.entries(
                                    calculations_of_filtered_students_counsellorwise
                                  ).map(
                                    ([
                                      counsellor,
                                      { totalAmount, percentage },
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
                                              parseFloat(totalAmount).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <div className="justify-content-around pt-2">
                      <div>
                        <h5 className="pt-4 text-center underline">
                          <span className="fw-bold fs-5"> Current Month</span>{" "}
                          Counsellor Wise Enrollment Fee Received Data
                        </h5>

                        <div className="pt-2">
                          <Paper>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell className="table-cell-heading">
                                      Cousellor Name
                                    </StyledTableCell>
                                    <StyledTableCell className="table-cell-heading">
                                      Received Amount
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.entries(
                                    calculations_of_filtered_students_counsellorwise
                                  ).map(
                                    ([
                                      counsellor,
                                      { totalReceived, percentage },
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
                                              parseFloat(totalReceived).toFixed(
                                                2
                                              )
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <div className="justify-content-around pt-2">
                      <div>
                        <h5 className="pt-4 text-center underline">
                          <span className="fw-bold fs-5"> Current Month</span>{" "}
                          Counsellor Wise Enrollment Fee Yet To Receive Data
                        </h5>

                        <div className="pt-2">
                          <Paper>
                            <TableContainer>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell className="table-cell-heading">
                                      Cousellor Name
                                    </StyledTableCell>
                                    <StyledTableCell className="table-cell-heading">
                                      Fee Yet To Receive Amount
                                    </StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.entries(
                                    calculations_of_filtered_students_counsellorwise
                                  ).map(
                                    ([
                                      counsellor,
                                      { totalDueAmount, percentage },
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
                                              parseFloat(
                                                totalDueAmount
                                              ).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {Displaycards.fee && (
          <div className=" ">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Fee Details
              </h5>
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className=" btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* Fee Cards Display */}
            <div className="row  ">
              <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: !prev.feerecevied,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: !prev.feeyettorecevied,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
            {/* Fee Cards Display End */}

            {/* Fee Details Table Display */}
            <div>
              {DisplayTable.feerecevied && (
                <div>
                  <div className="">
                    <div className="  justify-content-around pt-2">
                      <div>
                        <div>
                          <h5 className="pt-4 underline text-center">
                            <span className="fw-bold fs-5"> Current Month</span>{" "}
                            Counsellor Wise Recevied Amount Data
                          </h5>

                          <div className="pt-2">
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
                                    {Object.entries(
                                      calculations_of_All_students_counsellorwise
                                    ).map(
                                      ([
                                        counsellor,
                                        { totalDueAmount, totalreceivedAmount },
                                      ]) => {
                                        const Receivedpercentage =
                                          (totalreceivedAmount /
                                            AllbranchesreceivedAmount) *
                                          100;
                                        const Pendingpercentage =
                                          (totalDueAmount /
                                            AllbranchesDueAmount) *
                                          100;
                                        return (
                                          <StyledTableRow key={counsellor}>
                                            <StyledTableCell className="Table-cell">
                                              {counsellor}
                                            </StyledTableCell>
                                            <StyledTableCell className="Table-cell">
                                              {Number(
                                                parseFloat(
                                                  totalreceivedAmount
                                                ).toFixed(2)
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {DisplayTable.feeyettorecevied && (
                <div>
                  <div className="">
                    <div className="  justify-content-around pt-2">
                      <div>
                        <h5 className="text-center pt-4 underline">
                          <sapn className="fw-bold fs-5"> Current Month</sapn>{" "}
                          Counsellor Wise Fee Yet To Recevied Data
                        </h5>

                        <div className="pt-2">
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
                                  {Object.entries(
                                    calculations_of_All_students_counsellorwise
                                  ).map(
                                    ([
                                      counsellor,
                                      { totalDueAmount, totalreceivedAmount },
                                    ]) => {
                                      const Receivedpercentage =
                                        (totalreceivedAmount /
                                          AllbranchesreceivedAmount) *
                                        100;
                                      const Pendingpercentage =
                                        (totalDueAmount /
                                          AllbranchesDueAmount) *
                                        100;
                                      return (
                                        <StyledTableRow key={counsellor}>
                                          <StyledTableCell className="Table-cell">
                                            {counsellor}
                                          </StyledTableCell>
                                          <StyledTableCell className="Table-cell">
                                            {Number(
                                              parseFloat(
                                                totalDueAmount
                                              ).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  const CounsellorDashboard = () => {
    return (
      <div className="container main-dashboard">
        <div className="contianer Dashboard">
          <div className="row ">
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  fee: false,
                  feefollowup: false,
                  users: false,
                  enrollments: !prev.enrollments,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Total Enrollments</p>
              </Card>
            </div>
            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  enrollments: false,
                  fee: !prev.fee,
                  feefollowup: false,
                  users: false,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Fee Details</p>
              </Card>
            </div>
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
            >
              <Link to="/feedetails">
                <Card className="cardcolor">
                  <p className="text-center pt-3">Fee Followups</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* {This is 1st step and 2nd steps} */}

        {/* enrollments dashboard */}
        {Displaycards.enrollments && (
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Enrollment
                Details
              </h5>

              {/* for filter button */}
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className="btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
              {/* filter end  */}
            </div>
            {/* Enrollment cards Display */}
            <div className="row">
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div className="">
                  <div className="justify-content-around pt-2 ">
                    {role !== "admin" &&
                      role !== "counsellor" &&
                      role !== "regional manager" && (
                        <div className="justify-content-around">
                          <h5 className="pt-4 text-center underline">
                            <span className="fw-bold fs-5"> Current Month</span>{" "}
                            Consellor Wise Enrollment Details
                          </h5>

                          <div className="pt-2">
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
                                      Object.entries(
                                        CounsellorwiseFilteredStudentsData
                                      ).map(([counsellor, students]) => {
                                        const enrollmentPercentage =
                                          (students.length /
                                            getstudentData.length) *
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
                                                parseFloat(totalCount).toFixed(
                                                  2
                                                )
                                              ).toLocaleString("en-IN")}
                                            </StyledTableCell>
                                          </StyledTableRow>
                                        );
                                      })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Paper>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    {role !== "counsellor" && role !== "branch manager" && (
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5"> Current Month </span>
                        Branch Wise Booking Amount Data
                      </h5>
                    )}

                    <div className="justify-content-around pt-2">
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
                                {Object.entries(
                                  calculations_of_filtered_students_branchwise
                                ).map(
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
                          <h5 className="pt-4 text-center underline">
                            <span className="fw-bold fs-5"> Current Month</span>{" "}
                            Counsellor Wise Booking Amount Data
                          </h5>
                        )}
                        <div className="pt-2">
                          {role === "branch manager" && (
                            <Paper>
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell className="table-cell-heading">
                                        Cousellor Name
                                      </StyledTableCell>
                                      <StyledTableCell className="table-cell-heading">
                                        Booking Amount
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {role === "branch manager" &&
                                      Object.entries(
                                        calculations_of_filtered_students_counsellorwise
                                      ).map(
                                        ([
                                          counsellor,
                                          { totalAmount, percentage },
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
                                                  parseFloat(
                                                    totalAmount
                                                  ).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    {role !== "counsellor" && role !== "branch manager" && (
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5"> Current Month </span>
                        Branch Wise Enrollment Fee Received Data
                      </h5>
                    )}

                    <div className="justify-content-around pt-2">
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
                                    Received Amount
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(
                                  calculations_of_filtered_students_branchwise
                                ).map(
                                  ([
                                    branch,
                                    { percentage, totalReceivedAmount },
                                  ]) => {
                                    return (
                                      <StyledTableRow key={branch}>
                                        <StyledTableCell className="Table-cell">
                                          {branch}
                                        </StyledTableCell>
                                        <StyledTableCell className="Table-cell">
                                          {Number(
                                            parseFloat(
                                              totalReceivedAmount
                                            ).toFixed(2)
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
                      <div>
                        {role === "branch manager" && (
                          <h5 className="pt-4 text-center underline">
                            <span className="fw-bold fs-5"> Current Month</span>{" "}
                            Counsellor Wise Enrollment Fee Received Data
                          </h5>
                        )}

                        <div className="pt-2">
                          {role === "branch manager" && (
                            <Paper>
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell className="table-cell-heading">
                                        Cousellor Name
                                      </StyledTableCell>
                                      <StyledTableCell className="table-cell-heading">
                                        Received Amount
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {role === "branch manager" &&
                                      Object.entries(
                                        calculations_of_filtered_students_counsellorwise
                                      ).map(
                                        ([
                                          counsellor,
                                          { totalReceived, percentage },
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
                                                  parseFloat(
                                                    totalReceived
                                                  ).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    {role !== "counsellor" && role !== "branch manager" && (
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5"> Current Month </span>
                        Branch Wise Enrollment Fee Yet To Receive Data
                      </h5>
                    )}

                    <div className="justify-content-around pt-2">
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
                                    Fee Yet To Receive Amount
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {Object.entries(
                                  calculations_of_filtered_students_branchwise
                                ).map(
                                  ([
                                    branch,
                                    { percentage, totalDueAmount },
                                  ]) => {
                                    return (
                                      <StyledTableRow key={branch}>
                                        <StyledTableCell className="Table-cell">
                                          {branch}
                                        </StyledTableCell>
                                        <StyledTableCell className="Table-cell">
                                          {Number(
                                            parseFloat(totalDueAmount).toFixed(
                                              2
                                            )
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
                      <div>
                        {role === "branch manager" && (
                          <h5 className="pt-4 text-center underline">
                            <span className="fw-bold fs-5"> Current Month</span>{" "}
                            Counsellor Wise Enrollment Fee Yet To Receive Data
                          </h5>
                        )}
                        <div className="pt-2">
                          {role === "branch manager" && (
                            <Paper>
                              <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell className="table-cell-heading">
                                        Cousellor Name
                                      </StyledTableCell>
                                      <StyledTableCell className="table-cell-heading">
                                        Fee Yet To Receive Amount
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {role === "branch manager" &&
                                      Object.entries(
                                        calculations_of_filtered_students_counsellorwise
                                      ).map(
                                        ([
                                          counsellor,
                                          { totalDueAmount, percentage },
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
                                                  parseFloat(
                                                    totalDueAmount
                                                  ).toFixed(2)
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {Displaycards.fee && (
          <div className=" ">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Fee Details
              </h5>
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className=" btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* Fee Cards Display */}
            <div className="row  ">
              <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: !prev.feerecevied,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: !prev.feeyettorecevied,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
            {/* Fee Cards Display End */}

            {/* Fee Details Table Display */}
            <div>
              {DisplayTable.feerecevied && (
                <div>
                  <div className="">
                    {role !== "counsellor" && role !== "branch manager" && (
                      <h5 className="pt-4 text-center underline">
                        {" "}
                        <span className="fw-bold fs-5">
                          {" "}
                          Current Month
                        </span>{" "}
                        Branch Wise Recevied Amount Data
                      </h5>
                    )}

                    <div className="  justify-content-around pt-2">
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
                                {Object.entries(
                                  calculations_of_All_students_branchwise
                                ).map(
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
                                            parseFloat(
                                              totalreceivedAmount
                                            ).toFixed(2)
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
                      <div>
                        {role === "branch manager" && (
                          <div>
                            <h5 className="pt-4 underline text-center">
                              <span className="fw-bold fs-5">
                                {" "}
                                Current Month
                              </span>{" "}
                              Counsellor Wise Recevied Amount Data
                            </h5>

                            <div className="pt-2">
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
                                          calculations_of_All_students_counsellorwise
                                        ).map(
                                          ([
                                            counsellor,
                                            {
                                              totalDueAmount,
                                              totalreceivedAmount,
                                            },
                                          ]) => {
                                            const Receivedpercentage =
                                              (totalreceivedAmount /
                                                AllbranchesreceivedAmount) *
                                              100;
                                            const Pendingpercentage =
                                              (totalDueAmount /
                                                AllbranchesDueAmount) *
                                              100;
                                            return (
                                              <StyledTableRow key={counsellor}>
                                                <StyledTableCell className="Table-cell">
                                                  {counsellor}
                                                </StyledTableCell>
                                                <StyledTableCell className="Table-cell">
                                                  {Number(
                                                    parseFloat(
                                                      totalreceivedAmount
                                                    ).toFixed(2)
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
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {DisplayTable.feeyettorecevied && (
                <div>
                  <div className="">
                    {role !== "counsellor" && role !== "branch manager" && (
                      <h5 className="pt-4 underline text-center">
                        <span className="fw-bold fs-5"> Current Month </span>
                        Branch Wise Fee Yet to Recevied Amount Data
                      </h5>
                    )}

                    <div className="  justify-content-around pt-2">
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
                                  Object.entries(
                                    calculations_of_All_students_branchwise
                                  ).map(
                                    ([
                                      branch,
                                      { totalDueAmount, totalreceivedAmount },
                                    ]) => {
                                      const Receivedpercentage =
                                        (totalreceivedAmount /
                                          AllbranchesreceivedAmount) *
                                        100;
                                      const Pendingpercentage =
                                        (totalDueAmount /
                                          AllbranchesDueAmount) *
                                        100;
                                      return (
                                        <StyledTableRow key={branch}>
                                          <StyledTableCell className="Table-cell">
                                            {branch}
                                          </StyledTableCell>
                                          <StyledTableCell className="Table-cell">
                                            {Number(
                                              parseFloat(
                                                totalDueAmount
                                              ).toFixed(2)
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
                      {role === "branch manager" && (
                        <div>
                          <h5 className="text-center pt-4 underline">
                            <sapn className="fw-bold fs-5"> Current Month</sapn>{" "}
                            Counsellor Wise Fee Yet To Recevied Data
                          </h5>

                          <div className="pt-2">
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
                                        calculations_of_All_students_counsellorwise
                                      ).map(
                                        ([
                                          counsellor,
                                          {
                                            totalDueAmount,
                                            totalreceivedAmount,
                                          },
                                        ]) => {
                                          const Receivedpercentage =
                                            (totalreceivedAmount /
                                              AllbranchesreceivedAmount) *
                                            100;
                                          const Pendingpercentage =
                                            (totalDueAmount /
                                              AllbranchesDueAmount) *
                                            100;
                                          return (
                                            <StyledTableRow key={counsellor}>
                                              <StyledTableCell className="Table-cell">
                                                {counsellor}
                                              </StyledTableCell>
                                              <StyledTableCell className="Table-cell">
                                                {Number(
                                                  parseFloat(
                                                    totalDueAmount
                                                  ).toFixed(2)
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
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  const RegionalManagerDashboard = () => {
    return (
      <div className="container main-dashboard">
        <div className="contianer Dashboard">
          <div className="row ">
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  fee: false,
                  feefollowup: false,
                  users: false,
                  enrollments: !prev.enrollments,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Total Enrollments</p>
              </Card>
            </div>
            <div
              className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
              style={{ cursor: "pointer" }}
              onClick={(e) =>
                setDisplaycards((prev) => ({
                  enrollments: false,
                  fee: !prev.fee,
                  feefollowup: false,
                  users: false,
                }))
              }
            >
              <Card className="cardcolor">
                <p className="pt-3">Fee Details</p>
              </Card>
            </div>
            <div
              className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
              style={{ cursor: "pointer" }}
            >
              <Link to="/feedetails">
                <Card className="cardcolor">
                  <p className="text-center pt-3">Fee Followups</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>

        {/* {This is 1st step and 2nd steps} */}

        {/* enrollments dashboard */}
        {Displaycards.enrollments && (
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Enrollment
                Details
              </h5>

              {/* for filter button */}
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className="btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
              {/* filter end  */}
            </div>
            {/* Enrollment cards Display */}
            <div className="row">
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}{" "}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div className="">
                  <h5 className="pt-4 text-center underline">
                    {" "}
                    <span className="fw-bold fs-5">Current Month</span> Branch
                    Wise Enrollment Data
                  </h5>

                  <div className="justify-content-around pt-2 ">
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
                            {Object.entries(BranchwiseFilteredStudentsData).map(
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
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Booking Amount Data
                    </h5>

                    <div className="justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(([branch, { totalAmount, percentage }]) => {
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
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Enrollment Fee Received Data
                    </h5>

                    <div className="justify-content-around pt-2">
                      <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Branch
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Received Amount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(
                                ([
                                  branch,
                                  { percentage, totalReceivedAmount },
                                ]) => {
                                  return (
                                    <StyledTableRow key={branch}>
                                      <StyledTableCell className="Table-cell">
                                        {branch}
                                      </StyledTableCell>
                                      <StyledTableCell className="Table-cell">
                                        {Number(
                                          parseFloat(
                                            totalReceivedAmount
                                          ).toFixed(2)
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
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Enrollment Fee Yet To Receive Data
                    </h5>

                    <div className="justify-content-around pt-2">
                      <Paper>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <StyledTableCell className="table-cell-heading">
                                  Branch
                                </StyledTableCell>
                                <StyledTableCell className="table-cell-heading">
                                  Fee Yet To Receive Amount
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(
                                calculations_of_filtered_students_branchwise
                              ).map(
                                ([branch, { percentage, totalDueAmount }]) => {
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
                                  );
                                }
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {Displaycards.fee && (
          <div className=" ">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                <span className="fw-bold fs-5"> Current Month</span> Fee Details
              </h5>
              <div className="">
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <button
                    className=" btn-filter btn-color"
                    title="Filter"
                    style={{ textTransform: "capitalize" }}
                  >
                    <FilterAltIcon />
                  </button>
                </Button>
                <Menu
                  className=""
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
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            {/* Fee Cards Display */}
            <div className="row  ">
              <div className="col-12 col-md-3 col-xl-3 col-lg-3"></div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                <Card
                  onClick={(e) =>
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: !prev.feerecevied,
                      feeyettorecevied: false,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: !prev.feeyettorecevied,
                      branchusers: false,
                    }))
                  }
                  className="cardcolor"
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
            {/* Fee Cards Display End */}

            {/* Fee Details Table Display */}
            <div>
              {DisplayTable.feerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      {" "}
                      <span className="fw-bold fs-5"> Current Month</span>{" "}
                      Branch Wise Recevied Amount Data
                    </h5>

                    <div className="  justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_All_students_branchwise
                              ).map(
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
                                          parseFloat(
                                            totalreceivedAmount
                                          ).toFixed(2)
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
                    </div>
                  </div>
                </div>
              )}

              {DisplayTable.feeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 underline text-center">
                      <span className="fw-bold fs-5"> Current Month </span>
                      Branch Wise Fee Yet to Recevied Amount Data
                    </h5>

                    <div className="  justify-content-around pt-2">
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
                              {Object.entries(
                                calculations_of_All_students_branchwise
                              ).map(
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
                                  );
                                }
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {role === "admin" && AdminDashboard()}
      {role === "branch manager" && BranchManagerDashboard()}

      {role === "counsellor" && CounsellorDashboard()}
      {role === "regional manager" && RegionalManagerDashboard()}
    </div>
  );
};

export default Dashboard;
