import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Feefolloup.css";
import axios from 'axios';

const Feefollowup = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [displayTodayTable, setDisplayTodayTable] = useState(true);
  const [getstudentData, setData] = useState()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 useEffect(() => {
  axios.get('http://localhost:3030/getstudent_data')
  .then((response) => {
    setData(response.data);
    
    console.log("data", response.data);
  })
  .catch((error) => {
    // Handle any errors that occur during the request
    console.error("Error fetching data:", error);
  });
 }, []);


  return (
    <div className="fee">
      <div className="feedetails">
        <button className={`feebtn me-5 mb-2 ${displayTodayTable ? 'active' : ''}`} 
        onClick={() => setDisplayTodayTable(true)}
        > Today </button>
        <button className={`feebtn ${!displayTodayTable ? 'active' : ''}`} 
        onClick={() => setDisplayTodayTable(false)}
        > Upcoming</button>
      </div>
      <div className="d-flex justify-content-between">
        <input
          type="text"
          className="input-field ps-2 "
          placeholder="Search Here..."
          autoComplete="off"
          style={{
            height: "45px",
            width: "50%",
            border: "none",
            outline: "none",
            borderTop: 'none',
            borderBottom: "1.5px solid black",
            background: "none",
            borderRadius: "5px",

          }} />
        <h6 onClick={handleClick} className="pe-4"> Filter</h6>
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
          <MenuItem> Filter</MenuItem>
          <hr />
          <div className="d-flex">
            <MenuItem className="pt-3 ">
              <div>
                <label> From: </label>
              </div>

              <input
                type="date"
                className="form-control"
                style={{
                  height: "45px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="fromdate"

              />
            </MenuItem>
            <MenuItem className="pt-3 ">
              <label> To: </label>
              <br />
              <input
                type="date"
                className="form-control"
                style={{
                  height: "45px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="todate"

              />
            </MenuItem>
          </div>
          <div className="d-flex w-100 mt-3">
            <MenuItem>
              <select
                id=""
                placeholder="Filter Branch"
                style={{
                  height: "45px",
                  paddingLeft: "10px",
                  paddingRight: "115px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="branch"

              >
                <option value="">Branch</option>
                <option value="hitechcity"> Hitech city</option>
                <option value="ameerpet"> Ameerpet</option>
                <option value="dilsukhnagar"> Dilsukhnagar</option>
                <option value="gachibowli"> Gachibowli</option>
              </select>
            </MenuItem>
            <MenuItem>
              <select
                id=""
                placeholder="select Type"
                style={{
                  height: "45px",

                  paddingRight: "105px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="branch"

              >
                <option> Select Type</option>
                <option value="paidamount"> Paid Amount</option>
                <option value="dueamount"> Due Amount</option>

              </select>
            </MenuItem>
          </div>

        </Menu>
      </div>

{/* today followups */}
{displayTodayTable && (
      <TableContainer component={Paper} className="pt-4" id="">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <h3>Today</h3>
            <TableRow>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> S.NO</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">Name<br /> Branch <br /> Counsellor</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Contact</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Email</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Course</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> Due Date</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Due Amount </TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> Paid Status</TableCell>

              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
      
            <TableRow

              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" className="border border 1">

              </TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
)}

{/* upcoming followups */}
{!displayTodayTable && (
  
      <TableContainer component={Paper} className="pt-4" id="">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <h3>Up Coming</h3>
            <TableRow>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> S.NO</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">Name Branch/ Counsellor</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Contact</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Email</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Course</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> Due Date</TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> Due Amount </TableCell>
              <TableCell className="bg-primary fs-6 border border 1 text-center text-light "> Paid Status</TableCell>

              <TableCell className="bg-primary fs-6 border border 1 text-center text-light"> View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow

              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" className="border border 1">

              </TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
              <TableCell className="border border 1"></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
)}
    </div>
  )
}
export default Feefollowup;