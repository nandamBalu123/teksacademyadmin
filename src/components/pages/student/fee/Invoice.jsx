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
import useFormattedDate from "../../../../hooks/useFormattedDate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

const PrintableComponent = React.forwardRef((props, ref) => {
  const location = useLocation();
  const dataFromState = location.state;
  console.log("dataFromState", dataFromState);
  const { id } = useParams();

  const { index } = useParams();
  const { name } = useParams();
  const { nametype } = useParams();
  const [studentdata, setstudentdata] = useState([]);
  const [invoice, setinvoice] = useState();
  const [number, setNumber] = useState();
  const { students, dispatch } = useStudentsContext();

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
      if (nametype === "studentinvoice") {
        setinvoice(
          "R-TA" +
          firstbranch + "-" +

          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] +

          "/" +
          regnumber +
          `/${parseInt(index) + 1}`
        );
      }
      if (nametype === "admininvoice") {
        setinvoice(
          "IN-TA" +
          firstbranch + "-" +

          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] +

          "/" +
          regnumber +
          `/${parseInt(index) + 1}`
        );
      }

    }
    if (name === "Installment" && studentdata.installments) {
      if (nametype === "studentinvoice") {
        setinvoice(
          "R-TA" +
          firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] + "/" + regnumber +
          `/${parseInt(index) + 2}`
        );
      }
      if (nametype === "admininvoice") {
        setinvoice(
          "IN-TA" + firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] + "/" + regnumber +
          `/${parseInt(index) + 2}`
        );
      }



    }
  }, [studentdata]);
  // useEffect(() => {
  //   // Make a GET request to your backend API endpoint
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       // response.data[0].feedetails = JSON.parse(response.data[0].feedetails);
  //       setstudentdata(response.data[0]); // Update the data state with the fetched data
  //       // setstudentdata()
  //       // console.log("studentdata", response.data[0].feedetails);
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
  return (
    <div>
      <div className="container">
        <div className=" invoice" ref={ref}>
          <div className="invoice-border">
            <img
              className="logo-picture center my-3"
              src={teksacademylogo}
              alt="logo"
            />
          </div>
          <div className="invoice-border">
            {nametype === "studentinvoice" && (
              <h3 className="text-center my-3"> Fee Receipt</h3>
            )}
            {nametype === "admininvoice" && (
              <h3 className="text-center my-3"> Fee Invoice</h3>
            )}</div>
          <div className="invoice-border">

            <div className="row no-rowmargin">
              <div className="col-6 pt-2 ">
                <b className="ps-2">Registration No:</b>
                {studentdata && studentdata.registrationnumber}
              </div>
              <div className="col-6 invoice-sideborder pt-2">
                {nametype === "studentinvoice" && (
                  <b> Receipt No: </b>
                )}
                {nametype === "admininvoice" && (
                  <b> Invoice NO: </b>
                )}
                <b> {invoice}</b>
                <p>
                  {name === "Admission Fee" &&
                    studentdata &&
                    studentdata.initialpayment &&
                    studentdata.initialpayment.length > 0 ? (
                    studentdata.initialpayment.map((student) => {
                      let paidDate = new Date(student.paiddate);
                      const day = paidDate.getUTCDate();
                      const monthIndex = paidDate.getUTCMonth();
                      const year = paidDate.getUTCFullYear();

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
                      return (
                        <span key={student.id}>
                          <b>Date:</b> {paidDate}
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
                            <b>Date:</b> {formattedDate}
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

          </div>
          <div className="row invoice-border no-rowmargin">
            <div className="col-6 pt-2">
              <p className="">

                <strong className="ps-2"> KAPIL KNOWLEDGE HUB PVT LTD</strong>
              </p>
              <p><b className="ps-2">CIN: </b>U80100TG2018PTC123853</p>
              <p><b className="ps-2">GSTIN:</b> 36AAHCK0599C1ZI </p>
              <p className="ps-2">
                <b>Branch:</b> Teks-{studentdata.branch}
              </p>
            </div>
            <div className="col-6 invoice-sideborder py-2">
              <p className="">BILL TO:</p>
              <p><b>{studentdata && studentdata.name}</b></p>
              <p><b>Contact No:</b> {studentdata && studentdata.mobilenumber}</p>
              <p><b>Email :</b> {studentdata && studentdata.email}</p>
              <p>
                <b>Address :</b>{" "}
                {studentdata && (
                  <span>
                    {studentdata.area},&nbsp;{studentdata.native},&nbsp;
                    {studentdata.state}, &nbsp;{studentdata.zipcode},&nbsp;
                    {studentdata.country}
                  </span>
                )}
              </p>

              <p><b>Course:</b> {studentdata && studentdata.courses}</p>
            </div>

          </div>
          <div>
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>

                    <TableCell className="table-cell-heading" align="center">
                      Fee Type
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">

                      Course Type
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">
                      HSN Code
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">
                      Amount
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">
                      Tax
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">
                      Tax Amount
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center">
                      Total Amount
                    </TableCell>

                    {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {name === "Admission Fee" &&
                    studentdata &&
                    studentdata.initialpayment &&
                    studentdata.initialpayment.length > 0 ? (
                    studentdata.initialpayment.map((student) => (
                      <TableRow>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}>   Admission Fee</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}>  {studentdata.modeoftraining}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> 99843</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            parseFloat(student.initialamount / 1.18).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> 18%</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            (
                              parseFloat(student.initialamount).toFixed(2) -
                              parseFloat(student.initialamount / 1.18).toFixed(2)
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}>         {Number(student.initialamount).toLocaleString("en-IN")}</span>
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
                          <tr>
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">Fee</td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                              
                            )} */}
                            <td className=" text-center border border 1">
                              Course Fee
                            </td>
                            <td className=" text-center border border 1">
                              {studentdata.modeoftraining}
                            </td>
                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "15px" }}> 99843</span>
                            </TableCell>
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  parseFloat(student.paidamount / 1.18).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                parseFloat(
                                  (student.paidamount * 0.65) / 1.18
                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                            {/* <td className=" text-center border border 1">
                  {parseFloat((student.paidamount * 0.65) / 1.18).toFixed(
                    2
                  )}
                </td> */}<TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "15px" }}> 18%</span>
                            </TableCell>

                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  (
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                (
                                  parseFloat(student.paidamount * 0.65).toFixed(2) -
                                  parseFloat(
                                    (student.paidamount * 0.65) / 1.18
                                  ).toFixed(2)
                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                            {/* <td className=" text-center border border 1">
                  {(
                    parseFloat(student.paidamount * 0.65).toFixed(2) -
                    parseFloat(
                      (student.paidamount * 0.65) / 1.18
                    ).toFixed(2)
                  ).toFixed(2)}
                </td> */}
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(parseInt(student.paidamount)).toLocaleString(
                                  "en-IN"
                                )}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                              
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                parseInt(student.paidamount * 0.65)
                              ).toLocaleString("en-IN")}
                            </td>
                            {/* <td className=" text-center border border 1">
                  {parseInt(student.paidamount * 0.65)}
                </td> */}
                          </tr>
                        );
                      }
                      return null; // If the condition is not met, return null
                    })
                  ) : name === "Installment" ? (
                    <p>No payment date available</p>
                  ) : null}

                  {studentdata &&
                    // nametype === "admininvoice" &&
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

                            <td className="border border 1 text-center"></td>
                            <td className="border border 1 text-center"></td>
                            <td className="border border 1 text-center">
                              {Number(
                                parseInt(student.paidamount * 0.35)
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="border border 1 text-center"></td>
                            <td className="border border 1 text-center"></td>
                            <td className="border border 1 text-center">
                              {Number(
                                parseInt(student.paidamount * 0.35)
                              ).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        );
                      }
                      return null; // If the condition is not met, return null
                    })
                  ) : name === "Installment" && nametype === "admininvoice" ? (
                    <p>No payment date available</p>
                  ) : null}

                  {name === "Admission Fee" &&
                    studentdata &&
                    studentdata.initialpayment &&
                    studentdata.initialpayment.length > 0 ? (
                    studentdata.initialpayment.map((student) => (
                      <tr>

                        <TableCell className="Table-cell text-center" colspan="3">
                          <span style={{ fontSize: "15px" }}><b>Total</b></span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            parseFloat(student.initialamount / 1.18).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <td className="border border 1 text-center"></td>

                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            (
                              parseFloat(student.initialamount).toFixed(2) -
                              parseFloat(student.initialamount / 1.18).toFixed(2)
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <td className="border border 1 text-center">
                          <strong>
                            {" "}
                            {Number(parseInt(student.initialamount)).toLocaleString(
                              "en-IN"
                            )}
                          </strong>
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
                            <TableCell className="Table-cell text-center" colspan="3">
                              <span style={{ fontSize: "15px" }}><b>Total</b></span>
                            </TableCell>
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  parseFloat(student.paidamount / 1.18).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                              
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                parseFloat(
                                  ((student.paidamount * 0.65) / 1.18) + (student.paidamount * 0.35)
                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>

                            <td className="border border-1 text-center"></td>
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  (
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                (
                                  parseFloat(student.paidamount * 0.65).toFixed(2) -
                                  parseFloat(student.paidamount * 0.65 / 1.18).toFixed(2)
                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>



                            <td className="border border-1 text-center">
                              <strong>

                                {Number(parseInt(student.paidamount)).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>
                            </td>
                          </tr>
                        );
                      }
                      return null; // If the condition is not met, return null
                    })
                  ) : name === "Installment" ? (
                    <p>No payment date available</p>
                  ) : null}

                </TableBody>



              </Table>
            </TableContainer>
          </div>
          {/* dont remove this line It's imp */}
          {/* <div style={{ borderTop: "1.5px solid black", borderBottom: "1.5px solid black", padding: "8px" }}><b> Due Amount:</b> 0000</div> */}
          <div>
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>

                    <TableCell className="table-cell-heading" align="center" rowspan="3">
                      HSN/AC
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center" rowspan="3">

                      Taxable Value
                    </TableCell>
                    <TableCell className="table-cell-heading " align="center" colspan="2">
                      CGST
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center" colspan="2">
                      SGST
                    </TableCell>
                    <TableCell className="table-cell-heading" align="center" rowspan="3">
                      Total Tax Amount
                    </TableCell>


                    {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell className="table-cell-heading" align="center"> Rate</TableCell>
                    <TableCell className="table-cell-heading" align="center"> Amount</TableCell>

                    <TableCell className="table-cell-heading" align="center"> Rate</TableCell>
                    <TableCell className="table-cell-heading" align="center"> Amount</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {name === "Admission Fee" &&
                    studentdata &&
                    studentdata.initialpayment &&
                    studentdata.initialpayment.length > 0 ? (
                    studentdata.initialpayment.map((student) => (
                      <TableRow>

                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}>  {studentdata.modeoftraining}</span>
                        </TableCell>

                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            parseFloat(student.initialamount / 1.18).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> 9%</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            (
                              (parseFloat(student.initialamount).toFixed(2) -
                                parseFloat(student.initialamount / 1.18).toFixed(2)) / 2
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> 9%</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            (
                              (parseFloat(student.initialamount).toFixed(2) -
                                parseFloat(student.initialamount / 1.18).toFixed(2)) / 2
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
                        </TableCell>
                        <TableCell className="Table-cell text-center">
                          <span style={{ fontSize: "15px" }}> {Number(
                            (
                              (parseFloat(student.initialamount).toFixed(2) -
                                parseFloat(student.initialamount / 1.18).toFixed(2))
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}</span>
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
                          <tr>


                            <td className=" text-center border border 1">
                              {studentdata.modeoftraining}
                            </td>

                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  parseFloat(student.paidamount / 1.18).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                parseFloat(
                                  (student.paidamount * 0.65) / 1.18
                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>

                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "15px" }}> 9%</span>
                            </TableCell>

                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ) / 2

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                ((
                                  parseFloat(student.paidamount * 0.65).toFixed(2) -
                                  parseFloat(
                                    (student.paidamount * 0.65) / 1.18
                                  ).toFixed(2)
                                ) / 2

                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>



                            <TableCell className="Table-cell text-center">
                              <span style={{ fontSize: "15px" }}> 9%</span>
                            </TableCell>

                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ) / 2

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                           
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                ((
                                  parseFloat(student.paidamount * 0.65).toFixed(2) -
                                  parseFloat(
                                    (student.paidamount * 0.65) / 1.18
                                  ).toFixed(2)
                                ) / 2

                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                            {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  )

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                            {/* {nametype === "admininvoice" && (
                             
                            )} */}
                            <td className=" text-center border border 1">
                              {Number(
                                ((
                                  parseFloat(student.paidamount * 0.65).toFixed(2) -
                                  parseFloat(
                                    (student.paidamount * 0.65) / 1.18
                                  ).toFixed(2)
                                )

                                ).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        );
                      }
                      return null; // If the condition is not met, return null
                    })
                  ) : name === "Installment" ? (
                    <p>No payment date available</p>
                  ) : null}






                </TableBody>





              </Table>
            </TableContainer>

          </div>
          {/* Dont remove this line It's imp */}
          {/* <div style={{ borderTop: "1.5px solid black", borderBottom: "1.5px solid black", padding: "8px" }}><b> Tax Amount (In Words):</b>  dndjjfngjfngjj</div> */}



          <div className="row">
            <div className="col-6">
              <p><u><b className="ps-2">Bank details:</b></u></p>
              <div><b className="ps-2">GSTIN:</b> 36AAHCK0599C1ZI</div>
              <div>  <b className="ps-2">Account No:</b>    ...........</div>
              <div> <b className="ps-2">IFSC Code:</b>  ...........</div>
              <p><b className="ps-2">Branch:</b>   ..........</p>
            </div>
            <div className="col-6 m-auto">
              <div> KAPIL KNOWLEDGE HUB PVT LMD</div>
              <div><small>(Formerly Kapil Food Park Pvt Ltd)</small></div>
            </div>

          </div></div>
      </div>
    </div>
  );
});

function Invoice() {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSavePdf = () => {
    const content = componentRef.current;

    if (content) {
      const pdfName = `${studentdata.name} ${studentdata.registrationnumber}.pdf`; // Set your default PDF name here
      html2canvas(content, {
        scale: 2, // Increase the scale for higher resolution
        logging: true, // Enable logging to console for debugging
        width: content.scrollWidth, // Set the width to the full content width
        height: content.scrollHeight, // Set the height to the full content height
        windowWidth: document.documentElement.offsetWidth, // Set the window width for responsive designs
        windowHeight: document.documentElement.offsetHeight, // Set the window height for responsive designs
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0); // Increase quality to 1.0

        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
        pdf.save(pdfName);
      });

      // html2canvas(content).then((canvas) => {
      //   const imgData = canvas.toDataURL("image/jpeg");
      //   const pdf = new jsPDF("p", "mm", "a4");

      //   pdf.addImage(
      //     imgData,
      //     "JPEG",
      //     0,
      //     0,
      //     pdf.internal.pageSize.getWidth(),
      //     pdf.internal.pageSize.getHeight()
      //   );
      //   pdf.save(pdfName);
      // });
    }
  };

  const location = useLocation();
  const dataFromState = location.state;
  console.log("dataFromState", dataFromState);
  const { id } = useParams();

  const [studentdata, setstudentdata] = useState([]);

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
      .then((response) => {

        setstudentdata(response.data[0]);

      })
      .catch((error) => {

        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div style={{}}>
      <div className="mt-3 text-end me-3 ">
        <button onClick={handlePrint} className="btn btn-primary mb-3  end">
          {" "}
          Print
        </button>
        <button onClick={handleSavePdf} className="btn btn-primary mb-3  end">
          {" "}
          Save as PDF
        </button>
      </div>
      <PrintableComponent ref={componentRef} />
    </div>
  );
}

export default Invoice;
