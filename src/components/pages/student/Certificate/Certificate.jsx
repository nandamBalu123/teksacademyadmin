import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Certificate.css";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import axios from "axios";
const Certificate = () => {
  const { students } = useStudentsContext();
  const [courseStartDate, setcourseStartDate] = useState();
  const [courseEndDate, setcourseEndDate] = useState();
  const [CertificateStatus, setCertificateStatus] = useState();
  const [itemsPerPage, setrecordsPerPage] = useState(10);

  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  ////////////////////pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const records = students.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSubmit = async () => {
    const studentdata = {
      courseStartDate,
      courseEndDate,
      CertificateStatus,
    };
    try {
      // Make the POST request
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/`,
        studentdata
      );
      // Handle a successful response here
      console.log("Responsee:", response.data.insertId);
    } catch (error) {
      // Handle the error here
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.log(
          "Server returned an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request error:", error.message);
      }
    }
  };
  let initialDataCount = students.length;
  let recordCount = students.length;

  return (
    <div className="container main-certificate mt-3">
      <div className="certificate mt-2">
        <h3 className="mx-3 mt-3"> Certificate </h3>
        <div className="row mb-3 px-4 pt-2">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8">
            <input
              type="text"
              className="input-field ps-2"
              placeholder="Search Here...."
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
            />
            <hr className="w-75" />
          </div>
          <div className="col-4 col-md-1 col-lg-1 col-xl-1 pt-3">
          <h6>
            {" "}
            {recordCount}/{initialDataCount}
          </h6>
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1  pt-3">  
        <select  onChange={handlerecorddata}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </select>
        </div>

          <div className="col-4 col-md-1 col-lg-1 col-xl-1 ">
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <button
                className="btn btn-primary mr-20 ms-2 mb-2"
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
                <label className="mt-3 me-3">Profile:</label>
                <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",
                    paddingRight: "145px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                ></select>
              </MenuItem>
              <MenuItem>
                <label className="mt-3 me-3"> Branch: </label>
                <select
                  className="mt-3"
                  id=""
                  required
                  style={{
                    height: "45px",
                  
                    paddingRight: "50px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="branch"
                >
                  <option value="">--select--</option>

                  <option value="hitechcity">Hi-tech City</option>
                  <option value="dilsukhnagar">dilshukanagar</option>
                  <option value="ameerpet">ameerpet</option>
                  <option value="gachibowli">gachibowli</option>
                </select>
              </MenuItem>
              <MenuItem className="d-flex justify-content-between">
                <button className="save"> Save</button>
                <button className="clear"> Clear</button>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <Paper sx={{ width: "100%", overflow: "hidden" }} className="my-4">
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    S. No
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Name
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Registration ID
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course StartDate
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    Course EndDate
                  </TableCell>

                  <TableCell className="bg-primary text-light fs-6">
                    {" "}
                    Certificate Issue
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records &&
                records.map((student, index) => (
                    <TableRow>
                      <TableCell className="border border 1 ">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border 1">
                        {student.name}
                      </TableCell>
                      <TableCell className="border border 1 ">
                        {student.courses}
                      </TableCell>
                      <TableCell className="border border 1 ">
                        {student.registrationnumber}
                      </TableCell>
                      <TableCell className="border border 1 ">
                        <input
                          type="date"
                          name="startdate"
                          className="startdate"
                        />
                      </TableCell>
                      <TableCell className="border border 1 ">
                        <input type="date" name="enddate" className="enddate" />
                      </TableCell>
                      <TableCell className="border border 1  text-center fs-6">
                        <button className="btn btn-primary center">
                          Apply
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div style={{ display: "flex", justifyContent: "center" }} className="mt-3">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(students.length / itemsPerPage)}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
