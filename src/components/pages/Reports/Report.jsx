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
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddBusinessTwoTone } from "@mui/icons-material";
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
          alert("Report Added");
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
    if (students && reportForm && reportForm.dateRange.fromDate && reportForm.dateRange.toDate) {
      const filteredResults = students.filter((item) => {
        const dateCondition =
          reportForm.dateRange.fromDate && reportForm.dateRange.toDate
            ? item.admissiondate >= reportForm.dateRange.fromDate &&
            item.admissiondate <= reportForm.dateRange.toDate
            : true;
        return (
          dateCondition
        );
      });
      setFilteredStudents(filteredResults);
    }
  }, [students, reportForm]);
  useEffect(() => {
    if (filteredStudents) {
      let organizedData;
      if (reportForm) {
        if (reportForm.reportType === "Three Dimensional") {
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
        if (reportForm.reportType === "Two Dimensional") {
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
        if (reportForm.reportType === "One Dimensional") {
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
  // // filter
  // const [dateRangeType, setDateRangeType] = useState()
  // const handleDateRangeType = () => {

  // }

  return (

    <div className="container mt-3">
      {reportForm && <div className="mini-reports mt-3">
        <h5 className="px-2 my-3">
          {reportForm && reportForm.reportName}
        </h5>
        <div className="row px-3">
          <div className="col-12 col-md-6 col-lg-2 col-xl-2 ">


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
              value={reportForm && reportForm.dateRange.fromDate}
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
              value={reportForm.dateRange.toDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2 mt-2">
            <button className="btn btn-outline-color"> Apply</button>
          </div>
          {/* <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div> */}
          <div className="col-6 col-md-4 col-lg-2 col-xl-2 ">
            <Dropdown>
              <MenuButton className=" btn btn-outline-color mt-2" >Action  </MenuButton>
              <Menu className="dropdown-css">
                <MenuItem ><ShareIcon /> &nbsp;&nbsp;Share</MenuItem>
                <MenuItem >
                  <DownloadIcon />&nbsp; &nbsp;  Download
                </MenuItem>
              </Menu>
            </Dropdown>
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
                        Student Name
                      </TableCell>

                      {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>

                    {organizedData && reportForm.dimensions.dimension1 && !reportForm.dimensions.dimension2 && !reportForm.dimensions.dimension3 &&
                      Object.entries(organizedData).map(([dim1, students]) =>

                        students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                            </TableCell>
                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "0.8rem" }}>{student.name}</span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}

                    {reportForm.dimensions.dimension1 && reportForm.dimensions.dimension2 && !reportForm.dimensions.dimension3 &&
                      Object.entries(organizedData).map(([dim1, dim1Data]) =>
                        Object.entries(dim1Data).map(([dim2, students]) =>
                          students.map((student) => (
                            <TableRow key={student.id}>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{dim2}</span>
                              </TableCell>
                              <TableCell className="Table-cell text-center">
                                <span style={{ fontSize: "0.8rem" }}>{student.name}</span>
                              </TableCell>
                            </TableRow>
                          )))
                      )}
                    {reportForm.dimensions.dimension1 && reportForm.dimensions.dimension2 && reportForm.dimensions.dimension3 &&
                      Object.entries(organizedData).map(([dim1, dim1Data]) =>
                        Object.entries(dim1Data).map(([dim2, dim2Data]) =>
                          Object.entries(dim2Data).map(([dim3, students]) =>
                            students.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell className="Table-cell text-center">
                                  <span style={{ fontSize: "0.8rem" }}>{dim1}</span>
                                </TableCell>
                                <TableCell className="Table-cell text-center">
                                  <span style={{ fontSize: "0.8rem" }}>{dim2}</span>
                                </TableCell>
                                <TableCell className="Table-cell text-center">
                                  <span style={{ fontSize: "0.8rem" }}>{dim3}</span>
                                </TableCell>
                                <TableCell className="Table-cell text-center">
                                  <span style={{ fontSize: "0.8rem" }}>{student.name}</span>
                                </TableCell>
                              </TableRow>

                            ))
                          )
                        )
                      )}


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
                  <p> Average of Company Annual Revenue</p>
                  <p> INR 0</p>
                </div><hr />
                <div className="accordion mt-3" id="accordionExample" >
                  <div class="accordion-item">
                    <h3 className="accordion-header" id="headingOne">
                      <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" >
                        Dimensions
                      </button>
                    </h3>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <FormControl variant="standard" className="w-100">
                          <InputLabel>
                            <span className="label-family ">Choose</span>
                          </InputLabel>
                          <Select >
                            <MenuItem value="branch">Branch</MenuItem>
                            <MenuItem value="country"> Country</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h3 class="accordion-header" id="headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Filters
                      </button>
                    </h3>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <h6 > Select Filters</h6>


                        <FormControl variant="standard" className="w-100">
                          <InputLabel>
                            <span className="label-family "> Add a Filter</span>
                          </InputLabel>
                          <Select >
                            <MenuItem value="branch">Branch</MenuItem>
                            <MenuItem value="country"> Country</MenuItem>

                          </Select>
                        </FormControl>


                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Metrics
                      </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div class="accordion-body">
                        <div className="d-flex justify-content-between">
                          <h6 > All Metrics</h6>

                          <button className="btn btn-outline-color"
                          // onClick={addnew}

                          > Add New</button>
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
                    <hr className="py-2" />
                    <div className="text-end  pb-3 mx-2"> <button className=" btn btn-outline-color "> Apply Changes</button></div>
                  </div>
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
