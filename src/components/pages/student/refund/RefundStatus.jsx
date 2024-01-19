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
import { useFetcher, useParams } from "react-router-dom";

const RefundStatus = () => {

    let role = "support" // support  rm accounts
    const [refund, setRefund] = useState(
    );
    const handleStatusChange = (level, newStatus) => {
        const updatedRefund = [...refund];
        updatedRefund[0].status[level].status = newStatus;
        setRefund(updatedRefund);
    };
    const { registrationnumber } = useParams();
    useEffect(() => {
        console.log("refundrefund", refund)
    }, [refund])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/singlerefundview/${registrationnumber}`)
            .then((response) => {
                if (response.data) {
                    setRefund(response.data[0].refund)

                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])

    useEffect(() => {

        let updatedrefund = { refund: refund }
        if (refund && refund.length > 0) {
            if (refund && refund.length > 0) {
                updatedrefund.registrationnumber = refund[0].registrationnumber
            }
            console.log("refundrefund", updatedrefund)

            axios.put(
                `${process.env.REACT_APP_API_URL}/refundpermissions/${registrationnumber}`,
                updatedrefund
            )
                .then(response => {
                    // Handle the response here
                    // navigate("/refunddata")
                    console.log(response);
                })
                .catch(error => {
                    // Handle errors here
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
                <div className='row '>
                    <div className='col-7 mt-3'>
                        {role && role === "support" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-2 col-3 text-end'>Support : </h6>
                                <button
                                    className={`btn ${refund[0].status.level1.status === "To-Do" ? 'btn-info text-white' : 'bg-light'} `}
                                    onClick={() => handleStatusChange('level1', 'To-Do')}
                                >
                                    To-Do
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level1.status === "In-Progress" ? 'btn-primary' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level1', 'In-Progress')}
                                >
                                    In-Progress
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level1.status === "Approved" ? 'btn-success' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level1', 'Approved')}
                                >
                                    Approved
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level1.status === "Declined" ? 'btn-danger' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level1', 'Declined')}
                                >
                                    Declined
                                </button>

                            </div>
                        </div>}
                        {role && role != "support" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-1 col-3 text-end'>Support : {refund[0].status.level1.status}</h6>
                            </div>
                        </div>}
                        {role && role === "rm" && refund[0].status.level1.status === "Approved" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-1 col-3 text-end'>Regional Manager : </h6>
                                <button
                                    className={`btn ${refund[0].status.level2.status === "To-Do" ? 'btn-info text-white' : 'bg-light'} `}
                                    onClick={() => handleStatusChange('level2', 'To-Do')}
                                >
                                    To-Do
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level2.status === "In-Progress" ? 'btn-primary' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level2', 'In-Progress')}
                                >
                                    In-Progress
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level2.status === "Approved" ? 'btn-success' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level2', 'Approved')}
                                >
                                    Approved
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level2.status === "Declined" ? 'btn-danger' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level2', 'Declined')}
                                >
                                    Declined
                                </button>
                            </div>
                        </div>}

                        {role && role != "rm" && refund[0].status.level1.status === "Approved" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-1  '>Regional Manager : {refund[0].status.level2.status}</h6>
                            </div>
                        </div>}
                        {role && role === "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-1 col-3 text-end'>Accounts : </h6>
                                <button
                                    className={`btn ${refund[0].status.level3.status === "To-Do" ? 'btn-info text-white' : 'bg-light'} `}
                                    onClick={() => handleStatusChange('level3', 'To-Do')}
                                >
                                    To-Do
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level3.status === "Refund-Initiated" ? 'btn-primary' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level3', 'Refund-Initiated')}
                                >
                                    Refund-Initiated
                                </button>
                                <button
                                    className={`btn ${refund[0].status.level3.status === "Refund-Completed" ? 'btn-success' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level3', 'Refund-Completed')}
                                >
                                    Refund-Completed
                                </button>
                                {/* <button
                                    className={`btn ${refund[0].status.level3.status === "Declined" ? 'btn-danger' : 'bg-light'}`}
                                    onClick={() => handleStatusChange('level3', 'Declined')}
                                >
                                    Declined
                                </button> */}

                            </div>
                        </div>}
                        {role && role != "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && < div className='row'>
                            <div className='d-flex justify-content-evenly'>
                                <h6 className='mt-1 col-3 text-end'>Accounts : {refund[0].status.level3.status}</h6>
                            </div>
                        </div>}
                    </div>
                    <div className='col-5'> <ChatBox setRefund={setRefund} registrationnumber={registrationnumber} chat={refund[0].chat} /></div>
                </div>






            </div>}
        </div>
    )
}

export default RefundStatus