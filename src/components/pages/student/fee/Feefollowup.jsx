import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import "./Feefolloup.css";
import axios from "axios";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";

// Assuming you have the useStudentsContext hook defined somewhere

const Feefollowup = () => {
  const { students } = useStudentsContext();
  const [studentData, setStudentData] = useState(null);
  const [filterType, setFilterType] = useState("today");
  const [filteredInstallments, setFilteredInstallments] = useState([]);

  useEffect(() => {
    if (students) {
      setStudentData(students);
    }
  }, [students]);
  const handleFilterChange = (type) => {
    // Reset filteredInstallments to the original installments
    setFilteredInstallments([]);

    // Apply the new filter
    setFilterType(type);
  };
  useEffect(() => {
    if (studentData) {
      const allInstallments = studentData.reduce(
        (accumulatedInstallments, student) => {
          return accumulatedInstallments.concat(
            student.installments.map((installment) => ({
              ...installment,
              name: student.name,
            }))
          );
        },
        []
      );

      const updatedInstallments = filterAndSortInstallments(
        allInstallments,
        filterType
      );

      setFilteredInstallments(updatedInstallments);
    }
  }, [studentData, handleFilterChange]);

  const filterAndSortInstallments = (installments, filterType) => {
    const today = new Date();

    const filteredInstallments = installments.filter((installment) => {
      const isPaymentDone = installment.paymentdone;

      if (filterType === "past") {
        return (
          new Date(installment.duedate) < today &&
          new Date(installment.duedate).toDateString() !==
            today.toDateString() &&
          !isPaymentDone
        );
      } else if (filterType === "today") {
        return (
          new Date(installment.duedate).toDateString() ===
            today.toDateString() && !isPaymentDone
        );
      } else if (filterType === "future") {
        return new Date(installment.duedate) > today && !isPaymentDone;
      }

      return !isPaymentDone;
    });

    // Sort past dates in descending order and future dates in ascending order
    return filteredInstallments.sort((a, b) => {
      const dateA = new Date(a.duedate);
      const dateB = new Date(b.duedate);
      return filterType === "past" ? dateB - dateA : dateA - dateB;
    });
  };

  const sumDueAmount = filteredInstallments.reduce(
    (sum, installment) => sum + installment.dueamount,
    0
  );

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fee container mt-3">
      <div>
        <div>
          <button onClick={() => handleFilterChange("past")}>Past</button>
          <button onClick={() => handleFilterChange("today")}>Today</button>
          <button onClick={() => handleFilterChange("future")}>Future</button>
        </div>
        <h2>
          All {filterType.charAt(0).toUpperCase() + filterType.slice(1)}{" "}
          Installments
        </h2>
        <p>Sum of Due Amounts: {sumDueAmount}</p>
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Installment Number</th>
              <th>Due Date</th>
              <th>Due Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstallments.map((installment) => (
              <tr key={installment.id}>
                <td>{installment.name}</td>
                <td>{installment.installmentNumber}</td>
                <td>{installment.duedate}</td>
                <td>{installment.dueamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feefollowup;
