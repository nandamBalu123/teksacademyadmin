import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ResetPassword.css';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Input as BaseInput } from '@mui/base/Input';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const { id } = useParams('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    const [checkvalidations, setcheckValidations] = useState({
        specialChar: false,
        passwordlength: false,
        capitalLetter: false,
        lowerLetter: false,
        oneNumber: false,
        confirmPassword: false,

    })
    useEffect(() => {
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setcheckValidations(prevState => ({ ...prevState, specialChar: true }))
        } else {
            setcheckValidations(prevState => ({ ...prevState, specialChar: false }))

        }
        if (password.length > 8) {
            setcheckValidations(prevState => ({ ...prevState, passwordlength: true }))
        }
        else {
            setcheckValidations(prevState => ({ ...prevState, passwordlength: false }))
        }

        if (/(?=.*[A-Z])/.test(password)) {
            setcheckValidations(prevState => ({ ...prevState, capitalLetter: true }))
        }
        else {
            setcheckValidations(prevState => ({ ...prevState, capitalLetter: false }))
        }

        if (/(?=.*[a-z])/.test(password)) {
            setcheckValidations(prevState => ({ ...prevState, lowerLetter: true }))
        }
        else {
            setcheckValidations(prevState => ({ ...prevState, lowerLetter: false }))
        }

        if (/(?=.*\d)/.test(password)) {
            setcheckValidations(prevState => ({ ...prevState, oneNumber: true }))
        }
        else {
            setcheckValidations(prevState => ({ ...prevState, oneNumber: false }))
        }


        if (password == confirmPassword) {
            setcheckValidations(prevState => ({ ...prevState, confirmPassword: true }))
        }
        else {
            setcheckValidations(prevState => ({ ...prevState, confirmPassword: false }))

        }
    }, [password])
    useEffect(() => {
        console.log("check", checkvalidations)
    })
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleResetPassword = (e) => {
        e.preventDefault();

        // Password validations
        if (password.length < 8) {
            setPasswordError('Password should be at least 8 characters long');
            return;
        }

        if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordError('Password should contain at least one capital letter');
            return;
        }

        if (!/(?=.*[a-z])/.test(password)) {
            setPasswordError('Password should contain at least one lowercase letter');
            return;
        }

        if (!/(?=.*\d)/.test(password)) {
            setPasswordError('Password should contain at least one number');
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError('Password should contain at least one special character');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // If all validations pass, proceed with the password reset
        let updatedData = {
            password,
        };

        axios.put(`${process.env.REACT_APP_API_URL}/resetpassword/${id}`, updatedData).then((res) => {

            if (res.data.updated) {
                alert('Password changed successfully');
            } else {
                alert('Try Again');
            }
        });
    };

    return (
        <div className='container mt-3'>
            <div className='resetpassword mt-3'>
                <h5 className='text-center my-2'>Reset Password</h5>

                {/* <p>{checkvalidations.specialCharacter ? <DoneIcon /> : <CloseIcon />} Special Character</p> */}

                <div className='row'>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ border: "1px solid #eee", width: "50%", padding: "20px 0px", margin: "20px 0px 10px 0px" }}>
                            <form className='text-center'>
                                <div className=' row '>
                                    <label for="inputPassword" className="col-form-label col-sm-5 text-end "> New Password :</label>
                                    <FormControl sx={{ width: '25ch' }} variant="standard" className='col-sm-7'>
                                        {/* <InputLabel htmlFor="standard-adornment-password ms-2">Password</InputLabel> */}
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter New Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton


                                                    >
                                                        <span onClick={toggleShowPassword} style={{ cursor: 'pointer' }} className='col-sm-1'>
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </span>
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        /> <FormHelperText id="standard-weight-helper-text">Don't Share Your Password</FormHelperText>
                                    </FormControl>
                                </div>
                                <div className='row mt-2'>
                                    <label for="inputPassword" className="col-form-label col-sm-5 text-end "> Confirm Password :</label>
                                    <FormControl variant="standard" sx={{ width: '25ch' }} className='col-sm-7 '>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Confirm New Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                                    </FormControl>
                                </div>

                            </form>
                            <div className='ms-sm-3 row' >
                                <div className='col-sm-4'></div>
                                <div className='col-sm-8'>
                                    <span style={{ color: checkvalidations.capitalLetter ? "green" : "red", fontSize: "10px", lineHeight: "" }}>
                                        {checkvalidations.capitalLetter ? <DoneIcon /> : < FiberManualRecordIcon style={{ fontSize: "10px" }} />}
                                        &nbsp;Password should contain at least one capital letter</span><br />
                                    <span style={{ color: checkvalidations.lowerLetter ? "green" : "red", fontSize: "10px" }}>
                                        {checkvalidations.lowerLetter ? <DoneIcon /> : < FiberManualRecordIcon style={{ fontSize: "10px" }} />}
                                        &nbsp;Password should contain at least one lowercase letter</span><br />
                                    <span style={{ color: checkvalidations.oneNumber ? "green" : "red", fontSize: "10px" }}>
                                        {checkvalidations.oneNumber ? <DoneIcon /> : < FiberManualRecordIcon style={{ fontSize: "10px" }} />}
                                        &nbsp;Password should contain at least one number</span><br />
                                    <span style={{ color: checkvalidations.passwordlength ? "green" : "red", fontSize: "10px" }}>
                                        {checkvalidations.passwordlength ? <DoneIcon /> : < FiberManualRecordIcon style={{ fontSize: "10px" }} />}
                                        &nbsp; Password should be more than 8 characters long</span><br />
                                    <span style={{ color: checkvalidations.specialChar ? "green" : "red", fontSize: "10px" }}>
                                        {checkvalidations.specialChar ? <DoneIcon /> : < FiberManualRecordIcon style={{ fontSize: "10px" }} />}
                                        &nbsp; Password should contain at least one special character</span>
                                </div>



                            </div>
                            <div className='row'>
                                <div className='col-sm-4'></div>
                                <div className='col-sm-8 text-center'>
                                    <button onClick={handleResetPassword} className='btn btn-color'>Change Password</button>
                                </div>



                            </div>
                        </div>
                        <form >
                            {/* <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            /> */}
                            {/* {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} */}


                        </form>

                    </div>
                </div>




            </div>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                />
                                <span onClick={toggleShowPassword} style={{ cursor: 'pointer' }} className='col-sm-1'>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </span> */}


            {/* <input
                                    className=''
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /> */}

        </div >

    );
};

export default ResetPassword;
