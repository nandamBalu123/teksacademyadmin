import React, { useEffect, useState } from "react";
import "./Reports.css";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Report from "./Report";
import axios from "axios";
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
const Reports = () => {
  const [newReportName, setNewReportName] = useState();

  const [data, setData] = useState([
    { reportName: "BranchWiseData" },
    { reportName: "CourseWiseData" },
    { reportName: "CounsellorWiseData" },
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          // setData(response.data);
          console.log("response.data", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleCreateReport = () => {
    let newReport = { reportName: newReportName };
    let updatedData = [...data];
    updatedData.push(newReport);
    setData(updatedData);
    axios
      .put(`${process.env.REACT_APP_API_URL}/addnewreport`, data)
      .then((res) => {
        if (res.data.updated) {
          alert("Report Added");
        } else {
          alert("not Added");
        }
      });
  };
  useEffect(() => {
    console.log("data", data);
    console.log("newReportName", newReportName);
  });
  return (
    <div className="container mt-3">
      <div className="reports">
        <div className="d-flex justify-content-between mt-3">
          <h4 className="ms-3">Reports</h4>
          <button onClick={handleCreateReport} className="me-3 btn btn-primary">
            Create Report
          </button>
        </div>

        {/* <input
          value={newReportName}
          onChange={(e) => setNewReportName(e.target.value)}
        /> */}
        <TableContainer component={Paper} className="mt-4">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell-heading" align="center">
                  S.No
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading" align="center">
                  Report Name
                </StyledTableCell>

                {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
              </TableRow>
            </TableHead>
            {data &&
              data.map((report, index) => {
                return (
                  <StyledTableRow>
                    <StyledTableCell className="Table-cell text-center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell className="Table-cell text-center">
                      <Link to={`/report/${index}`} style={{ width: "40px" }}>
                        {report.reportName}
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reports;
