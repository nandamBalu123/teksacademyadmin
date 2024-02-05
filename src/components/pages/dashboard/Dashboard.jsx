import React, { useState } from "react";
import { Box, usef } from "@mui/material";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import Header from "../../common/Header/Header";
import TextField from "@mui/material/TextField";
import axios from "axios";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Diversity1Rounded } from "@mui/icons-material";
import { style } from "@mui/system/Stack/createStack";
import { color } from "framer-motion";

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
  let userBranch
  if (user) {
    userBranch = user.branch
  }
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
  const [dummyFilterCriteria, setDummyFilterCriteria] = useState(
    {
      fromdate: "",
      todate: "",
      monthdataCondition: true,
    }
  )
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDummyFilterCriteria({
      ...dummyFilterCriteria,
      monthdataCondition: false,
      [name]: value,
    });
  };
  const handleSave = (e) => {


    setFilterCriteria(dummyFilterCriteria);

  };

  //// reset filters
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",
      todate: "",
      monthdataCondition: true,
    });
    setDummyFilterCriteria({
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

  const [dummyfilterDeuAndReceived, setdummyfilterDeuAndReceived] = useState({
    fromdate: "",
    todate: "",
    monthdataCondition: true,
  })
  const handleDeuAndReceivedInputChange = (e) => {
    const { name, value } = e.target;

    setdummyfilterDeuAndReceived({
      ...dummyfilterDeuAndReceived,
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
    setdummyfilterDeuAndReceived({
      fromdate: "",
      todate: "",
      monthdataCondition: true,
    })
  };

  const handleDeuAndReceivedSave = (e) => {
    setfilterDeuAndReceived(dummyfilterDeuAndReceived);
  }
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


  // BranchwiseUsersData will give branch wise  user data
  const BranchwiseUsersData = groupDataAndCalculatePercentage(
    getUsersData,
    "branch"
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
  let [
    AllUsers_BranchWise,
    setAllUsers_BranchWise,
  ] = useState();
  let [
    FilteredStudents_BranchWiseAndCounsellorWise,
    setFilteredStudents_BranchWiseAndCounsellorWise,
  ] = useState();
  let [
    AllStudents_BranchWiseAndCounsellorWise,
    setAllStudents_BranchWiseAndCounsellorWise,
  ] = useState();
  let [
    calculations_of_filtered_students_branchwise_counsellorwise,
    setcalculations_of_filtered_students_branchwise_counsellorwise,
  ] = useState();
  let [
    calculations_of_all_students_branchwise_counsellorwise,
    setcalculations_of_all_students_branchwise_counsellorwise,
  ] = useState();
  useEffect(() => {
    console.log(
      "FilteredStudents_BranchWiseAndCounsellorWise", FilteredStudents_BranchWiseAndCounsellorWise


    );
    console.log(
      "AllStudents_BranchWiseAndCounsellorWise", AllStudents_BranchWiseAndCounsellorWise


    );
    console.log(
      "calculations_of_filtered_students_branchwise_counsellorwise", calculations_of_filtered_students_branchwise_counsellorwise


    );
    console.log(
      "calculations_of_all_students_branchwise_counsellorwise", calculations_of_all_students_branchwise_counsellorwise


    );
    console.log(
      "AllUsers_BranchWise", AllUsers_BranchWise


    );
  })
  useEffect(() => {
    if (getUsersData) {
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
      const AllUsers_BranchWise
        = groupByCustomFields(
          getUsersData,
          "branch",
          "fullname"
        );
      setAllUsers_BranchWise(
        AllUsers_BranchWise
      );
    }

  }, [getUsersData])
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

      setFilteredStudents_BranchWiseAndCounsellorWise(
        FilteredStudents_BranchWiseAndCounsellorWise
      );
      const AllStudents_BranchWiseAndCounsellorWise = groupByCustomFields(
        students,
        "branch",
        "enquirytakenby"
      );

      setAllStudents_BranchWiseAndCounsellorWise(
        AllStudents_BranchWiseAndCounsellorWise
      );
      const calculations_of_filtered_students_branchwise_counsellorwise = {};
      Object.keys(FilteredStudents_BranchWiseAndCounsellorWise).forEach(
        (branch) => {
          let branchTotalAmount = 0;
          let branchTotalReceivedAmount = 0;
          let branchTotalDueAmount = 0;
          let branchTotalStudents = 0; // Add a counter for total students in the branch

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
                students: [], // Initialize an empty array for students
              };

              FilteredStudents_BranchWiseAndCounsellorWise[branch][
                counsellor
              ].forEach((student) => {
                const studentName = student.name;
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
                counsellorWiseTotal[counsellor].students.push({
                  name: studentName,
                  course: student.courses,
                  admissionDate: student.admissiondate,
                  totalAmount: totalamount,
                  receivedamount: receivedamount,
                  dueamount: dueamount,
                });

                // Increment the total students counter
                branchTotalStudents += 1;
              });
            });
          }

          calculations_of_filtered_students_branchwise_counsellorwise[branch] = {
            totalAmount: branchTotalAmount,
            totalReceivedAmount: branchTotalReceivedAmount,
            totalDueAmount: branchTotalDueAmount,
            totalStudents: branchTotalStudents, // Add total students to the result
            counsellorWiseTotal,
          };
        }
      );



      setcalculations_of_filtered_students_branchwise_counsellorwise(
        calculations_of_filtered_students_branchwise_counsellorwise
      );

      const calculations_of_all_students_branchwise_counsellorwise = {};

      Object.keys(AllStudents_BranchWiseAndCounsellorWise).forEach((branch) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Month is 0-based, so add 1 to get the current month
        const currentYear = currentDate.getFullYear();

        let branchTotalReceivedAmount = 0;
        let branchTotalDueAmount = 0;
        let branchTotalStudents = 0;
        // Counsellor-wise calculations
        const counsellorWiseTotal = {};

        if (AllStudents_BranchWiseAndCounsellorWise[branch]) {
          Object.keys(AllStudents_BranchWiseAndCounsellorWise[branch]).forEach(
            (counsellor) => {
              counsellorWiseTotal[counsellor] = {
                totalReceivedAmount: 0,
                totalDueAmount: 0,
                students: [], // Initialize an empty array for students
              };

              AllStudents_BranchWiseAndCounsellorWise[branch][counsellor].forEach(
                (student) => {
                  const studentName = student.name; branchTotalStudents += 1;
                  student.installments.forEach((installment) => {
                    let dueamount = 0
                    let receivedamount = 0
                    if (
                      (installment.duedate &&
                        !isNaN(installment.dueamount) &&
                        installment.paidamount === 0) ||
                      installment.paidamount === ""
                    ) {
                      if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
                        if (
                          installment.duedate >= filterDeuAndReceived.fromdate &&
                          installment.duedate <= filterDeuAndReceived.todate
                        ) {
                          dueamount = parseFloat(installment.dueamount);
                          branchTotalDueAmount += dueamount;
                          counsellorWiseTotal[counsellor].totalDueAmount += dueamount;
                        }
                      } else {
                        const dueDate = new Date(installment.duedate);
                        const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
                        const dueYear = dueDate.getFullYear();

                        if (dueMonth === currentMonth && dueYear === currentYear) {
                          dueamount = parseFloat(installment.dueamount);
                          branchTotalDueAmount += dueamount;
                          counsellorWiseTotal[counsellor].totalDueAmount += dueamount;
                        }
                      }
                    }



                    if (installment.paiddate && !isNaN(installment.paidamount)) {
                      if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
                        if (
                          installment.paiddate >= filterDeuAndReceived.fromdate &&
                          installment.paiddate <= filterDeuAndReceived.todate
                        ) {
                          receivedamount = parseFloat(installment.paidamount);
                          branchTotalReceivedAmount += receivedamount;
                          counsellorWiseTotal[counsellor].totalReceivedAmount +=
                            receivedamount;
                        }
                      } else {
                        const dueDate = new Date(installment.paiddate);
                        const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
                        const dueYear = dueDate.getFullYear();

                        if (dueMonth === currentMonth && dueYear === currentYear) {
                          receivedamount = parseFloat(installment.paidamount);
                          branchTotalReceivedAmount += receivedamount;
                          counsellorWiseTotal[counsellor].totalReceivedAmount +=
                            receivedamount;
                        }
                      }
                    }




                    counsellorWiseTotal[counsellor].students.push({
                      name: studentName,
                      course: student.courses,
                      admissionDate: student.admissiondate,
                      receivedamount: receivedamount,
                      dueamount: dueamount,
                    });
                  });
                  student.initialpayment.forEach((payment) => {
                    // let dueamount=0
                    let receivedamount = 0

                    if (payment.paiddate && !isNaN(payment.initialamount)) {
                      if (filterDeuAndReceived.fromdate || filterDeuAndReceived.todate) {
                        if (
                          payment.paiddate >= filterDeuAndReceived.fromdate &&
                          payment.paiddate <= filterDeuAndReceived.todate
                        ) {

                          receivedamount = parseFloat(payment.initialamount);
                          branchTotalReceivedAmount += receivedamount;
                          counsellorWiseTotal[counsellor].totalReceivedAmount +=
                            receivedamount;
                        }
                      } else {
                        const dueDate = new Date(payment.paiddate);
                        const dueMonth = dueDate.getMonth() + 1; // Month is 0-based, so add 1 to get the month
                        const dueYear = dueDate.getFullYear();

                        if (dueMonth === currentMonth && dueYear === currentYear) {

                          receivedamount = parseFloat(payment.initialamount);
                          branchTotalReceivedAmount += receivedamount;
                          counsellorWiseTotal[counsellor].totalReceivedAmount +=
                            receivedamount;
                        }
                      }
                    }


                    counsellorWiseTotal[counsellor].students.push({
                      name: studentName,
                      course: student.courses,
                      admissionDate: student.admissiondate,
                      receivedamount: receivedamount,

                    });
                  });
                }
              );
            }
          );
        }

        calculations_of_all_students_branchwise_counsellorwise[branch] = {
          totalReceivedAmount: branchTotalReceivedAmount,
          totalDueAmount: branchTotalDueAmount,
          totalStudents: branchTotalStudents, // Include total students in the result
          counsellorWiseTotal,
        };
      });




      setcalculations_of_all_students_branchwise_counsellorwise(
        calculations_of_all_students_branchwise_counsellorwise
      );
    }
  }, [students, getstudentData, filterCriteria, filterDeuAndReceived]);
  // here we doing are doing calculations of branchwise filtered students

  //  start




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
      // const totalReceivedAmount = getstudentData.reduce(
      //   (totalAmount, student) =>
      //     totalAmount + parseInt(student.totalpaidamount),
      //   0
      // );
      const totalReceivedAmount = getstudentData.reduce(
        (totalAmount, student) => {
          const paidAmount = parseInt(student.totalpaidamount);
          // Check if paidAmount is a valid number (not NaN or null)
          if (!isNaN(paidAmount) && paidAmount !== null) {
            return totalAmount + paidAmount;
          }
          return totalAmount; // Skip invalid values
        },
        0
      );
      // Calculate total due amount
      // const totalDueAmount = getstudentData.reduce(
      //   (totalAmount, student) => totalAmount + parseInt(student.dueamount),
      //   0
      // );
      const totalDueAmount = getstudentData.reduce(
        (totalAmount, student) => {
          const dueAmount = parseInt(student.dueamount);
          // Check if dueAmount is a valid number (not NaN or null)
          if (!isNaN(dueAmount) && dueAmount !== null) {
            return totalAmount + dueAmount;
          }
          return totalAmount; // Skip invalid values
        },
        0
      );
      setEnrollmentsTotalReceivedAmount(totalReceivedAmount);
      setEnrollmentsDueAmount(totalDueAmount);
    }
  }, [getstudentData]);

  //  enrollments total  received amount and due amount
  // end

  // };
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);

  const handleBranchClick = (branch) => {

    setSelectedBranch(selectedBranch === branch ? null : branch);
    // setSelectedCounsellor(null); // Reset selected counsellor when a branch is clicked
  };
  const handleCounsellorClick = (counsellor) => {

    setSelectedCounsellor(selectedCounsellor === counsellor ? null : counsellor);
  };

  useEffect(() => {
    console.log("selectedBranch", selectedBranch, "selectedCounsellor", selectedCounsellor)
  }, [selectedCounsellor])
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
                <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.todate && <>Current Month</>}  </span> Enrollment
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

                      <CloseIcon onClick={handleClose} />
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
                  </div>

                  <MenuItem className="d-flex justify-content-between">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button onClick={handleSave} className="btn btn-color" >

                      Save
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
                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    No. of Enrollments
                    <p>
                      {Number(
                        parseFloat(getstudentData.length).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Booking Amount
                    <p>
                      {Number(
                        parseFloat(totalAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp;  Branch Wise Enrollments
                    </h5>
                    <div className="row mt-2">
                      {!selectedBranch && <div className="">
                        <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                          <Table stickyHeader aria-label="sticky table " >
                            <TableHead>
                              <TableRow>
                                <TableCell className="table-cell-heading">
                                  Branch
                                </TableCell>
                                <TableCell className="table-cell-heading">
                                  Enrollments
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody sx={{ overflowY: 'auto' }}>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                return (
                                  <TableRow >
                                    <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                      <span className=" table-text "
                                        style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                        onClick={() => handleBranchClick(branch)}>      {branch}
                                      </span>
                                    </TableCell>
                                    <TableCell className="Table-cell">
                                      {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalStudents}
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>

                          </Table>
                        </TableContainer>
                      </div>}
                      {
                        selectedBranch && <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Total Count
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalStudents}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      }
                      <div className="col-12 col-md-6 mt-2" >
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">  Enrollments</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (

                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>
                                          <TableCell className="Table-cell" >
                                            {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].students).length}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )

                        })}

                      </div>
                    </div><div>

                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4" >
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }} style={{ overflow: "hidden" }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>

                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>


                                                    </TableRow>
                                                  )

                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp;Branch Wise Booking Amount
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className=" mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Booking Amount
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Booking Amount
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}

                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Booking Amount</TableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (

                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>

                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody >
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;
                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">{Number(
                                                        parseFloat(student.totalAmount).toFixed(2)
                                                      ).toLocaleString("en-IN")}
                                                        {/* {student.totalAmount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      } </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise  Fee Received
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Fee Received</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (
                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>
                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading">Fee Received</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();
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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>
                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.receivedamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.receivedamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">  {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise  Fee Yet To Received
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Yet To Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch, index) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                        >      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Yet To Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch, index) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                        >      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Fee Yet To Received</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (
                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>
                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading"> Fee Yet To Received</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;


                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.dueamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.dueamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )

                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        }
        {
          Displaycards.fee && (
            <div className=" ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                  <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span> Fee Details
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

                        <CloseIcon onClick={handleClose} />
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
                          value={dummyfilterDeuAndReceived.fromdate}
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
                          value={dummyfilterDeuAndReceived.todate}
                          onChange={handleDeuAndReceivedInputChange}
                        />
                      </div>
                    </div>
                    <MenuItem className="d-flex justify-content-between">
                      <button className="btn btn-color" onClick={filterDeuAndReceivedreset}>

                        Clear
                      </button>
                      <button className="btn btn-color" onClick={handleDeuAndReceivedSave} >

                        Save
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
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: !prev.feerecevied,
                        feeyettorecevied: false,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </p>
                    </p>
                  </Card>
                </div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: false,
                        feeyettorecevied: !prev.feeyettorecevied,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Yet To Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
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
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Received
                      </h5>
                      <div className="row">
                        {!selectedBranch &&
                          <div className="mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>}
                        {selectedBranch &&
                          <div className="col-12 col-md-6 mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>

                              </Table>
                            </TableContainer>
                          </div>}
                        <div className="col-12 col-md-6 mt-2">
                          {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                            return (
                              <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                {selectedBranch === branch &&
                                  <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                        <TableCell className="table-cell-heading"> Fee Received </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                      {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                        (counsellor) => (
                                          <TableRow
                                            key={counsellor}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                            <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                              <span className=" table-text"
                                                style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                                onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                              </span>
                                            </TableCell>
                                            <TableCell className="Table-cell" >
                                              {Number(
                                                parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                              ).toLocaleString("en-IN")}
                                              {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>}
                              </TableContainer>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              {selectedBranch === branch &&
                                <div>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (
                                      <div
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        {selectedCounsellor === counsellor &&
                                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="table-cell-heading">Name</TableCell>
                                                  <TableCell className="table-cell-heading">Course</TableCell>
                                                  <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                  <TableCell className="table-cell-heading"> Fee Received </TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody sx={{ overflowY: 'auto' }}>
                                                {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                  .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                    let admissionDate = new Date(student.admissionDate);
                                                    const day = admissionDate.getUTCDate();
                                                    const monthIndex = admissionDate.getUTCMonth();
                                                    const year = admissionDate.getUTCFullYear();

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
                                                    admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                      }-${year}`;

                                                    if (student.receivedamount === 0) {
                                                      return null
                                                    } else {
                                                      return (
                                                        <TableRow key={index}>
                                                          <TableCell className="Table-cell" >{student.name}</TableCell>
                                                          <TableCell className="Table-cell" >{student.course}</TableCell>
                                                          <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                          <TableCell className="Table-cell">
                                                            {Number(
                                                              parseFloat(student.receivedamount).toFixed(2)
                                                            ).toLocaleString("en-IN")}
                                                            {/* {student.receivedamount} */}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    }
                                                  })}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        }
                                      </div>
                                    )
                                  )}
                                </div>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {DisplayTable.feeyettorecevied && (
                  <div>
                    <div className="">
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Yet to Received
                      </h5>
                      <div className="row">
                        {!selectedBranch &&
                          <div className="mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Yet To Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>

                              </Table>
                            </TableContainer>
                          </div>}
                        {selectedBranch &&
                          <div className="col-12 col-md-6 mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Yet To Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>}
                        <div className="col-12 col-md-6 mt-2">

                          {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                            return (
                              <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                {selectedBranch === branch &&
                                  <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                        <TableCell className="table-cell-heading">Fee Yet To Received</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                      {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                        (counsellor) => (
                                          <TableRow
                                            key={counsellor}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                            <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                              <span className=" table-text"
                                                style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                                onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                              </span>
                                            </TableCell>
                                            <TableCell className="Table-cell" >
                                              {Number(
                                                parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                              ).toLocaleString("en-IN")}
                                              {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>}
                              </TableContainer>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              {selectedBranch === branch &&
                                <div>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (
                                      <div
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        {selectedCounsellor === counsellor &&
                                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="table-cell-heading">Name</TableCell>
                                                  <TableCell className="table-cell-heading">Course</TableCell>
                                                  <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                  <TableCell className="table-cell-heading">Fee Yet to Received</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody sx={{ overflowY: 'auto' }}>
                                                {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                  .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                    let admissionDate = new Date(student.admissionDate);
                                                    const day = admissionDate.getUTCDate();
                                                    const monthIndex = admissionDate.getUTCMonth();
                                                    const year = admissionDate.getUTCFullYear();

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
                                                    admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                      }-${year}`;

                                                    if (student.dueamount === 0) {
                                                      return null
                                                    } else if (student.dueamount) {
                                                      return (
                                                        <TableRow key={index}>
                                                          <TableCell className="Table-cell" >{student.name}</TableCell>
                                                          <TableCell className="Table-cell" >{student.course}</TableCell>
                                                          <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                          <TableCell className="Table-cell">
                                                            {Number(
                                                              parseFloat(student.dueamount).toFixed(2)
                                                            ).toLocaleString("en-IN")}
                                                            {/* {student.dueamount} */}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    }
                                                  })}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        }
                                      </div>
                                    )
                                  )}
                                </div>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        }

        {
          Displaycards.users && (
            <div className=" ">
              <div>
                <div className="text-center flex-grow-1">
                  <h5 className=" text-center flex-grow-1 pt-4 underline ms-sm-5 ">
                    Total
                    Users Details
                  </h5>

                </div>
              </div>
              {/* User Card Display */}
              <div className="row  ">
                <div className="col-12 col-md-4 col-xl-4 col-lg-4"></div>
                <div className="col-12 col-md-3 col-xl-3 col-lg-3 mb-2 ms-sm-5">
                  <Card

                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: false,
                        feeyettorecevied: false,
                        branchusers: !prev.branchusers,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
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
                <div>

                  <div className="mt-2">
                    <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                      <Table stickyHeader aria-label="sticky table " >
                        <TableHead>
                          <TableRow>
                            <TableCell className="table-cell-heading">
                              Branch
                            </TableCell>
                            <TableCell className="table-cell-heading">
                              Users Count
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflowY: 'auto' }}>
                          {Object.keys(AllUsers_BranchWise).map((branch) => {
                            return (
                              <TableRow >
                                <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                  <span className=" table-text "
                                    style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                    onClick={() => handleBranchClick(branch)}>      {branch}
                                  </span>
                                </TableCell>
                                <TableCell className="Table-cell">
                                  {Object.keys(AllUsers_BranchWise[branch]).length}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>

                      </Table>
                    </TableContainer>
                  </div>
                  <div className="mt-3">

                    {Object.keys(AllUsers_BranchWise).map((branch) => {


                      return (


                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                          {selectedBranch === branch &&
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading" style={{ width: "50%" }}>User Name</TableCell>
                                  <TableCell className="table-cell-heading">Profile</TableCell>

                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(AllUsers_BranchWise[branch]).map(
                                  (user) => (

                                    <TableRow
                                      key={user}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} >
                                        <span className=" table-text"
                                          style={{ color: "black" }}
                                        >      {user}
                                        </span>
                                      </TableCell>
                                      {AllUsers_BranchWise[branch][user].map((item, index) => (
                                        <TableCell className="Table-cell" >
                                          {item.profile}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>}
                        </TableContainer>
                      )
                    })}

                  </div>
                </div>
              )}
              {/* User Table Display End */}
            </div>
          )
        }
      </div >
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
                <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span> Enrollment
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

                      <CloseIcon onClick={handleClose} />
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
                  </div>

                  <MenuItem className="d-flex justify-content-between">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button className="btn btn-color" onClick={handleSave}>
                      Save
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
                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    No. of Enrollments
                    <p>
                      {Number(
                        parseFloat(getstudentData.length).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Booking Amount
                    <p>
                      {Number(
                        parseFloat(totalAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp;  Branch Wise Enrollments
                    </h5>
                    <div className="">
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                  <TableCell className="table-cell-heading">Enrollments</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <TableRow
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                        <span className=" table-text"
                                          style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                          onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell" >
                                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].students).length}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )
                      })}
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (
                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    {selectedCounsellor === counsellor &&
                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();
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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;
                                                return (
                                                  <TableRow key={index}>
                                                    <TableCell className="Table-cell" >{student.name}</TableCell>
                                                    <TableCell className="Table-cell" >{student.course}</TableCell>
                                                    <TableCell className="Table-cell" >{admissionDate}</TableCell>
                                                  </TableRow>
                                                )
                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    }
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp;  Branch Wise Booking Amount
                    </h5>
                    <div className="">
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                  <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <TableRow
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                        <span className=" table-text"
                                          style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                          onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell" >
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )
                      })}
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (
                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    {selectedCounsellor === counsellor &&
                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                              <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();

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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;
                                                return (
                                                  <TableRow key={index}>
                                                    <TableCell className="Table-cell" >{student.name}</TableCell>
                                                    <TableCell className="Table-cell" >{student.course}</TableCell>
                                                    <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                    <TableCell className="Table-cell">
                                                      {Number(
                                                        parseFloat(student.totalAmount).toFixed(2)
                                                      ).toLocaleString("en-IN")}
                                                      {/* {student.totalAmount} */}
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    }
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Fee Received
                    </h5>
                    <div className="">
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                  <TableCell className="table-cell-heading">Fee Received</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <TableRow
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                        <span className=" table-text"
                                          style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                          onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell" >
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )
                      })}
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (
                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    {selectedCounsellor === counsellor &&
                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                              <TableCell className="table-cell-heading">Fee Received</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();

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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;

                                                return (
                                                  <TableRow key={index}>
                                                    <TableCell className="Table-cell" >{student.name}</TableCell>
                                                    <TableCell className="Table-cell" >{student.course}</TableCell>
                                                    <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                    <TableCell className="Table-cell">
                                                      {Number(
                                                        parseFloat(student.receivedamount).toFixed(2)
                                                      ).toLocaleString("en-IN")}
                                                      {/* {student.receivedamount} */}
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    }
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise  Fee Yet To Received
                    </h5>
                    <div className="">
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                  <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <TableRow
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                        <span className=" table-text"
                                          style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                          onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell" >
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )
                      })}
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (

                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    {selectedCounsellor === counsellor &&
                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                              <TableCell className="table-cell-heading"> Fee Yet To Receive</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();
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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;


                                                return (
                                                  <TableRow key={index}>
                                                    <TableCell className="Table-cell" >{student.name}</TableCell>
                                                    <TableCell className="Table-cell" >{student.course}</TableCell>
                                                    <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                    <TableCell className="Table-cell">
                                                      {Number(
                                                        parseFloat(student.dueamount).toFixed(2)
                                                      ).toLocaleString("en-IN")}
                                                      {/* {student.dueamount} */}
                                                    </TableCell>
                                                  </TableRow>
                                                )
                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    }
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        }
        {
          Displaycards.fee && (
            <div className=" ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                  <span className="fw-bold fs-5"> {!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span> Fee Details
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

                        <CloseIcon onClick={handleClose} />
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
                          value={dummyfilterDeuAndReceived.fromdate}
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
                          value={dummyfilterDeuAndReceived.todate}
                          onChange={handleDeuAndReceivedInputChange}
                        />
                      </div>
                    </div>

                    <MenuItem className="d-flex justify-content-between">
                      <button className="btn btn-color" onClick={filterDeuAndReceivedreset}>

                        Clear
                      </button>
                      <button className="btn btn-color" onClick={handleDeuAndReceivedSave}>

                        Save
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
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: !prev.feerecevied,
                        feeyettorecevied: false,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}

                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </p>
                    </p>
                  </Card>
                </div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: false,
                        feeyettorecevied: !prev.feeyettorecevied,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Yet To Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
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
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp;   Branch Wise Fee Received
                      </h5>
                      <div className="">

                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                    <TableCell className="table-cell-heading"> Fee Received </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (

                                      <TableRow
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                          <span className=" table-text"
                                            style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                            onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                          </span>
                                        </TableCell>

                                        <TableCell className="Table-cell" >
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )
                        })}
                      </div>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              <div>
                                {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading"> Fee Received </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  if (student.receivedamount === 0) {
                                                    return null
                                                  } else {
                                                    return (
                                                      <TableRow key={index}>
                                                        <TableCell className="Table-cell" >{student.name}</TableCell>
                                                        <TableCell className="Table-cell" >{student.course}</TableCell>
                                                        <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                        <TableCell className="Table-cell">
                                                          {Number(
                                                            parseFloat(student.receivedamount).toFixed(2)
                                                          ).toLocaleString("en-IN")}
                                                          {/* {student.receivedamount} */}
                                                        </TableCell>
                                                      </TableRow>
                                                    )
                                                  }
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {DisplayTable.feeyettorecevied && (
                  <div>
                    <div className="">
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Yet to Received
                      </h5>
                      <div className="">
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                    <TableCell className="table-cell-heading">Fee Yet To Received</TableCell>

                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (

                                      <TableRow
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                          <span className=" table-text"
                                            style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                            onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell" >
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          )
                        })}
                      </div>
                      <div>

                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              <div>
                                {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading">Fee Yet to Received</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  if (student.dueamount === 0) {
                                                    return null
                                                  } else if (student.dueamount) {
                                                    return (
                                                      <TableRow key={index}>
                                                        <TableCell className="Table-cell" >{student.name}</TableCell>
                                                        <TableCell className="Table-cell" >{student.course}</TableCell>
                                                        <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                        <TableCell className="Table-cell">
                                                          {Number(
                                                            parseFloat(student.dueamount).toFixed(2)
                                                          ).toLocaleString("en-IN")}
                                                          {/* {student.dueamount} */}
                                                        </TableCell>
                                                      </TableRow>
                                                    )
                                                  }


                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }

                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        })}

                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        }

        {
          Displaycards.users && (
            <div className=" ">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className=" text-center flex-grow-1 pt-4 underline ms-sm-5 ">
                    Total
                    Users Details
                  </h5>

                </div>
              </div>
              {/* User Card Display */}
              <div className="row  ">
                <div className="col-12 col-md-4 col-xl-4 col-lg-4"></div>
                <div className="col-12 col-md-3 col-xl-3 col-lg-3 mb-2 ms-sm-5">
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
                <div>
                  <div className="">
                    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="table-cell-heading">Users Name</TableCell>
                            <TableCell className="table-cell-heading">Profile</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflowY: 'auto' }}>
                          {Object.keys(AllUsers_BranchWise[userBranch]).map(
                            (user) => (

                              <TableRow
                                key={user}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell className="Table-cell " style={{ cursor: "pointer" }} >
                                  <span className=" table-text"
                                    style={{ color: "black" }}
                                  >      {user}
                                  </span>
                                </TableCell>
                                {AllUsers_BranchWise[userBranch][user].map((item, index) => (
                                  <TableCell className="Table-cell" >
                                    {item.profile}
                                  </TableCell>
                                ))}
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}
              {/* User Table Display End */}
            </div>
          )
        }
      </div >
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
                <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                &nbsp;Enrollment
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

                      <CloseIcon onClick={handleClose} />
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
                  </div>

                  <MenuItem className="d-felx justify-content-between">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button className="btn btn-color" onClick={handleSave}>

                      Save
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
                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    No. of Enrollments
                    <p>
                      {Number(
                        parseFloat(getstudentData.length).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Booking Amount
                    <p>
                      {Number(
                        parseFloat(totalAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Enrollments
                    </h5>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (
                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                      <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell className="table-cell-heading">Name</TableCell>
                                            <TableCell className="table-cell-heading">Course</TableCell>
                                            <TableCell className="table-cell-heading">Admission Date</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ overflowY: 'auto' }}>
                                          {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                            .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                              let admissionDate = new Date(student.admissionDate);
                                              const day = admissionDate.getUTCDate();
                                              const monthIndex = admissionDate.getUTCMonth();
                                              const year = admissionDate.getUTCFullYear();
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
                                              admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                }-${year}`;

                                              return (
                                                <TableRow key={index}>
                                                  <TableCell className="Table-cell" >{student.name}</TableCell>
                                                  <TableCell className="Table-cell" >{student.course}</TableCell>
                                                  <TableCell className="Table-cell" >{admissionDate}</TableCell>
                                                </TableRow>
                                              )
                                            })}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp;  Branch Wise Booking Amounts
                    </h5>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (
                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                      <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell className="table-cell-heading">Name</TableCell>
                                            <TableCell className="table-cell-heading">Course</TableCell>
                                            <TableCell className="table-cell-heading">Admission Date</TableCell>
                                            <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ overflowY: 'auto' }}>
                                          {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                            .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                              let admissionDate = new Date(student.admissionDate);
                                              const day = admissionDate.getUTCDate();
                                              const monthIndex = admissionDate.getUTCMonth();
                                              const year = admissionDate.getUTCFullYear();

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
                                              admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                }-${year}`;
                                              return (
                                                <TableRow key={index}>
                                                  <TableCell className="Table-cell" >{student.name}</TableCell>
                                                  <TableCell className="Table-cell" >{student.course}</TableCell>
                                                  <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                  <TableCell className="Table-cell">
                                                    {Number(
                                                      parseFloat(student.totalAmount).toFixed(2)
                                                    ).toLocaleString("en-IN")}
                                                    {/* {student.totalAmount} */}
                                                  </TableCell>
                                                </TableRow>
                                              )

                                            })}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">{!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise  Fee Received
                    </h5>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (

                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                      <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell className="table-cell-heading">Name</TableCell>
                                            <TableCell className="table-cell-heading">Course</TableCell>
                                            <TableCell className="table-cell-heading">Admission Date</TableCell>
                                            <TableCell className="table-cell-heading">Fee Received</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ overflowY: 'auto' }}>
                                          {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                            .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                              let admissionDate = new Date(student.admissionDate);
                                              const day = admissionDate.getUTCDate();
                                              const monthIndex = admissionDate.getUTCMonth();
                                              const year = admissionDate.getUTCFullYear();

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
                                              admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                }-${year}`;

                                              return (
                                                <TableRow key={index}>
                                                  <TableCell className="Table-cell" >{student.name}</TableCell>
                                                  <TableCell className="Table-cell" >{student.course}</TableCell>
                                                  <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                  <TableCell className="Table-cell">
                                                    {Number(
                                                      parseFloat(student.receivedamount).toFixed(2)
                                                    ).toLocaleString("en-IN")}
                                                    {/* {student.receivedamount} */}
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            })}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}

                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Fee Yet To Received
                    </h5>
                    <div>

                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            <div>
                              {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                (counsellor) => (

                                  <div
                                    key={counsellor}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                      <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell className="table-cell-heading">Name</TableCell>
                                            <TableCell className="table-cell-heading">Course</TableCell>
                                            <TableCell className="table-cell-heading">Admission Date</TableCell>
                                            <TableCell className="table-cell-heading"> Fee Yet To Received</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody sx={{ overflowY: 'auto' }}>
                                          {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                            .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                              let admissionDate = new Date(student.admissionDate);
                                              const day = admissionDate.getUTCDate();
                                              const monthIndex = admissionDate.getUTCMonth();
                                              const year = admissionDate.getUTCFullYear();

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
                                              admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                }-${year}`;


                                              return (
                                                <TableRow key={index}>
                                                  <TableCell className="Table-cell" >{student.name}</TableCell>
                                                  <TableCell className="Table-cell" >{student.course}</TableCell>
                                                  <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                  <TableCell className="Table-cell">
                                                    {Number(
                                                      parseFloat(student.dueamount).toFixed(2)
                                                    ).toLocaleString("en-IN")}
                                                    {/* {student.dueamount} */}
                                                  </TableCell>
                                                </TableRow>
                                              )

                                            })}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        }
        {
          Displaycards.fee && (
            <div className=" ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                  <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span> Fee Details
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

                        <CloseIcon onClick={handleClose} />
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
                          value={dummyfilterDeuAndReceived.fromdate}
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
                          value={dummyfilterDeuAndReceived.todate}
                          onChange={handleDeuAndReceivedInputChange}
                        />
                      </div>
                    </div>

                    <MenuItem className="d-flex justify-content-between">
                      <button className="btn btn-color" onClick={filterDeuAndReceivedreset}>

                        Clear
                      </button>
                      <button className="btn btn-color" onClick={handleDeuAndReceivedSave}>

                        Save
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
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: !prev.feerecevied,
                        feeyettorecevied: false,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}

                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </p>
                    </p>
                  </Card>
                </div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card


                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: false,
                        feeyettorecevied: !prev.feeyettorecevied,
                        branchusers: false,
                      }));

                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Yet To Received
                      <p>

                        {Number(
                          parseFloat(AllbranchesDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
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
                        <span className="fw-bold fs-5">  {!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Received
                      </h5>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              <div>
                                {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                              <TableCell className="table-cell-heading"> Fee Received</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_all_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();

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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;

                                                if (student.receivedamount === 0) {
                                                  return null
                                                } else {
                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.receivedamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.receivedamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                }
                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {DisplayTable.feeyettorecevied && (
                  <div>
                    <div className="">
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp;Branch Wise Fee Yet to Received
                      </h5>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              <div>
                                {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >


                                      <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell className="table-cell-heading">Name</TableCell>
                                              <TableCell className="table-cell-heading">Course</TableCell>
                                              <TableCell className="table-cell-heading">Admission Date</TableCell>
                                              <TableCell className="table-cell-heading">Fee Yet To Received</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody sx={{ overflowY: 'auto' }}>
                                            {calculations_of_all_students_branchwise_counsellorwise[branch]
                                              .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                let admissionDate = new Date(student.admissionDate);
                                                const day = admissionDate.getUTCDate();
                                                const monthIndex = admissionDate.getUTCMonth();
                                                const year = admissionDate.getUTCFullYear();

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
                                                admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                  }-${year}`;

                                                if (student.dueamount === 0) {
                                                  return null
                                                } else if (student.dueamount) {
                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.dueamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.dueamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                }


                                              })}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>


                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )
                        })}

                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        }


      </div >
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
                <span className="fw-bold fs-5">
                  {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span> Enrollment
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

                      <CloseIcon onClick={handleClose} />
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
                  </div>

                  <MenuItem className="d-flex justify-content-between">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button className="btn btn-color" onClick={handleSave}>

                      Save
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
                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: !prev.enrollments,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    No. of Enrollments
                    <p>
                      {Number(
                        parseFloat(getstudentData.length).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: !prev.bookingamount,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Booking Amount
                    <p>
                      {Number(
                        parseFloat(totalAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: !prev.enrollmentfeerecevied,
                      enrollmentfeeyettorecevied: false,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}

                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalReceivedAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
              <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-1">
                <Card

                  onClick={(e) => {
                    setDisplayTable((prev) => ({
                      enrollments: false,
                      bookingamount: false,
                      enrollmentfeerecevied: false,
                      enrollmentfeeyettorecevied:
                        !prev.enrollmentfeeyettorecevied,
                      feerecevied: false,
                      feeyettorecevied: false,
                      branchusers: false,
                    }));

                    setSelectedBranch(null);
                    setSelectedCounsellor(null);
                  }}
                  className="cardcolor"
                >
                  <p className="text-center pt-3">
                    Fee Yet To Received
                    <p>
                      {Number(
                        parseFloat(enrollmentsTotalDueAmount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </p>
                  </p>
                </Card>
              </div>
            </div>
            {/* Enrollment cards display end */}

            {/* Enrollment table display */}
            <div>
              {DisplayTable.enrollments && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5"> {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Enrollment Data
                    </h5>


                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Enrollments
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>


                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalStudents}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Enrollments
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>


                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalStudents}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">

                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {


                          return (


                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Enrollments</TableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (

                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>


                                          </TableCell>

                                          <TableCell className="Table-cell" >
                                            {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].students).length}
                                          </TableCell>


                                        </TableRow>
                                      )
                                    )}


                                  </TableBody>
                                </Table>}
                            </TableContainer>

                          )

                        })}

                      </div>
                    </div>

                    <div>

                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }} style={{ overflow: "hidden" }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>

                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>


                                                    </TableRow>
                                                  )

                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.bookingamount && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">
                        {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Booking Amount Data
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Booking Amount
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>


                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Booking Amount
                                  </TableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody sx={{ overflowY: 'auto' }}>

                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>


                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">

                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {


                          return (


                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Booking Amount</TableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (

                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>

                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>

                          )

                        })}

                      </div>
                    </div>

                    <div>

                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (

                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading">Booking Amount</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;


                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.totalAmount).toFixed(2)
                                                        ).toLocaleString("en-IN")}

                                                        {/* {student.totalAmount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )

                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )

                      })}

                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeerecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">  {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>}</span>
                      &nbsp; Branch Wise Fee Received
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                          onClick={() => handleBranchClick(branch)}>      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalReceivedAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading">Fee Received</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (
                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>
                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading">Fee Received</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;

                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.receivedamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.receivedamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )
                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
              {DisplayTable.enrollmentfeeyettorecevied && (
                <div>
                  <div className="">
                    <h5 className="pt-4 text-center underline">
                      <span className="fw-bold fs-5">  {!filterCriteria.fromdate && !filterCriteria.today && <> Current Month</>} </span>
                      Branch Wise  Fee Yet To Received
                    </h5>
                    <div className="row">
                      {!selectedBranch &&
                        <div className="mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Yet To Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch, index) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                        >      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      {selectedBranch &&
                        <div className="col-12 col-md-6 mt-2">
                          <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                            <Table stickyHeader aria-label="sticky table " >
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading">
                                    Branch
                                  </TableCell>
                                  <TableCell className="table-cell-heading">
                                    Fee Yet To Received
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch, index) => {
                                  return (
                                    <TableRow >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                        <span className=" table-text "
                                          style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                        >      {branch}
                                        </span>
                                      </TableCell>
                                      <TableCell className="Table-cell">
                                        {Number(
                                          parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                        {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>}
                      <div className="col-12 col-md-6 mt-2">
                        {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                              {selectedBranch === branch &&
                                <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                      <TableCell className="table-cell-heading"> Fee Yet To Received</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody sx={{ overflowY: 'auto' }}>
                                    {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                      (counsellor) => (
                                        <TableRow
                                          key={counsellor}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                          <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                            <span className=" table-text"
                                              style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                              onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                            </span>
                                          </TableCell>
                                          <TableCell className="Table-cell" >
                                            {Number(
                                              parseFloat(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                            ).toLocaleString("en-IN")}
                                            {/* {calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>}
                            </TableContainer>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise).map((branch) => {
                        return (
                          <div className="my-4">
                            {selectedBranch === branch &&
                              <div>
                                {Object.keys(calculations_of_filtered_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                  (counsellor) => (
                                    <div
                                      key={counsellor}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                      {selectedCounsellor === counsellor &&
                                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                          <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell className="table-cell-heading">Name</TableCell>
                                                <TableCell className="table-cell-heading">Course</TableCell>
                                                <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                <TableCell className="table-cell-heading"> Fee Yet To Receive</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ overflowY: 'auto' }}>
                                              {calculations_of_filtered_students_branchwise_counsellorwise[branch]
                                                .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                  let admissionDate = new Date(student.admissionDate);
                                                  const day = admissionDate.getUTCDate();
                                                  const monthIndex = admissionDate.getUTCMonth();
                                                  const year = admissionDate.getUTCFullYear();

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
                                                  admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                    }-${year}`;


                                                  return (
                                                    <TableRow key={index}>
                                                      <TableCell className="Table-cell" >{student.name}</TableCell>
                                                      <TableCell className="Table-cell" >{student.course}</TableCell>
                                                      <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                      <TableCell className="Table-cell">
                                                        {Number(
                                                          parseFloat(student.dueamount).toFixed(2)
                                                        ).toLocaleString("en-IN")}
                                                        {/* {student.dueamount} */}
                                                      </TableCell>
                                                    </TableRow>
                                                  )

                                                })}
                                            </TableBody>
                                          </Table>
                                        </TableContainer>
                                      }
                                    </div>
                                  )
                                )}
                              </div>}
                          </div>
                        )

                      })}

                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
        }

        {
          Displaycards.fee && (
            <div className=" ">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className=" text-center flex-grow-1 pt-4 mb-2 ms-sm-5 underline ">
                  <span className="fw-bold fs-5">  {!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span> Fee Details
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

                        <CloseIcon onClick={handleClose} />
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
                          value={dummyfilterDeuAndReceived.fromdate}
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
                          value={dummyfilterDeuAndReceived.todate}
                          onChange={handleDeuAndReceivedInputChange}
                        />
                      </div>
                    </div>

                    <MenuItem className="d-flex justify-content-between">
                      <button className="btn btn-color" onClick={filterDeuAndReceivedreset}>

                        Clear
                      </button>
                      <button className="btn btn-color" onClick={handleDeuAndReceivedSave}>

                        Save
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
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: !prev.feerecevied,
                        feeyettorecevied: false,
                        branchusers: false,
                      }));
                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Received
                      <p>
                        {Number(
                          parseFloat(AllbranchesreceivedAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </p>
                    </p>
                  </Card>
                </div>
                <div className="col-6 col-md-3 col-xl-3 col-lg-3 mb-2">
                  <Card
                    onClick={(e) => {
                      setDisplayTable((prev) => ({
                        enrollments: false,
                        bookingamount: false,
                        enrollmentfeerecevied: false,
                        enrollmentfeeyettorecevied: false,
                        feerecevied: false,
                        feeyettorecevied: !prev.feeyettorecevied,
                        branchusers: false,
                      }));
                      setSelectedBranch(null);
                      setSelectedCounsellor(null);
                    }}
                    className="cardcolor"
                  >
                    <p className="text-center pt-3">
                      Fee Yet To Received
                      <p>
                        {Number(
                          parseFloat(AllbranchesDueAmount).toFixed(2)
                        ).toLocaleString("en-IN")}
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
                        <span className="fw-bold fs-5">{!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Received
                      </h5>
                      <div className="row">
                        {!selectedBranch &&
                          <div className="mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody sx={{ overflowY: 'auto' }}>

                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>


                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>

                              </Table>
                            </TableContainer>
                          </div>}
                        {selectedBranch &&
                          <div className="col-12 col-md-6 mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Received
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody sx={{ overflowY: 'auto' }}>

                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>


                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalReceivedAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>

                              </Table>
                            </TableContainer>
                          </div>}
                        <div className="col-12 col-md-6 mt-2">
                          {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                            return (
                              <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                {selectedBranch === branch &&
                                  <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                        <TableCell className="table-cell-heading"> Fee Received</TableCell>

                                      </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                      {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                        (counsellor) => (
                                          <TableRow
                                            key={counsellor}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                            <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                              <span className=" table-text"
                                                style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                                onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                              </span>
                                            </TableCell>
                                            <TableCell className="Table-cell" >
                                              {Number(
                                                parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount).toFixed(2)
                                              ).toLocaleString("en-IN")}
                                              {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalReceivedAmount} */}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>}
                              </TableContainer>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              {selectedBranch === branch &&
                                <div>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (
                                      <div
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >
                                        {selectedCounsellor === counsellor &&
                                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="table-cell-heading">Name</TableCell>
                                                  <TableCell className="table-cell-heading">Course</TableCell>
                                                  <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                  <TableCell className="table-cell-heading"> Fee Received </TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody sx={{ overflowY: 'auto' }}>
                                                {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                  .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                    let admissionDate = new Date(student.admissionDate);
                                                    const day = admissionDate.getUTCDate();
                                                    const monthIndex = admissionDate.getUTCMonth();
                                                    const year = admissionDate.getUTCFullYear();
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
                                                    admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                      }-${year}`;

                                                    if (student.receivedamount === 0) {
                                                      return null
                                                    } else {
                                                      return (
                                                        <TableRow key={index}>
                                                          <TableCell className="Table-cell" >{student.name}</TableCell>
                                                          <TableCell className="Table-cell" >{student.course}</TableCell>
                                                          <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                          <TableCell className="Table-cell">
                                                            {Number(
                                                              parseFloat(student.receivedamount).toFixed(2)
                                                            ).toLocaleString("en-IN")}
                                                            {/* {student.receivedamount} */}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    }
                                                  })}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        }
                                      </div>
                                    )
                                  )}
                                </div>}
                            </div>
                          )
                        })}

                      </div>
                    </div>
                  </div>
                )}
                {DisplayTable.feeyettorecevied && (
                  <div>
                    <div className="">
                      <h5 className="pt-4 text-center underline">
                        <span className="fw-bold fs-5"> {!filterDeuAndReceived.fromdate && !filterDeuAndReceived.today && <> Current Month</>}</span>
                        &nbsp; Branch Wise Fee Yet to Received
                      </h5>
                      <div className="row">
                        {!selectedBranch &&
                          <div className="mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Yet To Receive
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>

                              </Table>
                            </TableContainer>
                          </div>}
                        {selectedBranch &&
                          <div className="col-12 col-md-6 mt-2">
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                              <Table stickyHeader aria-label="sticky table " >
                                <TableHead>
                                  <TableRow>
                                    <TableCell className="table-cell-heading">
                                      Branch
                                    </TableCell>
                                    <TableCell className="table-cell-heading">
                                      Fee Yet To Receive
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody sx={{ overflowY: 'auto' }}>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                                    return (
                                      <TableRow >
                                        <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                          <span className=" table-text "
                                            style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                            onClick={() => handleBranchClick(branch)}>      {branch}
                                          </span>
                                        </TableCell>
                                        <TableCell className="Table-cell">
                                          {Number(
                                            parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                          {/* {calculations_of_all_students_branchwise_counsellorwise[branch].totalDueAmount} */}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>}
                        <div className="col-12 col-md-6 mt-2">
                          {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                            return (
                              <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                {selectedBranch === branch &&
                                  <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell className="table-cell-heading">Counsellor Name</TableCell>
                                        <TableCell className="table-cell-heading">Fee Yet To Received</TableCell>

                                      </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                      {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                        (counsellor) => (
                                          <TableRow
                                            key={counsellor}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
                                            <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleCounsellorClick(counsellor)}>
                                              <span className=" table-text"
                                                style={{ color: selectedCounsellor === counsellor ? "#0d6efd" : "black" }}
                                                onClick={() => handleCounsellorClick(counsellor)}>      {counsellor}
                                              </span>
                                            </TableCell>
                                            <TableCell className="Table-cell" >
                                              {Number(
                                                parseFloat(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount).toFixed(2)
                                              ).toLocaleString("en-IN")}
                                              {/* {calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal[counsellor].totalDueAmount} */}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                    </TableBody>
                                  </Table>}
                              </TableContainer>
                            )
                          })}
                        </div>
                      </div>
                      <div>
                        {Object.keys(calculations_of_all_students_branchwise_counsellorwise).map((branch) => {
                          return (
                            <div className="my-4">
                              {selectedBranch === branch &&
                                <div>
                                  {Object.keys(calculations_of_all_students_branchwise_counsellorwise[branch].counsellorWiseTotal).map(
                                    (counsellor) => (
                                      <div
                                        key={counsellor}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                      >

                                        {selectedCounsellor === counsellor &&
                                          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="table-cell-heading">Name</TableCell>
                                                  <TableCell className="table-cell-heading">Course</TableCell>
                                                  <TableCell className="table-cell-heading">Admission Date</TableCell>
                                                  <TableCell className="table-cell-heading">Fee Yet to Received</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody sx={{ overflowY: 'auto' }}>
                                                {calculations_of_all_students_branchwise_counsellorwise[branch]
                                                  .counsellorWiseTotal[counsellor].students.map((student, index) => {
                                                    let admissionDate = new Date(student.admissionDate);
                                                    const day = admissionDate.getUTCDate();
                                                    const monthIndex = admissionDate.getUTCMonth();
                                                    const year = admissionDate.getUTCFullYear();

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
                                                    admissionDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                                      }-${year}`;

                                                    if (student.dueamount === 0) {
                                                      return null
                                                    } else if (student.dueamount) {
                                                      return (
                                                        <TableRow key={index}>
                                                          <TableCell className="Table-cell" >{student.name}</TableCell>
                                                          <TableCell className="Table-cell" >{student.course}</TableCell>
                                                          <TableCell className="Table-cell" >{admissionDate}</TableCell>

                                                          <TableCell className="Table-cell">
                                                            {Number(
                                                              parseFloat(student.dueamount).toFixed(2)
                                                            ).toLocaleString("en-IN")}
                                                            {/* {student.dueamount} */}
                                                          </TableCell>
                                                        </TableRow>
                                                      )
                                                    }


                                                  })}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        }
                                      </div>
                                    )
                                  )}
                                </div>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )
        }

        {
          Displaycards.users && (
            <div className=" ">
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className=" text-center flex-grow-1 pt-4 underline ms-sm-5 ">
                    Total
                    Users
                  </h5>

                </div>
              </div>
              {/* User Card Display */}
              <div className="row  ">
                <div className="col-12 col-md-4 col-xl-4 col-lg-4"></div>
                <div className="col-12 col-md-3 col-xl-3 col-lg-3 mb-2 ms-sm-5">
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
                <div>

                  <div className="">
                    <TableContainer component={Paper} sx={{ maxHeight: 200 }} >
                      <Table stickyHeader aria-label="sticky table " >
                        <TableHead>
                          <TableRow>
                            <TableCell className="table-cell-heading" style={{ width: "50%" }}>
                              Branch
                            </TableCell>
                            <TableCell className="table-cell-heading">
                              Users
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflowY: 'auto' }}>
                          {Object.keys(AllUsers_BranchWise).map((branch) => {
                            return (
                              <TableRow >
                                <TableCell className="Table-cell " style={{ cursor: "pointer" }} onClick={() => handleBranchClick(branch)}>
                                  <span className=" table-text "
                                    style={{ color: selectedBranch === branch ? "#0d6efd" : "black" }}
                                    onClick={() => handleBranchClick(branch)}>      {branch}
                                  </span>
                                </TableCell>
                                <TableCell className="Table-cell">
                                  {Object.keys(AllUsers_BranchWise[branch]).length}
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className="mt-3">
                    {Object.keys(AllUsers_BranchWise).map((branch) => {
                      return (
                        <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                          {selectedBranch === branch &&
                            <Table stickyHeader aria-label="sticky table">
                              <TableHead>
                                <TableRow>
                                  <TableCell className="table-cell-heading" style={{ width: "50%" }}>Users Name</TableCell>
                                  <TableCell className="table-cell-heading">Profile</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody sx={{ overflowY: 'auto' }}>
                                {Object.keys(AllUsers_BranchWise[branch]).map(
                                  (user) => (
                                    <TableRow
                                      key={user}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className="Table-cell " style={{ cursor: "pointer" }} >
                                        <span className=" table-text"
                                          style={{ color: "black" }}
                                        >      {user}
                                        </span>
                                      </TableCell>
                                      {AllUsers_BranchWise[branch][user].map((item, index) => (
                                        <TableCell className="Table-cell" >
                                          {item.profile}
                                        </TableCell>
                                      ))}
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>}
                        </TableContainer>
                      )
                    })}
                  </div>
                </div>
              )}
              {/* User Table Display End */}
            </div>
          )
        }
      </div >
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
