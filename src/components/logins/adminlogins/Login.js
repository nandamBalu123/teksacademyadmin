import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './Loginvalidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.email === '' && errors.password === '') {
            axios
                .post('http://localhost:3030/adminlogin', values)
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        localStorage.setItem('token', res.data.token); // Store the token in localStorage
                        navigate('/'); // Redirect to the admin dashboard route
                    } else {
                        alert('No records existed');
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    // var apiUrl = 'https://demo.teksacademy.com:3000';
    // var apiUrl = 'http://localhost:3003';

    // const navigate = useNavigate();
    // const [values, setValues] = useState({
    //     email: '',
    //     password: ''
    // })
    
    // const [errors, setErrors] = useState({})
    // const handleInput = (event) =>{
    //     setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    // }


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(validation(values));
    //     if (errors.email === "" && errors.password === "") {
    //         axios.post('http://localhost:3030/adminlogin', values)
    //             .then(res => {
    //                 if (res.data.Status === "Success") {
    //                     navigate('/'); // Redirect to the '/' route
    //                 } else {
    //                     alert("No records existed");
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }
    // }
    // end



    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(validation(values));
    //     if(errors.email === "" && errors.password === ""){
    //         axios.post('http://localhost:3030/adminlogin', values)
    //         .then(res => {
    //             if(res.data === "Success"){
    //                 navigate('/')
    //             }else{
    //                 alert("No records existed")
    //             }
    //         })
    //         .catch(err => console.log(err));
    //       }
    // }
    return(
        
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
            <h2 className='text-center'>Sign-In</h2>
               <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" name='email' placeholder='Enter Email' className='form-control rounded-0'
                        onChange={handleInput}/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" name='password' placeholder='Enter Password' className='form-control rounded-0'
                        onChange={handleInput}/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Log in</button>
                    <p>Your are agree to our term and policies</p>
                    <Link to="/signup" className='btn btn-default border w-100 text-decoration-none'>Create Account</Link>
               </form>
            </div>
        </div>

        // <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        // <div className='bg-white p-3 rounded w-50'>
        // <h2>Sing-In</h2>
        // <form action="">
        //         <div className='mb-3'>
        //             <label htmlFor='email'>Email</label>
        //             <input type="email" placeholder='Enter Email' className='form-control rounded-0'/>
        //         </div>
        //         <div className='mb-3'>
        //             <label htmlFor='password'>Password</label>
        //             <input type="password" placeholder='Enter Password' className='form-control rounded-0'/>
        //         </div>
        //         <button className='btn btn-success w-100 rounded-0'>Log in</button>
        //         <p>Your are agree to our term and policies</p>
        //         <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</button>
        // </form>
        // </div>
        // </div>
    )
}

export default Login;