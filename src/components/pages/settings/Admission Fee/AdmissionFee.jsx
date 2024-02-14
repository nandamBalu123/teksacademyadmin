import React from 'react'
import './AdmissionFee.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdmissionFee = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate("/createadmissionfee");
    };
    return (
        <div className='container mt-3'>
            <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
            <div className='admissionfeetable'>
                <div className="flex mt-3">
                    <h5 className="fs- ms-3 ">Admission Fee</h5>
                    <button
                        type="submit"
                        className="btn btn-color me-2 mb-2"
                        onClick={handleSubmit}
                    >
                        Add Admission Fee
                    </button>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="table-cell-heading" align="center">
                                    SI.NO
                                </TableCell>
                                <TableCell className="table-cell-heading" align="center">
                                    Name
                                </TableCell>
                                <TableCell className="table-cell-heading" align="center">
                                    Description
                                </TableCell>
                                <TableCell className="table-cell-heading" align="center">
                                    Create By
                                </TableCell>
                                <TableCell className="table-cell-heading" align="center">
                                    Create At
                                </TableCell>
                                <TableCell className="table-cell-heading" align="center">
                                    Actions
                                </TableCell>

                                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
                            </TableRow>
                        </TableHead>

                        <TableBody className="border border 1">

                            <TableRow>
                                <TableCell className="Table-cell text-center">
                                    <span style={{ fontSize: "0.8rem" }}> 1</span>
                                </TableCell>
                                <TableCell className="Table-cell text-center">
                                    <span style={{ fontSize: "0.8rem" }}>

                                    </span>
                                </TableCell>
                                <TableCell className="Table-cell text-center">
                                    <span style={{ fontSize: "0.8rem" }}>

                                    </span>
                                </TableCell>
                                <TableCell className="Table-cell ">
                                    <span style={{ fontSize: "0.8rem" }}>

                                    </span>
                                </TableCell>
                                <TableCell className="Table-cell ">
                                    <span style={{ fontSize: "0.8rem" }}>

                                    </span>
                                </TableCell>
                                <TableCell className="Table-cell ">

                                    <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                                    <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
                                </TableCell>
                                {/* <TableCell className=" border border 1 text-center"> Custom</TableCell> */}
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default AdmissionFee