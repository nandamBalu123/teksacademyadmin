import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Report.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddBusinessTwoTone } from "@mui/icons-material";
// import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useStudentsContext } from "../../../hooks/useStudentsContext";

const Report = () => {
  const { id } = useParams();
  const { students } = useStudentsContext();
  // const [reports, setReports] = useState();
  const [reportForm, setReportForm] = useState()


  const [organizedData, setOrganizedData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          const filtered = response.data.filter(item => item.id === parseInt(id));
          setReportForm(filtered[0].reports[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  let [filters, setFilters] = useState()
  useEffect(() => {
    if (reportForm) {
      setFilters(reportForm.filter)

    }
  }, [reportForm])
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
      .put(
        `${process.env.REACT_APP_API_URL}/updatereport/${id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          alert("Report Updated");
          // dispatch({
          //   type: "UPDATE_NO_OF_INSTALLMENTS",
          //   payload: updateContext,
          // });

          // navigate(`/reports`);

        } else {
          alert("Try Again");
        }
      });
  };
  useEffect(() => {
    console.log("reportForm", reportForm)
    console.log("organizedData", organizedData)
    console.log("filters", filters)

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



    } else {
      if (name === 'reportType') {
        setReportForm((prevForm) => ({
          ...prevForm,
          dimensions: {
            dimension1: "", dimension2: "", dimension3: ""
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

  // let [
  //   calculations_of_filtered_students,
  //   setcalculations_of_filtered_students,
  // ] = useState();

  // useEffect(() => {
  //   console.log("studentsss:", students);
  //   console.log("organizedData:", organizedData);
  //   if (Array.isArray(students) && organizedData) {
  //     const calculations_of_filtered_students = {};
  //     if (reportForm.dimensions.dimension1 && !reportForm.dimensions.dimension2 && !reportForm.dimensions.dimension3) {

  //       Object.entries(organizedData).map(([dim1, students]) => {
  //         let noOfEnrollments = students.length
  //         let receivedAmount = 0
  //         let dueamount = 0
  //         let totalamount = 0
  //         if (Array.isArray(students)) {
  //           students.forEach((student) => {
  //             receivedAmount += student.totalpaidamount;
  //             dueamount += student.dueamount;
  //             totalamount += student.finaltotal;
  //           });
  //         }

  //         calculations_of_filtered_students[dim1] = {
  //           noOfEnrollments: noOfEnrollments,
  //           receivedAmount: receivedAmount,
  //           dueamount: dueamount,
  //           totalamount: totalamount
  //         }
  //       })
  //     }
  //     if (reportForm.dimensions.dimension1 && reportForm.dimensions.dimension2 && !reportForm.dimensions.dimension3) {



  //       Object.keys(organizedData).forEach((dim1) => {
  //         let dim1TotalAmount = 0;
  //         let dim1TotalReceivedAmount = 0;
  //         let dim1TotalDueAmount = 0;
  //         let dim1TotalStudents = 0;

  //         // Counsellor-wise calculations
  //         const counsellorWiseTotal = {};

  //         if (organizedData[dim1]) {
  //           Object.keys(organizedData[dim1]).forEach((dim2) => {
  //             // Initialize counsellorWiseTotal[dim2] outside the loop
  //             counsellorWiseTotal[dim2] = {
  //               totalAmount: 0,
  //               totalReceivedAmount: 0,
  //               totalDueAmount: 0,
  //               students: [],
  //             };

  //             organizedData[dim1][dim2].forEach((student) => {
  //               const studentName = student.name;
  //               const totalamount = parseFloat(student.finaltotal);
  //               if (!isNaN(totalamount)) {
  //                 dim1TotalAmount += totalamount;
  //                 counsellorWiseTotal[dim2].totalAmount += totalamount;
  //               }
  //               // ... (similar updates for receivedamount and dueamount)

  //               counsellorWiseTotal[dim2].students.push({
  //                 name: studentName,
  //                 course: student.courses,
  //                 admissionDate: student.admissiondate,
  //                 totalAmount: totalamount,
  //                 receivedamount: receivedamount,
  //                 dueamount: dueamount,
  //               });

  //               dim1TotalStudents += 1;
  //             });
  //           });
  //         }

  //         calculations_of_filtered_students[dim1] = {
  //           totalAmount: dim1TotalAmount,
  //           totalReceivedAmount: dim1TotalReceivedAmount,
  //           totalDueAmount: dim1TotalDueAmount,
  //           totalStudents: dim1TotalStudents,
  //           counsellorWiseTotal,
  //         };
  //       });




  //     }
  //     if (reportForm.dimensions.dimension1 && reportForm.dimensions.dimension2 && reportForm.dimensions.dimension3) {

  //       // Object.keys(organizedData).forEach((dim1))
  //     }
  //     setcalculations_of_filtered_students(
  //       calculations_of_filtered_students
  //     );
  //   }

  // }, [organizedData, students])





  // useEffect(() => {
  //   console.log("calculations_of_filtered_students", calculations_of_filtered_students)
  // })





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
  useEffect(() => {
    setReportForm((prevForm) => ({
      ...prevForm,
      filter: filters
    }));
  }, [filters])
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
  let [metricsValue, setMetricsValue] = useState(0);
  useEffect(() => {
    if (reportForm) {
      switch (reportForm.metrics) {
        case "Number Of Enrollments":
          setMetricsValue(filteredStudents.length);
          break;
        case "Fee Received Amount":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce((total, student) => total + student.totalpaidamount, 0)
            );
          }
          break;
        case "Fee Yet To Receive":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce((total, student) => total + student.dueamount, 0)
            );
          }
          break;
        case "Total Booking Amount":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce((total, student) => total + student.finaltotal, 0)
            );
          }
          break;
        default:
          break;
      }
    }
  }, [reportForm, filteredStudents]);

  return (

    <div className="container mt-3">
      {reportForm && <div className="mini-reports mt-3">
        <h5 className="px-2 my-3">
          {reportForm && reportForm.reportName}
        </h5>
        <div className="row px-3">
          <div className="col-12 col-md-6 col-lg-2 col-xl-2 ">


            {reportForm && reportForm.dateRangeType && <FormControl variant="standard" className="w-100">
              <InputLabel>
                <span className="label-family"> Date Range</span>
              </InputLabel>
              <Select
                name="dateRangeType"
                value={reportForm && reportForm.dateRangeType}
                onChange={handleInputChange}>
                <MenuItem value="lastmonth">Last Month</MenuItem>
                <MenuItem value="currentmonth">Current Month</MenuItem>
                <MenuItem value="customDates" >Custom Dates</MenuItem>
              </Select>
            </FormControl>}
          </div>
          <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-1">
            <TextField
              label=" From:"
              type="date"
              variant="standard"
              className="  w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="dateRange.fromDate"
              value={reportForm && reportForm.dateRange && reportForm.dateRange.fromDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-1">
            <TextField
              label=" To:"
              type="date"
              variant="standard"
              className="w-100"
              InputLabelProps={{
                shrink: true,
              }}
              name="dateRange.toDate"
              value={reportForm && reportForm.dateRange && reportForm.dateRange.toDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2 mt-2">
            {/* <button className="btn btn-outline-color"> Apply</button> */}
          </div>
          {/* <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div> */}
          <div className="col-6 col-md-4 col-lg-2 col-xl-2 ">
            {/* <Dropdown>
              <MenuButton className=" btn btn-outline-color mt-2" >Action  </MenuButton>
              <Menu className="dropdown-css">
                <MenuItem ><ShareIcon /> &nbsp;&nbsp;Share</MenuItem>
                <MenuItem >
                  <DownloadIcon />&nbsp; &nbsp;  Download
                </MenuItem>
              </Menu>
            </Dropdown> */}
          </div>
          <div className="col-6 col-md-3 col-lg-1 col-xl-1 mt-2">
            <button onClick={handleSubmit} className="btn btn-outline-color">Save</button>

          </div>
        </div>
        <hr className="my-3" />
        <div className="row px-2 ">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8 mt-2">
            {/* dimensions data start */}
            {organizedData && (
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
          {/* customazie start  */}
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 p-0 m-0 ">
            <div className="customazie-report p-2 my-2">
              <h5 className="p-2">Customize Report</h5>
              <div className="side-lines px-2">
                <div className="d-flex justify-content-between">
                  <p>{reportForm && reportForm.metrics}</p>

                  <p> {metricsValue}</p>
                </div>
                <hr />
                <div className="accordion mt-3" id="accordionExample" >
                  <div class="accordion-item">
                    <h3 className="accordion-header" id="headingOne">
                      <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" >
                        Dimensions
                      </button>

                    </h3>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        {reportForm.reportType === "Multi Dimensional" && Object.keys(reportForm.dimensions).length < 3 &&

                          <div className="text-end">
                            <span onClick={handleAddDimension} className="btn btn-color">
                              Add Dimension

                            </span>
                          </div>
                        }
                        <div>

                          {reportForm.reportType === "One Dimensional" &&
                            <div>
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
                              </FormControl>
                            </div>}
                          {reportForm.reportType === "Multi Dimensional" &&
                            <div >
                              {Object.keys(reportForm.dimensions).map((dimension, index) => (
                                <div className="row">

                                  <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 ">
                                    <div key={dimension}>
                                      <FormControl variant="standard" className="w-100">
                                        <InputLabel>
                                          <span className="label-family">Choose</span>
                                        </InputLabel>
                                        <Select name={`dimensions.${dimension}`}
                                          value={reportForm.dimensions[dimension]}
                                          onChange={handleInputChange}>
                                          <MenuItem value=""></MenuItem>
                                          <MenuItem value="courses">Course</MenuItem>
                                          <MenuItem value="branch">Branch</MenuItem>
                                          <MenuItem value="enquirytakenby">Counsellor</MenuItem>
                                          <MenuItem value="coursepackage">Course Package</MenuItem>
                                          <MenuItem value="modeoftraining">Mode Of Training</MenuItem>
                                          <MenuItem value="state">State</MenuItem>
                                          <MenuItem value="educationtype">Education Type</MenuItem>
                                          <MenuItem value="academicyear">Academic Year</MenuItem>
                                          <MenuItem value="leadsource">Lead Source</MenuItem>
                                        </Select>
                                      </FormControl>
                                    </div>
                                  </div>
                                  <div className="col-4 m-auto">
                                    {Object.keys(reportForm.dimensions).length > 1 &&
                                      <div className="d-flex justify-content-evenly" >
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
                  </div>

                  <div class="accordion-item">
                    <h2 class="accordion-header" id=" headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Metrics
                      </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div className="d-flex justify-content-between">
                          <FormControl variant="standard" className="w-100">
                            <InputLabel>
                              <span className="label-family">Choose</span>
                            </InputLabel>
                            <Select name="metrics"
                              value={reportForm && reportForm.metrics}
                              onChange={handleInputChange} >
                              <MenuItem value="Number Of Enrollments">Number of Enrollments</MenuItem>
                              <MenuItem value="Fee Received Amount">Fee Received Amount</MenuItem>
                              <MenuItem value="Fee Yet To Receive">Fee Yet To Receive</MenuItem>
                              <MenuItem value="Total Booking Amount">Total Booking Amount</MenuItem>

                            </Select>
                          </FormControl>
                        </div>

                        {/* 
                        {metrics && metrics.map((metric, index) => (
                          <div className="row m-0   metrics-hr ">
                            <div className="col-9 col-md-10 col-lg-10 col-xl-10">
                              <FormControl variant="standard" className="w-100">
                                <InputLabel>
                                  <span className="label-family">Choose</span>
                                </InputLabel>
                                < Select key={index}>

                                  <MenuItem value={metric.metricsvalue[0]}>
                                    {metric.metricsvalue[0]}
                                  </MenuItem>
                                  <MenuItem value={metric.metricsvalue[1]}>
                                    {metric.metricsvalue[1]}
                                  </MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="col-3 col-md-2 col-xl-2 col-lg-2 mt-3">
                          
                            </div>
                          </div>
                        ))} */
                        }
                      </div>
                    </div>


                  </div>
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Filters
                      </button>
                    </h3>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">

                        <div className="text-end">
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
                            <div>
                              <div className="row px-3 addingfilter" key={index}>

                                <FormControl variant="standard" className="w-100 pb-1">
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

                                {filter.filter && (
                                  <FormControl variant="standard" className="w-100 pb-1">
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


                                {filter.operator && (

                                  <FormControl variant="standard" className="w-100 pb-1">
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

                                <div className="text-end ">
                                  <DeleteIcon
                                    onClick={() => handleFilterDelete(index)}
                                    style={{ cursor: "pointer", margin: "10px 0px 0px 0px" }}
                                  />
                                </div>
                              </div> </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <hr className="py-2" />
                  {/* <div className="text-end  pb-3 mx-2"> <button className=" btn btn-outline-color "> Apply Changes</button></div> */}
                </div>
              </div>
            </div>
          </div>
          {/* customazie end  */}
        </div>



      </div>}

    </div >
  );
};

export default Report;
