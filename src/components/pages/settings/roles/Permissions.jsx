import React from 'react'
import './Permissions.css';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

const Permissions = () => {
  return (
      <div className='container mt-3'>
          <div className='permissions mt-3'>
              <h5 className='text-center mt-3'> Permissions</h5>
              <TableContainer component={Paper} className="mt-4">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading" align="center">
                  S.No
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Role
                </TableCell>

                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>
            
                  <TableRow>
                    <TableCell className="Table-cell text-center">
                      <span style={{ fontSize: "15px" }}>1</span>
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                    <Link to="/roleaccess/:id" style={{ width: "40px" }}>
                      Admin
                      </Link>
                    </TableCell>
                  </TableRow>
             
          </Table>
        </TableContainer>
      </div>
      </div>
  )
}

export default Permissions

