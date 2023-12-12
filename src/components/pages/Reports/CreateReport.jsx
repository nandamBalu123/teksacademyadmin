import React, { useState } from "react";
import "./CreateReports.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const CreateReport = () => {
  const [onedimensional, setonedimensional] = useState(false);
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
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel>
                      <span className="label-family">Report Type</span>
                    </InputLabel>
                    <Select name="datefilter">
                      <MenuItem value="onedimensional"
                        onClick={(e) => 
                          setonedimensional(true)
                        }>
                        
                        One Dimensional
                      </MenuItem>
                      <MenuItem value="multidimensional">
                        
                        Multi Dimensional
                      </MenuItem>
                      <MenuItem value="goalvsachievement">
                        
                        Goal VS Achievement
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="row px-2">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel>
                      <span className="label-family"> Date Filter</span>
                    </InputLabel>
                    <Select name="datefilter">
                      <MenuItem value="convertat"> Convert At</MenuItem>
                      <MenuItem value="createat"> Create At</MenuItem>
                      <MenuItem value="updateat"> Update At</MenuItem>
                      <MenuItem value="taskdueon"> Task Due On</MenuItem>
                      <MenuItem value="latestactivityon">
                        
                        Latest Activity On
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel>
                      <span className="label-family"> Date Range</span>
                    </InputLabel>
                    <Select name="datefilter">
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="last7days">Last 7 Days</MenuItem>
                      <MenuItem value="next7days"> Next 7 Days</MenuItem>
                      <MenuItem value="last15days">Last 15 Days</MenuItem>
                      <MenuItem value="next15days"> Next 15 Days</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
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
                    name="fromdate"
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
                    name="todate"
                  />
                </div>
              </div>
              
              <div className="row px-2 ">
                <span className="label-family fw-light my-2">
                  
                  Report Description
                </span>
                <div class="d-lg-none col-12 col-md-12 col-xl-12 col-lg-12 text-center">
                  <textarea
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
                  ></textarea>
                </div>

                <div className="col-6 col-md-12 col-xl-12 col-lg-12 text-center d-none d-lg-block ">
                  <textarea
                    style={{
                      paddingLeft: "10px",
                      fontFamily: "Poppins, sans-seri",
                      fontweight: "300",
                      fontsize: "0.9rem",
                    }}
                    rows="3"
                    placeholder="Enter Text ......."
                    name="comment"
                    form="form-control"
                  ></textarea>
                </div>
              </div>

              <div className="px-2 my-2"> 
                <span className="label-family "> Dimensions</span>
                <div className="dimensions mb-4">
                  <h6 className="alldimensions"> All Dimensions</h6>
                  <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-3">
                  <FormControl variant="standard" className="w-100">
                    <InputLabel>
                      <span className="label-family">Choose</span>
                    </InputLabel>
                    <Select >
                      <MenuItem value="branch">Branch</MenuItem>
                      <MenuItem value="country"> Country</MenuItem>
                     
                    </Select>
                  </FormControl></div>
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
                    <Select >
                      <MenuItem value="enrollments">Number of Enrollments</MenuItem>
                      <MenuItem value="annualrevenue"> Sum of Company Annual Revenue</MenuItem>
                     
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
               
                <div  className="col-12 col-md-9 col-lg-9 col-lg-10"> <button className="btn btn-color mt-1"> Generate Preview </button></div>
              <div className="col-12 col-md-2 col-lg-2 col-lg-2">  <button className="btn btn-color  mt-1 me-3"> Save</button> </div>
              </div>
              {onedimensional &&
              <div> bhavitha</div>}
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
