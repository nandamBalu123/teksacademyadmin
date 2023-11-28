// import React, { useEffect, useState } from "react";
// import { useStudentsContext } from "../../../../hooks/useStudentsContext";

// const FeeReceived = () => {
//   const { students, dispatch } = useStudentsContext();
//   const [studentData, setStudentData] = useState([]);

//   useEffect(() => {
//     setStudentData(students);
//   }, [students]);

//   // Check if studentData is undefined or null before filtering
//   const studentsWithPayment =
//     studentData && studentData.length > 0
//       ? studentData.filter((student) => student.initialpayment[0]?.paymentdone)
//       : [];

//   // Sort payments by date in descending order
//   const sortedPayments = studentsWithPayment
//     .flatMap((student) =>
//       [...student.initialpayment, ...student.installments].map((payment) => ({
//         studentName: student.name,
//         paymentType: payment.paymentdone ? "Initial Payment" : "Installment",
//         paymentAmount: payment.paymentdone
//           ? payment.initialamount
//           : payment.dueamount,
//         paidDate: payment.paymentdone ? payment.paiddate : payment.paiddate,
//         modeOfPayment: payment.paymentdone
//           ? payment.modeofpayment
//           : payment.modeofpayment,
//         transactionID: payment.paymentdone
//           ? payment.transactionID
//           : payment.transactionid,
//       }))
//     )
//     .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));

//   return (
//     <div>
//       <h2>Payment Table</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Student Name</th>
//             <th>Payment Type</th>
//             <th>Amount</th>
//             <th>Paid Date</th>
//             <th>Mode of Payment</th>
//             <th>Transaction ID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedPayments.map((payment) => (
//             <tr key={`${payment.studentName}-${payment.paidDate}`}>
//               <td>{payment.studentName}</td>
//               <td>{payment.paymentType}</td>
//               <td>{payment.paymentAmount}</td>
//               <td>{payment.paidDate}</td>
//               <td>{payment.modeOfPayment}</td>
//               <td>{payment.transactionID}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeeReceived;
// import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import "./FeeReceived.css";

const FeeReceived = () => {
  const { students, dispatch } = useStudentsContext();
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    setStudentData(students || []); // Ensure students is not null
  }, [students]);

  // Combine initial and installment payments, filter by paymentdone, and sort by date
  const allPayments = studentData.reduce((acc, student) => {
    const initialPayments = (student.initialpayment || [])
      .filter((payment) => payment.paymentdone && payment.paiddate)
      .map((payment) => ({
        studentName: student.name,
        amount: payment.initialamount,
        date: payment.paiddate,
        modeOfPayment: payment.modeofpayment,
      }));
    const installmentPayments = (student.installments || [])
      .filter((installment) => installment.paymentdone && installment.paiddate)
      .map((installment) => ({
        studentName: student.name,
        amount: installment.paidamount,
        date: installment.paiddate,
        modeOfPayment: installment.modeofpayment,
      }));

    return acc.concat(initialPayments, installmentPayments);
  }, []);

  const sortedPayments = allPayments.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const totalAmount = sortedPayments.reduce(
    (total, payment) => total + payment.amount,
    0
  );
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
      <div className="feereceived ">
        <h4 className="text-center my-3">Payment Details</h4>
        <h5>Total Amount: {totalAmount}</h5>
        <TableContainer component={Paper} className="mb-3">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell-heading" align="center">
                  Name
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading" align="center">
                  Date
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading" align="center">
                  Amount
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading" align="center">
                  Mode of Payment
                </StyledTableCell>
                {/* <StyledTableCell className='  bg-primary fs-6 Table-cell' align="center">Type</StyledTableCell> */}
              </TableRow>
            </TableHead>

            <TableBody className="Table-cell">
              {sortedPayments.map((payment, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell className="Table-cell text-center">
                    {payment.studentName}
                  </StyledTableCell>
                  <StyledTableCell className="Table-cell text-center">
                    {payment.date
                      ? format(parseISO(payment.date), "yyyy-MM-dd")
                      : "Invalid Date"}
                  </StyledTableCell>
                  <StyledTableCell className="Table-cell text-center">
                    {payment.amount}
                  </StyledTableCell>
                  <StyledTableCell className=" Table-cell text-center">
                    {payment.modeOfPayment}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.studentName}</td>
                <td>
                  {payment.date
                    ? format(parseISO(payment.date), "yyyy-MM-dd")
                    : "Invalid Date"}
                </td>
                <td>{payment.amount}</td>
                <td>{payment.modeOfPayment}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default FeeReceived;
