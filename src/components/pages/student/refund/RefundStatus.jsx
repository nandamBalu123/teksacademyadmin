import React, { useEffect, useState } from 'react';
import './RefundStatus.css';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import ChatBox from '../../../pages/chatbox/ChatBox';
import axios
    from 'axios';
import { useParams } from "react-router-dom";
const RefundStatus = () => {
    let role = localStorage.getItem("role")// support  rm accounts
    // let role = "accounts"
    const { registrationnumber } = useParams();
    const [refund, setRefund] = useState([]
    );
    const [pendingChanges, setPendingChanges] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/singlerefundview/${registrationnumber}`)
            .then((response) => {
                if (response.data) {
                    setRefund(response.data[0].refund)
                    setPendingChanges(response.data[0].refund)
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [registrationnumber])
    const handleStatusChange = (level, newStatus) => {
        // const updatedRefund = [...pendingChanges];
        const updatedRefund = JSON.parse(JSON.stringify(pendingChanges));
        updatedRefund[0].status[level].status = newStatus;
        if (newStatus === "Approved" || newStatus === "Refund-Completed") {
            updatedRefund[0].status[level].statusApproved = true;
        }
        setPendingChanges(updatedRefund);
    };

    const handleSubmit = () => {
        setRefund(pendingChanges)
    }
    useEffect(() => {
        let updatedrefund = { refund: refund }
        if (refund && refund.length > 0) {
            if (refund && refund.length > 0) {
                updatedrefund.registrationnumber = refund[0].registrationnumber
            }
            axios.put(
                `${process.env.REACT_APP_API_URL}/refundpermissions/${registrationnumber}`,
                updatedrefund
            )
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [refund])
    return (
        <div className='container mt-3'>
            {refund && refund.length > 0 && <div className='refundstatus mt-3'>
                <h5 className="mt-4  text-center">Refund Status</h5>
                <div className='row  px-3'>
                    <div className='col-12 col-md-5 col-lg-5 col-xl-5'>
                        <div className='row'>
                            <div className='col-4'>
                                <p> <b> Student Name</b></p>
                                <p> <b>Counsellor Name  </b></p>
                                <p> <b> Phone No  </b></p>
                                <p><b>Email ID  </b></p>
                                <p> <b>Enrolled Course </b></p>
                            </div>
                            <div className='col-8'>
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
                            <div className='col-4'>
                                <p> <b> Registration ID  </b></p>
                                <p>  <b>Branch  </b></p>
                                <p><b>Trainer Name  </b></p>
                                <p> <b>Branch Timing  </b></p>
                                <p> <b>Admission Date </b></p>
                            </div>
                            <div className='col-8'>
                                <p> : {refund[0].registrationnumber}</p>
                                <p> : {refund[0].branch}</p>
                                <p> : {refund[0].trainername}</p>
                                <p> : {refund[0].batchtimings}</p>
                                <p> : {refund[0].admissiondate}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-3 col-lg-3 col-xl-3'>
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
                <div className='row px-5'>
                    <div className='col-7 mt-3'>
                        <div className='row '>
                            <div className='col-4'>
                                {role && role === "support" && refund[0].status.level1.statusApproved === false &&
                                    <div >
                                        <FormControl variant="standard" className="w-100">
                                            <InputLabel>
                                                <span className="label-family">
                                                    Support
                                                </span>
                                            </InputLabel>
                                            <Select
                                                className="mar"
                                                name=""
                                                id=""
                                                required
                                                onChange={(e) => handleStatusChange('level1', e.target.value)}

                                                value={pendingChanges && pendingChanges[0].status.level1.status}
                                            >
                                                <MenuItem value="To-Do">
                                                    To-Do
                                                </MenuItem>
                                                <MenuItem value="In-Progress">
                                                    In-Progress
                                                </MenuItem>  <MenuItem value="Approved">
                                                    Approved
                                                </MenuItem>  <MenuItem value="Declined">
                                                    Declined
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <button onClick={handleSubmit}>submit</button>
                                    </div>

                                }
                                {role && role === "support" && refund[0].status.level1.statusApproved === true &&
                                    <div >
                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level1.status} />
                                    </div>

                                }
                                {role && role != "support" &&
                                    <div >
                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level1.status} />
                                    </div>
                                }
                            </div>
                            <div className='col-4'>
                                {role && role === "rm" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.statusApproved === false &&
                                    <div >
                                        <FormControl variant="standard" className="w-100">
                                            <InputLabel>
                                                <span className="label-family">
                                                    Regional Manager
                                                </span>
                                            </InputLabel>
                                            <Select
                                                className="mar"
                                                name=""
                                                id=""
                                                required
                                                onChange={(e) => handleStatusChange('level2', e.target.value)}

                                                value={pendingChanges && pendingChanges[0].status.level2.status}
                                            >

                                                <MenuItem value="To-Do">
                                                    To-Do
                                                </MenuItem>
                                                <MenuItem value="In-Progress">
                                                    In-Progress
                                                </MenuItem>  <MenuItem value="Approved">
                                                    Approved
                                                </MenuItem>  <MenuItem value="Declined">
                                                    Declined
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <button onClick={handleSubmit}>submit</button>

                                    </div>
                                }
                                {role && role === "rm" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.statusApproved === true &&
                                    <div >
                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level2.status} />

                                    </div>
                                }
                                {role && role != "rm" && refund[0].status.level1.status === "Approved" &&
                                    <div >
                                        {/* <h6 className='mt-1  '>Regional Manager : {refund[0].status.level2.status}</h6> */}
                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level2.status} />

                                    </div>
                                }

                            </div>

                            <div className='col-4'>
                                {role && role === "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && refund[0].status.level3.statusApproved === false &&
                                    <div className=''>
                                        <FormControl variant="standard" className="w-100">
                                            <InputLabel>
                                                <span className="label-family">
                                                    Accounts
                                                </span>
                                            </InputLabel>
                                            <Select
                                                className="mar"
                                                name=""
                                                id=""
                                                required
                                                onChange={(e) => handleStatusChange('level3', e.target.value)}

                                                value={pendingChanges && pendingChanges[0].status.level3.status}
                                            >
                                                <MenuItem value="To-Do">
                                                    To-Do
                                                </MenuItem>
                                                <MenuItem value="Refund-Initiated">
                                                    Refund-Initiated

                                                </MenuItem>    <MenuItem value="Refund-Completed">
                                                    Refund-Completed
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                        <button onClick={handleSubmit}>submit</button>
                                    </div>
                                }
                                {role && role === "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && refund[0].status.level3.statusApproved === true &&
                                    <div className=''>

                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level3.status} />

                                    </div>
                                }
                                {role && role != "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" &&
                                    <div className=''>
                                        <TextField id="standard-basic"
                                            className='w-100'
                                            label="Standard"
                                            variant="standard"
                                            value={refund && refund[0].status.level3.status} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='col-5'> <ChatBox setRefund={setRefund} chat={refund[0].chat} /></div>
                </div>
            </div>}
        </div >
    )
}

export default RefundStatus