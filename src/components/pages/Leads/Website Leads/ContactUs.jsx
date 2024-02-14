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

import "./Webinar.css";

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

import { Link, NavLink } from "react-router-dom";

import { LastPage } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
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
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.blue,

//     color: theme.palette.common.white,
//   },

//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },

//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

const ContactUs = () => {
  const [students, setWebinarForm] = useState([]);
  const { branches } = useBranchContext();
  const { getcourses } = useCourseContext();
  // const { students, dispatch } = useStudentsContext();


  console.log("branches", branches);
  console.log("courses", getcourses);


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


  let initialDataCount = initialData.length;

  const [filteredData, setFilteredData] = useState(initialData);

  let recordCount = filteredData.length;

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",



    search: "",
  });
  const [dummyFilterCriteria, setDummyFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",



    search: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDummyFilterCriteria({ ...dummyFilterCriteria, [name]: value });
    if (name == "search") {
      setFilterCriteria({
        ...filterCriteria, [name]: value
      })
    }
  };
  // const [getusers, setgetusers] = useState([]);
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

    axios
      .get(`${process.env.REACT_APP_API_URL}/contactusleads`)
      .then((response) => {
        // Handle the successful response here
        setWebinarForm(response.data); // Update the data state with the fetched data


        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });



    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(
    //       `${process.env.REACT_APP_API_URL}/userdata`
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setgetusers(data);
    //   } catch (err) {
    //     // setError(err);
    //   }
    // };

    // fetchData();
  }, []);

  // search bar conditions start 
  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.name
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.email
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.city
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.course
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.number
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase()) ||
        item.date
          .toLowerCase()
          .includes(filterCriteria.search.toLowerCase())
        : true;

      const dateCondition =
        filterCriteria.fromdate && filterCriteria.todate
          ? item.date >= filterCriteria.fromdate &&
          item.date <= filterCriteria.todate
          : true;

      // const branchCondition = filterCriteria.course
      //   ? item.course === filterCriteria.course
      //   : true;
      const branchCondition = filterCriteria.course
        ? item.course
          .toLowerCase()
          .includes(filterCriteria.course.toLowerCase())
        : true;

      // const sourceCondition = filterCriteria.course
      //   ? item.course === filterCriteria.course
      //   : true;

      // const modeCondition = filterCriteria.phone
      //   ? item.phone === filterCriteria.phone
      //   : true;

      // const counsellarCondition = filterCriteria.date
      //   ? item.date === filterCriteria.date
      //   : true;

      return (
        searchCondition &&
        dateCondition &&
        branchCondition
        // &&
        // sourceCondition &&
        // modeCondition &&
        // counsellarCondition
      );
    });
    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  const handleSave = (e) => {
    setFilterCriteria(dummyFilterCriteria);
  };
  // search bar conditions end

  // useEffect(() => {
  //   const filteruser = getusers.filter((user) => {
  //     const filtercounsellar = user.profile === "counsellor";
  //     return filtercounsellar;
  //   });
  //   setfilteredcounsellor(filteruser);
  // }, [getusers]);

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


      search: "",
    });
    setDummyFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",



      search: "",
    })
  };




  return (

    <div className="container">
      <div className="studetdetails   mt-3">
        <h5 className=" mt-3 text-center"> Contact Us </h5>

        <div className="row mb-1 ps-1 ">
          <div className="col-12 col-md-7 col-lg-8 col-xl-8  input-field">
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
              value={filterCriteria.search}
              onChange={handleInputChange}
            />
            <hr />
          </div>
          <div className="col-12 col-md-5 col-lg-4 col-xl-4">
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
                        <InputLabel>Course</InputLabel>
                        <Select
                          name="course"
                          value={dummyFilterCriteria.course}
                          onChange={handleInputChange}
                        >


                          {getcourses &&
                            getcourses.map((item, index) => (
                              <MenuItem
                                key={item.id}
                                value={item.course_name}
                              >
                                {item.course_name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <MenuItem className="d-flex justify-content-between">
                    <button className="btn btn-color" onClick={filterreset}>

                      Clear
                    </button>
                    <button onClick={handleSave} className="btn btn-color" >

                      Save
                    </button>
                  </MenuItem>
                </Menu>
              </p>
              <p>
                <CSVLink
                  data={filteredData}
                  filename={"webinarleads.csv"}
                  target="_blank"
                >
                  <DownloadIcon className="icon-color mt-4"></DownloadIcon>
                </CSVLink>
              </p>
            </div>
          </div>
        </div>

        <div className="student-table">

          <TableContainer sx={{ maxHeight: 440 }} component={Paper}>
            <Table stickyHeader aria-label="sticky table " borderAxis="both">
              <TableHead>
                <TableRow>
                  <TableCell className="table-cell-heading">
                    SNo
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Name
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Email
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    Course
                  </TableCell>
                  <TableCell className="table-cell-heading">
                    City
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Contact Number
                  </TableCell>

                  <TableCell className="table-cell-heading">
                    Date
                  </TableCell>

                  {/* <TableCell className="table-cell-heading">
                      Actions
                    </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(records) && records.length > 0 ? (
                  records.map((item, index) => {
                    let date = new Date(item.date);
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
                          {((page - 1) * itemsPerPage) + index + 1}
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
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            title={item.email}
                            style={{
                              width: "6rem",
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
                            title={item.course}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.course}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            title={item.city}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.city}
                          </span>
                        </TableCell>

                        <TableCell className="Table-cell">
                          <span
                            title={item.number}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {item.number}
                          </span>
                        </TableCell>
                        <TableCell className="Table-cell">
                          <span
                            title={date}
                            style={{
                              width: "6rem",
                              whiteSpace: "nowrap",
                              overflow: "hidden",

                              textOverflow: "ellipsis",
                              fontSize: "0.8rem",
                              display: "block",
                            }}
                          >
                            {date}
                          </span>
                        </TableCell>


                        {/* <TableCell className="text-center d-flex mt-2">
                            <NavLink to={`/studentdataview/${item.id}`}>
                              <VisibilityIcon
                                style={{ width: "40px" }}
                                className="icon-color"
                              />
                            </NavLink>

                            <NavLink to={`/editstudent/${item.id}`}>
                              <EditIcon
                                style={{ width: "40px" }}
                                className="icon-color"
                              />
                            </NavLink>
                            

                            <div className="form-check form-switch ms-1">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={isChecked}
                                onChange={handleClickOpen}
                              />
                            </div>

                            <Dialog open={opening} onClose={handleClosed}>
                              <DialogContent>
                                <DialogContentText>
                                  <label> Enter Remarks :</label>
                                </DialogContentText>
                                <DialogContentText>
                                  <textarea
                                    rows="4"
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
                          </TableCell> */}
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

export default ContactUs;
