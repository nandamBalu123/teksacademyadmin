import React, { useEffect, useState } from "react";
import "./CreateReports.css";


import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from "react-router-dom";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";


import NativeSelect from '@mui/material/NativeSelect';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';

import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddBusinessTwoTone } from "@mui/icons-material";


const CreateReport = () => {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  user = JSON.parse(user)
  let userName;
  if (user) {
    userName = user.fullname
  }
  const { students, dispatch } = useStudentsContext();

  const [customDates, setCustomDates] = useState(false);
  const handleDateFilterChange = (event) => {
    const selectedValue = event.target.value;
    // Update customMonth state based on the selected value
    setCustomDates(selectedValue === 'customDates');
  };
  const [reportForm, setReportForm] = useState(
    {
      reportName: "", reportType: "One Dimensional", description: "", dateFilter: "", dateRangeType: "",
      dateRange: { fromDate: "", toDate: "" },
      dimensions: { dimension1: "" },
      metrics: "", createdBy: userName, createdAt: new Date(),
      filter: [],
    }

  )
  let [filters, setFilters] = useState([])
  useEffect(() => {
    setReportForm((prevForm) => ({
      ...prevForm,
      filter: filters
    }));
  }, [filters])
  // let [subFilterOptions, setSubFilterOptions] = useState()
  const [organizedData, setOrganizedData] = useState(null);

  const [filteredStudents, setFilteredStudents] = useState()
  useEffect(() => {
    if (students && reportForm && reportForm.filter) {
      const filteredResults = students.filter((item) => {

        let allConditionsMet = true;
        reportForm.filter.forEach((filter) => {
          let conditionMet = false;


          if (item.hasOwnProperty(filter.filter)) {

            conditionMet = item[filter.filter] === filter.subFilter;
          } else {

            conditionMet = true;
          }
          allConditionsMet = allConditionsMet && conditionMet;
        });

        const dateCondition =
          reportForm.dateRange.fromDate && reportForm.dateRange.toDate
            ? item.admissiondate >= reportForm.dateRange.fromDate &&
            item.admissiondate <= reportForm.dateRange.toDate
            : true;

        return allConditionsMet && dateCondition;
      });

      setFilteredStudents(filteredResults);
    }
  }, [students, reportForm]);
  useEffect(() => {
    if (filteredStudents) {
      let organizedData;
      if (reportForm) {
        if (Object.keys(reportForm.dimensions).length == 3) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            const dim2 = student[reportForm.dimensions.dimension2] || "Unknown";
            const dim3 = student[reportForm.dimensions.dimension3] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }
            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = {};
            }
            if (!acc[dim1][dim2][dim3]) {
              acc[dim1][dim2][dim3] = [];
            }

            acc[dim1][dim2][dim3].push(student);
            return acc;
          }, {});
        }
        if (Object.keys(reportForm.dimensions).length == 2) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            const dim2 = student[reportForm.dimensions.dimension2] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }

            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = [];
            }

            acc[dim1][dim2].push(student);
            return acc;
          }, {});
        }
        if (Object.keys(reportForm.dimensions).length == 1) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            if (!acc[dim1]) {
              acc[dim1] = [];
            }
            acc[dim1].push(student);
            return acc;
          }, {});
        }
        setOrganizedData(organizedData);
      }

    }
  }, [filteredStudents, reportForm]);
  const handleFilterChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      [name]: value,
    };
    setFilters(updatedFilters);
    // if (name === "operator") {
    //   let filterName = filters[index].filter

    // }
  };

  const handleFilterDelete = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };
  const handleAddFilter = () => {

    setFilters([...filters, { filter: "", operator: "", subFilter: "" }])

  };
  useEffect(() => {
    console.log("reportForm", reportForm)
    console.log("filters", filters)
    // console.log("subFilterOptions", subFilterOptions)
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      let [parentProperty, nestedProperty] = name.split('.');
      setReportForm((prevForm) => ({
        ...prevForm,
        [parentProperty]: {
          ...prevForm[parentProperty],
          [nestedProperty]: value,
        },
      }));
    }
    else {
      if (name === 'reportType') {
        setReportForm((prevForm) => ({
          ...prevForm,
          dimensions: {
            dimension1: "",
          },
        }));
      }
      if (name === 'dateRangeType') {

        let currentDate = new Date();
        let fromDate = '';
        let toDate = '';

        if (value === 'lastmonth') {

          currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - 1);
          currentDate.setDate(1)
          fromDate = currentDate
            .toISOString()
            .split('T')[0];
          currentDate = new Date();
          currentDate.setDate(0);

          toDate = currentDate
            .toISOString()
            .split('T')[0];
        } else if (value === 'currentmonth') {
          currentDate = new Date();

          currentDate.setDate(1);



          fromDate = currentDate
            .toISOString()
            .split('T')[0];
          currentDate.setMonth(currentDate.getMonth() + 1);
          currentDate.setDate(0);

          toDate = currentDate
            .toISOString()
            .split('T')[0];
        } else {

          fromDate = '';
          toDate = '';
        }

        setReportForm((prevForm) => ({
          ...prevForm,
          dateRange: {
            fromDate,
            toDate,
          },
          [name]: value,
        }));
      } else {

        setReportForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let reports = []
    reports.push(reportForm)
    console.log('Form submitted:', reports);
    let updatedData = {
      reports
    }
    const updateContext = {
      reports
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/createreport`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          alert("Report Added");
          // dispatch({
          //   type: "UPDATE_NO_OF_INSTALLMENTS",
          //   payload: updateContext,
          // });

          navigate(`/reports`);

        } else {
          alert("Try Again");
        }
      });
  };
  const handleAddDimension = () => {
    const dimensionsLength = reportForm.dimensions ? Object.keys(reportForm.dimensions).length : 0;
    if (dimensionsLength < 3) {

      const dimensionKey = `dimension${Object.keys(reportForm.dimensions).length + 1}`;
      setReportForm((prevForm) => ({
        ...prevForm,
        dimensions: {
          ...prevForm.dimensions,
          [dimensionKey]: '',
        },
      }));
    }
    else {
      alert("More Than 3 Dimensions are not allowed")
    }

  };

  const handleDeleteDimension = (dimension) => {
    const newDimensions = { ...reportForm.dimensions };
    delete newDimensions[dimension];

    const originalObject = newDimensions
    const transformedObject = {};
    Object.entries(originalObject).forEach(([key, value], index) => {
      console.log(key, value, index);
      let newDimensionName = `dimension${index + 1}`
      transformedObject[newDimensionName] = value
    });


    setReportForm((prevForm) => ({
      ...prevForm,
      dimensions: transformedObject
    }));
  };
  const handleMoveDimension = (dimension, direction) => {
    const dimensionsArray = Object.keys(reportForm.dimensions);
    const index = dimensionsArray.indexOf(dimension);
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < dimensionsArray.length) {
      const newDimensionsArray = [...dimensionsArray];
      // Swap the dimensions
      [newDimensionsArray[index], newDimensionsArray[newIndex]] = [newDimensionsArray[newIndex], newDimensionsArray[index]];

      const newInputValues = {};
      newDimensionsArray.forEach(dimensionKey => {
        newInputValues[dimensionKey] = reportForm.dimensions[dimensionKey];
      });
      const originalObject = newInputValues
      const transformedObject = {};
      Object.entries(originalObject).forEach(([key, value], index) => {
        console.log(key, value, index);
        let newDimensionName = `dimension${index + 1}`
        transformedObject[newDimensionName] = value
      });


      setReportForm((prevForm) => ({
        ...prevForm,
        dimensions: transformedObject,
      }));
    }
  };

  return (
    <div className="container mt-1">
      <h5 className="text-center my-2">Create Report</h5>
      <form className="createreport">
        <div className="row m-0">
          <h5 className="px-4 pt-3">  Basic Information</h5>
          <div className="col-12 col-md-7 col-xl-7 col-lg-7 side-line">
            <div className="row px-2">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family pb-1">Report's Name</span>}
                  type="text"
                  variant="standard"
                  className="mar w-100"
                  required
                  name="reportName"
                  value={reportForm.reportName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <FormControl variant="standard" className="w-100">
                  <InputLabel>
                    <span className="label-family">Report Type<span>*</span></span>
                  </InputLabel>
                  <Select
                    name="reportType"
                    // defaultValue="One Dimensional"
                    value={reportForm.reportType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="One Dimensional">One Dimensional</MenuItem>

                    <MenuItem value="Multi Dimensional">
                      Multi Dimensional</MenuItem>

                  </Select>

                </FormControl>
              </div>
            </div>
            <div className="row px-2 ">
              <span className="label-family fw-light my-2">
                Report Description
              </span>
              <div class="d-lg-none col-12 col-md-12 col-xl-12 col-lg-12 text-center">
                {/* <textarea
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins, sans-seri",
                    fontweight: "300",
                    fontsize: "0.9rem",
                  }}
                  placeholder="Enter Text ......"
                  rows="3"
                  cols={20}
                  name="comment"
                  form="usrform"
                ></textarea> */}
              </div>
              <div className="col-6 col-md-12 col-xl-12 col-lg-12 text-center ">
                <textarea
                  style={{
                    paddingLeft: "10px",
                    fontFamily: "Poppins, sans-seri",
                    fontweight: "300",
                    fontsize: "0.9rem",
                  }}
                  rows="3"
                  placeholder="Enter Text ......."

                  form="form-control"
                  name="description"
                  value={reportForm.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="row px-2">

              <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                <FormControl variant="standard" className="w-100">
                  <InputLabel>
                    <span className="label-family"> Date Range</span>
                  </InputLabel>
                  <Select
                    name="dateRangeType"
                    value={reportForm.dateRangeType}
                    onChange={handleInputChange}>
                    <MenuItem value="lastmonth">Last Month</MenuItem>
                    <MenuItem value="currentmonth">Current Month</MenuItem>
                    <MenuItem value="customDates" >Custom Dates</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-12 col-md-4 col-lg-4 col-xl-4">  <TextField
                label={<span className="label-family">From:</span>}
                type="date"
                variant="standard"
                className="mar mt-1 w-100"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateRange.fromDate"
                value={reportForm.dateRange.fromDate}
                onChange={handleInputChange}
              /></div>
              <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                <TextField
                  label={<span className="label-family">To:</span>}
                  type="date"
                  variant="standard"
                  className="w-100 mt-1 mar"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="dateRange.toDate"
                  value={reportForm.dateRange.toDate}
                  onChange={handleInputChange}
                /></div>
            </div>

            {/* <div className="row  px-2">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">From:</span>}
                  type="date"
                  variant="standard"
                  className="mar  w-100"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="dateRange.fromDate"
                  value={reportForm.dateRange.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                <TextField
                  label={<span className="label-family">To:</span>}
                  type="date"
                  variant="standard"
                  className="w-100 mar"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="dateRange.toDate"
                  value={reportForm.dateRange.toDate}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}

            <div className="px-2 my-2">
              <span className="label-family "> Dimensions</span>
              <div className="dimensions mb-4">
                <div className="d-flex justify-content-between alldimensions">
                  <h6 className="pt-2"> All Dimensions</h6>
                  {reportForm.reportType === "Multi Dimensional" && Object.keys(reportForm.dimensions).length < 3 &&
                    <button type="button" className="btn btn-color" style={{ border: "1px solid white" }} onClick={handleAddDimension}>
                      Add Dimension
                    </button>}

                </div>
                <div className="px-3" >
                  {reportForm.reportType === "One Dimensional" &&
                    <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                      <FormControl variant="standard" className="w-100">
                        <InputLabel>
                          <span className="label-family">Choose</span>
                        </InputLabel>
                        <Select name="dimensions.dimension1"
                          value={reportForm.dimensions.dimension1}
                          onChange={handleInputChange}>
                          <MenuItem value=""></MenuItem>
                          <MenuItem value="courses">Course</MenuItem>
                          <MenuItem value="branch">Branch</MenuItem>
                          <MenuItem value="enquirytakenby">Counsellor</MenuItem>
                          <MenuItem value="coursepackage">Course Package</MenuItem>
                          <MenuItem value="modeoftraining">Mode of Training</MenuItem>
                          <MenuItem value="state">State</MenuItem>
                          <MenuItem value="educationtype">Education Type</MenuItem>
                          <MenuItem value="academicyear">Academic Year</MenuItem>
                          <MenuItem value="leadsource">Lead Source</MenuItem>
                        </Select>
                      </FormControl></div>}
                  {reportForm.reportType === "Multi Dimensional" &&
                    <div >
                      {Object.keys(reportForm.dimensions).map((dimension, index) => (
                        <div className="row">
                          <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">


                            <div key={dimension}>
                              <FormControl variant="standard" className="w-100">
                                <InputLabel>
                                  <span className="label-family">Choose</span>
                                </InputLabel>
                                <Select name={`dimensions.${dimension}`}
                                  value={reportForm.dimensions[dimension]}
                                  onChange={handleInputChange}>
                                  <MenuItem value=""></MenuItem>
                                  <MenuItem value="courses">course</MenuItem>
                                  <MenuItem value="branch">branch</MenuItem>
                                  <MenuItem value="enquirytakenby">counsellor</MenuItem>
                                  <MenuItem value="coursepackage">course package</MenuItem>
                                  <MenuItem value="modeoftraining">Mode of training</MenuItem>
                                  <MenuItem value="state">State</MenuItem>
                                  <MenuItem value="educationtype">Education Type</MenuItem>
                                  <MenuItem value="academicyear">Academic year</MenuItem>
                                  <MenuItem value="leadsource">Lead source</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                          </div>
                          <div className="col-4 m-auto">
                            {Object.keys(reportForm.dimensions).length > 1 &&
                              <div className="d-flex justify-content-evenly">

                                <ArrowUpwardIcon onClick={() => handleMoveDimension(dimension, 'up')} style={{ cursor: "pointer" }} />


                                <ArrowDownwardIcon onClick={() => handleMoveDimension(dimension, 'down')} style={{ cursor: "pointer" }} />


                                <DeleteIcon onClick={() => handleDeleteDimension(dimension)} style={{ cursor: "pointer" }} />

                              </div>
                            }
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                </div>

              </div>
            </div>
            <div className="px-2 my-2">
              <span className="label-family">Metrics</span>
              <div className="dimensions mb-4">
                <h6 className="alldimensions"> All Metrics</h6>
                <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel>
                      <span className="label-family">Choose</span>
                    </InputLabel>
                    <Select name="metrics"
                      value={reportForm.metrics}
                      onChange={handleInputChange} >
                      <MenuItem value="Number Of Enrollments">Number of Enrollments</MenuItem>
                      <MenuItem value="Fee Received Amount">Fee Received Amount</MenuItem>
                      <MenuItem value="Fee Yet To Receive">Fee Yet To Receive</MenuItem>
                      <MenuItem value="Total Booking Amount">Total Booking Amount</MenuItem>

                    </Select>
                  </FormControl></div>
              </div>
            </div>
            <div className="px-2 my-2">
              <span className="label-family "> Filters</span>
              <div className="dimensions">
                <div className="d-flex justify-content-between alldimensions">
                  <h6 className="pt-2"> Filters</h6>

                  <button type="button" onClick={handleAddFilter} className="btn btn-color" style={{ border: "1px solid white" }}>
                    Add Filter
                  </button>
                </div>

                {filters && filters.map((filter, index) => {
                  let filterName = filters[index].filter;

                  const groupDataAndCalculatePercentage = (data, key) => {
                    if (!Array.isArray(data)) {
                      return {};
                    }

                    return data.reduce((result, item) => {
                      const value = item[key];

                      if (!result.includes(value)) {
                        result.push(value);
                      }

                      return result;
                    }, []);
                  };

                  let subFilterOptions = groupDataAndCalculatePercentage(
                    students,
                    filterName
                  );

                  return (
                    <div className="row px-3" key={index}>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-4 px-3">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>
                            <span className="label-family "> Filter</span>
                          </InputLabel>
                          <Select
                            name="filter"
                            value={filter.filter}
                            onChange={(event) => handleFilterChange(event, index)}
                          >
                            <MenuItem value="branch">Branch</MenuItem>
                            <MenuItem value="enquirytakenby">Counsellor</MenuItem>
                            <MenuItem value="coursepackage">Course Package</MenuItem>
                            <MenuItem value="courses">Courses</MenuItem>
                            <MenuItem value="modeoftraining">Mode of Training</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 col-xl-3 ">
                        {filter.filter && (
                          <FormControl variant="standard" className="w-100">
                            <InputLabel>
                              <span className="label-family "> Comparison</span>
                            </InputLabel>
                            <Select
                              name="operator"
                              value={filter.operator}
                              onChange={(event) => handleFilterChange(event, index)}
                            >
                              <MenuItem value="equalto">Equal To</MenuItem>
                              {/* <MenuItem value="notequalto">Not Equal To</MenuItem> */}
                            </Select>
                          </FormControl>
                        )}
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        {filter.operator && (
                          <FormControl variant="standard" className="w-100">
                            <InputLabel>
                              <span className="label-family "> Sub-Filter</span>
                            </InputLabel>
                            <Select
                              name="subFilter"
                              value={filter.subFilter}
                              onChange={(event) => handleFilterChange(event, index)}
                            >
                              {subFilterOptions &&
                                subFilterOptions.map((subFilter, subIndex) => (
                                  <MenuItem key={subIndex} value={subFilter}>
                                    {subFilter}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        )}
                      </div>
                      <div className="col-12 col-md-6 col-lg-1 col-xl-1 my-2 text-end ">
                        <DeleteIcon
                          onClick={() => handleFilterDelete(index)}
                          style={{ cursor: "pointer", margin: "10px 0px 0px 0px" }}
                        />
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
            <div className=" row report-footer ">
              <div className="col-12 col-md-9 col-lg-9 col-lg-10"> <button className="btn btn-color mt-1"> Generate Preview </button></div>

              <div className="col-12 col-md-2 col-lg-2 col-lg-2">  <button type="submit" onClick={handleSubmit} className="btn btn-color  mt-1 me-3"> Save</button> </div>
            </div>
          </div>
          <div className="col-12 col-md-5 col-xl-5 col-lg-5">
            <h5> Report Preview</h5>
            <div className="col-12 col-md-8 col-lg-8 col-xl-8 mt-2">
              {/* dimensions data start */}
              {organizedData && reportForm.dimensions.dimension1 && (
                <TableContainer component={Paper} className="mb-3">
                  <Table stickyHeader aria-label="sticky table " borderAxis="both">
                    <TableHead>
                      <TableRow>
                        <TableCell className="table-cell-heading" align="center">
                          {reportForm.dimensions.dimension1}
                        </TableCell>
                        {reportForm.dimensions.dimension2 && <TableCell className="table-cell-heading" align="center">
                          {reportForm.dimensions.dimension2}
                        </TableCell>}
                        {reportForm.dimensions.dimension3 &&
                          <TableCell className="table-cell-heading" align="center">
                            {reportForm.dimensions.dimension3}
                          </TableCell>}
                        <TableCell className="table-cell-heading" align="center">
                          {reportForm.metrics}
                        </TableCell>

                        {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>






                      {
                        organizedData && reportForm.dimensions.dimension1 && !reportForm.dimensions.dimension2 && !reportForm.dimensions.dimension3 &&
                        Object.entries(organizedData).map(([dim1, students]) => {
                          let metrics = 0;
                          if (reportForm.metrics === "Number Of Enrollments") {
                            metrics = students.length
                          }
                          if (reportForm.metrics === "Fee Received Amount") {
                            if (Array.isArray(students)) {
                              students.forEach((student) => {
                                metrics += student.totalpaidamount
                              })
                            }
                          }
                          if (reportForm.metrics === "Fee Yet To Receive") {
                            if (Array.isArray(students)) {
                              students.forEach((student) => {
                                metrics += student.dueamount;
                              });
                            }
                          }
                          if (reportForm.metrics === "Total Booking Amount") {
                            if (Array.isArray(students)) {
                              students.forEach((student) => {
                                metrics += student.finaltotal
                              })
                            }
                          }
                          return (
                            <TableRow key={dim1}>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{metrics}</span>
                              </TableCell>
                            </TableRow>
                          )
                        }
                        )
                      }
                      {reportForm.dimensions.dimension1 &&
                        reportForm.dimensions.dimension2 &&
                        !reportForm.dimensions.dimension3 &&
                        Object.entries(organizedData).map(([dim1, dim1Data]) => (
                          <TableRow key={dim1}>
                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                            </TableCell>
                            <TableCell className="Table-cell text-center">
                              {Object.entries(dim1Data).map(([dim2, students]) => (
                                <React.Fragment key={dim2}>
                                  <div style={{ fontSize: "0.8rem" }}>{dim2}</div>

                                </React.Fragment>
                              ))}
                            </TableCell>
                            <TableCell className="Table-cell text-center">
                              {Object.entries(dim1Data).map(([dim2, students]) => {
                                let metrics = 0;
                                if (reportForm.metrics === "Number Of Enrollments") {
                                  metrics = students.length
                                }
                                if (reportForm.metrics === "Fee Received Amount") {
                                  if (Array.isArray(students)) {
                                    students.forEach((student) => {
                                      metrics += student.totalpaidamount
                                    })
                                  }
                                }
                                if (reportForm.metrics === "Fee Yet To Receive") {

                                  if (Array.isArray(students)) {
                                    students.forEach((student) => {
                                      metrics += student.dueamount;
                                    });
                                  }
                                }
                                if (reportForm.metrics === "Total Booking Amount") {

                                  if (Array.isArray(students)) {
                                    students.forEach((student) => {
                                      metrics += student.finaltotal
                                    })
                                  }
                                }
                                return (
                                  <React.Fragment key={dim2}>
                                    <div style={{ fontSize: "0.8rem" }}>{metrics}</div>
                                  </React.Fragment>
                                )
                              })}
                            </TableCell>
                          </TableRow>
                        ))}
                      {reportForm.dimensions.dimension1 &&
                        reportForm.dimensions.dimension2 &&
                        reportForm.dimensions.dimension3 &&
                        Object.entries(organizedData).map(([dim1, dim1Data]) => (
                          <React.Fragment key={dim1}>
                            <TableRow>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                {Object.entries(dim1Data).map(([dim2, dim2Data]) => (
                                  <React.Fragment key={dim2}>
                                    <div style={{ fontSize: "0.8rem" }}>{dim2}</div>

                                  </React.Fragment>
                                ))}
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                {Object.entries(dim1Data).map(([dim2, dim2Data]) => (
                                  Object.entries(dim2Data).map(([dim3, students]) => (
                                    <React.Fragment key={dim3}>
                                      <div style={{ fontSize: "0.8rem" }} >{dim3}</div>
                                    </React.Fragment>
                                  ))
                                ))}
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                {Object.entries(dim1Data).map(([dim2, dim2Data]) => (
                                  Object.entries(dim2Data).map(([dim3, students]) => {
                                    let metrics = 0;
                                    if (reportForm.metrics === "Number Of Enrollments") {
                                      metrics = students.length
                                    }
                                    if (reportForm.metrics === "Fee Received Amount") {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.totalpaidamount
                                        })
                                      }

                                    }
                                    if (reportForm.metrics === "Fee Yet To Receive") {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.dueamount;
                                        });
                                      }
                                    }
                                    if (reportForm.metrics === "Total Booking Amount") {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.finaltotal
                                        })
                                      }
                                    }
                                    return (
                                      <React.Fragment key={dim3}>
                                        <div style={{ fontSize: "0.8rem" }}>{metrics}</div>
                                      </React.Fragment>
                                    )
                                  })
                                ))}
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateReport;


// import React, { useEffect, useState } from 'react';

// const CreateReport = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const [inputValues, setInputValues] = useState({});

//   useEffect(() => {
//     console.log('inputValues', inputValues);
//   }, [inputValues]);

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   const handleInputChange = (dimension, event) => {
//     setInputValues((prevInputValues) => ({
//       ...prevInputValues,
//       [dimension]: event.target.value,
//     }));
//   };

//   const handleAddDimension = () => {
//     const dimensionKey = `dimension${Object.keys(inputValues).length + 1}`;
//     setInputValues((prevInputValues) => ({
//       ...prevInputValues,
//       [dimensionKey]: '',
//     }));
//   };

//   const handleDeleteDimension = (dimension) => {
//     const newInputValues = { ...inputValues };
//     delete newInputValues[dimension];
//     setInputValues(newInputValues);
//   };

//   const handleMoveDimension = (dimension, direction) => {
//     const dimensionsArray = Object.keys(inputValues);
//     const index = dimensionsArray.indexOf(dimension);
//     const newIndex = direction === 'up' ? index - 1 : index + 1;

//     if (newIndex >= 0 && newIndex < dimensionsArray.length) {
//       const newInputValues = { ...inputValues };
//       // Swap the dimensions
//       [dimensionsArray[index], dimensionsArray[newIndex]] = [dimensionsArray[newIndex], dimensionsArray[index]];
//       setInputValues(newInputValues);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="dimensionSelect">Select Dimension:</label>
//       <select id="dimensionSelect" value={selectedOption} onChange={handleSelectChange}>
//         <option value="">Select Dimension</option>
//         <option value="oneDimensional">One Dimensional</option>
//         <option value="multiDimensional">Multi Dimensional</option>
//       </select>

//       {selectedOption === 'oneDimensional' && (
//         <div>
//           <label htmlFor="oneDimensionalInput">Enter One Dimensional Value:</label>
//           <input
//             type="text"
//             id="oneDimensionalInput"
//             value={inputValues.dimension1 || ''}
//             onChange={(event) => handleInputChange('dimension1', event)}
//           />
//         </div>
//       )}

//       {selectedOption === 'multiDimensional' && (
//         <div>
//           <p>Multi Dimensional Inputs:</p>
//           {Object.keys(inputValues).map((dimension, index) => (
//             <div key={dimension}>
//               <label htmlFor={`multiDimensionalInput${index}`}>{`Dimension ${index + 1}:`}</label>
//               <input
//                 type="text"
//                 id={`multiDimensionalInput${index}`}
//                 value={inputValues[dimension]}
//                 onChange={(event) => handleInputChange(dimension, event)}
//               />
//               <button type="button" onClick={() => handleDeleteDimension(dimension)}>
//                 Delete
//               </button>
//               <button type="button" onClick={() => handleMoveDimension(dimension, 'up')}>
//                 Move Up
//               </button>
//               <button type="button" onClick={() => handleMoveDimension(dimension, 'down')}>
//                 Move Down
//               </button>
//             </div>
//           ))}
//           <button type="button" onClick={handleAddDimension}>
//             Add Dimension
//           </button>
//         </div>
//       )}

//       {selectedOption && (
//         <p>You selected: {selectedOption === 'oneDimensional' ? 'One Dimensional' : 'Multi Dimensional'}</p>
//       )}
//     </div>
//   );
// };

// export default CreateReport;
