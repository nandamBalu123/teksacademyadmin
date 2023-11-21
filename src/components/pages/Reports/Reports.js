import React, { useEffect, useState } from "react";
import "./Reports.css";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Report from "./Report";
const Reports = () => {
  const [newReportName, setNewReportName] = useState();

  const [data, setData] = useState([
    { reportName: "BranchWiseData" },
    { reportName: "CourseWiseData" },
    { reportName: "CounsellorWiseData" },
  ]);
  const handleCreateReport = () => {
    let newReport = { reportName: newReportName };
    let updatedData = [...data];
    updatedData.push(newReport);
    setData(updatedData);
  };
  useEffect(() => {
    console.log("data", data);
    console.log("newReportName", newReportName);
  });
  return (
    <div className="container mt-3">
      <div className="reports">
        <h4 className=" mt-3 text-center">Reports</h4>
        <button onClick={handleCreateReport}>Create Report</button>
        <input
          value={newReportName}
          onChange={(e) => setNewReportName(e.target.value)}
        />
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  className="bg-primary fs-6  border border 1 text-light"
                  align="center"
                >
                  S.No
                </TableCell>
                <TableCell
                  className="bg-primary fs-6  border border 1 text-light"
                  align="center"
                >
                  Report Name
                </TableCell>

                {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
              </TableRow>
            </TableHead>
            {data &&
              data.map((report, index) => {
                return (
                  <TableBody className="border border 1">
                    <TableRow>
                      <TableCell className="border border 1 text-center">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        <Link to={`/report/${index}`} style={{ width: "40px" }}>
                          {report.reportName}
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reports;
