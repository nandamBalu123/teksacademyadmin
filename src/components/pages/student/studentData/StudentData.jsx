import * as React from "react";

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
import PrintIcon from "@mui/icons-material/Print";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import ShowChartIcon from "@mui/icons-material/ShowChart";

import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./StudentData.css";

import { useState } from "react";

import { useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";

import VisibilityIcon from "@mui/icons-material/Visibility";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

import DownloadIcon from "@mui/icons-material/Download";

import RefreshIcon from "@mui/icons-material/Refresh";
// import { initialDataa } from "./data";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { CSVLink } from "react-csv";

import { Link } from "react-router-dom";

import { LastPage } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
import axios from "axios";
// import { CSVLink } from "react-csv";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

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

const StudentData = () => {
  const { branches } = useBranchContext();
  const { leadsources } = useLeadSourceContext();

  const [initialData, setData] = useState([{ name: "" }]);
  // const [initialData, setData] = useState(initialDataa);

  let initialDataCount = initialData.length;

  const [filteredData, setFilteredData] = useState(initialData);

  let recordCount = filteredData.length;

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    leadsource: "",

    modeoftraining: "",

    enquirytakenby: "",

    search: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };
  const [getusers, setgetusers] = useState([]);
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
      .then((response) => {
        // Handle the successful response here
        setData(response.data); // Update the data state with the fetched data

        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/userdata`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setgetusers(data);
      } catch (err) {
        // setError(err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.name
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.branch
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.registrationnumber.includes(filterCriteria.search) ||
          item.courses
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.enquirytakenby
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase())
        : true;

      const dateCondition =
        filterCriteria.fromdate && filterCriteria.todate
          ? item.admissiondate >= filterCriteria.fromdate &&
            item.admissiondate <= filterCriteria.todate
          : true;

      const branchCondition = filterCriteria.branch
        ? item.branch === filterCriteria.branch
        : true;

      const sourceCondition = filterCriteria.leadsource
        ? item.leadsource === filterCriteria.leadsource
        : true;

      const modeCondition = filterCriteria.modeoftraining
        ? item.modeoftraining === filterCriteria.modeoftraining
        : true;

      const counsellarCondition = filterCriteria.enquirytakenby
        ? item.enquirytakenby === filterCriteria.enquirytakenby
        : true;

      return (
        searchCondition &&
        dateCondition &&
        branchCondition &&
        sourceCondition &&
        modeCondition &&
        counsellarCondition
      );
    });

    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  useEffect(() => {
    const filteruser = getusers.filter((user) => {
      const filtercounsellar = user.profile === "counsellor";
      return filtercounsellar;
    });
    setfilteredcounsellor(filteruser);
  }, [getusers]);

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

  const records = filteredData.slice(startIndex, endIndex);
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
  // for date
  //// reset filters
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      leadsource: "",

      modeoftraining: "",

      enquirytakenby: "",

      search: "",
    });
  };

  return (
    <div>
      <div className="studetdetails container  mt-3">
        <h3 className="ms-5 mt-4 "> Student Data </h3>
        <div className="row mb-3 px-4 pt-3">
          <div className="col-10 col-md-7 col-lg-7 col-xl-7  input-field">
            <input
              type="text"
              className="input-field ps-2"
              placeholder="Search Here..."
              autoComplete="off"
              style={{
                height: "45px",
                width: "50%",

                outline: "none",
                borderTop: "none",
                borderBottom: "1.5px solid black",
                background: "none",
                border: "hidden",
                borderRadius: "5px",
              }}
              name="search"
              value={filterCriteria.search}
              onChange={handleInputChange}
            />
            <hr />
          </div>
          <div
            className=" col-2 col-md-1 col-lg-1 col-xl-1 "
            style={{ cursor: "pointer" }}
          >
            {" "}
            {/* <RefreshIcon onClick={filterreset} />{" "} */}
          </div>
          <div className="col-3 col-md-1 col-lg-1 col-xl-1 pt-2">
            <h6>
              {" "}
              {recordCount}/{initialDataCount}
            </h6>
          </div>

          <div className="col-3 col-md-1 col-lg-1 col-xl-1 pt-2">
            {" "}
            <h6 onClick={handleClick} style={{ cursor: "pointer" }}>
              {" "}
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
                  <CloseIcon onClick={handleClose} />{" "}
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
              <div className=" row mt-3">
                <div className="col-6 col-md-6 col-lg-6 col-xl-6">
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
                      value={filterCriteria.branch}
                      onChange={handleInputChange}
                    >
                      <option value="">Branch</option>
                      {branches &&
                        branches.map((item, index) => (
                          <option key={item.id} value={item.branch_name}>
                            {item.branch_name}
                          </option>
                        ))}
                    </select>
                  </MenuItem>
                </div>
                <div className="col-6 col-md-6 col-lg-6 col-xl-6">
                  <MenuItem>
                    <select
                      id=""
                      placeholder="Lead Source"
                      required
                      style={{
                        height: "45px",
                        paddingRight: "115px",

                        border: "1.5px solid black",
                        borderRadius: "5px",
                      }}
                      name="leadsource"
                      value={filterCriteria.leadsource}
                      onChange={handleInputChange}
                    >
                      <option value="">LeadSource</option>
                      {leadsources &&
                        leadsources.map((item, index) => (
                          <option key={item.id} value={item.leadsource}>
                            {item.leadsource}
                          </option>
                        ))}
                    </select>
                  </MenuItem>
                </div>
              </div>
              <div className="d-flex w-100 mt-3 mb-2">
                <MenuItem>
                  <select
                    id=""
                    placeholder="Mode of Traning"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "102px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    //
                    name="modeoftraining"
                    value={filterCriteria.modeoftraining}
                    onChange={handleInputChange}
                  >
                    <option value="">Mode Of Training</option>
                    <option value="online"> Online</option>
                    <option value="offline"> Offline</option>
                  </select>
                </MenuItem>
                <MenuItem>
                  <select
                    id=""
                    placeholder="Counsellors"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "133px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="enquirytakenby"
                    value={filterCriteria.enquirytakenby}
                    onChange={handleInputChange}
                  >
                    <option>counsellor</option>
                    {filteredcounsellor &&
                      filteredcounsellor.map((user, index) => (
                        <option value={user.fullname}> {user.fullname}</option>
                      ))}
                    {/* <option value="kavya"> kavya</option>
                    <option value="mark"> Mark</option>
                    <option value="david"> David</option>
                    <option value="kavya"> kavya</option> */}
                  </select>
                </MenuItem>{" "}
              </div>
              <MenuItem className="d-flex justify-content-between">
                {/* <button className="save"> Save</button> */}
                <button className="clear" onClick={filterreset}>
                  {" "}
                  Clear
                </button>
              </MenuItem>
            </Menu>
          </div>
          <div className="col-3 col-md-1 col-lg-1 col-xl-1 pt-2 ">
            {" "}
            <select onChange={handlerecorddata}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </select>
          </div>
          <div className="col-3 col-md-1 col-lg-1 col-xl-1 pt-2 ">
            <CSVLink
              data={filteredData}
              filename={"studentsdata.csv"}
              target="_blank"
            >
              <DownloadIcon className="text-dark"></DownloadIcon>
            </CSVLink>{" "}
          </div>
        </div>
        {/*
        <table className="table table-striped">
        <thead>
    <tr>

      <th  className="  bg-primary fs-6 border border 1 text-center text-light"
                  align="left">  S.No</th>
      <th  className="  bg-primary fs-6 border border 1 text-center text-light"
                  align="left">  Student Name <br /> Registration No</th>
      <th  className="bg-primary fs-6 border border 1 text-center text-light"
                  align="left"> Branch <br /> Course</th>
      <th  className="bg-primary fs-6 border border 1 text-center text-light"
                  align="left">Counseller
                  <br /> Source</th>
      <th  className="bg-primary fs-6 border border 1 text-center text-light"
                  align="left">Contact Number
                  <br /> Email ID</th>
                  <th  className="bg-primary fs-6 border border 1 text-center text-light"
                  align="left"> Joining Date <br />
                  Traning Mode
                  </th>
                  <th  className="bg-primary fs-6 border border 1 text-center text-light"
                  align="left"> Actions
                </th>
    </tr>
  </thead>
  <tbody>

  </tbody>
</table> */}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-primary fs-6 border border 1 text-center  text-light  ">
                    SNo
                  </TableCell>
                  <TableCell
                    className="  bg-primary fs-6 border border 1 text-center text-light "
                    align="left"
                  >
                    Student Name <br /> Registration No
                  </TableCell>
                  <TableCell
                    className="  bg-primary fs-6 border border 1 text-center text-light "
                    align="left"
                  >
                    Branch <br />
                    Course
                  </TableCell>

                  <TableCell
                    className="bg-primary fs-6 border border 1 text-center text-light"
                    align="left"
                  >
                    Counseller
                    <br /> Source
                  </TableCell>

                  <TableCell
                    className="bg-primary fs-6 border border 1 text-center text-light "
                    align="left"
                  >
                    Contact Number <br />
                    Email
                  </TableCell>

                  <TableCell
                    className="bg-primary fs-6 border border 1 text-center text-light "
                    align="left"
                  >
                    Joining Date <br />
                    Traning Mode
                  </TableCell>

                  <TableCell
                    className="bg-primary fs-6 border border 1 text-center text-light"
                    align="left"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(records) && records.length > 0 ? (
                  records.map((item, index) => (
                    // <li key={item.id}>{item.name}</li>

                    <TableRow key={item.id}>
                      <TableCell className=" border border 2 text-center p-0 m-0">
                        {index + 1}
                      </TableCell>
                      {/*
                  <StyledTableCell className=" border border 2 text-center">
                    {item.profilepic}
                  </StyledTableCell> */}

                      <TableCell className=" border border 1 text-center p-0 m-0">
                        {item.name}
                        <br />
                        {item.registrationnumber}
                      </TableCell>

                      <TableCell
                        align="left"
                        className=" border border 1 text-center p-0 m-0"
                      >
                        {item.branch}
                        <br />
                        {item.courses}
                      </TableCell>

                      <TableCell className=" border border 1 text-center p-0 m-0">
                        {item.enquirytakenby}
                        <br />

                        {item.leadsource}
                      </TableCell>

                      <TableCell className=" border border 1 text-center p-0 m-0 ">
                        {item.mobilenumber}
                        <br />
                        <span
                          style={{
                            width: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "15px",
                          }}
                        >
                          {item.email}
                        </span>
                      </TableCell>

                      <TableCell className=" border border 1 text-center p-0 m-0">
                        {item.admissiondate
                          ? item.admissiondate.substring(0, 10)
                          : "No Date"}{" "}
                        <br />
                        {item.modeoftraining}
                      </TableCell>

                      <TableCell className=" text-center d-flex py-4 ">
                        <Link
                          to={`/studentdataview/${item.id}`}
                          style={{ width: "40px" }}
                        >
                          <VisibilityIcon className="iconn" />
                        </Link>

                        <Link
                          to={`/editstudent/${item.id}`}
                          style={{ width: "40px" }}
                        >
                          <EditIcon className="iconn" />
                        </Link>
                        {item.addfee == 1 && (
                          <Link
                            to={`/feeview/${item.id}`}
                            style={{ width: "40px" }}
                          >
                            <CurrencyRupeeIcon className="iconn" />
                          </Link>
                        )}
                        {item.addfee == 0 && (
                          <Link
                            to={`/addtofee/${item.id}`}
                            style={{ width: "40px" }}
                          >
                            <AddIcon className="iconn" />
                          </Link>
                        )}

                        <Link
                          to={`/studentApplicationprint/${item.id}`}
                          style={{ width: "40px" }}
                        >
                          <PrintIcon className="iconn" />
                        </Link>
                        <Link to={`//${item.id}`} style={{ width: "40px" }}>
                          <DeleteOutlineIcon
                            style={{ color: "red" }}
                            className="iconn"
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>
                )}{" "}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default StudentData;
