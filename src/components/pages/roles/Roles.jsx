import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Roles = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createrole");
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div className="contianer" >
      <div className="flex">  
      <p className="fs-5 ms-3">All Profile Permissions</p>
      <button type="submit" class="btn btn-primary mr-20 ms-2 mb-2" onClick={handleSubmit}>
              Add Role
            </button>
            </div>
           
  
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table" >
          <TableHead  >
            <TableRow >
           <StyledTableCell className=' bg-primary fs-6 ' align="center">Name</StyledTableCell>
              <StyledTableCell className=' bg-primary fs-6'  align="center">Description</StyledTableCell>
              <StyledTableCell className='  bg-primary fs-6' align="center">Type</StyledTableCell>
              
            </TableRow>
          </TableHead>
      <TableBody>
             <StyledTableRow> 
              <StyledTableCell align="center">Branch Manager</StyledTableCell>
              <StyledTableCell align="center">Deal with Branch things,Student Counsellor</StyledTableCell>
              <StyledTableCell align="center"> Custom</StyledTableCell>
              </StyledTableRow> 
              <StyledTableRow> 
              <StyledTableCell align="center">Counsellor</StyledTableCell>
              <StyledTableCell align="center">Team handling student calls and counselling</StyledTableCell>
              <StyledTableCell align="center"> Custom</StyledTableCell>
              </StyledTableRow> 
              <StyledTableRow> 
              <StyledTableCell align="center">Admin</StyledTableCell>
              <StyledTableCell align="center">Admin</StyledTableCell>
              <StyledTableCell align="center"> System</StyledTableCell>
              </StyledTableRow> 
              <StyledTableRow> 
              <StyledTableCell align="center">Restricted User</StyledTableCell>
              <StyledTableCell align="center">Restricted User</StyledTableCell>
              <StyledTableCell align="center"> System</StyledTableCell>
              </StyledTableRow>
            </TableBody>
        </Table>
      </TableContainer>
                
            {/* <table className="table ">
              <thead> 
                <tr> 
                  <th> Name</th>
                  <th> Description</th>
                  <th> Type</th>
                </tr>
              </thead>
              <tbody> 
                <tr> 
                  <td> Branch Manager</td>
                  <td> Deals with Branch things, Student Counsellor</td>
                  <td> Custom</td>
                </tr>
                <tr>  
                  <td> Counsellor</td>
                  <td> Team handling student calls and counselling</td>
                  <td> Custom</td>
                </tr>
                <tr>  
                  <td> Admin</td>
                  <td> Admin</td>
                  <td> System</td>
                </tr>
                <tr>  
                  <td> Restricted User</td>
                  <td> Restricted User</td>
                  <td>System</td>
                </tr>
              </tbody>
            </table> */}
  
      
    </div>
  );
};

export default Roles;
