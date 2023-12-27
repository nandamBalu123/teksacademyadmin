import React from 'react'
import './Organizationprofile.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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


const Organizationprofile = () => {
    return (
        <div className='container mt-3'>
            <div className='organizationprofile mt-3'>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-overview" type="button" role="tab" aria-controls="nav-overview" aria-selected="true">Overview</button>
                        <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-edit" type="button" role="tab" aria-controls="nav-edit" aria-selected="false">Edit</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-subscription" type="button" role="tab" aria-controls="nav-subscription" aria-selected="false">Subscription</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-paymenthistory" type="button" role="tab" aria-controls="nav-paymenthistory" aria-selected="false">Payment History</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-recentactivities" type="button" role="tab" aria-controls="nav-recentactivities" aria-selected="false">Recent Activities</button>
                        <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-viewloginhistory" type="button" role="tab" aria-controls="nav-viewloginhistory" aria-selected="false">View Login History</button>
                    </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">
                        <div className='m-3'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                                    <TableBody>

                                        <StyledTableRow>

                                            <StyledTableCell >
                                                Organization Name</StyledTableCell>
                                            <StyledTableCell >Teks Academy</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Institute Type</StyledTableCell>
                                            <StyledTableCell >	Computer/Dance/Music Training Institute</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Office Address</StyledTableCell>
                                            <StyledTableCell >501, 5th floor, green house building, Ameerp</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Whatsapp Mobile Number</StyledTableCell>
                                            <StyledTableCell >9492910454</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell >
                                                Office Landline Number</StyledTableCell>
                                            <StyledTableCell >18001204748</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Office Email Id</StyledTableCell>
                                            <StyledTableCell >info@teksacademy.com</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Own Domain/Sub Domain</StyledTableCell>
                                            <StyledTableCell >https://erp.teksacademy.com</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell >Account Validity</StyledTableCell>
                                            <StyledTableCell >N/A</StyledTableCell>

                                        </StyledTableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="nav-edit" role="tabpanel" aria-labelledby="nav-edit-tab">

                        <h5 style={{ backgroundColor: "#ececec", padding: "10px 0px 10px 10px", margin: "15px 0px 15px 0px" }}> Organization Details </h5>

                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Organization Name <span className='text-danger'> *</span></label>
                            <div className="col-sm-7 text-center">
                                <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div>

                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Institute Type<span className='text-danger'> *</span></label>
                            <div className="col-sm-7 text-center">
                                <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div>
                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Office Address<span className='text-danger'> *</span></label>
                            <div className="col-sm-7 text-center">
                                <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div>
                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Whatsapp Number</label>
                            <div className="col-sm-7 text-center">
                                <input type="number" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div>
                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Office Landline Number</label>
                            <div className="col-sm-7 text-center">
                                <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div>
                        <div className="form-group row ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Office Email ID</label>
                            <div className="col-sm-7 text-center">
                                <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                            </div></div><hr style={{ margin: "25px 0px" }} />
                        <h5 style={{ backgroundColor: "#ececec", padding: "10px 0px 10px 10px", margin: "15px 0px 15px 0px" }}> Organization Settings</h5>
                        <div className='row'>

                        </div>
                        <div class="input-group ">
                            <label htmlFor="inputPassword" className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>select Branding Type</label>
                            <div className="col-sm-7 text-center">
                                <select className="custom-select w-75" id="inputGroupSelect01">
                                    <option selected>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>

                        </div>

                    </div>
                    <div class="tab-pane fade" id="nav-subscription" role="tabpanel" aria-labelledby="nav-subscription-tab">


                    </div>
                    <div class="tab-pane fade" id="nav-paymenthistory" role="tabpanel" aria-labelledby="nav-paymenthistory-tab">


                    </div>
                    <div class="tab-pane fade" id="nav-recentactivities" role="tabpanel" aria-labelledby="nav-recentactivities-tab">


                    </div>
                    <div class="tab-pane fade" id="nav-viewloginhistory" role="tabpanel" aria-labelledby="nav-viewloginhistory-tab">


                    </div>
                </div>


            </div>
        </div >
    )
}

export default Organizationprofile