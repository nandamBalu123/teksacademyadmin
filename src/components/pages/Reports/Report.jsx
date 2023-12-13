import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Report.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { AddBusinessTwoTone } from "@mui/icons-material";
const Report = () => {
  const { id } = useParams();
  const [metrics, setMetrics] = useState(
    [{

      metricsvalue: ["Number of Enrollments", "Sume of Annual Revenue"]
    }


    ]
  );
  // const addnew = () => {
  //   setMetrics(prevMetrics => [
  //     ...prevMetrics,
  //     {
  //       metricsvalue: ["Number of Enrollments", "Sum of Annual Revenue"]
  //     }
  //   ]);
  // };
  const addnew = () => {
    let oldmetrics = [...metrics]
    oldmetrics.push({
      metricsvalue: ["Number of Enrollments", "Sume of Annual Revenue"]
    })
    setMetrics(oldmetrics);
    console.log("data", oldmetrics);
  }
  useEffect(
    () => {
      console.log("data", metrics);
    }
  )

  // const newmetrics = metrics.push({
  //   metricsvalue: ["Number of Enrollments", "Sume of Annual Revenue"]
  // })

  const [data, setData] = useState([
    { reportName: "BranchWise Data" },
    { reportName: "CourseWise Data" },
    { reportName: "CounsellorWise Data" },
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          // setData(response.data);
          console.log("response.data", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (

    <div className="container mt-3">
      <div className="mini-reports mt-3">
        <h5 className="text-center my-3">
          {data[parseInt(id)].reportName}{" "}
        </h5>
        <div className="row px-3">
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
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
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
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
          <div className="col-6 col-md-4 col-lg-2 col-xl-2">
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
          <div className="col-6 col-md-3 col-lg-1 col-xl-2 mt-2">
            <button className="btn btn-outline-color"> Apply </button>
          </div>
          <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
          <div className="col-6 col-md-4 col-lg-2 col-xl-2 d-flex">
            <button type="button" className="btn-css btn-outline-color mt-2">
              Action
            </button>
            <button
              type="button"
              className=" toggle-css btn-outline-color dropdown-toggle dropdown-toggle-split mt-2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></button>


          </div>
          <div className="col-6 col-md-4 col-lg-1 col-xl-1 mt-2">
            <button className="btn btn-outline-color">Save</button>
          </div>
        </div>
        <hr className="my-3" />
        <div className="row">
          <div className="col-12 col-md-7 col-lg-7 col-xl-7">


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
          <div className="col-12 col-md-5 col-lg-5 col-xl-5 ">
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
                            onClick={addnew}

                          > Add New</button>
                        </div>


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
                              <DeleteIcon />
                            </div>
                          </div>
                        ))}








                      </div>
                    </div>
                    <hr className="py-2" />
                    <div className="text-end  pb-3 mx-2"> <button className=" btn btn-outline-color "> Apply Changes</button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div >
  );
};

export default Report;
