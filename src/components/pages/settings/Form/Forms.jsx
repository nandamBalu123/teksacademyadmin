import React, { useState } from 'react';
import './Forms.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";

const Forms = () => {
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputField, setInputField] = useState('');
    const [additionalFields, setAdditionalFields] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputNameChange = (event) => {
        setInputName(event.target.value);
    };

    const handleInputFieldChange = (event) => {
        setInputField(event.target.value);
    };

    const handleAddField = () => {
        // Add the new input field to the list
        setAdditionalFields([...additionalFields, { name: inputName, field: inputField }]);

        // Clear input fields
        setInputName('');
        setInputField('');
    };

    return (
        <div className='container mt-3'>
            <div className='customform py-3'>
                <div className="create-button" onClick={handleClickOpen}>
                    <button
                        type="button"
                        className="btn btn-color me-5"
                        style={{ textTransform: "capitalize" }}
                    >
                        Add New Field
                    </button>
                </div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <TextField
                                label={<span className="label-family"> Input Name </span>}
                                type="text"
                                fullWidth
                                required
                                variant="standard"
                                value={inputName}
                                onChange={handleInputNameChange}
                            />
                            <TextField
                                label={<span className="label-family">Input Field</span>}
                                type="text"
                                fullWidth
                                required
                                variant="standard"
                                value={inputField}
                                onChange={handleInputFieldChange}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleAddField} autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Render additional input fields */}
                {additionalFields.map((field, index) => (
                    <div className='row'>
                        <div className='col-6'>
                            <div key={index}>

                                <TextField
                                    label={<span className="label-family">{field.name}</span>}
                                    type={field.field}
                                    className='w-75'
                                    required
                                    focused
                                    variant="standard"

                                />




                            </div>  </div>

                    </div>

                ))}
            </div>
        </div>
    );
};

export default Forms;
