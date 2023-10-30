import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

const Requestedcertificates = () => {
  return (
    <div className='container req-certificate my-3'>
        <h4>Requested Certificates</h4>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    S. No
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Name
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Registration ID
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    ValidityStartDate <br />
                    validityenddate
                  </TableCell>

                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    {" "}
                    Course StartDate
                  </TableCell>
                  <TableCell className="bg-primary text-light fs-6 border border 1">
                    Course EndDate
                  </TableCell>

                  <TableCell className="bg-primary text-light fs-6">
                    Certificate Status
                  </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
           
                  <TableRow >
                    
                        <TableCell >
                         
                        </TableCell>
                    
                  </TableRow>
              
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
     
    </div>
  )
}

export default Requestedcertificates
