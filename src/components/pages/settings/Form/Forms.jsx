import React, { useState } from 'react';
import './Forms.css';
import Card from "@mui/material/Card";
import { NavLink, Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
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
const Forms = () => {
    // const [open, setOpen] = useState(false);
    // const [inputName, setInputName] = useState('');
    // const [inputField, setInputField] = useState('');
    // const [additionalFields, setAdditionalFields] = useState([]);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleInputNameChange = (event) => {
    //     setInputName(event.target.value);
    // };

    // const handleInputFieldChange = (event) => {
    //     setInputField(event.target.value);
    // };

    // const handleAddField = () => {
    //     // Add the new input field to the list
    //     setAdditionalFields([...additionalFields, { name: inputName, field: inputField }]);

    //     // Clear input fields
    //     setInputName('');
    //     setInputField('');
    // };

    return (
        <div className='container mt-3'>
            <div className='customform py-3'>
                <div className='row px-2'>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"

                        >
                            <NavLink
                                to="/customuserform"
                                //  to={`/userview/${user.id}`} 
                                className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    User Form
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                    <div className='col-6 col-md-6 col-lg-3 col-xl-3'>
                        <Card
                            className="cardcolor"

                        >
                            <NavLink
                                to="/customstudentform"
                                //  to={`/userview/${user.id}`} 
                                className="text-center pt-3">
                                <p className="text-center pt-3 text-light" >
                                    Registration Form
                                </p>
                            </NavLink>
                        </Card>
                    </div>
                </div>

            </div>

        </div>
        // <div className='container mt-3'>
        //     <div className='customform py-3'>
        //         <div className="create-button" onClick={handleClickOpen}>
        //             <button
        //                 type="button"
        //                 className="btn btn-color me-5"
        //                 style={{ textTransform: "capitalize" }}
        //             >
        //                 Add New Field
        //             </button>
        //         </div>

        //         <Dialog
        //             open={open}
        //             onClose={handleClose}
        //             aria-labelledby="alert-dialog-title"
        //             aria-describedby="alert-dialog-description"
        //         >
        //             <DialogContent>
        //                 <DialogContentText id="alert-dialog-description">
        //                     <TextField
        //                         label={<span className="label-family"> Input Name </span>}
        //                         type="text"
        //                         fullWidth
        //                         required
        //                         variant="standard"
        //                         value={inputName}
        //                         onChange={handleInputNameChange}
        //                     />
        //                     <TextField
        //                         label={<span className="label-family">Input Field</span>}
        //                         type="text"
        //                         fullWidth
        //                         required
        //                         variant="standard"
        //                         value={inputField}
        //                         onChange={handleInputFieldChange}
        //                     />
        //                 </DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <Button onClick={handleClose}>Cancel</Button>
        //                 <Button onClick={handleAddField} autoFocus>
        //                     Submit
        //                 </Button>
        //             </DialogActions>
        //         </Dialog>

        //         {/* Render additional input fields */}
        //         {additionalFields.map((field, index) => (
        //             <div className='row'>
        //                 <div className='col-6'>
        //                     <div key={index}>

        //                         <TextField
        //                             label={<span className="label-family">{field.name}</span>}
        //                             type={field.field}
        //                             className='w-75'
        //                             required
        //                             focused
        //                             variant="standard"

        //                         />




        //                     </div>  </div>

        //             </div>

        //         ))}
        //     </div>
        // </div>
    );
};

export default Forms;
