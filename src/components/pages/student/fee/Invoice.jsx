import React from 'react'
import './Invoice.css';
import teksacademylogo from '../../../../images/Teks-Logo-with-Trade.png';
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


const Invoice = () => {
  return (
    <div className='container invoice'>
    <h3 className='text-center mt-3'> Fee Invoice</h3>
    <img className='logo-picture center' src={teksacademylogo} alt='logo'/>
    <div className="row  ">
            <div className="col-6 col-md-6 col-lg-6 col-xl-6">
              <h4 style={{ marginLeft: "15px", marginTop: "25px" }}>
                {" "}
                <strong> Kapil Knowledge Hub Private Limited</strong>
              </h4>
              <p>&nbsp;&nbsp; CIN: U80100TG2018PTC123853 </p>
              <p>
                &nbsp;&nbsp;{" "}
                <strong>
                  <EmailIcon />
                </strong>
                info@teksacademy.com{" "}
              </p>
              <p>
                &nbsp;&nbsp;{" "}
                <strong>
                  <LocalPhoneIcon />
                </strong>{" "}
                1800-120-4748
              </p>
              <p>
                &nbsp;&nbsp;
                <strong>
                  <AlternateEmailIcon />{" "}
                </strong>{" "}
                www.teksacademy.com{" "}
              </p>
            </div>
            <div className='col-3 col-md-3 col-lg-3 col-xl-3'> </div>
            <div className="col-3 col-md-3 col-lg-3 col-xl-3">
          
              <h3 style={{ marginTop: "25px" }}><strong>  TEKS ACADEMY</strong></h3>
              <p> <b>Branch:</b> Hitech city</p>
              <p> <b>INVOICE NO:</b> 12345577</p>
              <p> <b>DATE:</b> 23-10-2023</p>
            </div>
          </div>
          <div className='mt-3'> 
            <p><b> BILLING TO</b> </p><hr className='w-25'/>
            <p className='mt-3'><b>Name :</b> Yalamaddi Pavan Teja</p>
            <p className='mt-3'><b>Email :</b> pavan@gmail.com</p>
            <p className='mt-3'><b>Contact No:</b> 944630944630</p>
          </div>

        

          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
                SI.NO
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1" rowSpan={2}
                align="center"
              >
              Description
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
               Qty.
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
             Price
              </TableCell>
              <TableCell
                className="bg-primary text-light fs-6  border border 1"
                align="center"
              >
             Total
              </TableCell>

              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody className="border border 1">
       
                <TableRow >
                  <TableCell className="border border 1 text-center" rowSpan={3}>
                   1
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    Fee Payment
                  </TableCell>
                  
                  <TableCell className="border border 1 text-center">
                   1
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    1500
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    1500
                  </TableCell>

                  {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
                </TableRow>
                
                <TableRow >
             
                  <TableCell className="border border 1 text-center">
                    Matirial fee
                  </TableCell>
                  
                  <TableCell className="border border 1 text-center">
                   1
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    1500
                  </TableCell>
                  <TableCell className="border border 1 text-center">
                    1500
                  </TableCell>

                  {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
                </TableRow>
                <TableRow >
             
             <TableCell className="border border 1 text-center">
               Grand Total
             </TableCell>
             
             <TableCell className="border border 1 text-center">
             
             </TableCell>
             <TableCell className="border border 1 text-center">
           
             </TableCell>
             <TableCell className="border border 1 text-center">
               1500
             </TableCell>

             {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
           </TableRow>
            
          
            
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Invoice
