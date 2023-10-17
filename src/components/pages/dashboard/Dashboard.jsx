import { Box, usef } from "@mui/material";
// import { tokens } from "../../../theme";
import * as React from "react";
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
const Dashboard = () => {
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

  return (
    <>
      {/* Header */}
     <div > 
     <Box className="text-center">
        <Header title="TEKS ACADEMY" subtitle="Welcome to your dashboard" />
      </Box>
     </div>

      
      <div className="contianer Dashboard">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3   ">
            <Card style={{ backgroundColor: "#d9e9e9" }} className="rounded rounded-3">
              <p className="pt-3">Total Enrollments</p>
              <p> 200</p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3">
            <Card style={{ backgroundColor: "#b7e9da" }} className="rounded rounded-3">
              <p className="pt-3">Total Fee</p>
              <p> 20,00,000</p>
            </Card>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 text-center mb-3 ">
            <Card style={{ backgroundColor: "#e6acb4 " }} className="rounded rounded-3">
              <p className="pt-3">Total Users</p>
              <p> 500</p>
            </Card>
          </div>
        </div>
      </div>

      {/* This is for progress bar */}
      <div className="progreebar rounded rounded-5  pb-4 ">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Entrollment</h4>
        <div className="  justify-content-around pt-4 row progreebar-show">
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6> Hi-tech City</h6>
            <BorderLinearProgress variant="determinate" value={50} /> 100(50%) 
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
            <h6> Ameerpet</h6>
            <BorderLinearProgress variant="determinate" value={25} /> 50(25%) 
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
            <h6>Dilsukhnagar </h6>
            <BorderLinearProgress variant="determinate" value={25} /> 50(25%)
          </Box>
        </div>
      </div>
      <div className="progreebar rounded rounded-5 mt-5 pb-4">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Fee</h4>
        <div className="  justify-content-around pt-4 row progreebar-show">
          <Box className=" col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
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
          </Box>
        </div>
      </div>
      <div className="progreebar rounded rounded-5 mt-5 pb-4">
        <h4 className="pt-4 mt-3 enrollment ps-4"> Total Users</h4>
        <div className="row justify-content-around pt-4 progreebar-show">
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6> Hi-tech City</h6>
            <BorderLinearProgress variant="determinate" value={38} />180(38%) 
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
            <h6> Ameerpet</h6>
            <BorderLinearProgress variant="determinate" value={12} />70 (12%)
          </Box>
          <Box className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3 ">
            <h6>Dilsukhnagar </h6>
            <BorderLinearProgress variant="determinate" value={50} /> 250 (50%)
          </Box>
        </div>
      </div>

      {/* <div > 
      
     
      This is for progress bar
     <div className="progress mt-3"> 
     <div className="enrollment">  
     <h4 className="pt-3"> Total Entrollment</h4>
     <div className="d-flex  justify-content-around">  
     <Box className="w-25"> 
     <h6> Hi-tech City</h6>
    <BorderLinearProgress variant="determinate" value={75}  /> 75%
   </Box>
   <Box className="w-25"> 
   <h6> Ameerpet</h6>
    <BorderLinearProgress variant="determinate" value={25}  /> 25%
   </Box>
   <Box className="w-25"> 
   <h6>Dilsukhnagar </h6>
    <BorderLinearProgress variant="determinate" value={45}  /> 45%
   </Box>
     </div>
    
     </div>  </div>
      */}
    </>
  );
};

export default Dashboard;
