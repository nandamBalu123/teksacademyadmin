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
      <h4>Requested Certificates</h4>
      {issuedCertificates && (
        <button onClick={(e) => setissuedCertificates((e) => !e)}>
          Requested Certificates
        </button>
      )}
      {!issuedCertificates && (
        <button onClick={(e) => setissuedCertificates((e) => !e)}>
          Issued Certificates
        </button>
      )}
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
