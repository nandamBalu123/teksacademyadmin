import React, { useEffect, useState } from 'react';
import './RefundStatus.css';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ChatBox from '../../../pages/chatbox/ChatBox';

const RefundStatus = () => {
    let role = "accounts"

    const [refund, setRefund] = useState([
        {
            registrationnumber: "TAH1901240003",
            name: "Dsada",
            mobilenumber: "1234123412",
            email: "gfhfd@gmail.com",
            courses: "AWS + Devops",
            branch: "Hitech City",
            batchtimings: "dsdsa",
            enquirytakenby: "Mohammad Irshad",
            trainername: "dasd",
            admissiondate: "2024-01-19",
            finaltotal: 423922,
            totalpaidamount: "02323",
            dueamount: 423922,
            comment: "fdscs",
            status: {
                level1: {
                    status: "",
                    remarks: "",
                    statusSubmitted: false
                },
                level2: {
                    status: "",
                    remarks: "",
                    statusSubmitted: false
                },
                level3: {
                    status: "",
                    remarks: "",
                    statusSubmitted: false
                }
            }
        }
    ]);
    const handleStatusChange = (level, status) => {
        const updatedRefund = { ...refund[0] };
        updatedRefund.status[level].status = status;
        setRefund([updatedRefund]);
    };

    const handleRemarksChange = (level, remarks) => {
        const updatedRefund = { ...refund[0] };
        updatedRefund.status[level].remarks = remarks;
        setRefund([updatedRefund]);
    };

    const handleSubmit = (level) => {
        const updatedRefund = { ...refund[0] };
        updatedRefund.status[level].statusSubmitted = true;
        setRefund([updatedRefund]);
        // Add logic to submit the form data or perform any other actions
    };
    useEffect(() => {
        console.log("refund", refund)
    })
    return (
        <div className='container mt-3'>
            <div className='refundstatus mt-3'>
                <h5 className="mt-4  text-center">Refund Status</h5>


                <div className='row  px-3'>

                    <div className='col-12 col-md-4 col-lg-4 col-xl-4'>
                        <div className='row'>
                            <div className='col-6'>
                                <p> <b> Student Name</b></p>
                                <p> <b>Counsellor Name  </b></p>
                                <p> <b> Phone No  </b></p>
                                <p><b>Email ID  </b></p>
                                <p> <b>Enrolled Course </b></p>

                            </div>
                            <div className='col-6'>
                                <p> : {refund[0].name}</p>
                                <p> : {refund[0].enquirytakenby}</p>
                                <p> : {refund[0].mobilenumber}</p>
                                <p> : {refund[0].email}</p>
                                <p> : {refund[0].courses}</p>

                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 col-xl-4'>
                        <div className='row'>
                            <div className='col-6'>
                                <p> <b> Registration ID  </b></p>
                                <p>  <b>Branch  </b></p>
                                <p><b>Trainer Name  </b></p>
                                <p> <b>Branch Timing  </b></p>


                                <p> <b>Admission Date </b></p>

                            </div>
                            <div className='col-6'>
                                <p> : {refund[0].registrationnumber}</p>
                                <p> : {refund[0].branch}</p>
                                <p> : {refund[0].trainername}</p>
                                <p> : {refund[0].batchtimings}</p>


                                <p> : {refund[0].admissiondate}</p>


                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-4 col-lg-4 col-xl-4'>
                        <div className='row'>
                            <div className='col-6'>
                                <p>  <b>Total Course Fee</b></p>
                                <p> <b>Fee Paid  </b></p>
                                <p> <b> Due Amount </b></p>
                                <p><b>Reason for Refund  </b></p>
                            </div>
                            <div className='col-6'>
                                <p> : {refund[0].finaltotal}</p>
                                <p> : {refund[0].totalpaidamount}</p>
                                <p> : {refund[0].dueamount}</p>
                                <p> : {refund[0].comment}</p>
                            </div>
                        </div></div>
                </div>
                <div className='row '>
                    <div className='col-7 mt-3'>
                        <div className='row'>

                            <div className=' d-flex justify-content-evenly'>
                                <h6 className=' mt-1 col-3 text-end'>Support : </h6>
                                <button className='btn btn-color'>In-Progress</button>
                                <button className='btn btn-color'>To-Do</button>
                                <button className='btn btn-color'>Declined</button>
                                <button className='btn btn-color'>Approved</button>
                            </div>

                        </div>
                        <div className='row'>


                            <div className='d-flex justify-content-evenly'>
                                <h6 className=' mt-1 col-3 text-end'>Regional Manager : </h6>
                                <button className='btn btn-color'>In-Progress</button>
                                <button className='btn btn-color'>To-Do</button>
                                <button className='btn btn-color'>Declined</button>
                                <button className='btn btn-color'>Approved</button>
                            </div>

                        </div>
                        <div className='row'>

                            <div className='d-flex justify-content-evenly'>
                                <h6 className=' mt-1 col-3 text-end'>Accounts : </h6>
                                <button className='btn btn-color'>In-Progress</button>
                                <button className='btn btn-color'>To-Do</button>
                                <button className='btn btn-color'>Declined</button>
                                <button className='btn btn-color'>Approved</button>
                            </div>

                        </div>


                    </div>

                    <div className='col-5'> <ChatBox /></div>
                </div>



                <div className={`row px-3 ${role === 'support' ? '' : 'disabled'}`}>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> Support :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                value={refund[0].status.level1.status}
                                onChange={(e) => handleStatusChange('level1', e.target.value)}
                                label="Status"
                                disabled={role !== 'support'}
                            >
                                <MenuItem value="Verification-In-Progress">
                                    Verification-In-Progress
                                </MenuItem>
                                <MenuItem value="To-Do">
                                    To-Do
                                </MenuItem>
                                <MenuItem value="Declined">
                                    Declined
                                </MenuItem>
                                <MenuItem value="Approved">
                                    Approved
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className="mar w-75"
                            variant="standard"
                            value={refund[0].status.level1.remarks}
                            onChange={(e) => handleRemarksChange('level1', e.target.value)}
                            disabled={role !== 'support'}
                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button
                            className='btn btn-color'
                            onClick={() => handleSubmit('level1')}
                            disabled={role !== 'support'}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div className={`row px-3 ${role === 'rm' ? '' : 'disabled'}`}>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> Regional Manager :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                value={refund[0].status.level2.status}
                                onChange={(e) => handleStatusChange('level2', e.target.value)}
                                label="Status"
                                disabled={role !== 'rm'}
                            >
                                <MenuItem value="Verification-In-Progress">
                                    Verification-In-Progress
                                </MenuItem>
                                <MenuItem value="To-Do">
                                    To-Do
                                </MenuItem>
                                <MenuItem value="Declined">
                                    Declined
                                </MenuItem>
                                <MenuItem value="Approved">
                                    Approved
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className="mar w-75"
                            variant="standard"
                            value={refund[0].status.level2.remarks}
                            onChange={(e) => handleRemarksChange('level2', e.target.value)}
                            disabled={role !== 'rm'}
                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button
                            className='btn btn-color'
                            onClick={() => handleSubmit('level2')}
                            disabled={role !== 'rm'}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div className={`row px-3 ${role === 'accounts' ? '' : 'disabled'}`}>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2 mt-4 '> Accounts :</div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 '>
                        <FormControl variant="standard" className="w-75">
                            <InputLabel>
                                <span className="label-family"> Status</span>
                            </InputLabel>
                            <Select
                                className="mar"
                                value={refund[0].status.level3.status}
                                onChange={(e) => handleStatusChange('level3', e.target.value)}
                                label="Status"
                                disabled={role !== 'accounts'}
                            >
                                <MenuItem value="Verification-In-Progress">
                                    Verification-In-Progress
                                </MenuItem>
                                <MenuItem value="To-Do">
                                    To-Do
                                </MenuItem>
                                <MenuItem value="Declined">
                                    Declined
                                </MenuItem>
                                <MenuItem value="Approved">
                                    Approved
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='col-12 col-md-8 col-lg-4 col-xl-4 mt-1 '>
                        <TextField
                            label={<span className="label-family">Comment here..</span>}
                            className="mar w-75"
                            variant="standard"
                            value={refund[0].status.level3.remarks}
                            onChange={(e) => handleRemarksChange('level3', e.target.value)}
                            disabled={role !== 'accounts'}
                        />
                    </div>
                    <div className='col-12 col-md-4 col-lg-2 col-xl-2  text-sm-center mt-2'>
                        <button
                            className='btn btn-color'
                            onClick={() => handleSubmit('level3')}
                            disabled={role !== 'accounts'}
                        >
                            Submit
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RefundStatus