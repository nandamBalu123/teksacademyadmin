import React from "react";

import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useState } from "react";

import { useEffect } from "react";
import "./Webinar.css";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

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
const Webinar = () => {
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

  ////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [initialData, setData] = useState([{ name: "" }]);
  // const [initialData, setData] = useState(initialDataa);
  // start

  // console.log("initialDataklsjd: ", initialData)
  // useEffect(() => {
  //   // Fetch data based on the user's role and ID
  //   if (role === "admin") {

  //     fetchAllData().then((data) => {
  //       setData(data);
  //     });
  //   } else {

  //     fetchDataById(userId).then((data) => {
  //       setData(data);
  //     });
  //   }
  // }, [role, userId]);

  // end

  let initialDataCount = initialData.length;

  const [filteredData, setFilteredData] = useState(initialData);

  let recordCount = filteredData.length;

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    search: "",
  });
  const records = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // for date
  //// reset filters
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",

      todate: "",

      search: "",
    });
  };
  return (
    <div className="container mt-3">
      <div className="webinar">
        <h5 className="text-center mt-3"> Webinar Leads</h5>
        <div className="row mb-1 ps-1 ">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8  input-field">
            <input
              type="text"
              className="input-field ps-1"
              placeholder="Search Here..."
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
            <hr />
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4">
            <div className="d-flex justify-content-around">
              <p className="pt-3">staic/st</p>

              <p>
                <select onChange={handlerecorddata} className="mt-3">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                </select>
              </p>
              <p>
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
                    Filter
                  </button>
                </Button>
                <Menu
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
                  <div className="d-flex justify-content-between m-2">
                    <div> Filter</div>

                    <div>
                      {" "}
                      <CloseIcon onClick={handleClose} />{" "}
                    </div>
                  </div>
                  <hr />
                  <div className="row m-2">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <TextField
                        label=" From:"
                        type="date"
                        variant="standard"
                        className="  w-100"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="fromdate"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                      <TextField
                        label=" To:"
                        type="date"
                        variant="standard"
                        className="w-100"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        name="todate"
                      />
                    </div>
                  </div>

                  <div className="text-end me-2 mt-4">
                    <button className="btn btn-color" onClick={filterreset}>
                      {" "}
                      Clear
                    </button>
                  </div>
                </Menu>
              </p>
            </div>
          </div>
        </div>
        <div className="student-table">
          <Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table " borderAxis="both">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="table-cell-heading">
                      SNo
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Date
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      Name
                    </StyledTableCell>

                    <StyledTableCell className="table-cell-heading">
                      Email
                    </StyledTableCell>

                    <StyledTableCell className="table-cell-heading">
                      Contact Number
                    </StyledTableCell>

                    <StyledTableCell className="table-cell-heading">
                      Course
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>{" "}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="my-3"
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              onChange={handlePageChange}
              color="info"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Webinar;
