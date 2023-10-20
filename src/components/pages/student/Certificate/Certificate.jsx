import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Certificate = () => {
    // for edit the date
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div  className='container'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} className='my-4'>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow  >
           <TableCell className='bg-primary text-light fs-6 border border 1'> S. No</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Name</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Course</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Registration ID</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'> Course StartDate</TableCell>
           <TableCell className='bg-primary text-light fs-6 border border 1'>Course EndDate</TableCell>
         
           <TableCell className='bg-primary text-light fs-6'> Certificate Issue</TableCell>
         
            </TableRow>
          </TableHead>
          <TableBody>
            
                  <TableRow >
                  <TableCell className='border border 1 '> 1</TableCell>
                  <TableCell className='border border 1'> bhavitha</TableCell>
                  <TableCell className='border border 1 '> React Developer</TableCell>
                  <TableCell className='border border 1 '> 12345</TableCell>
                  <TableCell className='border border 1 '> 21-10-2023</TableCell>
                  <TableCell className='border border 1 '> 22-10-2023 <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <ModeEditIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}> <input 
        type='date'
        name='enddate'
        className='form-control'/></MenuItem>
        
      </Menu></TableCell>
                  <TableCell className='border border 1  text-center fs-6'> Apply</TableCell>
                  
                  </TableRow>
            
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper> 
      
    </div>
  )
}

export default Certificate
