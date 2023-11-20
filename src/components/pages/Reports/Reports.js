import React from 'react';
import './Reports.css';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Reports = () => {
  return (
    <div className='container mt-3'>
        <div className='reports'>  
       <h4 className=" mt-3 text-center">Reports</h4>
        <TableContainer component={Paper} className='mt-4'>
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

          <TableBody className="border border 1">
           
                <TableRow >
                  <TableCell className="border border 1 text-center">
                 1
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                 Students Reports
                  </TableCell>
                  

                  {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
                </TableRow>
                <TableRow> 
                    <TableCell className="border border 1 text-center"> 
                        2
                    </TableCell>
                    <TableCell className="border border 1 text-center">
               Users Reports
                  </TableCell>
                </TableRow>
            
           
          
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    
    </div>
  )
}

export default Reports
