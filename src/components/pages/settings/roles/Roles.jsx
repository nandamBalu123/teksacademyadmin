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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Roles.css";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { Link } from "react-router-dom";
const Roles = () => {
  const { roles } = useRoleContext();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createrole");
  };

  return (
    <div className="container mt-3">
      <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <div className="roles">

        <div className="flex mt-3">
          <h5 className="ms-3">Roles</h5>
          <button
            type="submit"
            className="btn btn-color me-3 mb-2"
            onClick={handleSubmit}
          >
            Add Role
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

            <TableBody className="Table-cell">
              {Array.isArray(roles) && roles.length > 0 ? (
                roles.map((item, index) => (

                  <TableRow key={item.id}  >
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}> {index + 1}</span>
                    </TableCell>
                    <TableCell className="Table-cell " >
                      <span style={{ fontSize: "0.8rem" }} >{item.role} </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {" "}
                        {item.description}{" "}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {item.createdby}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <Link to={`/roleaccess/${item.id}`}>
                        <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                      </Link>
                      {/* <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                      {/* <EditIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                      <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
                    </TableCell>
                    {/* <TableCell className=" Table-cell text-center"> Custom</TableCell> */}
                  </TableRow>

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
    </div>
  );
};

export default Roles;