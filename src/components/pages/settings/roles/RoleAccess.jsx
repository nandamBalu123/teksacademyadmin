import React, { useState } from 'react';
import './RoleAccess.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const RoleAccess = () => {
  const [usermanagement, setUsermanagement] = useState(false);
  const handleusermanagement = () => {
    setUsermanagement((e) => !e);
  }

  const [studentmanagement, setStudentmanagement] = useState(false);
  const handlestudentmanagement = () => {
    setStudentmanagement((e) => !e);
  }
  return (
    <div className='container'>
      <h4 style={{ fontFamily: "italic" }}> Branch Manager</h4>
      <div className='access'>


        <h5 className='my-4'> Modele & Object Permissions</h5>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell className="table-cell-heading w-25" align="center" > Name</TableCell>
                <TableCell colSpan={4} className="table-cell-heading" align="center">Access</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow>


                <TableCell className="Table-cell text-center" ></TableCell>
                <TableCell className="Table-cell text-center"> Read</TableCell>
                <TableCell className="Table-cell text-center">Update</TableCell>
                <TableCell className="Table-cell text-center"> Delete</TableCell>
                <TableCell className="Table-cell text-center"> Create</TableCell>

              </TableRow>
              <TableRow>
                <TableCell onClick={handleusermanagement} className="Table-cell "> User Management</TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
              </TableRow>
              {usermanagement && (
                <>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center"> Create User</TableCell>
                    <TableCell className="Table-cell text-center">NA </TableCell>
                    <TableCell className="Table-cell text-center">NA </TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                    <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                  </TableRow>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center"> User Details</TableCell>
                    <TableCell className="Table-cell text-center" ><Switch {...label} color="info" /> </TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                  </TableRow>


                </>
              )}
              <TableRow>
                <TableCell onClick={handlestudentmanagement} className="Table-cell "> Student Management</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              {studentmanagement && (
                <>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center">Student Details</TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                    <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>

                  </TableRow>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center"> Registration</TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                    <TableCell className="Table-cell text-center">NA</TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>

                  </TableRow>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center">Fee Details</TableCell>
                    <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                    <TableCell className="Table-cell text-center" >NA</TableCell>
                    <TableCell className="Table-cell text-center">NA</TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                  </TableRow>
                  <TableRow colSpan={4}>
                    <TableCell className="Table-cell text-center">Certificate</TableCell>
                    <TableCell className="Table-cell text-center"> <Switch {...label} color="info" /> </TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /></TableCell>
                    <TableCell className="Table-cell text-center"> NA </TableCell>
                    <TableCell className="Table-cell text-center"><Switch {...label} color="info" /> </TableCell>

                  </TableRow>


                </>
              )}

            </TableBody>
          </Table>
        </TableContainer>


      </div>

    </div>

  )
}

export default RoleAccess