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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

  const [reports, setreports] = useState()
  useEffect(() => { console.log("reports", reports) })
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          setreports(response.data);
          console.log("response.data", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div className="container mt-3">
      <div className="reports">
        <div className="d-flex justify-content-between mt-3">
          <h4 className="ms-3">Reports</h4>
          {/* <button onClick={handleCreateReport} className="me-3 btn btn-color">
            Create Report
          </button> */}
          <button className="btn btn-color text-light me-3">
            <Link to="/report/create" style={{ color: "white" }} >
              Create Report
            </Link>
          </button>
        </div>



        <TableContainer component={Paper} className="mt-4">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading" align="center">
                  S.No
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Report Name
                </TableCell>
                <TableCell className="table-cell-heading" align="center">

                  Created By
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Created At
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Actions
                </TableCell>

                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>
            {reports &&
              reports.map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="Table-cell text-center">
                      <span style={{ fontSize: "0.8rem" }}>{index + 1} </span></TableCell>
                    {item.reports.map(report => {
                      let createdAt = report.createdAt.split("T")
                      createdAt = new Date(createdAt);
                      const day = createdAt.getUTCDate();
                      const monthIndex = createdAt.getUTCMonth();
                      const year = createdAt.getUTCFullYear();

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
                      createdAt = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                        }-${year}`;

                      return (
                        <React.Fragment key={report.reportName}>
                          <TableCell className="Table-cell text-center">
                            <Link to={`/report/${item.id}`} style={{ width: "40px" }}>
                              {report.reportName}
                            </Link>
                          </TableCell>
                          <TableCell className="Table-cell text-center">
                            <span style={{ fontSize: "0.8rem" }}>{report.createdBy}</span>
                          </TableCell>
                          <TableCell className="Table-cell text-center">
                            <span style={{ fontSize: "0.8rem" }}>{createdAt}</span>
                          </TableCell>
                          <TableCell className="Table-cell text-center">
                            <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} />
                            <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                            <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
                          </TableCell>
                        </React.Fragment>
                      )

                    })}
                  </TableRow>
                );
              })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reports;
