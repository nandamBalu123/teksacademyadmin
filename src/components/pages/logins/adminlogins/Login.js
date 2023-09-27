import React, { useState } from "react";
import { Link } from "react-router-dom";
import validation from "./Loginvalidation";
import { useNavigate } from "react-router-dom";

import "../../loginpage/LoginPage.css";
import image from "../../../../images/thumbnail_Login.jpg";

import axios from "axios";
function Login() {
  let quotes = [
    "Your commitment to excellence is an inspiration to us all. Keep up the great work!",
    "Teamwork makes the dream work. Together, we can achieve greatness.",
    "Your dedication and hard work have contributed to our success. Thank you for being an invaluable part of our team.",
    "Success is not the result of one person's effort, but the collective effort of a great team. Thank you for being a part of our success story.",
    "In this company, we don't just hire employees, we hire future leaders. You're on your way to becoming one.",
    "Your creativity and innovation are what drive our progress. Keep thinking outside the box.",
    "Every day may not be good, but there's something good in every day. Your positive attitude is contagious.",
    "Your dedication and passion for your work are evident in everything you do. You're an inspiration to us all.",
    "The strength of the team is each individual member. The strength of each member is the team.",
    "A company's success is built on the dedication and passion of its employees. You're the foundation of our success.",
    "Your commitment to excellence is an inspiration to us all. Keep up the great work!",
    "Remember, success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    "Your dedication to your work is not just appreciated; it's an inspiration to us all.",
    "Great employees are like rare gems, and we are fortunate to have you shine so brightly in our team.",
    "Your positive attitude and resilience in the face of challenges are qualities that make you a valuable asset to our organization.",
    "In the journey of success, employees like you are the driving force. Your hard work and dedication are truly appreciated.",
  ];
  let random = Math.round(Math.random() * 15);
  console.log(random);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3030/adminlogin", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            localStorage.setItem("token", res.data.token); // Store the token in localStorage
            navigate("/"); // Redirect to the admin dashboard route
          } else {
            alert("No records existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="maindiv row">
      <div className="subdiv col-6 imagediv">
        <img className="imgg" src={image} alt="img" />
      </div>
      <div className="subdiv col-md-6 credentials">
        <p className="quotes">{quotes[random]}</p>
        <p></p>
        <form action="" onSubmit={handleSubmit}></form>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="inputcon form-control rounded-0"
          onChange={handleInput}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="inputcon form-control rounded-0"
          onChange={handleInput}
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}

        <button type="submit" className="btnn">
          Login
        </button>
      </div>
    </div>
    //     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
    //       <div className="bg-white p-3 rounded w-25">
    //         <h2 className="text-center">Sign-In</h2>
    //         <form action="" onSubmit={handleSubmit}>
    //           <div className="mb-3">
    //             <label htmlFor="email">
    //               <strong>Email</strong>
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               placeholder="Enter Email"
    //               className="form-control rounded-0"
    //               onChange={handleInput}
    //             />
    //             {errors.email && (
    //               <span className="text-danger">{errors.email}</span>
    //             )}
    //           </div>
    //           <div className="mb-3">
    //             <label htmlFor="password">
    //               <strong>Password</strong>
    //             </label>
    //             <input
    //               type="password"
    //               name="password"
    //               placeholder="Enter Password"
    //               className="form-control rounded-0"
    //               onChange={handleInput}
    //             />
    //             {errors.password && (
    //               <span className="text-danger">{errors.password}</span>
    //             )}
    //           </div>
    //           <button type="submit" className="btn btn-success w-100">
    //             Log in
    //           </button>
    //           <p>Your are agree to our term and policies</p>
    //           <Link
    //             to="/signup"
    //             className="btn btn-default border w-100 text-decoration-none"
    //           >
    //             Create Account
    //           </Link>
    //         </form>
    //       </div>
    //     </div>

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
  );
}

export default Login;
