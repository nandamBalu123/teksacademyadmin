import { Box, usef } from "@mui/material";
// import { tokens } from "../../../theme";
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import navigate from "react";
import Header from "../../common/Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./Dashboard.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useAuthContext } from "../../../hooks/useAuthContext";
const Dashboard = () => {
  const { user } = useAuthContext();
  const [getUsersData, setUsersData] = useState([]);
  const [getstudentData, setStudentData] = useState([]);
  const [DisplayData, setDisplayData] = useState({
    enrollments: false,
    fee: false,
    users: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3030/getstudent_data")
      .then((res) => {
        setStudentData(res.data);
        console.log("res student data: ", res.data);
      })
      .catch((err) => {
        console.error("Get Student data: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3030/userdata")
      .then((res) => {
        setUsersData(res.data);
        console.log("res user data: ", res.data);
      })
      .catch((err) => {
        console.error("Get User Data: ", err);
      });
  }, []);
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
        </Box>
      </div>

      <div className="contianer Dashboard">
        <div className="row">
          <div
            className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   "
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
          <h4 className="pt-4 mt-3 enrollment ps-4"> Total Entrollment</h4>
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
        <div className="progreebar rounded rounded-5 mt-5 pb-4">
          <h4 className="pt-4 mt-3 enrollment ps-4"> Total Fee</h4>
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
        <div className="progreebar rounded rounded-5 mt-5 pb-4">
          <h4 className="pt-4 mt-3 enrollment ps-4"> Total Users</h4>
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
