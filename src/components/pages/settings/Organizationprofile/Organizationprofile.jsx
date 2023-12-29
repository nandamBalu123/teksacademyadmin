import React, { useState } from 'react'
import './Organizationprofile.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import logo from '../../../../images/Teks-Logo-with-Trade.png';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#4676a0",
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
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setSelectedImage(selectedImage);
    };
    return (
        <div className='container mt-3'>
            <div className='organizationprofile mt-3'>
                <h5 className=" mt-3 text-center mb-3"> Organization</h5>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item  tab-animation" role="presentation" >
                        <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true" >Overview</button>
                    </li>
                    <li className="nav-item  tab-animation" role="presentation">
                        <button class="nav-link " id="log-tab" data-bs-toggle="tab" data-bs-target="#logo" type="button" role="tab" aria-controls="logo" aria-selected="true">Organization Logo</button>
                    </li>
                    <li className="nav-item tab-animation" role="presentation">
                        <button class="nav-link" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit" type="button" role="tab" aria-controls="edit" aria-selected="false">Edit</button>
                    </li>
                    <li className="nav-item  tab-animation" role="presentation">
                        <button class="nav-link" id="subscription-tab" data-bs-toggle="tab" data-bs-target="#subscription" type="button" role="tab" aria-controls="subscription" aria-selected="false">Subscription</button>
                    </li>
                    <li className="nav-item  tab-animation" role="presentation">
                        <button class="nav-link " id="paymenthistory-tab" data-bs-toggle="tab" data-bs-target="#paymenthistory" type="button" role="tab" aria-controls="paymenthistory" aria-selected="true">Payment History</button>
                    </li>
                    {/* <li class="nav-item" role="presentation">
                        <button class="nav-link " id="recentactivities-tab" data-bs-toggle="tab" data-bs-target="#recentactivities" type="button" role="tab" aria-controls="recentactivities" aria-selected="true">Recent Activities</button>
                    </li> */}
                    <li className="nav-item  tab-animation" role="presentation">
                        <button class="nav-link " id="viewloginhistory-tab" data-bs-toggle="tab" data-bs-target="#viewloginhistory" type="button" role="tab" aria-controls="viewloginhistory" aria-selected="true">View Login History</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                        <div className='m-3' >
                            <TableContainer component={Paper} className='table-border' >
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                                    <TableBody>

                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>
                                                Organization Name</StyledTableCell>
                                            <StyledTableCell className='organization-table'>Teks Academy</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>Institute Type</StyledTableCell>
                                            <StyledTableCell className='organization-table'>	Computer/Dance/Music Training Institute</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>Office Address</StyledTableCell>
                                            <StyledTableCell className='organization-table'>501, 5th floor, green house building, Ameerp</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>Whatsapp Mobile Number</StyledTableCell>
                                            <StyledTableCell className='organization-table'>9492910454</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell className='organization-table'>
                                                Office Landline Number</StyledTableCell>
                                            <StyledTableCell className='organization-table'>18001204748</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>Office Email Id</StyledTableCell>
                                            <StyledTableCell className='organization-table'>info@teksacademy.com</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow>

                                            <StyledTableCell className='organization-table'>Own Domain/Sub Domain</StyledTableCell>
                                            <StyledTableCell className='organization-table'>https://erp.teksacademy.com</StyledTableCell>

                                        </StyledTableRow>
                                        <StyledTableRow >

                                            <StyledTableCell className='organization-table'>Account Validity</StyledTableCell>
                                            <StyledTableCell className='organization-table'>N/A</StyledTableCell>

                                        </StyledTableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>


                    </div>
                    <div class="tab-pane fade" id="logo" role="tabpanel" aria-labelledby="logo-tab">
                        <div>
                            <h5 style={{ backgroundColor: "#ececec", padding: "10px 0px 10px 10px", margin: "15px 0px 15px 0px" }}> Organization Logo </h5>
                            <div className='d-flex justify-content-center mt-5'>
                                {selectedImage && (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '10px' }}
                                    />
                                )}
                                {/* <img src={logo} alt='Organization Logo' className='w-75' /> */}
                            </div><br /><br />
                            <div className='d-flex justify-content-center'>
                                <div class="input-group mb-3 w-50">
                                    {/* <label class="input-group-text" for="inputGroupFile01">Upload</label> */}
                                    {/* <input type="file" className="form-control " id="inputGroupFile01" /> */}
                                    <input type="file" accept="image/*" className="form-control " onChange={handleImageChange} />
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="tab-pane fade" id="edit" role="tabpanel" aria-labelledby="edit-tab">
                        <div style={{ overflowY: "auto", height: "77vh", overflowX: "hidden" }}>
                            <h5 style={{ backgroundColor: "#ececec", padding: "10px 0px 10px 10px", margin: "15px 0px 15px 0px" }}> Organization Details </h5>

                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Organization Name <span className='text-danger'> *</span></label>
                                <div className="col-sm-7 text-center">
                                    <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                                </div></div>

                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Institute Type<span className='text-danger'> *</span></label>
                                <div className="col-sm-7 text-center">
                                    <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                                </div></div>
                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Office Address<span className='text-danger'> *</span></label>
                                <div className="col-sm-7 text-center">
                                    <input type="text" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                                </div></div>
                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Whatsapp Number</label>
                                <div className="col-sm-7 text-center">
                                    <input type="number" className="w-75" style={{ padding: "5px 0px 5px 10px" }} />
                                </div></div>
                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Office Landline Number</label>
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
                                <div class="input-group ">
                                    <label className="col-sm-4 col-form-label" style={{ padding: "5px 0px 0px 33px" }}>Select Branding Type</label>
                                    <div className="col-sm-7 text-center">
                                        <select className="custom-select w-75" id="inputGroupSelect01" style={{ padding: "7px 3px", marginLeft: "9px" }} >
                                            {/* <option selected>Choose...</option> */}
                                            <option value="subdomain">Sub Domain</option>
                                            <option value="owndomain">Own Domain</option>

                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Sub Domain/ Own Domain</label>
                                <div className="col-sm-7 text-center">
                                    <input type="text" className="w-75" style={{ padding: "5px 0px 5px 8px" }} />
                                </div></div><hr style={{ margin: "25px 0px" }} />

                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Inactive Session Lock Timing (In Minutes)</label>
                                <div className="col-sm-7 text-center">
                                    <input type="number" className="w-75" style={{ padding: "5px 0px 5px 8px" }} />
                                </div></div>
                            <div className="form-group row ">
                                <label className="col-sm-4 col-form-label" style={{ padding: "3px 0px 0px 45px" }}>Enable Reporting (Through WhatsApp)</label>
                                <div className="col-sm-7 text-center">
                                    <input type="number" className="w-75" style={{ padding: "5px 0px 5px 8px" }} />
                                </div></div><hr style={{ marginTop: "25px " }} />

                            <div style={{ backgroundColor: "#f5f5f5" }}>
                                <button className='btn btn-color m-4' > Submit</button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="subscription" role="tabpanel" aria-labelledby="subscription-tab">
                        <div>
                            <div className="row mb-1 ps-1 ">
                                <div className="col-12 col-md-6 col-lg-8 col-xl-8">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Search Here..."
                                        autoComplete="off"
                                        style={{
                                            height: "45px",
                                            width: "100%",
                                            outline: "none",
                                            borderTop: "none",
                                            borderBottom: "1.5px solid black",
                                            background: "none",
                                            border: "hidden",
                                            borderRadius: "5px",
                                            paddingLeft: "10px"
                                        }}
                                        name="search"
                                    />
                                    <hr className='w-75' />
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 col-xl-4'>
                                    <div className='d-flex justify-content-evenly'>
                                        <p className="pt-3">
                                            5/10
                                        </p>
                                        <p>
                                            <select className="mt-3">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="250">250</option>
                                                <option value="500">500</option>
                                                <option value="750">750</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell className='table-cell-heading'>Subscription Scheme Name</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading' > Valid From</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Valid Till</StyledTableCell>
                                                {/* <StyledTableCell className='table-cell-heading'>Quantity</StyledTableCell> */}
                                                <StyledTableCell className='table-cell-heading'>Amount</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <StyledTableRow >

                                                <StyledTableCell className='Table-cell'> Teks</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>21-3-2021</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>21-3-2021</StyledTableCell>
                                                {/* <StyledTableCell className='Table-cell'>2</StyledTableCell> */}
                                                <StyledTableCell className='Table-cell'>211</StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div
                                    style={{ display: "flex", justifyContent: "center" }}
                                    className="my-3"
                                >
                                    <Stack spacing={2}>
                                        <Pagination


                                            color="info"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="paymenthistory" role="tabpanel" aria-labelledby="paymenthistory-tab">
                        <div>
                            <div className="row mb-1 ps-1 ">
                                <div className="col-12 col-md-6 col-lg-8 col-xl-8">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Search Here..."
                                        autoComplete="off"
                                        style={{
                                            height: "45px",
                                            width: "100%",
                                            outline: "none",
                                            borderTop: "none",
                                            borderBottom: "1.5px solid black",
                                            background: "none",
                                            border: "hidden",
                                            borderRadius: "5px",
                                            paddingLeft: "10px"
                                        }}
                                        name="search"
                                    />
                                    <hr className='w-75' />
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 col-xl-4'>
                                    <div className='d-flex justify-content-evenly'>
                                        <p className="pt-3">
                                            5/10
                                        </p>
                                        <p>
                                            <select className="mt-3">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="250">250</option>
                                                <option value="500">500</option>
                                                <option value="750">750</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell className='table-cell-heading'>Order Date</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading' > Payment ID</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Amount(Including Tax)</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Transation Status</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <StyledTableRow >

                                                <StyledTableCell className='Table-cell'> 21-3-2021</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>TSK354543</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>212423</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Success</StyledTableCell>

                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div
                                    style={{ display: "flex", justifyContent: "center" }}
                                    className="my-3"
                                >
                                    <Stack spacing={2}>
                                        <Pagination


                                            color="info"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div class="tab-pane fade" id="recentactivities" role="tabpanel" aria-labelledby="recentactivities-tab">

                        <div>
                            <div className="row mb-1 ps-1 ">
                                <div className="col-12 col-md-6 col-lg-8 col-xl-8">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Search Here..."
                                        autoComplete="off"
                                        style={{
                                            height: "45px",
                                            width: "100%",
                                            outline: "none",
                                            borderTop: "none",
                                            borderBottom: "1.5px solid black",
                                            background: "none",
                                            border: "hidden",
                                            borderRadius: "5px",
                                            paddingLeft: "10px"
                                        }}
                                        name="search"
                                    />
                                    <hr className='w-75' />
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 col-xl-4'>
                                    <div className='d-flex justify-content-evenly'>
                                        <p className="pt-3">
                                            5/10
                                        </p>
                                        <p>
                                            <select className="mt-3">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="250">250</option>
                                                <option value="500">500</option>
                                                <option value="750">750</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell className='table-cell-heading'>Event Date</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading' > Page Title</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>User</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Action</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Audit Value</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Comments</StyledTableCell>

                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <StyledTableRow >

                                                <StyledTableCell className='Table-cell'>24-10-2023</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Teks Title</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Bhavitha</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>view</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>true</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Good</StyledTableCell>

                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div
                                    style={{ display: "flex", justifyContent: "center" }}
                                    className="my-3"
                                >
                                    <Stack spacing={2}>
                                        <Pagination


                                            color="info"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div class="tab-pane fade" id="viewloginhistory" role="tabpanel" aria-labelledby="viewloginhistory-tab">
                        <div>
                            <div className="row mb-1 ps-1 ">
                                <div className="col-12 col-md-6 col-lg-8 col-xl-8">
                                    <input
                                        type="text"
                                        className="input-field"
                                        placeholder="Search Here..."
                                        autoComplete="off"
                                        style={{
                                            height: "45px",
                                            width: "100%",
                                            outline: "none",
                                            borderTop: "none",
                                            borderBottom: "1.5px solid black",
                                            background: "none",
                                            border: "hidden",
                                            borderRadius: "5px",
                                            paddingLeft: "10px"
                                        }}
                                        name="search"
                                    />
                                    <hr className='w-75' />
                                </div>
                                <div className='col-12 col-md-6 col-lg-4 col-xl-4'>
                                    <div className='d-flex justify-content-evenly'>
                                        <p className="pt-3">
                                            5/10
                                        </p>
                                        <p>
                                            <select className="mt-3">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                                <option value="250">250</option>
                                                <option value="500">500</option>
                                                <option value="750">750</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell className='table-cell-heading'>Login Time</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading' > IP Address</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Browser</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Employee Name</StyledTableCell>
                                                <StyledTableCell className='table-cell-heading'>Branch</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            <StyledTableRow >

                                                <StyledTableCell className='Table-cell'> 12:30PM</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>35435njnfjsdfj</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Chrome</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Lakshmi</StyledTableCell>
                                                <StyledTableCell className='Table-cell'>Hi-tech City</StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <div
                                    style={{ display: "flex", justifyContent: "center" }}
                                    className="my-3"
                                >
                                    <Stack spacing={2}>
                                        <Pagination


                                            color="info"
                                        />
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Organizationprofile