import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import axios from "axios";
const Requestedcertificates = () => {
  const { students, dispatch } = useStudentsContext();
  const handleRequest = (id, courseStartDate, courseEndDate) => {
    let certificate_status = [
      {
        courseStartDate: courseStartDate,
        courseEndDate: courseEndDate,
        certificateStatus: "issued",
      },
    ];
    const updatedData = {
      certificate_status,
    };
    const uploadcontext = { certificate_status, id };
    console.log("certificate_status", updatedData);
    console.log("id", id);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/certificatestatus/${id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          // alert("Certificate updated successfully");
          dispatch({
            type: "UPDATE_CERTIFICATE_STATUS",
            payload: uploadcontext,
          });
        } else {
          alert("Error please Try Again");
        }
      });
  };
  const [issuedCertificates, setissuedCertificates] = useState(false);
  return (
    <div className="container req-certificate my-3">
      <div className="d-flex justify-content-between">
        {!issuedCertificates && <span>Requested Certificates</span>}
        {issuedCertificates && <span>Issued Certificates</span>}

        {issuedCertificates && (
          <button
            class="btn btn-primary"
            onClick={(e) => setissuedCertificates((e) => !e)}
          >
            Requested Certificates
          </button>
        )}
        {!issuedCertificates && (
          <button
            class="btn btn-primary"
            onClick={(e) => setissuedCertificates((e) => !e)}
          >
            Issued Certificates
          </button>
        )}
      </div>

      {/* <div className="row mb-3 px-4 pt-2">
        <div className="col-12 col-md-8 col-lg-8 col-xl-8">
          <input
            type="text"
            className="input-field ps-2"
            placeholder="Search Here...."
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
          <hr className="w-75" />
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1 pt-3">
          <h6>
            {" "}
            {recordCount}/{initialDataCount}
          </h6>
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1  pt-3">
          <select onChange={handlerecorddata}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
          </select>
        </div>

        <div className="col-4 col-md-1 col-lg-1 col-xl-1 ">
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <button
              className="btn btn-primary mr-20 ms-2 mb-2"
              style={{ textTransform: "capitalize" }}
            >
              Filter
            </button>
          </Button>

          <Menu
            className="mt-5"
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
            <div className="d-flex justify-content-between">
              <MenuItem> Filter</MenuItem>
              <MenuItem>
                {" "}
                <CloseIcon onClick={handleClose} />{" "}
              </MenuItem>
            </div>
            <hr />
            <MenuItem className="pt-3 ">
              <div>
                <label> From: </label>
              </div>
              <div>
                <input
                  type="date"
                  className="w-100"
                  style={{
                    height: "45px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="fromdate"
                  value={filterCriteria.fromdate}
                  onChange={handleInputChange}
                />
              </div>
            </MenuItem>
            <MenuItem className="pt-3 ">
              <label className="ms-"> To: </label>

              <div>
                <input
                  type="date"
                  className="w-100"
                  style={{
                    height: "45px",
                    border: "1.5px solid black",
                    borderRadius: "5px",
                  }}
                  name="todate"
                  value={filterCriteria.todate}
                  onChange={handleInputChange}
                />
              </div>
            </MenuItem>
            <MenuItem>
              <select
                className="mt-3"
                id=""
                required
                style={{
                  height: "45px",
                  paddingRight: "145px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="course"
                value={filterCriteria.course}
                onChange={handleInputChange}
              >
                <option>Course</option>
                {getcourses &&
                  getcourses.map((item, index) => (
                    <option key={item.id} value={item.course_name}>
                      {item.course_name}
                    </option>
                  ))}
              </select>
            </MenuItem>
            <MenuItem>
              <select
                className="mt-3"
                id=""
                required
                style={{
                  height: "45px",

                  paddingRight: "50px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="branch"
                value={filterCriteria.branch}
                onChange={handleInputChange}
              >
                <option value="">Branch</option>
                {branches &&
                  branches.map((branch, index) => (
                    <option key={branch.id} value={branch.branch_name}>
                      {branch.branch_name}
                    </option>
                  ))}
              </select>
            </MenuItem>
            <MenuItem>
              <select
                className="mt-3"
                id=""
                required
                style={{
                  height: "45px",

                  paddingRight: "50px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="enquirytakenby"
                value={filterCriteria.enquirytakenby}
                onChange={handleInputChange}
              >
                <option value="">Counsellor</option>
                {filteredcounsellor &&
                  filteredcounsellor.map((user, index) => (
                    <option value={user.fullname}> {user.fullname}</option>
                  ))}
              </select>
            </MenuItem>
            <MenuItem>
              <select
                className="mt-3"
                id=""
                required
                style={{
                  height: "45px",

                  paddingRight: "50px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                name="status"
                value={filterCriteria.status}
                onChange={handleInputChange}
              >
                <option value="">---Status---</option>
                <option value="">Request Submitted</option>
                <option value="issued">Issued</option>
                <option value="">Pending</option>
              </select>
            </MenuItem>
            <MenuItem className="d-flex justify-content-between">
              <button className="clear" onClick={filterreset}>
                {" "}
                Clear
              </button>
            </MenuItem>
          </Menu>
        </div>
      </div> */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary text-light fs-6 border border 1">
                  {" "}
                  S. No
                </TableCell>
                <TableCell className="bg-primary text-light fs-6 border border 1">
                  {" "}
                  Name
                </TableCell>
                <TableCell className="bg-primary text-light fs-6 border border 1">
                  {" "}
                  Course
                </TableCell>
                <TableCell className="bg-primary text-light fs-6 border border 1">
                  {" "}
                  Registration ID
                </TableCell>

                <TableCell className="bg-primary text-light fs-6 border border 1">
                  {" "}
                  Course StartDate
                </TableCell>
                <TableCell className="bg-primary text-light fs-6 border border 1">
                  Course EndDate
                </TableCell>

                <TableCell className="bg-primary text-light fs-6">
                  Certificate Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!issuedCertificates &&
                students &&
                students.map((student, index) => {
                  const validitystartdate = student.validitystartdate;
                  const dateTime = new Date(validitystartdate);
                  const startdate = dateTime.toISOString().slice(0, 10);
                  const validityenddate = student.validityenddate;
                  const dateTimee = new Date(validitystartdate);
                  const enddate = dateTimee.toISOString().slice(0, 10);
                  const certificate_Status = student.certificate_status;
                  const courseStartDate = certificate_Status
                    .map((item) => item.courseStartDate)
                    .join(", ");
                  const courseEndDate = certificate_Status
                    .map((item) => item.courseEndDate)
                    .join(", ");
                  const certificateStatus = certificate_Status
                    .map((item) => item.certificateStatus)
                    .join(", ");
                  // if (certificateStatus === "request Submitted")
                  if (certificateStatus !== "request Submitted") {
                    return null; // Do not render anything
                  }
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.courses}</TableCell>{" "}
                      <TableCell>{student.registrationnumber}</TableCell>
                      <TableCell>{courseStartDate}</TableCell>
                      <TableCell>{courseEndDate}</TableCell>{" "}
                      {certificateStatus === "request Submitted" && (
                        <button
                          className="btn btn-warning center m-0 px-1"
                          onClick={(e) =>
                            handleRequest(
                              student.id,
                              courseStartDate,
                              courseEndDate
                            )
                          }
                        >
                          Issue Certificate
                        </button>
                      )}
                      {certificateStatus === "issued" && (
                        <button className="btn  btn-success center m-0 px-1">
                          Certificate Issued
                        </button>
                      )}
                    </TableRow>
                  );
                })}
              {issuedCertificates &&
                students &&
                students.map((student, index) => {
                  const validitystartdate = student.validitystartdate;
                  const dateTime = new Date(validitystartdate);
                  const startdate = dateTime.toISOString().slice(0, 10);
                  const validityenddate = student.validityenddate;
                  const dateTimee = new Date(validitystartdate);
                  const enddate = dateTimee.toISOString().slice(0, 10);
                  const certificate_Status = student.certificate_status;
                  const courseStartDate = certificate_Status
                    .map((item) => item.courseStartDate)
                    .join(", ");
                  const courseEndDate = certificate_Status
                    .map((item) => item.courseEndDate)
                    .join(", ");
                  const certificateStatus = certificate_Status
                    .map((item) => item.certificateStatus)
                    .join(", ");
                  // if (certificateStatus === "request Submitted")
                  if (certificateStatus === "issued") {
                    return (
                      <TableRow>
                        
                        <TableCell className="border border 1">{index + 1}</TableCell>
                        <TableCell className="border border 1">{student.name}</TableCell>
                        <TableCell className="border border 1">{student.courses}</TableCell>{" "}
                        <TableCell className="border border 1">{student.registrationnumber}</TableCell>
                        <TableCell className="border border 1">{courseStartDate}</TableCell>
                        <TableCell className="border border 1">{courseEndDate}</TableCell>{" "}
                        <TableCell className="border border 1 text-center fs-6"> 
                        {certificateStatus === "request Submitted" && (
                          <button
                            className="btn btn-warning center m-0 px-1"
                            onClick={(e) =>
                              handleRequest(
                                student.id,
                                courseStartDate,
                                courseEndDate
                              )
                            }
                          >
                            Issue Certificate
                          </button>
                        )}
                        {certificateStatus === "issued" && (
                          <button className="btn  btn-success center m-0 px-1">
                            Certificate Issued
                          </button>
                        )}
                        </TableCell>
                        
                      </TableRow>
                    );
                  }
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Requestedcertificates;
