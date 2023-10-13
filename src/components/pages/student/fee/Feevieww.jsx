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

  // const [dueamount, setdueamount] = useState("");
  // const [totalinstallments, settotalinstallments] = useState([]);

  const [duedate, setduedate] = useState();
  const [paidamount, setpaidamount] = useState();
  const [paiddate, setpaiddate] = useState();
  const [modeofpayment, setmodeofpayment] = useState();
  const [transactionid, settransactionid] = useState();
  let installments;
  let dueamount = 10000;
  let totalinstallments = [{
    totalinstallments: 2,
    totalinstallmentspaid: 0,
    totalinstallmentsleft: 2,
  }];
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

  if (studentdata.installments && studentdata.installments.length > 0) {
    installments = JSON.parse(studentdata.installments);
  }

  useEffect(() => {
    // setdueamount(studentdata.dueamount);
    // settotalinstallments(studentdata.totalinstallments);
  }, [studentdata]);
  console.log("tyuu", totalinstallments);
  const updateinstallments = (e) => {
    totalinstallments[0].totalinstallmentspaid =
      totalinstallments[0].totalinstallmentspaid + 1;
    totalinstallments[0].totalinstallmentsleft =
      totalinstallments[0].totalinstallmentsleft - 1;
    dueamount = dueamount - paidamount;
    let newinstallment = {
      id: Date.now(),
      duedate: duedate,
      paidamount: paidamount,
      paiddate: paiddate,
      modeofpayment: modeofpayment,
      transactionid: transactionid,
    };
    installments.push(newinstallment);
    console.log("uoqwieuqwio", installments);
    e.preventDefault();
    setduedate("");
    setpaidamount(0);
    setpaiddate("");
    setmodeofpayment("");
    settransactionid("");
    const updatedData = { installments, totalinstallments, dueamount };
    console.log("updatedData", updatedData);
    // axios
    //   .put(`http://localhost:3030/feeinstallments/${id}`, updatedData)

    //   .then((res) => {
    //     if (res.data.updated) {
    //       alert("Fee Added");

    //       navigator(`/feeview/${id}`);
    //     } else {
    //       alert("Try Again");
    //     }
    //   });
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
                  {studentdata.finaltotal - studentdata.dueamount}
                </TableCell>
                <TableCell className="border border 1">
                  {/* {studentdata.dueamount} */}{dueamount}
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
            {studentdata.installments &&
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
                      {/* {item.invoice} */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
        {totalinstallments[0].totalinstallmentsleft &&
          totalinstallments[0].totalinstallmentsleft > 0 &&
          Array(totalinstallments[0].totalinstallmentsleft)
            .fill()
            .map((_, index) => (
              <div className="instalment" key={index}>
                <p className="ms-4"> Instalment {index + 1} :10,000</p>
                <div className="d-flex  payment">
                  <input
                    type="date"
                    name="duedate"
                    onChange={(e) => setduedate(e.target.value)}
                    value={duedate}
                  />
                  <input
                    type="text"
                    placeholder="paidamount"
                    name="paidamount"
                    onChange={(e) => setpaidamount(e.target.value)}
                    value={paidamount}
                  />

                  <input
                    type="date"
                    name="paiddate"
                    onChange={(e) => setpaiddate(e.target.value)}
                    value={paiddate}
                  />

                  <select
                    className="ms-3"
                    placeholder="Mode of Payment"
                    onChange={(e) => setmodeofpayment(e.target.value)}
                    value={modeofpayment}
                  >
                    <option value="">Mode of Payment</option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="backtransfor"> Bank Transfor</option>
                    <option value="cheque"> CHEQUE</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Transation Id"
                    name="transationid"
                    onChange={(e) => settransactionid(e.target.value)}
                    value={transactionid}
                  />
                </div>
                <div className="updatebtn">
                  {" "}
                  {/* <button className="update " onClick={saveInstallments}>
                    save
                  </button> */}
                  <button className="update " onClick={updateinstallments}>
                    {" "}
                    Update
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
export default FeeView;




// import React from "react";
// import { useState } from "react";
// const Feevieww = () => {
//   let totalInstallmentsLeft = 5;
//   const initialInstallments = Array(totalInstallmentsLeft)
//     .fill()
//     .map((_, index) => ({
//       duedate: "",
//       paidamount: "",
//       paiddate: "",
//       modeofpayment: "",
//       transactionid: "",
//     }));

//   const [installments, setInstallments] = useState(initialInstallments);

//   const handleInstallmentUpdate = (index, updatedInstallment) => {
//     // Create a copy of the installments array and update the specific installment
//     const updatedInstallments = [...installments];
//     updatedInstallments[index] = updatedInstallment;
//     setInstallments(updatedInstallments);
//   };
//   console.log("installments", installments);
//   return (
//     <div>
//       {" "}
//       {totalInstallmentsLeft > 0 &&
//         installments.map((installment, index) => (
//           <div className="installment" key={index}>
//             <p className="ms-4"> Instalment {index + 1}: 10,000</p>
//             <div className="d-flex payment">
//               <input
//                 type="date"
//                 name="duedate"
//                 onChange={(e) => {
//                   const updatedInstallment = {
//                     ...installment,
//                     duedate: e.target.value,
//                   };
//                   handleInstallmentUpdate(index, updatedInstallment);
//                 }}
//                 value={installment.duedate}
//               />
//               {/* Add similar input fields for paidamount, paiddate, modeofpayment, and transactionid */}
//             </div>
//             <div className="updatebtn">
//               <button
//                 className="update"
//                 onClick={() => handleInstallmentUpdate(index, installment)}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Feevieww;
