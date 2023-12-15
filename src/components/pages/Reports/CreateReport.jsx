import React, { useState } from "react";
import "./CreateReports.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
const CreateReport = () => {


  const [customDates, setCustomDates] = useState(false);

  const handleDateFilterChange = (event) => {
    const selectedValue = event.target.value;

    // Update customMonth state based on the selected value
    setCustomDates(selectedValue === 'customDates');
  };
  const [reportForm, setReportForm] = useState(
    { reportName: "", reportType: "", description: "", dateFilter: "", dateRangeType: "", dateRange: { fromDate: "", toDate: "" }, dimensions: { dimension1: "", dimension2: "", dimension3: "" }, metrics: "" }
  )



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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let reports = []
    reports.push(reportForm)
    console.log('Form submitted:', reports);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/createreport`,
        reports
      );

      if (res.data.updated) {
        alert("Fee Added");
        // dispatch({
        //   type: "UPDATE_INSTALLMENTS",
        //   payload: updateContext,
        // });
        // navigator(`/feeview/${id}`);
        // window.location.reload();
      } else {
        alert("Try Again");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      // Handle errors here
    }
  };
  return (
    <div className="container mt-3">

      <h5 className="text-center my-2">Create Report</h5>
      <form className="createreport">

        <div className="row m-0">
          <h5 className="px-4 pt-3">  Basic Information</h5>
          <div className="col-12 col-md-7 col-xl-7 col-lg-7 side-line">
            <div className="row px-2">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">

                <TextField
                  label={<span className="label-family">Report's Name</span>}
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
                    value={reportForm.reportType}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="onedimensional">One Dimensional</MenuItem>
                    <MenuItem value="twodimensional">
                      Two Dimensional</MenuItem>
                    <MenuItem value="threedimensional">
                      Three Dimensional</MenuItem>
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
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <FormControl variant="standard" className="w-100">
                  <InputLabel>
                    <span className="label-family"> Date Filter</span>
                  </InputLabel>
                  <Select
                    name="dateFilter"
                    value={reportForm.dateFilter}
                    onChange={handleInputChange}>

                    <MenuItem value="createdat">Created At</MenuItem>
                    <MenuItem value="updatedat">Updated At</MenuItem>

                  </Select>
                </FormControl>
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
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
            </div>
            {reportForm.dateRangeType === "customDates" &&
              <div className="row  px-2">
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
              </div>
            }




            <div className="px-2 my-2">
              <span className="label-family "> Dimensions</span>
              <div className="dimensions mb-4">
                <div className="d-flex justify-content-between alldimensions">
                  <h6 className="pt-2"> All Dimensions</h6>

                </div>
                {reportForm.reportType === "onedimensional" &&
                  <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension1"
                        value={reportForm.dimensions.dimension1}
                        onChange={handleInputChange}>
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl></div>}
                {reportForm.reportType === "twodimensional" &&
                  <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension1"
                        value={reportForm.dimensions.dimension1}
                        onChange={handleInputChange}>
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl>
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension2"
                        value={reportForm.dimensions.dimension2}
                        onChange={handleInputChange} >
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl></div>
                }
                {reportForm.reportType === "threedimensional" &&
                  <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension1"
                        value={reportForm.dimensions.dimension1}
                        onChange={handleInputChange} >
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl>
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension2"
                        value={reportForm.dimensions.dimension2}
                        onChange={handleInputChange} >
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl>

                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family">Choose</span>
                      </InputLabel>
                      <Select name="dimensions.dimension3"
                        value={reportForm.dimensions.dimension3}
                        onChange={handleInputChange} >
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl></div>}


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
                      <MenuItem value="noOfEnrollments">Number of Enrollments</MenuItem>


                    </Select>
                  </FormControl></div>
              </div>
            </div>
            <div className="px-2 my-2">
              <span className="label-family "> Filters</span>
              <div className="dimensions">
                <h6 className="alldimensions"> Select Filters</h6>
                <div className="row px-3">
                  <div className="col-12 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                    <FormControl variant="standard" className="w-100">
                      <InputLabel>
                        <span className="label-family "> Add a Filter</span>
                      </InputLabel>
                      <Select >
                        <MenuItem value="branch">Branch</MenuItem>
                        <MenuItem value="country"> Country</MenuItem>

                      </Select>
                    </FormControl></div>
                  <div className="col-12 col-md-4 col-lg-4 col-xl-4 my-2 ">
                    <button className="btn btn-color">
                      Add Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" row report-footer ">

              <div className="col-12 col-md-9 col-lg-9 col-lg-10"> <button className="btn btn-color mt-1"> Generate Preview </button></div>
              <div className="col-12 col-md-2 col-lg-2 col-lg-2">  <button type="submit" onClick={handleSubmit} className="btn btn-color  mt-1 me-3"> Save</button> </div>
            </div>

          </div>
          <div className="col-12 col-md-5 col-xl-5 col-lg-5">
            <h5> Report Preview</h5>
            <div className="px-2 my-2">

              <div className="dimensions mb-4">
                <div className="report-headertable px-2">
                  <span className="" > Company Name</span>
                  <div className="d-flex flex-1">
                    <span className="ms-md-5"> Sum of Company Annual Revenue(0) </span></div>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex ">
                    <div className="p-2"> Teks Available</div>
                    <div></div>
                  </div>
                  <div className="d-flex ">
                    <div className="p-2"> Future Available</div>
                    <div></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
};

export default CreateReport;
