import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { id } = useParams('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleHidePassword = () => {
        setShowPassword(showPassword);
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
        <div>
            <h2>Reset Password</h2>
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <span onMouseDown={toggleShowPassword} onMouseUp={toggleHidePassword} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
            <br />
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;
