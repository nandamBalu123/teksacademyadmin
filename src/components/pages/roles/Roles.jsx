import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Roles = () => {
  
  const [initialData, setData] = useState([{name: ''}]);

useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios.get('http://localhost:3030/getuserroles')
      .then((response) => {
        // Handle the successful response here
        setData(response.data); // Update the data state with the fetched data
        console.log(response.data);

      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
        
      });
  }, []);
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
      <button type="submit" className="btn btn-primary mr-20 ms-2 mb-2" onClick={handleSubmit}>  Add Role </button>
      {/* <button type="submit" className="btn btn-primary mr-20 ms-2 mb-2" onClick={handleSubmit}>
              Add Role
            </button> */}
            </div>
           
  
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table " >
          <TableHead  >
            <TableRow  >
              <StyledTableCell className=' bg-primary fs-6  border border 1' align="center">Name</StyledTableCell>
              <StyledTableCell className=' bg-primary fs-6 border border 1' align="center">Description</StyledTableCell>
              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}

            </TableRow>
          </TableHead>
          <TableBody className="border border 1">
            <StyledTableRow>
              <StyledTableCell className=" border border 1 text-center">Branch Manager</StyledTableCell>
              <StyledTableCell className=" border border 1 text-center">Deal with Branch things,Student Counsellor</StyledTableCell>
              {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
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
