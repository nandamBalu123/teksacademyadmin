import React, { useEffect, useState } from 'react';
import './RefundStatus.css';
import { styled } from '@mui/material/styles';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ChatBox from '../../../pages/chatbox/ChatBox';
import axios from 'axios';
import { useParams } from "react-router-dom";
const RefundStatus = () => {

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

    // let role = localStorage.getItem("role")
    // support  rm accounts
    let role = "support"
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
                <h5 className="mt-4 text-bold text-center">Refund Status</h5>
                <div className='row d-flex justify-content-center px-4'>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6'>

                        <div className='row ms-2'>
                            <div className='col-10'>
                                <TableContainer component={Paper} className='table-border' >
                                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'> Student Name</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].name}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>Counsellor Name </StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].enquirytakenby}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>Phone No</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].mobilenumber}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>Email ID</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].email}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>
                                                    Enrolled Course</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].courses}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>Registration ID</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].registrationnumber}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>
                                                <StyledTableCell className='organization-table'>Branch</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].branch}</b></StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Trainer Name</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].trainername}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Branch Timing</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].batchtimings}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Admission Date</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].admissiondate}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Total Course Fee</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].finaltotal}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Fee Paid</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].totalpaidamount}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Due Amount</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].dueamount}</b></StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow >
                                                <StyledTableCell className='organization-table'>Reason for Refund</StyledTableCell>
                                                <StyledTableCell className='organization-table'><b>{refund[0].comment}</b></StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6 col-xl-6 position-relative'>
                        <div className='row'>
                            <div className='col-12'>
                                {role && role === "support" && refund[0].status.level1.statusApproved === false &&
                                    <div className='flex w-100 mt-2 justify-content-between'>
                                        <FormControl variant="standard" className="w-50">
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
                                        <div className=''>
                                            <button className="btn btn-color px-5 py-2" onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>

                                }
                                {role && role === "support" && refund[0].status.level1.statusApproved === true &&
                                    <div className='mt-2'>
                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Support"
                                            variant="standard"
                                            value={refund && refund[0].status.level1.status} />
                                    </div>

                                }
                                {role && role != "support" &&
                                    <div className=''>
                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Support"
                                            variant="standard"
                                            value={refund && refund[0].status.level1.status} />
                                    </div>
                                }
                            </div>
                            <div className='col-12'>
                                {role && role === "rm" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.statusApproved === false &&
                                    <div className='flex w-100 mt-4'>
                                        <FormControl variant="standard" className="w-50">
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
                                        <div className='d-flex justify-content-end'>
                                            <button className="btn btn-color px-5 py-2" onClick={handleSubmit}>submit</button>
                                        </div>

                                    </div>
                                }
                                {role && role === "rm" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.statusApproved === true &&
                                    <div className='mt-2'>
                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Regional Manager"
                                            variant="standard"
                                            value={refund && refund[0].status.level2.status} />

                                    </div>
                                }
                                {role && role != "rm" && refund[0].status.level1.status === "Approved" &&
                                    <div className='mt-2'>
                                        {/* <h6 className='mt-1  '>Regional Manager : {refund[0].status.level2.status}</h6> */}
                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Regional Manager"
                                            variant="standard"
                                            value={refund && refund[0].status.level2.status} />

                                    </div>
                                }

                            </div>
                            <div className='col-12'>
                                {role && role === "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && refund[0].status.level3.statusApproved === false &&
                                    <div className='flex w-100 mt-2'>
                                        <FormControl variant="standard" className="w-50">
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
                                        <div className='d-flex justify-content-end'>
                                            <button className='btn btn-color px-5 py-2' onClick={handleSubmit}>submit</button>
                                        </div>
                                    </div>
                                }
                                {role && role === "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" && refund[0].status.level3.statusApproved === true &&
                                    <div className='mt-2'>

                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Accounts"
                                            variant="standard"
                                            value={refund && refund[0].status.level3.status} />

                                    </div>
                                }
                                {role && role != "accounts" && refund[0].status.level1.status === "Approved" && refund[0].status.level2.status === "Approved" &&
                                    <div className='mt-2'>
                                        <TextField id="standard-basic"
                                            className='w-50'
                                            label="Accounts"
                                            variant="standard"
                                            value={refund && refund[0].status.level3.status} />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-12 position-absolute bottom-0 end-0 '>
                                <ChatBox setRefund={setRefund} chat={refund[0].chat} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default RefundStatus