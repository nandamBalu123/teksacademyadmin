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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import "./Branch.css";
import { useBranchContext } from "../../../../hooks/useBranchContext";
const Branch = () => {
  const { branches } = useBranchContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createbranch");
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
    <div className="container mt-2">
      <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <div className="branch">
        <div className="flex mt-3">
          <h5 className=" ms-3">Branches</h5>
          <button
            type="submit"
            className="btn btn-color me-2 mb-2"
            onClick={handleSubmit}
          >
            Add Branch
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
                <TableCell className="table-cell-heading" align="center">
                  Description
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Create By
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Create At
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Actions
                </TableCell>

                {/* <TableCell className='  bg-primary fs-6 Table-cell' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>

            {Array.isArray(branches) && branches.length > 0 ? (
              branches.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "0.8rem" }}> {index + 1}</span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "0.8rem" }}>

                      {item.branch_name}
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "0.8rem" }}>
                      description
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    <span style={{ fontSize: "0.8rem" }}>
                      Bhavitha
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    <span style={{ fontSize: "0.8rem" }}>
                      15-12-2023
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    {/* <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                    <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                    <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
                  </TableCell>

                  {/* <TableCell className=" Table-cell text-center"> Custom</TableCell> */}
                </TableRow>
              ))
            ) : (
              <StyledTableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </StyledTableRow>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Branch;
