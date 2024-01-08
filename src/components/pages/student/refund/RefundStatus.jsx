import React from 'react';
import './RefundStatus.css';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const RefundStatus = () => {
    return (
        <div className='container mt-3'>
            <div className='refundstatus mt-3'>
                <h5 className="mt-4  text-center">Refund Status</h5>


                <div className='row  px-3'>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
                        <p>
                            <b> Registration ID :</b> 1231432543

                        </p>
                        <p>
                            <b>Student Name : </b> bhavitha

                        </p>
                        <p>
                            <b> Phone No : </b>dsgsdfgf
                        </p>
                        <p>
                            <b>Email ID : </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Enrolled Course: </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Branch : </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Branch Timing : </b>  bhavitha@2001
                        </p>

                    </div>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6'>
                        <p>
                            <b> Counsellor Name :</b> 1231432543

                        </p>
                        <p>
                            <b>Trainer Name : </b> bhavitha

                        </p>
                        <p>
                            <b> Admission Date : </b>dsgsdfgf
                        </p>
                        <p>
                            <b>Total Course Fee : </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Fee Paid : </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Due Amount : </b>  bhavitha@2001
                        </p>
                        <p>
                            <b>Reason for Refund : </b>  bhavitha@2001
                        </p>

                    </div>
                </div>
                <div className='row px-3'>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> Support :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                name="department"
                            >
                                <MenuItem >
                                    Veritification-In-Progress
                                </MenuItem>
                                <MenuItem >
                                    To-Do
                                </MenuItem>
                                <MenuItem >
                                    Declined
                                </MenuItem>
                                <MenuItem >
                                    Approved
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className=" mar w-75"
                            variant="standard"
                            name="trainername"
                            type="timing"
                            id="trainername"


                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button className='btn btn-color'> Submit</button>
                    </div>
                </div>
                <div className='row px-3'>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> RM :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                name="department"
                            >
                                <MenuItem >
                                    Veritification-In-Progress
                                </MenuItem>
                                <MenuItem >
                                    To-Do
                                </MenuItem>
                                <MenuItem >
                                    Declined
                                </MenuItem>
                                <MenuItem >
                                    Approved
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className=" mar w-75"
                            variant="standard"
                            name="trainername"
                            type="timing"
                            id="trainername"


                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button className='btn btn-color'> Submit</button>
                    </div>
                </div>
                <div className='row px-3'>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> Accounts :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                name="department"
                            >
                                <MenuItem >
                                    Refund Initiated
                                </MenuItem>
                                <MenuItem >
                                    To-Do
                                </MenuItem>
                                <MenuItem >
                                    Refund Completed
                                </MenuItem>


                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className=" mar w-75"
                            variant="standard"
                            name="trainername"
                            type="timing"
                            id="trainername"


                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button className='btn btn-color'> Submit</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RefundStatus