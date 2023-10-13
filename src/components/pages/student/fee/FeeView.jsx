import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./FeeView.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const FeeView = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [studentdata, setstudentdata] = useState("");

  let dueamount;

  let totalinstallments = [
    {
      totalinstallments: 4,
      totalinstallmentspaid: 0,
      totalinstallmentsleft: 4,
    },
  ];
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

  useEffect(() => {
    // totalinstallments = studentdata.totalinstallments;
    // setInstallments(studentdata.installments);
    console.log(studentdata.installments);
    // dueamount = studentdata.dueamount;
  }, [studentdata]);

  // let initialInstallments = Array(totalinstallments[0].totalinstallments)
  //   .fill()
  //   .map((_, index) => ({
  //     id: Date.now(),
  //     duedate: "",
  //     paidamount: "",
  //     paiddate: "",
  //     modeofpayment: "",
  //     transactionid: "",
  //     paymentdone: false,
  //   }));
  const [installments, setInstallments] = useState();
  const handleInstallmentUpdate = (index, updatedInstallment) => {
    const updatedInstallments = [...installments];
    updatedInstallments[index] = updatedInstallment;
    setInstallments(updatedInstallments);
    console.log("updatedinstallments", installments);
  };
  const updatedata = (e) => {
    e.preventDefault();
    totalinstallments[0].totalinstallmentspaid =
      totalinstallments[0].totalinstallmentspaid + 1;
    totalinstallments[0].totalinstallmentsleft =
      totalinstallments[0].totalinstallmentsleft - 1;
    const updatedData = { installments, totalinstallments, dueamount };
    console.log("updatedData", updatedData);
    axios
      .put(`http://localhost:3030/feeinstallments/${id}`, updatedData)

      .then((res) => {
        if (res.data.updated) {
          alert("Fee Added");

          navigator(`/feeview/${id}`);
        } else {
          alert("Try Again");
        }
      });
  };

  // const updateinstallments = (e) => {};

  return (
    <div className="fee">
      <div className="feeview">
        <h4 className="pt-3"> Student Fee Details</h4>{" "}
        <hr style={{ height: "30%", paddingBottom: "30px" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Name
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Email
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Contact Number
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Course
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Date Of Joining
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Total Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Initial Amount{" "}
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Paid Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Due Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Paid Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" className="border border 1">
                  {studentdata.name}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.email}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.mobilenumber}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.courses}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.admissiondate}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.finaltotal}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.initialamount}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.finaltotal - studentdata.dueamount}
                </TableCell>
                <TableCell className="border border 1">
                  {/* {studentdata.dueamount} */}
                  {dueamount}
                </TableCell>
                <TableCell className="border border 1">
                  {totalinstallments[0].totalinstallmentspaid}/
                  {totalinstallments[0].totalinstallments}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <p className="fs-3 pt-3"> Paid Installments</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Due Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Paid Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Paid Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Mode of Payment
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Transition ID
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            {/* {studentdata.installments &&
              studentdata.installments.length > 0 &&
              JSON.parse(studentdata.installments).map((item, index) => (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" className="border border 1">
                      {item.duedate}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.paidamount}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.paiddate}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.modeofpayment}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.transactionid}
                    </TableCell>
                    <TableCell className="border border 1">
              
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))} */}
          </Table>
        </TableContainer>
        {/* {totalinstallments[0].totalinstallmentsleft > 0 &&
          installments.map((installment, index) => (
            <div className="installment" key={index}>
              <p className="ms-4"> Instalment {index + 1}: 10,000</p>
              <div className="d-flex payment">
                <input
                  type="date"
                  name="duedate"
                  onChange={(e) => {
                    const updatedInstallment = {
                      ...installment,
                      duedate: e.target.value,
                    };
                    handleInstallmentUpdate(index, updatedInstallment);
                  }}
                  value={installment.duedate}
                />
                <input
                  type="text"
                  name="paidamount"
                  onChange={(e) => {
                    const updatedInstallment = {
                      ...installment,
                      paidamount: e.target.value,
                    };
                    handleInstallmentUpdate(index, updatedInstallment);
                  }}
                  value={installment.paidamount}
                />
                <input
                  type="date"
                  name="paiddate"
                  onChange={(e) => {
                    const updatedInstallment = {
                      ...installment,
                      paiddate: e.target.value,
                    };
                    handleInstallmentUpdate(index, updatedInstallment);
                  }}
                  value={installment.paiddate}
                />

                <select
                  className="ms-3"
                  name="modeofpayment"
                  placeholder="Mode of Payment"
                  onChange={(e) => {
                    const updatedInstallment = {
                      ...installment,
                      modeofpayment: e.target.value,
                    };
                    handleInstallmentUpdate(index, updatedInstallment);
                  }}
                  value={installment.modeofpayment}
                >
                  <option value="">Mode of Payment</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="backtransfor"> Bank Transfor</option>
                  <option value="cheque"> CHEQUE</option>
                </select>
                <input
                  type="text"
                  name="transationid"
                  onChange={(e) => {
                    const updatedInstallment = {
                      ...installment,
                      transationid: e.target.value,
                    };
                    handleInstallmentUpdate(index, updatedInstallment);
                  }}
                  value={installment.transationid}
                />
              </div>
              <div className="updatebtn">
                <button
                  className="update"
                  // onClick={() => handleInstallmentUpdate(index, installment)}
                  onClick={updatedata}
                >
                  Update
                </button>
              </div>
            </div>
          ))} */}
      </div>
    </div>
  );
};
export default FeeView;
