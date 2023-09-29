import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DownloadIcon from '@mui/icons-material/Download';
import './StudentData.css';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const StudentData = () => {
  return (
<div className='studetdetails container'>
      <div className='row mb-3'>
        <div className='col-9 col-md-9 '>
          <input
            type="text"

            placeholder='Search Here......'
            style={{
              height: "55px",
              width: "100%",
              padding: "10px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          /> </div>
        <div className='col-3 col-md-3 text-end pt-lg-3'> 1308/1308 records found. </div>
      </div>
      <div className='row mb-3 '>
        

          <input type='text' className='col-12 col-md-5 col-lg-3 me-2 felids' placeholder='Enter Date'
            style={{
              height: "45px",
              
              padding: "15px",
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          />
          <select
            className="col-12 col-md-5 col-lg-2 me-2 felids"
            id=""
            placeholder='Filter Branch'
            required
            style={{
              height: "45px",
              
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Hitech"> Hitech</option>
          </select>
          <select
            className="col-12 col-md-5 col-lg-2 me-2 felids"
            id=""
            placeholder='Lead Source'
            required
            style={{
              height: "45px",
             
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="Walkin"> Walkin</option>
          </select>
          <select
            className="col-12 col-md-5 col-lg-2 me-2 felids"
            id=""
            placeholder='Mode of Traning'
            required
            style={{
              height: "45px",
              
              border: "1.5px solid black",
              borderRadius: "5px",
            }}
          >
            <option value="">--select--</option>
            <option value="online"> Online</option>
            <option value="offline"> Offline</option>
          </select>
          <RotateLeftIcon sx={{ fontSize: 48 }} className='col-sm-12 col-md-4 col-lg-2  me-lg-3 ' />
          <ShowChartIcon sx={{ fontSize: 48 }} className='col-sm-12 col-md-4 col-lg-2 me-lg-4 '  />
          <DownloadIcon sx={{ fontSize: 48 }} className='col-sm-12 col-md-4 col-lg-2   ' />
        
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table" >
          <TableHead  >
            <TableRow >
              <StyledTableCell className=' bg-primary fs-6'>SNo</StyledTableCell>
              <StyledTableCell className=' bg-primary fs-6'  align="right">Photo</StyledTableCell>
              <StyledTableCell className='  bg-primary fs-6' align="right">Registration No</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 '  align="right">Student Name & Student ID</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 '  align="right">Contact Number & Email</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6' align="right">Course Counseller Source</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6 ' align="right">Joining Date & Traning Mode</StyledTableCell>
              <StyledTableCell className='bg-primary fs-6' align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <StyledTableRow> 
          <StyledTableCell align="right">1</StyledTableCell>
          <StyledTableCell align="right">Photo</StyledTableCell>
          <StyledTableCell align="right"> 23745859757</StyledTableCell>
          <StyledTableCell align="right">Bhavitha</StyledTableCell>
          <StyledTableCell align="right">12345</StyledTableCell>
          <StyledTableCell align="right">Full Stack</StyledTableCell>
          <StyledTableCell align="right">23-09-01</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow> 
          <StyledTableCell align="right">1</StyledTableCell>
          <StyledTableCell align="right">Photo</StyledTableCell>
          <StyledTableCell align="right"> 23745859757</StyledTableCell>
          <StyledTableCell align="right">Bhavitha</StyledTableCell>
          <StyledTableCell align="right">12345</StyledTableCell>
          <StyledTableCell align="right">Full Stack</StyledTableCell>
          <StyledTableCell align="right">23-09-01</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow> 
          <StyledTableCell align="right">1</StyledTableCell>
          <StyledTableCell align="right">Photo</StyledTableCell>
          <StyledTableCell align="right"> 23745859757</StyledTableCell>
          <StyledTableCell align="right">Bhavitha</StyledTableCell>
          <StyledTableCell align="right">12345</StyledTableCell>
          <StyledTableCell align="right">Full Stack</StyledTableCell>
          <StyledTableCell align="right">23-09-01</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow> 
          <StyledTableCell align="right">1</StyledTableCell>
          <StyledTableCell align="right">Photo</StyledTableCell>
          <StyledTableCell align="right"> 23745859757</StyledTableCell>
          <StyledTableCell align="right">Bhavitha</StyledTableCell>
          <StyledTableCell align="right">12345</StyledTableCell>
          <StyledTableCell align="right">Full Stack</StyledTableCell>
          <StyledTableCell align="right">23-09-01</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
            {/* {rows.map((row) => (
              <StyledTableRow key={row.SNo}>
                <StyledTableCell component="th" scope="row">
                  {row.SNo}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Photo}</StyledTableCell>
                <StyledTableCell align="right">{row.Registration}</StyledTableCell>

                <StyledTableCell align="right">{row.Studentname}</StyledTableCell>
                <StyledTableCell align="right">{row.Contactnumber}</StyledTableCell>
                <StyledTableCell align="right">{row.Counseller}</StyledTableCell>
                <StyledTableCell align="right">{row.Date}</StyledTableCell>
                <StyledTableCell align="right">{row.Action}</StyledTableCell>

              </StyledTableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>


    </div>

    );
};

export default StudentData;
