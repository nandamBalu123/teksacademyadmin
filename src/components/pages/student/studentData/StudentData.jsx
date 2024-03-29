import * as React from "react";

import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";
// import { FaRegIdCard } from "react-icons/fa";
import BadgeIcon from '@mui/icons-material/Badge';

import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import PrintIcon from "@mui/icons-material/Print";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

import { Link, NavLink, useNavigate } from "react-router-dom";

import { LastPage } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

import { useUsersContext } from "../../../../hooks/useUsersContext";
// import { CSVLink } from "react-csv";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
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

const StudentData = () => {
  const navigate = useNavigate();
  const { branches } = useBranchContext();
  const { students, dispatch } = useStudentsContext();

  const { users } = useUsersContext();
  const { leadsources } = useLeadSourceContext();
  const [isChecked, setIsChecked] = useState(false);
  const [opening, setOpening] = React.useState(false);

  const handleClickOpen = () => {
    setOpening(true);
  };

  const handleClosed = () => {
    setOpening(false);
  };
  const handleok = () => {
    setIsChecked(!isChecked);

    setOpening(false);
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

    branch: "",

    leadsource: "",

    modeoftraining: "",

    enquirytakenby: "",

    search: "",
  });

  const [dummyFilterCriteria, setDummyFilterCriteria] = useState({

    fromdate: "",
    todate: "",
    branch: "",

    leadsource: "",

    modeoftraining: "",

    enquirytakenby: "",

    search: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDummyFilterCriteria({
      ...dummyFilterCriteria, [name]: value
    });
    if (name === "search") {
      setFilterCriteria({
        ...filterCriteria, [name]: value
      });
    }
  };

  const handleSave = (e) => {
    setFilterCriteria(dummyFilterCriteria);
  };

  const [getusers, setgetusers] = useState([]);
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);
  const role = localStorage.getItem("role");
  let userId = localStorage.getItem("id");
  userId = parseInt(userId);

  useEffect(() => {
    if (students) {
      setData(students);
    }
  }, [students]);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
    //   .then((response) => {
    //     // Handle the successful response here
    //     setData(response.data); // Update the data state with the fetched data
    //     if (role == "counsellor") {
    //       const filteredResults = response.data.filter((item) => {
    //         const user_id = parseInt(item.user_id);

    //         const dataaspercounsellor = userId ? user_id === userId : true;
    //         return dataaspercounsellor;
    //       });
    //       setData(filteredResults); // Update the data state with the fetched data
    //     }

    //     console.log("data", response.data);
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur during the request
    //     console.error("Error fetching data:", error);
    //   });
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
        item.mobilenumber
          .includes(filterCriteria.search) ||
        item.email
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.branch
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.registrationnumber
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.courses
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.coursepackage
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.state
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.modeoftraining
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

      // const sourceCondition = filterCriteria.leadsource
      //   ? item.leadsource === filterCriteria.leadsource
      //   : true;

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
        // sourceCondition &&
        modeCondition &&
        counsellarCondition
      );
    });
    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  useEffect(() => {
    const filteruser = getusers.filter((user) => {
      const filtercounsellar = user.profile.toLowerCase() === "counsellor";
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
    setDummyFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      leadsource: "",

      modeoftraining: "",

      enquirytakenby: "",

      search: "",

    })
  };

  // img
  // const [files, setFiles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Make a GET request to fetch the list of files
  //   fetch('http://localhost:3030/files') // Replace with the actual endpoint of your Node.js server
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setFiles(data.response_data);
  //       setLoading(false); // Set loading to false on success
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false); // Set loading to false on error
  //     });
  // }, []);
  let [excelData, setExcelData] = useState()

  useEffect(() => {
    const modifiedData = filteredData.map(item => {
      const { imgData, studentImg, ...rest } = item;
      return rest;
    });

    let excelData = [];

    // Check if modifiedData is an array of objects
    if (modifiedData.every(item => typeof item === 'object' && !Array.isArray(item))) {
      excelData = modifiedData;
    } else {
      // If not, wrap it in an array
      excelData.push(modifiedData);
    }

    setExcelData(excelData);
  }, [filteredData]);


  useEffect(() => {
    console.log("excelData", excelData)
  }, [excelData])
  return (
    <div className="container">
      {/* <div>
      {loading && <p>Loading files...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {files.map((file, index) => (
            <div key={index}>
              <img src={file.s3_url} alt={file.filename} width={"100px"}/>
            </div>
          ))}
        </div>
      )}
    </div> */}

      <div className="studetdetails   mt-3">
        <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
        <h5 className=" mt-3 text-center"> Student Data </h5>

        <div className="row mb-1 ps-1 ">
          <div className="col-12 col-md-6 col-lg-8 col-xl-8">
            <input
              type="text"
              className="input-field"
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
              value={filterCriteria.search}
              onChange={handleInputChange}
            />
            <hr />
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4">
            <div className="d-flex justify-content-around">
              <p className="pt-3">

                {filterCriteria.search === "" && itemsPerPage <= initialDataCount ? (
                  <p>{itemsPerPage}/{initialDataCount}{" "}</p>
                ) : (
                  <p>{recordCount}/{initialDataCount}{" "}</p>

                )}
                {/* {recordCount}/{initialDataCount}{" "} */}
              </p>

              <p>
                <select onChange={handlerecorddata} className="mt-3">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="250">250</option>
                  <option value="500">500</option>
                  <option value="750">750</option>
                  <option value="1000">1000</option>
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
                        value={dummyFilterCriteria.fromdate}
                        onChange={handleInputChange}
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
                        value={dummyFilterCriteria.todate}
                        onChange={handleInputChange}
                      />
                    </div>


                  </div>

                  <div className="row m-2">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Branch</InputLabel>
                        <Select
                          name="branch"
                          value={dummyFilterCriteria.branch}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="select"> ---select---</MenuItem>
                          {branches &&
                            branches.map((branch, index) => (
                              <MenuItem
                                key={branch.id}
                                value={branch.branch_name}
                              >
                                {branch.branch_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Counsellors</InputLabel>
                        <Select
                          name="enquirytakenby"
                          value={dummyFilterCriteria.enquirytakenby}
                          onChange={handleInputChange}
                        >
                          {filteredcounsellor &&
                            filteredcounsellor.map((user, index) => (
                              <MenuItem value={user.fullname}>
                                {" "}
                                {user.fullname}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                    {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Lead Source</InputLabel>
                      <Select
                          name="leadsource"
                          value={filterCriteria.leadsource}
                          onChange={handleInputChange}
                        >
                          {leadsources &&
                            leadsources.map((item, index) => (
                              <MenuItem key={item.id} value={item.leadsource}>
                                {item.leadsource}
                              </MenuItem>
                            ))}
                        </Select> 
                      </FormControl>
                    </div> */}

                    {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <MenuItem>
                  <select
                    id=""
                    className="w-100 pe-5"
                    placeholder="Filter Branch"
                    style={{
                      height: "45px",
                     paddingRight:"5rem",
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
                 </div> */}
                    {/*              
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">  
              <MenuItem>
                  <select
                    id=""
                    className="w-100"
                    placeholder="Lead Source"
                    required
                    style={{
                      height: "45px",
                     paddingRight:"2rem",
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
              </div> */}
                  </div>

                  <div className="row m-2">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Mode of Traning</InputLabel>
                        <Select
                          name="modeoftraining"
                          value={dummyFilterCriteria.modeoftraining}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="online"> Online</MenuItem>
                          <MenuItem value="offline"> Offline</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>Counsellors</InputLabel>
                        <Select
                          name="enquirytakenby"
                          value={filterCriteria.enquirytakenby}
                          onChange={handleInputChange}
                        >
                          {filteredcounsellor &&
                            filteredcounsellor.map((user, index) => (
                              <MenuItem value={user.fullname}>
                                {" "}
                                {user.fullname}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div> */}
                  </div>

                  {/*             
              <div className="d-flex w-100 mt-3 mb-2">
                <MenuItem>
                  <select
                    id=""
                    placeholder="Mode of Training"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "1rem",
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
                      paddingRight: "4rem",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="enquirytakenby"
                    value={filterCriteria.enquirytakenby}
                    onChange={handleInputChange}
                  >
                    <option>Counsellor</option>
                    {filteredcounsellor &&
                      filteredcounsellor.map((user, index) => (
                        <option value={user.fullname}> {user.fullname}</option>
                      ))}
                   
                  </select>
                </MenuItem>{" "}
              </div> */}
                  <div className="d-flex justify-content-between px-3
                  ">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button onClick={handleSave} className="btn btn-color" >

                      Save
                    </button>
                  </div>
                </Menu>
              </p>
              <p>
                {Array.isArray(excelData) && role !== "counsellor" && (
                  <CSVLink
                    data={excelData}
                    filename={"studentsdata.csv"}
                    target="_blank"
                  >
                    <DownloadIcon className="icon-color mt-4"></DownloadIcon>
                  </CSVLink>
                )}
              </p>
            </div>
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
        <div className="student-table">
          <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell-heading">SNo</TableCell>
                  <TableCell className="table-cell-heading">
                    Student Name <br /> Registration No
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Branch <br />
                    Course
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Counsellor
                    <br /> Source
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Contact Number <br />
                    Email
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Joining Date <br />
                    Training Mode
                  </TableCell>

                  <TableCell className="table-cell-heading">Actions</TableCell>
                  <TableCell className="table-cell-heading" style={{ width: "40px" }}>STUDENIDCARD</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(records) && records.length > 0 ? (
                  records.map((item, index) => {
                    let date = new Date(item.admissiondate);
                    const day = date.getUTCDate();
                    const monthIndex = date.getUTCMonth();
                    const year = date.getUTCFullYear();

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
                    date = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                      }-${year}`;

                    // Updating the state with the formatted date

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="Table-cell">
                          {(page - 1) * itemsPerPage + index + 1}
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            title={item.name}
                            style={{
                              width: "9rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.name}
                            <span
                              title={item.registrationnumber}
                              style={{
                                width: "9rem",
                                whiteSpace: "nowrap",
                                overflow: "hidden",

                                textOverflow: "ellipsis",
                                fontSize: "0.8rem",
                                display: "block",
                              }}
                            >
                              {" "}
                              {item.registrationnumber}
                            </span>
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            title={item.branch}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.branch}
                          </span>

                          <span
                            title={item.courses}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {" "}
                            {item.courses}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.enquirytakenby}
                          </span>
                          <span
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {/* {item.leadsource[0].source} */}
                            {item.leadsource &&
                              item.leadsource.map((source) => (
                                <p style={{ fontSize: "0.8rem" }}>{source.source}</p>
                              ))}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            style={{
                              width: "8rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.mobilenumber}
                          </span>

                          <span
                            style={{
                              width: "8rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.email}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            style={{
                              width: "7rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {date ? date : "No Date"}
                          </span>

                          <span
                            style={{
                              width: "7rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.modeoftraining}
                          </span>
                        </TableCell>

                        <TableCell>
                          <div className="d-flex justify-content-evenly">
                            <NavLink to={`/studentdataview/${item.id}`}>
                              <VisibilityIcon
                                titleAccess="view"
                                style={{ width: "40px" }}
                                className="icon-color"
                              />
                            </NavLink>

                            <NavLink to={`/editstudent/${item.id}`}>
                              <EditIcon
                                titleAccess="Edit"
                                style={{ width: "40px" }}
                                className="icon-color"
                              />
                            </NavLink>
                            <NavLink to={`/feeview/${item.id}`}>
                              <CurrencyRupeeIcon
                                titleAccess="Fee"
                                style={{ width: "40px" }}
                                className="icon-color"
                              />
                            </NavLink>
                            {/* {item.addfee == 1 && (
                              <NavLink to={`/feeview/${item.id}`}>
                                <CurrencyRupeeIcon style={{ width: "40px" }} />
                              </NavLink>
                            )}
                            {item.addfee == 0 && (
                              <NavLink to={`/addtofee/${item.id}`}>
                                <AddIcon style={{ width: "40px" }} />
                              </NavLink>
                            )} */}

                            <NavLink to={`/studentApplicationprint/${item.id}`}>
                              <PrintIcon
                                titleAccess="print"
                                className="icon-color"
                                style={{ width: "40px" }}
                              />
                            </NavLink>
                            {/* 
                            <div className="form-check form-switch ms-1">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={isChecked}
                                onChange={handleClickOpen}
                              />
                            </div> */}

                            <Dialog open={opening} onClose={handleClosed}>
                              <DialogContent>
                                <DialogContentText>
                                  <label> Enter Remarks :</label>
                                </DialogContentText>
                                <DialogContentText>
                                  <textarea
                                    rows="3"
                                    cols="50"
                                    name="comment"
                                    form="usrform"
                                  ></textarea>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClosed}>Cancel</Button>
                                {!isChecked && (
                                  <Button onClick={handleok}>Activate</Button>
                                )}

                                {isChecked && (
                                  <Button onClick={handleok}>InActivate</Button>
                                )}
                              </DialogActions>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          <NavLink to={`/getstudentidcard/${item.id}`}>
                            <div style={{ fontSize: "25px", color: "#2a619d", cursor: "pointer", display: "flex", justifyContent: "center" }}>
                              < BadgeIcon />
                            </div>
                          </NavLink>

                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>
                )}{" "}
              </TableBody>
            </Table>
          </TableContainer>
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

export default StudentData;
