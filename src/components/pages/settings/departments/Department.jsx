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
    <div className="container">
      <div className="row"> 
      <div className="col-12 col-md-9 col-lg-9 col-xl-9">
      <h3 className="fs-5">Departments</h3> </div>
      <div className="col-12 col-md-3 col-lg-3 col-xl-3">
      <button
          type="submit"
          className="btn btn-primary mr-20  mb-2"
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
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                id
              </StyledTableCell>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                Name
              </StyledTableCell>

              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody className="border border 1">
            {Array.isArray(departments) && departments.length > 0 ? (
              departments.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell className="border border 1 text-center">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell className="border border 1 text-center">
                    {item.department_name}
                  </StyledTableCell>

                  {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Department;
