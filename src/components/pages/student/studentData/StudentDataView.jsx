
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './StudentDataView.css';
const StudentDataView =()=>{ 
    return(
        <>
          <h2 className='text-center'> Student Details From</h2> 
        <div className='container'> 
          <div className='bg'> 
         <img className='photo' src='https://wallpapers.com/images/high/pretty-profile-pictures-k1qebyviiyl0wx0x.webp' alt='photo'/>
          </div>
    
           <div className='row'> 
           <div className='col-6'> 
           <h6> Basic Details</h6> <hr className='w-50'/>
           <p> Name : Bhavitha</p>
           <p> EMail: bhavitha@gmail.com</p>
           <p> Mobile Number: 12345678</p>
           <p></p>
           </div>
           <div className='col-6 text-end'> 
           <h6> Education Details</h6> 
           <hr className='w-50  end' /> <p> Education Type: Degree</p>
           <p>Marks: 95% </p> 
           <p> Academic Year: 2021</p> </div>
             </div>
             
           <div className='row'> 
           <div className='col-4'> 
           <h6> Student Details</h6> <hr className='w-50'/>
           <p> Parent's Name : Prameela</p>
           <p> Birth Date: 08-06-2001</p>
           <p> Gender: Female</p>
           <p> Marital Status: Single</p>
           <p> College: Prabhas College</p>
           </div>
           <div className='col-4  text-center '> 
           <h6> Student Contact Details</h6> 
           <hr className='w-50  center ' /> <p> State: Andhra Pradesh</p>
           <p>Area: Praksh Nagar </p> 
           <p> Native Place: Kadapa</p> 
           <p> Zipcode: 01234</p> 
           <p> Whatsapp Number: 1234567</p> </div>
           <div className='col-4 text-end'> 
           <h6> Enquiry Details</h6> <hr className='w-50 end'/>
           <p> Enquiry Date : 08/05/21</p>
           <p> Enquiry Taken By: TL</p>
           <p> Course Package: 30,000</p>
           <p> Course: Java</p>
           <p>Lead Source: Walk IN</p>
           
           </div>
             </div>
     <h5 className='text-center mt-1'>Admission Details </h5><hr className='w-75 hr'/>
     <div className='row'> 
     <div className='col-4'>
        <p> Branch : Madhapur</p> 
        <p> Mode of Traning: Online</p></div>
     <div className='col-4 text-center'><p>  Validity :2-3-31 to 2-4-43</p>
     <p> Registration No: 1234</p> </div>
        <div className='col-4 text-end'> <p> Admission Date: 0-4-21  </p> 
        <p> Admission Status: Active </p></div></div>

        <TableContainer component={Paper} className='my-4'>
      <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell className="fs-6 text-center border border-2"> Amount </TableCell>
<TableCell className="fs-6 text-center border border-2"> Discount</TableCell>
<TableCell className="fs-6 text-center border border-2">  Tax Amount</TableCell>
<TableCell className="fs-6 text-center border border-2">  Tax Amount (Inclusive of GST)</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow
          
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className='text-center border border-2'> 20,000</TableCell>
              <TableCell className='text-center border border-2'>2000</TableCell>
              <TableCell className='text-center border border-2'>500</TableCell>
              <TableCell className='text-center border border-2'>18,000</TableCell>
            </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>    
          
          
         




             </div>
             </>
    )
}
export default StudentDataView;