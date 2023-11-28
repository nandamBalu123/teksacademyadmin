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
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

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
  return (
    <div>
      <h2>Payment Details</h2>
      <p>Total Amount: {totalAmount}</p>
      <table>
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
      </table>
    </div>
  );
};

export default FeeReceived;
