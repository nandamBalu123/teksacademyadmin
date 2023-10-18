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
import { useAuthContext } from "../../../hooks/useAuthContext";
const Dashboard = () => {
  const { user } = useAuthContext();
  const [getUsersData, setUsersData] = useState([]);
  const [getstudentData, setStudentData] = useState([]);
  

  useEffect(() =>{
    axios.get("http://localhost:3030/getstudent_data")
    .then((res) => {
      setStudentData(res.data);
      console.log("res student data: ", res.data);
    })
    .catch((err) => {
      console.error("Get Student data: ", err)
    });
    
  },[]);

  useEffect(() => {
    axios.get("http://localhost:3030/userdata")
    .then((res) => {
      setUsersData(res.data);
      console.log("res user data: ", res.data);
    })
    .catch((err) => {
      console.error("Get User Data: ", err)
    })
  },[]);
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
  
 

  const branchStudentData = groupDataAndCalculatePercentage(getstudentData, "branch");
  const branchUserData = groupDataAndCalculatePercentage(getUsersData, "branch");
  


//   // Function to group data by branch
// const groupDataByBranch = (data) => {
//   const branchData = {};
//   data.forEach((student) => {
//     const branch = student.branch;
//     if (!branchData[branch]) {
//       branchData[branch] = [];
//     }
//     branchData[branch].push(student);
//   });
//   return branchData;
// };

// const branchStudentDatad = groupDataByBranch(getstudentData);

// Calculate the final total amount for each branch
// const finalTotalByBranch = {};
// Object.keys(branchStudentData).forEach((branch) => {
//   finalTotalByBranch[branch] = branchStudentData[branch].reduce((total, student) => {
//     return total + parseFloat(student.finaltotal); // Assuming "amount" is the field you want to sum
//   }, 0);


// });



// Calculate the final total amount and percentage for each branch
const finalTotalByBranch = {};
const totalAmount = getstudentData.reduce((total, student) => total + parseFloat(student.amount), 0);
Object.keys(branchStudentData).forEach((branch) => {
  const branchTotalAmount = branchStudentData[branch].reduce((total, student) => total + parseFloat(student.amount), 0);
  const branchPercentage = (branchTotalAmount / totalAmount) * 100;
  finalTotalByBranch[branch] = {
    totalAmount: branchTotalAmount,
    percentage: branchPercentage,
    
  };
  console.log("totalAmounttotalAmount",totalAmount);
});

  return (
    <>
      {/* Header */}
     <div > 
     <Box className="text-center">
        <Header title={"Hi " + user.fullname} subtitle={"Welcome to TEKS ACADEMY"} />
      </Box>
     </div>

      
      <div className="contianer Dashboard">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   ">
            <Card style={{ backgroundColor: "#d9e9e9" }} className="rounded rounded-3">
              <p className="pt-3">Total Enrollments</p>
              <p> {getstudentData.length}</p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3">
            <Card style={{ backgroundColor: "#b7e9da" }} className="rounded rounded-3">
              <p className="pt-3">Total Fee</p>
              <p> </p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3 ">
            <Card style={{ backgroundColor: "#e6acb4 " }} className="rounded rounded-3">
              <p className="pt-3">Total Users</p>
              <p> {getUsersData.length}</p>
            </Card>
          </div>
        </div>
      </div>

      {/* This is for progress bar */}
      <div className="progreebar rounded rounded-5  pb-4 ">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Entrollment</h4>
        <div className="justify-content-around pt-4 row progreebar-show">
        {Object.entries(branchStudentData).map(([branch, students]) => {
            const enrollmentPercentage = (students.length / getstudentData.length) * 100;
            const totalCount = students.length;
            return (
              <div key={`student-${branch}`} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
                <h6>{branch}</h6>
                <BorderLinearProgress variant="determinate" value={enrollmentPercentage} />
                {enrollmentPercentage.toFixed(2)}%<br />
                <span>Total Count: </span>{totalCount}
              </div>
            );
          })}
        </div>
      </div>
      <div className="progreebar rounded rounded-5 mt-5 pb-4">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Fee</h4>
        <div className="  justify-content-around pt-4 row progreebar-show">
          {/* {Object.entries(finalTotalByBranch).map(([branch, totalAmount]) => {
            return (
            <div key={branch} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
                <h6>{branch}</h6>
                <BorderLinearProgress variant="determinate" value={enrollmentPercentage} />
                {enrollmentPercentage.toFixed(2)}%<br />
                <span>Total Count: </span>{totalCount}
              </div>
            )
          // <div key={branch}>
          //   <h3>{branch}</h3>
          //   <p>Total Amount: {totalAmount}</p>
          // </div>
        )}} */}
      {/* // {Object.entries(finalTotalByBranch).map(([branch, { totalAmount, percentage }]) => (
      //   <div key={branch}>
      //     <h3>{branch}</h3>
      //     <p>Total Amount: {totalAmount}</p>
      //     <p>Percentage: {percentage.toFixed(2)}%</p>
      //   </div>
      // ))} */}
      {/* {Object.entries(finalTotalByBranch).map(([branch, totalAmount]) => {
          console.log("finalTotalByBranch", finalTotalByBranch)
            const enrollmentPercentage = (totalAmount / totalAmount) * 100;
           
            // const totalCount = totalAmount.length;
            return (
              <div key={branch} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
                <h6>{branch}</h6>
                <BorderLinearProgress variant="determinate" value={enrollmentPercentage}/>
                {enrollmentPercentage.toFixed(2)}%<br />
                <span>Total Amount: </span>{totalAmount}
                
              </div>
            );
          })}  */}
        {/* {Object.entries(finalTotalByBranch).map(([branch, totalAmount]) => {
          console.log("finalTotalByBranch", finalTotalByBranch)
            const enrollmentPercentage = (totalAmount / totalAmount) * 100;
           
            // const totalCount = totalAmount.length;
            return (
              <div key={branch} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
                <h6>{branch}</h6>
                <BorderLinearProgress variant="determinate" value={enrollmentPercentage}/>
                {enrollmentPercentage.toFixed(2)}%<br />
                <span>Total Amount: </span>{totalAmount}
                
              </div>
            );
          })} */}

          {/* <Box className=" col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6> Hi-tech City</h6>
            <BorderLinearProgress variant="determinate" value={40} />90,000( 40%) 
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6> Ameerpet</h6>
            <BorderLinearProgress variant="determinate" value={20} />  20,000(20%)
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6>Dilsukhnagar </h6>
            <BorderLinearProgress variant="determinate" value={40} /> 90,000(40%)
          </Box> */}
        </div>
      </div>
      <div className="progreebar rounded rounded-5 mt-5 pb-4">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Users</h4>
        <div className="row justify-content-around pt-4 progreebar-show">
          {Object.entries(branchUserData).map(([branch, users]) => {
              const enrollmentPercentage = (users.length / getUsersData.length) * 100;
              const totalCount = users.length;
              return (
                <div key={`user-${branch}`} className="col-12 col-md-6 col-lg-6 col-xl-4 mb-3">
                  <h6>{branch}</h6>
                  <BorderLinearProgress variant="determinate" value={enrollmentPercentage} />
                  {enrollmentPercentage.toFixed(2)}%<br />
                  <span>Total Count: </span>{totalCount}

                </div>
              );
            })}
        </div>
      </div>

     
    </>
  );
};

export default Dashboard;
