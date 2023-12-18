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
import "./Department.css";
import { useDepartmentContext } from "../../../../hooks/useDepartmentcontext";
const Department = () => {
  const { departments } = useDepartmentContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createdepartment");
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
      <div className="department">
        <div className="row mb-3">
          <div className="col-12 col-md-8 col-lg-9 col-xl-9">
            <h5 className="ms-2">Departments</h5>
          </div>
          <div className="col-12 col-md-3 col-lg-3 col-xl-3">
            <button
              type="submit"
              className="btn btn-color"
              onClick={handleSubmit}
            >
              Add Department
            </button>
          </div>
        </div>
        {/* <div className="d-flex justify-content-between mt-3">
        <p className="fs-5">Departments</p>
        <button
          type="submit"
          className="btn btn-primary mr-20  mb-2"
          onClick={handleSubmit}
        >
          Add Department
        </button>
      </div> */}
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
                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>

            {Array.isArray(departments) && departments.length > 0 ? (
              departments.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}> {index + 1}</span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}>
                      {" "}
                      {item.department_name}
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}>
                      description
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    <span style={{ fontSize: "15px" }}>
                      Bhavitha
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    <span style={{ fontSize: "15px" }}>
                      15-12-2023
                    </span>
                  </TableCell>
                  <TableCell className="Table-cell ">
                    <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} />
                    <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                    <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
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

export default Department;
