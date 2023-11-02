import React from "react";
import { useReactToPrint } from "react-to-print";
import EmailIcon from "@mui/icons-material/Email";

import logo from "../../../../images/Teks-Logo-with-Trade.png";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import numberToWords from "number-to-words";

import "./Invoice.css";
import teksacademylogo from "../../../../images/Teks-Logo-with-Trade.png";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { Hidden } from "@mui/material";
const PrintableComponent = React.forwardRef((props, ref) => {
  const location = useLocation();
  const dataFromState = location.state;
  console.log("dataFromState", dataFromState);
  const { id } = useParams();

  const { index } = useParams();
  const { name } = useParams();

  const [studentdata, setstudentdata] = useState([]);
  const [invoice, setinvoice] = useState();
  const [number, setNumber] = useState();
  useEffect(() => {
    if (name === "Installment" && studentdata.installments) {
      let data = studentdata.installments;
      let paidamount = data[index].paidamount;
      setNumber(paidamount);
    }
    if (name === "Admission Fee" && studentdata.initialpayment) {
      let data = studentdata.initialpayment;
      let initialamount = data[index].initialamount;
      setNumber(initialamount);
    }
    if (number) {
      let words = numberToWords.toWords(number);
      words = words
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setWords(words);
    }
  }, [studentdata]);
  const [words, setWords] = useState("");
  useEffect(() => {
    // const filterbranch = studentdata.filter((item) => item.branch === branch);
    // const branchCount = filterbranch.length;

    // let date = toString(admissiondate);
    // let DD = admissiondate[8] + admissiondate[9];
    // let month = admissiondate[5] + admissiondate[6];
    // let year = admissiondate[2] + admissiondate[3];
    // let firstbranch;
    // if (studentdata.branch) {
    //   firstbranch = studentdata.branch[0].toUpperCase();
    // }
    // let serialno;
    // if (branch) {
    //   serialno = branchCount + 1;
    // }

    // if (serialno) {
    //   serialno = serialno.toString();
    //   if (serialno.length === 3) {
    //     serialno = "0" + serialno;
    //   }
    //   if (serialno.length === 2) {
    //     serialno = "00" + serialno;
    //   }
    //   if (serialno.length === 1) {
    //     serialno = "000" + serialno;
    //   }
    // }
    let firstbranch;
    if (studentdata.branch) {
      firstbranch = studentdata.branch[0].toUpperCase();
    }

    let paiddate;
    if (name === "Admission Fee" && studentdata.initialpayment) {
      let data = studentdata.initialpayment;
      paiddate = data[index].paiddate;
    }
    if (name === "Installment" && studentdata.installments) {
      let data = studentdata.installments;
      paiddate = data[index].paiddate;
    }
    let regnumber;
    if (studentdata.registrationnumber) {
      let regnum = studentdata.registrationnumber;
      regnumber = regnum.substring(9);
    }
    if (!studentdata) {
      setinvoice("");
    }
    if (name === "Admission Fee" && studentdata.initialpayment) {
      setinvoice(
        "TA" +
          firstbranch +
          paiddate[8] +
          paiddate[9] +
          paiddate[5] +
          paiddate[6] +
          paiddate[2] +
          paiddate[3] +
          regnumber +
          "-" +
          regnumber +
          `/${parseInt(index) + 1}`
      );
    }
    if (name === "Installment" && studentdata.installments) {
      setinvoice(
        "TA" +
          firstbranch +
          paiddate[8] +
          paiddate[9] +
          paiddate[5] +
          paiddate[6] +
          paiddate[2] +
          paiddate[3] +
          regnumber +
          "-" +
          regnumber +
          `/${parseInt(index) + 2}`
      );
    }
  }, [studentdata]);
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
      .then((response) => {
        // Handle the successful response here
        // response.data[0].feedetails = JSON.parse(response.data[0].feedetails);
        setstudentdata(response.data[0]); // Update the data state with the fetched data
        // setstudentdata()
        // console.log("studentdata", response.data[0].feedetails);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container invoice" ref={ref}>
      <img
        className="logo-picture center mt-4"
        src={teksacademylogo}
        alt="logo"
      />
      <h3 className="text-center mt-5"> Fee Invoice</h3>
      <hr />
      <div className="row"> 
      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
      <h4 >
            {" "}
            <strong> Kapil Knowledge Hub Private Limited</strong>
          </h4>  
      </div>
      <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
      <h3 >
            <strong>
              {" "}
              <b>INVOICE NO:</b> {invoice}
            </strong>
          </h3>
 
      </div>
</div>
<div className="row m-0 p-0"> 
      <div className="col-12 col-md-6 col-lg-6 col-xl-6">  
      <p >CIN: U80100TG2018PTC123853</p>
      </div>
      <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
      <p >
            {name === "Admission Fee" &&
            studentdata &&
            studentdata.initialpayment &&
            studentdata.initialpayment.length > 0 ? (
              studentdata.initialpayment.map((student) => {
                const originalDate = new Date(student.paiddate);
                const day = String(originalDate.getDate()).padStart(2, "0");
                const month = String(originalDate.getMonth() + 1).padStart(
                  2,
                  "0"
                ); // Month is zero-based, so we add 1.
                const year = originalDate.getFullYear();

                const formattedDate = `${day}-${month}-${year}`;
                return (
                  <span key={student.id}>
                    <b>DATE:</b> {formattedDate}
                  </span>
                );
              })
            ) : name === "Admission Fee" ? (
              <p>No initial payment data available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                const originalDate = new Date(student.paiddate);
                const day = String(originalDate.getDate()).padStart(2, "0");
                const month = String(originalDate.getMonth() + 1).padStart(
                  2,
                  "0"
                ); // Month is zero-based, so we add 1.
                const year = originalDate.getFullYear();

                const formattedDate = `${day}-${month}-${year}`;

                console.log(formattedDate);
                if (indx === parseInt(index)) {
                  return (
                    <span key={student.id}>
                      <b>DATE:</b> {formattedDate}
                    </span>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}
          </p> 
      </div>
</div>
<div className="row m-0 p-0"> 
      <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
      <p >
             GSTIN: 36AAHCK0599C1ZI{" "}
          </p>
      </div>
      <div className="col-12 col-md-6 col-lg-6 col-xl-6">  
      <p >
          
            <b>Branch:</b> {studentdata.branch}
          </p>
      
      </div>
</div>
      
      <div className="mt-2 ">
        <p>
          <b> BILLING TO</b>{" "}
        </p>
        <hr className="w-25" />
        <div className="row ">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <b>Name :</b> {studentdata && studentdata.name}
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <b>Registration No:</b>{" "}
            {studentdata && studentdata.registrationnumber}
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <b>Email :</b> {studentdata && studentdata.email}
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <b>Contact No:</b> {studentdata && studentdata.mobilenumber}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6">
            <b>Address :</b>{" "}
            {studentdata && (
              <span>
                {studentdata.area},&nbsp;{studentdata.native},&nbsp;
                {studentdata.state}, &nbsp;{studentdata.zipcode},&nbsp;
                {studentdata.country}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* <div className="mt-3 ">
        <p>
          <b> BILLING TO</b>{" "}
        </p>
        <hr className="w-25" />
        <div className="d-flex justify-content-space">
          <div>
            <p className="mt-3">
              <b>Name :</b> {studentdata && studentdata.name}
            </p>
            <p className="mt-3">
              <b>Email :</b> {studentdata && studentdata.email}
            </p>
            <p className="mt-3">
              <b>Address :</b>{" "}
              {studentdata && (
                <span>
                  {studentdata.area},&nbsp;{studentdata.native},&nbsp;
                  {studentdata.state}, &nbsp;{studentdata.zipcode},&nbsp;
                  {studentdata.country}
                </span>
              )}
            </p>
          </div>
          <div>
            <p className="mt-3">
              <b>Registration No:</b>{" "}
              {studentdata && studentdata.registrationnumber}
            </p>
            <p className="mt-3">
              <b>Contact No:</b> {studentdata && studentdata.mobilenumber}
            </p>
          </div>
        </div>
      </div> */}
      <div className="table-responsive" style={{ overflow: "hidden" }}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <td className="text-center bg-primary text-light border border 1">
                {" "}
                Description
              </td>
              <td className="text-center bg-primary text-light border border 1">
                {" "}
                Payment Mode
              </td>
              <td className="text-center bg-primary text-light border border 1">
                Fee Excl. Tax
              </td>{" "}
              <td className="text-center bg-primary text-light border border 1">
                {" "}
                Tax
              </td>
              <td className="text-center bg-primary text-light border border 1">
                Total
              </td>
            </tr>
          </thead>
          <tbody>
            {name === "Admission Fee" &&
            studentdata &&
            studentdata.initialpayment &&
            studentdata.initialpayment.length > 0 ? (
              studentdata.initialpayment.map((student) => (
                <tr>
                  <td className=" text-center border border 1">
                    Admission Fee
                  </td>
                  <td className=" text-center border border 1">
                    {student.modeofpayment}
                  </td>
                  <td className=" text-center border border 1">
                    {/* parseFloat(169.49152542372883.toFixed(2)); */}
                    {parseFloat(student.initialamount / 1.18).toFixed(2)}
                    {/* {parseInt(student.initialamount) / 1.18} */}
                  </td>
                  <td className=" text-center border border 1">
                    {(
                      parseFloat(student.initialamount).toFixed(2) -
                      parseFloat(student.initialamount / 1.18).toFixed(2)
                    ).toFixed(2)}
                  </td>
                  <td className=" text-center border border 1">
                    {student.initialamount}
                  </td>
                </tr>
              ))
            ) : name === "Admission Fee" ? (
              <p>No initial payment data available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <tr>
                      <td className=" text-center border border 1">
                        Course Fee
                      </td>
                      <td className=" text-center border border 1">
                        {student.modeofpayment}
                      </td>
                      <td className=" text-center border border 1">
                        {parseFloat((student.paidamount * 0.65) / 1.18).toFixed(
                          2
                        )}
                      </td>
                      <td className=" text-center border border 1">
                        {(
                          parseFloat(student.paidamount * 0.65).toFixed(2) -
                          parseFloat(
                            (student.paidamount * 0.65) / 1.18
                          ).toFixed(2)
                        ).toFixed(2)}
                      </td>
                      <td className=" text-center border border 1">
                        {parseInt(student.paidamount * 0.65)}
                      </td>
                    </tr>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <tr>
                      <td className="border border 1 text-center">
                        Material Fee
                      </td>
                      <td className=" text-center border border 1">
                        {student.modeofpayment}
                      </td>
                      <td className="border border 1 text-center"></td>
                      <td className="border border 1 text-center"></td>
                      <td className="border border 1 text-center">
                        {parseInt(student.paidamount * 0.35)}
                      </td>
                    </tr>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}

            {name === "Admission Fee" &&
            studentdata &&
            studentdata.initialpayment &&
            studentdata.initialpayment.length > 0 ? (
              studentdata.initialpayment.map((student) => (
                <tr>
                  <td className="border border 1 text-center">
                    {" "}
                    <strong>Grand Total</strong>
                  </td>

                  <td className="border border 1 text-center"></td>
                  <td className="border border 1 text-center"></td>

                  <td className="border border 1 text-center"></td>
                  <td className="border border 1 text-center">
                    <strong>{student.initialamount}</strong>
                  </td>
                </tr>
              ))
            ) : name === "Admission Fee" ? (
              <p>No initial payment data available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <tr>
                      <td className="border border-1 text-center">
                        <strong>Grand Total</strong>
                      </td>
                      <td className="border border-1 text-center"></td>
                      <td className="border border-1 text-center"></td>
                      <td className="border border-1 text-center"></td>
                      <td className="border border-1 text-center">
                        <strong>{student.paidamount}</strong>
                      </td>
                    </tr>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}
          </tbody>
        </table>
        <div className="row">
          {/* {studentdata && (
            <h6 className="fs-6">
              Total Amount (in words): {words} Rupees only
            </h6>
          )} */}
        </div>
        <div className="row">
          {studentdata && (
            <h6 className="fs-6 fw-bold">
              *Note: Total Due Amount: INR {studentdata.dueamount}
            </h6>
          )}
        </div>
        <p style={{ marginTop: "160px", padding: "0px", marginBottom: "5px" }}>
          *This bill has been automatically generated and doesn't need a
          signature.
        </p>
        <hr />
        <div
          className="d-flex align-items-end justify-content-between"
          style={{ overflow: "hidden" }}
        >
          <span>
            <EmailIcon />
            support@teksacademy.com{" "}
          </span>

          <span>
            <LocalPhoneIcon />
            1800-120-4748
          </span>

          <span>
            <LanguageIcon /> www.teksacademy.com{" "}
          </span>
        </div>
      </div>

      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
                SI.NO
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                rowSpan={2}
                align="center"
              >
                Description
              </TableCell>

              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
                Fee excl tax
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
                tax
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
                Total
              </TableCell>

         
            </TableRow>
          </TableHead>

          <TableBody className="border border 1">
            {name === "Admission Fee" &&
            studentdata &&
            studentdata.initialpayment &&
            studentdata.initialpayment.length > 0 ? (
              studentdata.initialpayment.map((student) => (
                <TableRow>
                  <TableCell className="border border 1 text-center">
                    1
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    Admission Fee
                  </TableCell>

                  <TableCell className="border border 1 text-center">
                  
                    {parseFloat(student.initialamount / 1.18).toFixed(3)}
           
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    {(
                      parseFloat(student.initialamount).toFixed(3) -
                      parseFloat(student.initialamount / 1.18).toFixed(3)
                    ).toFixed(3)}
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    {student.initialamount}
                  </TableCell>
                </TableRow>
              ))
            ) : name === "Admission Fee" ? (
              <p>No initial payment data available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <TableRow>
                      <TableCell className="border border 1 text-center">
                        1
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        Course Fee
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {parseFloat((student.paidamount * 0.65) / 1.18).toFixed(
                          3
                        )}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {(
                          parseFloat(student.paidamount * 0.65).toFixed(3) -
                          parseFloat(
                            (student.paidamount * 0.65) / 1.18
                          ).toFixed(3)
                        ).toFixed(3)}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {parseFloat(student.paidamount * 0.65).toFixed(3)}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <TableRow>
                      <TableCell className="border border 1 text-center">
                        2
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        Material Fee
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {parseFloat((student.paidamount * 0.35) / 1.18).toFixed(
                          3
                        )}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {(
                          parseFloat(student.paidamount * 0.35).toFixed(3) -
                          parseFloat(
                            (student.paidamount * 0.35) / 1.18
                          ).toFixed(3)
                        ).toFixed(3)}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {parseFloat(student.paidamount * 0.35).toFixed(3)}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}

            {name === "Admission Fee" &&
            studentdata &&
            studentdata.initialpayment &&
            studentdata.initialpayment.length > 0 ? (
              studentdata.initialpayment.map((student) => (
                <TableRow>
                  <TableCell className="border border 1 text-center"></TableCell>
                  <TableCell className="border border 1 text-center">
                    Grand Total
                  </TableCell>

                  <TableCell className="border border 1 text-center"></TableCell>
                  <TableCell className="border border 1 text-center"></TableCell>
                  <TableCell className="border border 1 text-center">
                    {student.initialamount}
                  </TableCell>
                </TableRow>
              ))
            ) : name === "Admission Fee" ? (
              <p>No initial payment data available</p>
            ) : null}
            {studentdata &&
            name === "Installment" &&
            studentdata.installments &&
            studentdata.installments.length > 0 ? (
              studentdata.installments.map((student, indx) => {
                if (indx === parseInt(index)) {
                  return (
                    <TableRow>
                      <TableCell className="border border 1 text-center"></TableCell>
                      <TableCell className="border border 1 text-center"></TableCell>

                      <TableCell className="border border 1 text-center">
                        Grand Total
                      </TableCell>
                      <TableCell className="border border 1 text-center"></TableCell>
                      <TableCell className="border border 1 text-center">
                        {student.paidamount}
                      </TableCell>
                    </TableRow>
                  );
                }
                return null; // If the condition is not met, return null
              })
            ) : name === "Installment" ? (
              <p>No payment date available</p>
            ) : null}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
});

function Invoice() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      {/* <h1>Your React App</h1> */}
      <div className="w-50  mt-3">
        <button
          onClick={handlePrint}
          // style={{ margin: "30px" }}
          className="btn btn-primary mb-3 m-auto"
        >
          {" "}
          {/* <LocalPrintshopIcon />{" "} */}
          Print
        </button>
      </div>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default Invoice;
