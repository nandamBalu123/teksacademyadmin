import React, { useState } from 'react';
import axios from 'axios';

const OTPSender = () => {
    const [email, setEmail] = useState('');

    const handleSendOTP = async () => {
        try {
            // Validate email format before sending the OTP
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Make a POST request to the server to send OTP
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp`, {
                to: email,
                subject: 'Your OTP',
                text: 'Your OTP code is 123456', // Replace with actual OTP generation logic
            });

            console.log(response.data);
            alert('OTP sent successfully!');
        } catch (error) {
            console.error(error.toString());
            alert('Failed to send OTP. Please try again.');
        }
    };

    return (
        <div>
            <h2>OTP Sender</h2>
            <label>Email:</label>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOTP}>Send OTP</button>
        </div>
    );
};

export default OTPSender;


// import React, { useState } from 'react';

// const OTPValidation = () => {
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [otp, setOtp] = useState('');

//     const handleSendOtp = async () => {
//         try {
//             const response = await fetch('/api/send-otp', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ mobileNumber }),
//             });

//             // Handle the response, show a message, etc.
//         } catch (error) {
//             console.error('Error sending OTP:', error);
//         }
//     };

//     const handleVerifyOtp = async () => {
//         try {
//             const response = await fetch('/api/verify-otp', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ mobileNumber, otp }),
//             });

//             // Handle the response, show a message, etc.
//         } catch (error) {
//             console.error('Error verifying OTP:', error);
//         }
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Enter mobile number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//             />
//             <button onClick={handleSendOtp}>Send OTP</button>

//             <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//             />
//             <button onClick={handleVerifyOtp}>Verify OTP</button>
//         </div>
//     );
// };

// export default OTPValidation;
