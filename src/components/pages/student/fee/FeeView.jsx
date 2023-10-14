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
  const [totalinstallments, settotalinstallments] = useState();
  const [dueamountt, setdueamount] = useState();
  const [totalpaidamountt, settotalpaidamount] = useState();
  const [newpaidamount, setnewpaidamount] = useState();
  useEffect(() => {
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
  // let totalinstallments;
  const [installments, setInstallments] = useState();
  const [readinstallments, setreadinstallments] = useState();

  useEffect(() => {
    // totalinstallments = studentdata.totalinstallments;
    settotalinstallments(studentdata.totalinstallments);
    setInstallments(studentdata.installments);
    setreadinstallments(studentdata.installments);
    settotalpaidamount(studentdata.totalpaidamount);
    setdueamount(studentdata.dueamount);
  }, [studentdata]);
  useEffect(() => {
    // console.log("totalpaidamounttt", totalpaidamount);
  });
  const handleInstallmentUpdate = (index, updatedInstallment) => {
    const updatedInstallments = [...installments];
    updatedInstallments[index] = updatedInstallment;
    console.log("updatedInstallment", updatedInstallment.paidamount);
    setnewpaidamount(updatedInstallment.paidamount);
    setInstallments(updatedInstallments);
  };
  useEffect(() => {}, []);

  const updatedata = (e) => {
    e.preventDefault();

    // const updatedDataa = [...totalinstallments];
    // updatedDataa[0].totalinstallmentsleft =
    //   updatedDataa[0].totalinstallmentsleft - 1;
    // updatedDataa[0].totalinstallmentspaid =
    //   updatedDataa[0].totalinstallmentspaid + 1;
    // settotalinstallments(updatedDataa);
    // console.log("newpaidamount", newpaidamount);
    // settotalpaidamount((value) => parseInt(value) + parseInt(newpaidamount));
    let totalpaidamount = parseInt(totalpaidamountt) + parseInt(newpaidamount);
    let dueamount = parseInt(dueamountt) - parseInt(newpaidamount);
    console.log("totalpaidamount", totalpaidamount);
    setdueamount((value) => value - newpaidamount);
    const updatedData = {
      installments,
      totalinstallments,
      dueamount,
      totalpaidamount,
    };
    console.log("updatedData", updatedData);
    axios
      .put(`http://localhost:3030/feeinstallments/${id}`, updatedData)

      .then((res) => {
        if (res.data.updated) {
          alert("Fee Added");

          navigator(`/feeview/${id}`);
          window.location.reload();
        } else {
          alert("Try Again");
        }
      });
  };

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
                  {studentdata.totalpaidamount}
                </TableCell>
                <TableCell className="border border 1">
                  {studentdata.dueamount}
                  {/* {dueamount} */}
                </TableCell>

                <TableCell className="border border 1">
                  {/* {studentdata.totalinstallments} */}
                  {studentdata.totalinstallments &&
                    studentdata.totalinstallments.length > 0 &&
                    studentdata.totalinstallments.map((item, index) => (
                      <span>
                        {item.totalinstallmentspaid}/{item.totalinstallments}
                      </span>
                    ))}
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
            {readinstallments &&
              readinstallments.map((item, index) => {
                if (item.paidamount < 1) {
                  return null; // Do not render anything
                }

                return (
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
                      <TableCell className="border border 1"></TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            {/* {readinstallments &&
              readinstallments.length > 0 &&
              readinstallments.map((item, index) => (
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
                    <TableCell className="border border 1"></TableCell>
                  </TableRow>
                </TableBody>
              ))} */}
          </Table>
        </TableContainer>
        {installments &&
          installments.map((installment, index) => {
            if (readinstallments[index].paidamount > 0) {
              return null; // Do not render anything
            }

            return (
              <div className="installment" key={index}>
                <p className="ms-4"> Instalment {index + 1}</p>
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
                    name="transactionid"
                    onChange={(e) => {
                      const updatedInstallment = {
                        ...installment,
                        transactionid: e.target.value,
                      };
                      handleInstallmentUpdate(index, updatedInstallment);
                    }}
                    value={installment.transactionid}
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
            );
          })}
      </div>
    </div>
  );
};
export default FeeView;
