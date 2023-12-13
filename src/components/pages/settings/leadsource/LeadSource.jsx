import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import "./LeadSource.css";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
const LeadSource = () => {
  const { leadsources } = useLeadSourceContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createleadsource");
  };

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
      <div className="leadsource">
        <div className="d-flex justify-content-between my-3">
          <h5 className="ms-2"> Lead Source</h5>
          <button
            type="submit"
            className="btn btn-color me-2"
            onClick={handleSubmit}
          >
            Add Lead Source
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading" align="center">
                  SI.NO
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Name
                </TableCell>

                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>

            {Array.isArray(leadsources) && leadsources.length > 0 ? (
              leadsources.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}> {index + 1}</span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}> {item.leadsource}</span>
                  </TableCell>

                  {/* <TableCell className=" border border 1 text-center"> Custom</TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LeadSource;
