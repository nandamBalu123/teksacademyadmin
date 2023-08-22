import React, { useState } from 'react'
import { Link }  from 'react-router-dom'
import validation from './Signupvalidation'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  
var apiUrl = 'https://demo.teksacademy.com:3000';
// var apiUrl = 'http://localhost:3003/';

  const navigate = useNavigate();
  const [values, setValues] = useState({
      name: '',
      email: '',
      password: ''
  })

  const [errors, setErrors] = useState({})
  const handleInput = (event) =>{
      setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setErrors(validation(values));
      if(errors.name === "" & errors.email === "" && errors.password === ""){
        axios.post(`https://demo.teksacademy.com:3000/signup`, values)
        .then(res => {
          navigate('/');
        })
        .catch(err => console.log(err));
      }
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
              <h2 className='text-center'>Sign-Up</h2>
               <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type="text" placeholder='Enter Name' name='name' className='form-control rounded-0'
                        onChange={handleInput}/>
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0'
                        onChange={handleInput}/>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0'
                        onChange={handleInput}/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Signup</button>
                    <p>Your are agree to our term and policies</p>
                    <Link to="/" className='btn btn-default border w-100 text-decoration-none'>Already have account</Link>
               </form>
            </div>
        </div>
  )
}


export default Signup