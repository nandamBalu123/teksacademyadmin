import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
// import profilepic from "../../../../images/profilepicture.jpg";
import "./StudentDataView.css";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import profilePic from "../../../../images/img4-11.png";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import useFormattedDate from "../../../../hooks/useFormattedDate";
import { Link } from "react-router-dom";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

const StudentDataView = () => {
  const { id } = useParams();
  console.log("id", id);
  const { students, dispatch } = useStudentsContext();
  const [studentdata, setstudentdata] = useState("");

  let BirthDate = useFormattedDate(studentdata.birthdate);
  let EnquiryDate = useFormattedDate(studentdata.enquirydate);
  let ValidityStart = useFormattedDate(studentdata.validitystartdate);
  let ValidityEnd = useFormattedDate(studentdata.validityenddate);
  let AdmissionDate = useFormattedDate(studentdata.admissiondate);
  // useEffect(() => {
  //   // Make a GET request to your backend API endpoint
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       setstudentdata(response.data[0]); // Update the data state with the fetched data
  //       console.log("studentdata", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    if (students && id) {
      const filteredResults = students.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setstudentdata(filteredResults[0]);
    }
  }, [students, id, dispatch]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="container mt-3">
      <div className="studentdataview">
        <h4 className="text-center mt-3"> Student Details From</h4>
        <div className="row">
          <div className="col-12 col-md-7 col-lg-4 col-xl-4">
            {!studentdata.studentImg && <img src={profilePic} alt="photo" />}
            {studentdata.studentImg && (
              <img
                className=" w-75"
                src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
                alt="photo"
              />
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-4">
            <p>
              <b> Name : </b>
              {studentdata.name}
            </p>
            <p>
              <b>EMail : </b>
              {studentdata.email}
            </p>
            <p>
              <b>Mobile Number : </b>
              {studentdata.mobilenumber}
            </p>
            <p>
              <b> Registration No : </b>
              {studentdata.registrationnumber}
            </p>
            <p>
              <b>Whatsapp Number : </b> {studentdata.whatsappno}
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-4">
            <p>
              <b> Admission Date : </b>
              {AdmissionDate}
            </p>
            <p>
              <b> Course : </b>
              {studentdata.courses}
            </p>
            <p>
              <b> Branch : </b>
              {studentdata.branch}
            </p>
            <p>
              <b> Validity Start Date : </b>
              {ValidityStart}
            </p>
            <p>
              <b>Validity End Date : </b>
              {ValidityEnd}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 col-xl-4  mt-2 ">
            <p>
              <b> Country : </b>
              {studentdata.country}
            </p>
            <p>
              <b> State : </b>
              {studentdata.state}
            </p>
            <p>
              <b> Area : </b>
              {studentdata.area}
            </p>
            <p>
              <b>Native Place : </b>
              {studentdata.native}
            </p>
            <p>
              <b>Zipcode : </b>
              {studentdata.zipcode}
            </p>
            <p>
              <b> Admission Remarks : </b>
              {studentdata.admissionremarks}
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2 ">
            <p>
              <b>Parent's Name : </b>
              {studentdata.parentsname}
            </p>
            <p>
              <b>Birth Date : </b> {BirthDate}
            </p>
            <p>
              <p>
                <b>Gender : </b> {studentdata.gender}
              </p>
            </p>
            <p>
              <b>College : </b>
              {studentdata.college}
            </p>
            <p>
              <b>Education Type : </b> {studentdata.educationtype}
            </p>
            <p>
              <b> Assets : </b>
              {studentdata.assets}
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
            <p>
              <b>Enquiry Date : </b>
              {EnquiryDate}
            </p>
            <p>
              <b> Enquiry Taken By : </b>
              {studentdata.enquirytakenby}
            </p>
            <p>
              <b>Course Package : </b>
              {studentdata.coursepackage}
            </p>
            <p>
              <b>Lead Source : </b>

              {studentdata.leadsource &&
                studentdata.leadsource.map((source) => (
                  <span key={source.id}>
                    <span>{source.source}</span>
                    {source.name && <div>Name :{source.name} </div>}
                    {source.mobileNumber && (
                      <div>Mobile Number:{source.mobileNumber} </div>
                    )}
                  </span>
                ))}
            </p>
            <p>
              <b> Mode of Traning : </b>
              {studentdata.modeoftraining}
            </p>
          </div>
        </div>

        <TableContainer component={Paper} className="my-4">
          <Table aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className=" table-cell-heading">Fee Type</TableCell>
                <TableCell className=" table-cell-heading">Amount</TableCell>
                <TableCell className=" table-cell-heading">Discount</TableCell>
                <TableCell className=" table-cell-heading">
                  Tax Amount (Inclusive of GST)
                </TableCell>
                <TableCell className=" table-cell-heading">
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentdata.feedetails &&
                studentdata.feedetails.map((item, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell className="Table-cell text-center">
                      {item.feetype}
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                      {Number(
                        parseFloat(item.amount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                      {item.discount &&
                        Number(
                          parseFloat(item.discount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      {!item.discount && <>0</>}
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                      {Number(
                        parseFloat(item.taxamount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                      {Number(
                        parseFloat(item.totalamount).toFixed(2)
                      ).toLocaleString("en-IN")}
                      <br />
                      {item.feetype === "fee" ? (
                        <>
                          Materialfee:
                          {Number(
                            parseFloat(studentdata.materialfee).toFixed(2)
                          ).toLocaleString("en-IN")}
                          <br /> CourseFee:{" "}
                          {Number(
                            parseFloat(
                              item.totalamount - studentdata.materialfee
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </>
                      ) : (
                        <span></span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading">
                  Installment
                </TableCell>
                <TableCell className="table-cell-heading">Due Date</TableCell>
                <TableCell className="table-cell-heading">Due Amount</TableCell>
                <TableCell className="table-cell-heading">Paid Date</TableCell>
                <TableCell className="table-cell-heading">
                  Paid Amount
                </TableCell>

                <TableCell className="table-cell-heading">
                  Mode of Payment
                </TableCell>
                <TableCell className="table-cell-heading">
                  Transition ID
                </TableCell>

                <TableCell className="table-cell-heading">Invoice</TableCell>
              </TableRow>
            </TableHead>
            {studentdata.installments &&
              studentdata.installments.map((item, index) => {
                let paidDate = new Date(item.paiddate);
                const day = paidDate.getUTCDate();
                const monthIndex = paidDate.getUTCMonth();
                const year = paidDate.getUTCFullYear();
                let dueDate = new Date(item.duedate);
                const dueday = dueDate.getUTCDate();
                const duemonthIndex = dueDate.getUTCMonth();
                const dueyear = dueDate.getUTCFullYear();
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
                paidDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                  }-${year}`;
                dueDate = `${dueday < 10 ? "0" : ""}${dueday}-${monthAbbreviations[duemonthIndex]
                  }-${dueyear}`;

                if (item.paidamount < 1) {
                  return null; // Do not render anything
                }

                return (
                  <TableBody>
                    <TableRow>
                      <TableCell className=" Table-cell text-center">
                        Installment {index + 1}
                      </TableCell>

                      <TableCell className="Table-cell text-center">
                        {dueDate}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {Number(
                          parseFloat(item.dueamount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {paidDate}
                      </TableCell>
                      <TableCell className="Table-cell text-center  ">
                        {Number(item.paidamount).toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell className="Table-cell text-center">
                        {item.modeofpayment}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        {item.transactionid}
                      </TableCell>
                      <TableCell className="Table-cell text-center">
                        <Link
                          to={`/invoice/${id}/${index}/Installment/admininvoice`}
                          style={{ width: "40px", paddingRight: "15px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="icon-color" />
                          <div class="hover-text">admin</div>
                        </Link>
                        <Link
                          to={`/invoice/${id}/${index}/Installment/studentinvoice`}
                          style={{ width: "40px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="icon-color" />
                          <div class="hover-text">Student</div>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
        <h5 className="mt-3"> Extra Discount</h5>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading">Date</TableCell>
                <TableCell className="table-cell-heading">
                  Extra Discount
                </TableCell>
                <TableCell className="table-cell-heading">Remarks</TableCell>
              </TableRow>
            </TableHead>
            {studentdata.extra_discount &&
              studentdata.extra_discount.map((item, index) => {
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

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="Table-cell">{date}</TableCell>
                      <TableCell className="Table-cell">
                        {item.Discount}
                      </TableCell>

                      <TableCell className="Table-cell">
                        {item.Discount_remarks}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
      </div>

      <div className="studentdataview ">
        {/* <div className="bg">
          {!studentdata.studentImg && (
            <img className="photo" src={profilePic} alt="photo" />
          )}
          {studentdata.studentImg && (
            <img
              className="photo"
              src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
              alt="photo"
            />
          )}
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
            <p> Birth Date: {BirthDate}</p>
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
            <p> Enquiry Date : {EnquiryDate}</p>
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
             
              Validity :{ValidityStart} to {ValidityEnd}
            </p>
            <p> Registration No: {studentdata.registrationnumber}</p>
          </div>
          <div className="col-4 text-end">
           
            <p> Admission Date: {AdmissionDate} </p>
            <p> Admission Status: {studentdata.admissionstatus} </p>
          </div>
        </div>

        <TableContainer component={Paper} className="my-4">
          <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="fs-6 text-center border border-2">
                 
                  Fee Type{" "}
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                 
                  Amount{" "}
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                 
                  Discount
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                 
                  Tax Amount (Inclusive of GST)
                </TableCell>
                <TableCell className="fs-6 text-center border border-2">
                 
                  Total Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentdata.feedetails &&
                studentdata.feedetails.map((item, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell className="text-center border border-2">
                     
                      {item.feetype}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {Number(
                        parseFloat(item.amount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {item.discount &&
                        Number(
                          parseFloat(item.discount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      {!item.discount && <>0</>}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {Number(
                        parseFloat(item.taxamount).toFixed(2)
                      ).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-center border border-2">
                      {Number(
                        parseFloat(item.totalamount).toFixed(2)
                      ).toLocaleString("en-IN")}
                      <br />
                      {item.feetype === "fee" ? (
                        <>
                          Materialfee:
                          {Number(
                            parseFloat(studentdata.materialfee).toFixed(2)
                          ).toLocaleString("en-IN")}
                          <br /> CourseFee:{" "}
                          {Number(
                            parseFloat(
                              item.totalamount - studentdata.materialfee
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </>
                      ) : (
                        <span></span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className=" fs-6 border border 1 text-center">
                 
                  Installment
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center ">
                  Due Date
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center  ">
                  Due Amount
                </TableCell>
                <TableCell className="fs-6 border border 1 text-center ">
                  Paid Date
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center  ">
                  Paid Amount
                </TableCell>

                <TableCell className=" fs-6 border border 1 text-center ">
                  Mode of Payment
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center">
                  Transition ID
                </TableCell>

                <TableCell className=" fs-6 border border 1 text-center  ">
                 
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            {studentdata.installments &&
              studentdata.installments.map((item, index) => {
                let paidDate = new Date(item.paiddate);
                const day = paidDate.getUTCDate();
                const monthIndex = paidDate.getUTCMonth();
                const year = paidDate.getUTCFullYear();
                let dueDate = new Date(item.duedate);
                const dueday = dueDate.getUTCDate();
                const duemonthIndex = dueDate.getUTCMonth();
                const dueyear = dueDate.getUTCFullYear();
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
                paidDate = `${day < 10 ? "0" : ""}${day}-${
                  monthAbbreviations[monthIndex]
                }-${year}`;
                dueDate = `${dueday < 10 ? "0" : ""}${dueday}-${
                  monthAbbreviations[duemonthIndex]
                }-${dueyear}`;

                if (item.paidamount < 1) {
                  return null; // Do not render anything
                }

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="border border 1 text-center">
                        Installment {index + 1}
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {dueDate}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {Number(
                          parseFloat(item.dueamount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {paidDate}
                      </TableCell>
                      <TableCell className="border border 1 text-center  ">
                        {Number(item.paidamount).toLocaleString("en-IN")}
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {item.modeofpayment}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {item.transactionid}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        <Link
                          to={`/invoice/${id}/${index}/Installment/admininvoice`}
                          style={{ width: "40px", paddingRight: "15px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="iconn" />
                          <div class="hover-text">admin</div>
                        </Link>
                        <Link
                          to={`/invoice/${id}/${index}/Installment/studentinvoice`}
                          style={{ width: "40px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="iconn" />
                          <div class="hover-text">Student</div>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
        <div>Extra Discount</div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className=" fs-6 border border 1 text-center">
                  Date
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center">
                  Extra Discount
                </TableCell>
                <TableCell className=" fs-6 border border 1 text-center ">
                  Remarks
                </TableCell>
              </TableRow>
            </TableHead>
            {studentdata.extra_discount &&
              studentdata.extra_discount.map((item, index) => {
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
                date = `${day < 10 ? "0" : ""}${day}-${
                  monthAbbreviations[monthIndex]
                }-${year}`;

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="border border 1 text-center">
                        {date}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {item.Discount}
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {item.Discount_remarks}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer> */}
      </div>
    </div>
  );
};
export default StudentDataView;
