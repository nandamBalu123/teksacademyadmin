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
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const { id } = useParams('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                handleLogout();
            } else {
                alert('Try Again');
            }
        });
    };

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        localStorage.removeItem("id");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        // axios
        //   .get("http://localhost:3030/logout")
        //   .then((res) => {
        //     navigate("/login");
        //   })
        //   .catch((err) => cFuseronsole.log(err));
        // window.location.reload();
    };

    return (
        <div className='container mt-3'>
            <div className='resetpassword mt-3'>
                <h5 className='text-center my-2'>Reset Password</h5>
                <div className='row' style={{ display: "flex", justifyContent: "center" }}>
                    <div className='col-12  col-xl-7 col-lg-7' style={{ border: "1px solid #eee", marginBottom: "24px", padding: "15px 0px" }}>
                        <form>
                            <div className='row'>
                                <label for="inputPassword" className="col-form-label col-12 col-md-5 col-lg-5 col-xl-5 password-label"> New Password :</label>
                                <FormControl sx={{ width: '22ch' }} variant="standard" className='col-12 col-md-6 col-lg-7 col-xl-7 password-input ps-4'>
                                    {/* <InputLabel htmlFor="standard-adornment-password ms-2">Password</InputLabel> */}
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment >
                                                <IconButton


                                                >
                                                    <span onMouseDown={toggleShowPassword} onMouseUp={toggleShowPassword} style={{ cursor: 'pointer' }} >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </span>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {/* <FormHelperText id="standard-weight-helper-text">Don't Share Your Password</FormHelperText> */}
                                </FormControl>
                            </div>
                            <div className='row'>
                                <label for="inputPassword" className="col-form-label col-12 col-md-5 col-lg-5 col-xl-5 password-label">Confirm Password :</label>
                                <FormControl variant="standard" sx={{ width: '22ch' }} className='col-12 col-md-6 col-lg-7 col-xl-7 password-input ps-4'>
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment >
                                                <IconButton


                                                >
                                                    <span onMouseDown={toggleShowConfirmPassword} onMouseUp={toggleShowConfirmPassword} style={{ cursor: 'pointer' }} >
                                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                    </span>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {/* {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>} */}
                                </FormControl>

                            </div>
                            <div className='row'>
                                <div className='col-12 col-md-5 col-lg-5 col-xl-5'></div>
                                <div className='col-12 col-md-6 col-lg-7 col-xl-7 pe-2'>
                                    <span style={{
                                        // color: checkvalidations.capitalLetter ? "green" : "red", 
                                        fontSize: "10px"
                                    }}>
                                        {checkvalidations.capitalLetter ? <DoneIcon style={{ color: "green", fontSize: "15px" }} /> : < CloseIcon style={{ color: "red", fontSize: "15px" }} />}
                                        &nbsp;Password should contain at least one capital letter</span><br />
                                    <span style={{
                                        // color: checkvalidations.lowerLetter ? "green" : "red", 
                                        fontSize: "10px"
                                    }}>
                                        {checkvalidations.lowerLetter ? <DoneIcon style={{ color: "green", fontSize: "15px" }} /> : < CloseIcon style={{ color: "red", fontSize: "15px" }} />}
                                        &nbsp;Password should contain at least one lowercase letter</span><br />
                                    <span style={{
                                        // color: checkvalidations.oneNumber ? "green" : "red", 
                                        fontSize: "10px"
                                    }}>
                                        {checkvalidations.oneNumber ? <DoneIcon style={{ color: "green", fontSize: "15px" }} /> : < CloseIcon style={{ color: "red", fontSize: "15px" }} />}
                                        &nbsp;Password should contain at least one number</span><br />
                                    <span style={{
                                        //  color: checkvalidations.passwordlength ? "green" : "red",
                                        fontSize: "10px"
                                    }}>
                                        {checkvalidations.passwordlength ? <DoneIcon style={{ color: "green", fontSize: "15px" }} /> : < CloseIcon style={{ color: "red", fontSize: "15px" }} />}
                                        &nbsp; Password should be more than 8 characters long</span><br />
                                    <span style={{
                                        //  color: checkvalidations.specialChar ? "green" : "red",
                                        fontSize: "10px"
                                    }}>
                                        {checkvalidations.specialChar ? <DoneIcon style={{ color: "green", fontSize: "15px" }} /> : < CloseIcon style={{ color: "red", fontSize: "15px" }} />}
                                        &nbsp; Password should contain at least one special character</span>

                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-4'></div>
                                <div className='col-sm-8 text-center'>
                                    <button onClick={handleResetPassword} className='btn btn-color'>Change Password</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                {/* <p>{checkvalidations.specialCharacter ? <DoneIcon /> : <CloseIcon />} Special Character</p> */}






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
