import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Report.css";

const Report = () => {
  const { id } = useParams();
  const [data, setData] = useState([
    { reportName: "BranchWiseData" },
    { reportName: "CourseWiseData" },
    { reportName: "CounsellorWiseData" },
  ]);
  return (
    <div className="container mt-3">
      <div className="mini-reports">
        <h5 className="ms-2 mt-3">
          {" "}
          Report Name : {data[parseInt(id)].reportName}{" "}
        </h5>
        <div className="row mb-2">
          <h6 className="col-6 col-md-2 col-lg-2 col-xl-2 mt-3 text-center ">
            {" "}
            Created At:
          </h6>
          <span className="col-6 col-md-2 col-lg-2 col-xl-2">
            <FormControl variant="standard" className="w-100">
              <InputLabel>Custom</InputLabel>
              <Select id="custom" name="custom">
                <MenuItem value=""> Today</MenuItem>
                <MenuItem value=""> Last 7 Days</MenuItem>
                <MenuItem value=""> Last 15 days</MenuItem>
              </Select>
            </FormControl>
          </span>
          <span className="col-6 col-md-2 col-lg-2 col-xl-2">
            {" "}
            <TextField
              label="Start Date"
              type="date"
              variant="standard"
              className="w-100"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </span>
          <span className="col-6 col-md-2 col-lg-2 col-xl-2">
            {" "}
            <TextField
              label="End Date"
              type="date"
              variant="standard"
              className="w-100"
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </span>
          <button className="col-6 col-md-1 col-lg-1 col-xl-1 btn btn-primary">
            {" "}
            Apply
          </button>

          {/* <button className="col-6 col-md-1 col-lg-1 col-xl-1 btn btn-primary ms-3" >  Filter</button> */}
          <button className="col-6 col-md-1 col-lg-1 col-xl-1 btn btn-primary ms-3">
            {" "}
            Save
          </button>
        </div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           
            <TableCell align="right"> Owner</TableCell>
            <TableCell align="right"> Source</TableCell>
            <TableCell align="right"> Pipeline Stage</TableCell>
            <TableCell align="right"> Number of Leads</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
     
            <TableRow
 
            >
              <TableCell>
           
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
     
        </TableBody>
      </Table>
    </TableContainer>

      </div>
    </div>
  );
};

export default Report;
