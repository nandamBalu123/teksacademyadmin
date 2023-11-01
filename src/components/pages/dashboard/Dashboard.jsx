import { Box, usef } from "@mui/material";
// import { tokens } from "../../../theme";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

import Header from "../../common/Header/Header";

import axios from "axios";
import { useEffect } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./Dashboard.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
// require("dotenv").config();
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
const Dashboard = () => {
  const { user } = useAuthContext();
  const [getUsersData, setUsersData] = useState([]);
  const [initialData, setinitialData] = useState([]);
  const [getstudentData, setStudentData] = useState([]);
  const [DisplayData, setDisplayData] = useState({
    enrollments: false,
    fee: false,
    users: false,
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
      .then((res) => {
        setStudentData(res.data);
        setinitialData(res.data);
        console.log("res student data: ", res.data);
      })
      .catch((err) => {
        console.error("Get Student data: ", err);
      });
  }, []);

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

  const branchStudentData = groupDataAndCalculatePercentage(
    getstudentData,
    "branch"
  );
  const branchUserData = groupDataAndCalculatePercentage(
    getUsersData,
    "branch"
  );

  const finalTotalByBranch = {};
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

  return (
    <>
      {/* Header */}
      <div>
        <Box className="text-center">
          {user && (
            <Header
              title={"Hi " + user.fullname}
              subtitle={"Welcome to TEKS ACADEMY"}
            />
          )}
           
        
            {" "}
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
              setDisplayData({ enrollments: true, fee: false, users: false })
            }
          >
            <Card
              style={{ backgroundColor: "#d9e9e9" }}
              className="rounded rounded-3"
            >
              <p className="pt-3">Total Enrollments</p>
              <p>
                <b> {getstudentData.length}</b>
              </p>
            </Card>
          </div>
          <div
            className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
            style={{ cursor: "pointer" }}
            onClick={(e) =>
              setDisplayData({ enrollments: false, fee: true, users: false })
            }
          >
            <Card
              style={{ backgroundColor: "#b7e9da" }}
              className="rounded rounded-3"
            >
              <p className="pt-3">Total Fee</p>
              <p>
                <CurrencyRupeeIcon />
                <b> {totalAmount}</b>
              </p>
            </Card>
          </div>
          <div
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
              <p className="pt-3">Total Users</p>
              <p>
                <b> {getUsersData.length} </b>
              </p>
            </Card>
          </div>
        </div>
        <div className="row">
          {/*         
        <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3"
           >
            <Card style={{ backgroundColor: "#d9e9e9" }}  className="rounded rounded-3" >
              <p className="pt-3">Pending Fee Records</p>
              <p><b>20</b></p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3" >
            <Card style={{ backgroundColor: "#b7e9da" }} className="rounded rounded-3">
              <p className="pt-3">Fee Followups</p>
              <p><b>20</b></p>
            </Card>
          </div> */}
        </div>
      </div>

      {/* This is for progress bar */}

      {DisplayData.enrollments && (
        <div className="progreebar rounded rounded-5  pb-4 ">
          <div className="d-flex justify-content-between"> 
          <h4 className="pt-4  enrollment ps-4"> Total Entrollment</h4>
          <div className="pt-2 pe-4">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <button
                className="btn btn-primary "
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
                  <MenuItem>
                    <label className="ps-3"> To: </label>

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
              <MenuItem className="text-end">
                {/* <button className="save"> Save</button> */}
                <button className="clear " onClick={filterreset}>
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu>
          </div>
          </div>
      
          <div className="justify-content-around pt-4 row progreebar-show">
            {Object.entries(branchStudentData).map(([branch, students]) => {
              const enrollmentPercentage =
                (students.length / getstudentData.length) * 100;
              const totalCount = students.length;
              return (
                <div
                  key={`student-${branch}`}
                  className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                >
                  <h6>{branch}</h6>
                  <BorderLinearProgress
                    variant="determinate"
                    value={enrollmentPercentage}
                  />
                  <span>Total Count: </span>
                  {totalCount}
                  <span>({enrollmentPercentage.toFixed(2)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {DisplayData.fee && (
        <div className="progreebar rounded rounded-5  pb-4">
        <div className="d-flex justify-content-between"> 
        <h4 className="pt-4 enrollment ps-4"> Total Fee</h4>
          <div className="pt-2 pe-4">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <button
                className="btn btn-primary "
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
                  <MenuItem>
                    <label className="ps-3"> To: </label>

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
              <MenuItem className="text-end">
                {/* <button className="save"> Save</button> */}
                <button className="clear " onClick={filterreset}>
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu>
          </div>
        </div>
          <div className="  justify-content-around pt-4 row progreebar-show">
            {Object.entries(finalTotalByBranch).map(
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
                    <span>Total Amount: </span>
                    {totalAmount}
                    <span>({percentage.toFixed(2)}%)</span>
                  </div>
                );

                // <div key={branch}>
                //   <h3>{branch}</h3>
                //   <p>Total Amount: {totalAmount}</p>
                //   <p>Percentage: {percentage.toFixed(2)}%</p>
                // </div>
              }
            )}
          </div>
        </div>
      )}
      {DisplayData.users && (
        <div className="progreebar rounded rounded-5  pb-4">
          <h4 className="pt-4  enrollment ps-4"> Total Users</h4>
          <div className="row justify-content-around pt-4 progreebar-show">
            {Object.entries(branchUserData).map(([branch, users]) => {
              const enrollmentPercentage =
                (users.length / getUsersData.length) * 100;
              const totalCount = users.length;
              return (
                <div
                  key={`user-${branch}`}
                  className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3"
                >
                  <h6>{branch}</h6>
                  <BorderLinearProgress
                    variant="determinate"
                    value={enrollmentPercentage}
                  />
                  <span>Total Count: </span>
                  {totalCount}
                  <span>({enrollmentPercentage.toFixed(2)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
