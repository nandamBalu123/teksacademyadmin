import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./StudentDataView.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentDataView = () => {
  const { id } = useParams();
  console.log("id", id);
  const [studentdata, setstudentdata] = useState("");

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`http://localhost:3030/viewstudentdata/${id}`)
      .then((response) => {
        // Handle the successful response here
        setstudentdata(response.data[0]); // Update the data state with the fetched data
        console.log("studentdata", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("student", studentdata.email);
  return (
    <>
      <h2 className="text-center"> Student Details From</h2>
      <div className="studentdataview">
        <div className="bg">
          <img
            className="photo"
            src="https://wallpapers.com/images/high/pretty-profile-pictures-k1qebyviiyl0wx0x.webp"
            alt="photo"
          />
        </div>

        <div className="row">
          <div className="col-6">
            <h6> Basic Details</h6> <hr className="w-50" />
            <p> Name : {studentdata.name}</p>
            <p> EMail: {studentdata.email}</p>
            <p> Mobile Number: {studentdata.mobilenumber}</p>
            <p></p>
          </div>
          <div className="col-6 text-end">
            <h6> Education Details</h6>
            <hr className="w-50  end" />{" "}
            <p> Education Type: {studentdata.educationtype}</p>
            <p>Marks: {studentdata.marks} </p>
            <p> Academic Year: {studentdata.academicyear}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <h6> Student Details</h6> <hr className="w-50" />
            <p> Parent's Name : {studentdata.parentsname}</p>
            <p> Birth Date: {studentdata.birthdate}</p>
            <p> Gender: {studentdata.gender}</p>
            <p> Marital Status: {studentdata.maritalstatus}</p>
            <p> College: {studentdata.college}</p>
          </div>
          <div className="col-4  text-start ">
            <h6> Student Contact Details</h6>
            <hr className="w-50  start " />
            <p> Whatsapp Number: {studentdata.whatsappno}</p>
            <p> State: {studentdata.state} </p>
            <p>Area: {studentdata.area} </p>
            <p> Native Place: {studentdata.native}</p>
            <p> Zipcode: {studentdata.zipcode}</p>
          </div>
          <div className="col-4 text-end">
            <h6> Enquiry Details</h6> <hr className="w-50 end" />
            <p> Enquiry Date : {studentdata.enquirydate}</p>
            <p> Enquiry Taken By: {studentdata.enquirytakenby}</p>
            <p> Course Package: {studentdata.coursepackage}</p>
            <p> Course: {studentdata.courses}</p>
            <p>Lead Source: {studentdata.leadsource} </p>
          </div>
        </div>
        <h5 className="text-center mt-1">Admission Details </h5>
        <hr className="w-75 hr" />
        <div className="row">
          <div className="col-4">
            <p> Branch : {studentdata.branch}</p>
            <p> Mode of Traning: {studentdata.modeoftraining}</p>
          </div>
          <div className="col-4 text-start">
            <p>
              {" "}
              Validity :{studentdata.validitystartdate} to{" "}
              {studentdata.validityenddate}
            </p>
            <p> Registration No: {studentdata.registrationnumber}</p>
          </div>
          <div className="col-4 text-end">
            {" "}
            <p> Admission Date: {studentdata.admissiondate} </p>
            <p> Admission Status: {studentdata.admissionstatus} </p>
          </div>
        </div>

        <TableContainer component={Paper} className="my-4">
          <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="fs-6 text-center border border-2">
                  {" "}
                  Fee Type{" "}
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                  {" "}
                  Amount{" "}
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                  {" "}
                  Discount
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                  {" "}
                  Tax Amount (Inclusive of GST)
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                  {" "}
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentdata.feedetails &&
                JSON.parse(studentdata.feedetails).map((item, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell className="text-center border border-2">
                      {" "}
                      {item.feetype}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {" "}
                      {item.amount}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {item.discount}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {item.taxamount}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {item.totalamount}
                      {item.feetype === "fee" ? (
                        <span>
                          Materialfee:{item.materialfee} CourseFee:
                          {item.coursefee}
                        </span>
                      ) : (
                        <span></span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
export default StudentDataView;
