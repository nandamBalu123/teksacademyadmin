import React , { useState } from 'react';
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
    const [usermanagement , setUsermanagement] =useState(false);
    const handleusermanagement = ()=>{
      setUsermanagement((e)=> !e);
    }

    const [studentmanagement , setStudentmanagement] =useState(false);
  const handlestudentmanagement = ()=>{
    setStudentmanagement((e)=> !e);
  }
    return (
        <div className='container'>
            <h3 style={{ fontFamily: "italic" }}> Branch Manager</h3>
            <div className='access'>
                <div className='flex' >
                    <h6> Active</h6>
                    <h6 > Custom Profile</h6>
                </div><hr />
            

              
{/*                     
                <h5> Product Access</h5>
                <div>   <Switch  {...label} color="info" /></div><hr /> */}
                <h5 className='my-4'> Modele & Object Permissions</h5>

                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell align="center" className='fs-5  w-25 bg-primary text-light border border1'> Name</TableCell>
            <TableCell colSpan={4} align='center' className='fs-5 bg-primary text-light'>Access</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        
            <TableRow>
              
           
              <TableCell  className='border border1' ></TableCell>
              <TableCell className='fs-7' > Read</TableCell>
              <TableCell  className='fs-7' >Update</TableCell>
              <TableCell className='fs-7'> Delete</TableCell>
              <TableCell  className='fs-7'> Create</TableCell>
              
            </TableRow>
            <TableRow> 
                <TableCell  onClick={handleusermanagement} className='border border1'> User Management</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
            {usermanagement && ( 
                <> 
                <TableRow colSpan={4}>
                    <TableCell className='border border1'> Create User</TableCell>
                    <TableCell>NA </TableCell>
                    <TableCell>NA </TableCell>
                    <TableCell> NA </TableCell>
                    <TableCell> <Switch {...label} color="info" /> </TableCell>
                    </TableRow> 
                    <TableRow colSpan={4}>
                    <TableCell className='border border1'> User Details</TableCell>
                    <TableCell> <Switch {...label} color="info" /> </TableCell>
                    <TableCell><Switch {...label} color="info" /></TableCell>
                    <TableCell><Switch {...label} color="info" /> </TableCell>
                    <TableCell> NA </TableCell>
                    </TableRow> 
                    
                    
                    </>
            )}
            <TableRow> 
                <TableCell  onClick={handlestudentmanagement} className='border border1'> Student Management</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
            {studentmanagement && ( 
                <> 
                <TableRow colSpan={4}>
                    <TableCell className='border border1'>Student Details</TableCell>
                    <TableCell><Switch {...label} color="info" /></TableCell>
                    <TableCell><Switch {...label} color="info" /></TableCell>
                    <TableCell> <Switch {...label} color="info" /> </TableCell>
                    <TableCell> NA </TableCell>
                    
                    </TableRow> 
                    <TableRow colSpan={4}>
                    <TableCell className='border border1'> Registration</TableCell>
                    <TableCell> NA </TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell> NA </TableCell>
                    <TableCell><Switch {...label} color="info" /> </TableCell>
                   
                    </TableRow> 
                    <TableRow colSpan={4}>
                    <TableCell className='border border1'>Fee Details</TableCell>
                    <TableCell> <Switch {...label} color="info" /> </TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell>NA</TableCell>
                    <TableCell> NA </TableCell>
                    </TableRow> 
                    <TableRow colSpan={4}>
                    <TableCell className='border border1'>Certificate</TableCell>
                    <TableCell> <Switch {...label} color="info" /> </TableCell>
                    <TableCell><Switch {...label} color="info" /></TableCell>
                    <TableCell> NA </TableCell>
                    <TableCell><Switch {...label} color="info" /> </TableCell>
                   
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