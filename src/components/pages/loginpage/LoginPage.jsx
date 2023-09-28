import React, { useState } from "react";
import "./LoginPage.css";
import image from "../../../images/thumbnail_Login.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "../logins/adminlogins/Loginvalidation";

const LoginPage = () => {
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

    // Move the error check after setting errors in state to ensure they are updated

    setErrors(validation(values));

    // Check if there are errors after setting them

    if (!errors.email && !errors.password) {
      axios

        .post("http://localhost:3030/adminlogin", values)

        .then((res) => {
          console.log("API Response:", res.data);

          if (res.data.Status === "Success") {
            const id = res.data.adminData.id;

            const token = res.data.token;

            const role = res.data.adminData.profile;

            console.log("Received Token:", token);

            console.log("role: ", role);

            localStorage.setItem("role", role);

            localStorage.setItem("token", token);

            navigate("/"+role +"/" + id);

            console.log(id);
          } else {
            alert("Wrong Email or Password");
          }
        })

        .catch((err) => {
          console.error("API Error:", err);

          alert("An error occurred. Please try again later.");
        });
    }
  };
  // function validation(values) {
  //   let error = {};
  //   const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const password_pattern =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //   if (values.email === "") {
  //     error.email = "Name should not be empty";
  //   } else if (!email_pattern.test(values.email)) {
  //     error.email = "Email didn't match";
  //   } else {
  //     error.email = "";
  //   }

  //   if (values.password === "") {
  //     error.password = "Password should not be empty";
  //   } else if (!password_pattern.test(values.password)) {
  //     error.password = "Password didn't match";
  //   } else {
  //     error.password = "";
  //   }
  //   return error;
  // }

  // const navigate = useNavigate();
  // const [values, setValues] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [errors, setErrors] = useState({});

  // const handleInput = (event) => {
  //   setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors(validation(values));
  //   if (errors.email === "" && errors.password === "") {
  //     axios
  //       .post("http://localhost:3030/adminlogin", values)
  //       .then((res) => {
  //         if (res.data.Status === "Success") {
  //           localStorage.setItem("token", res.data.token); // Store the token in localStorage
  //           navigate("/"); // Redirect to the admin dashboard route
  //         } else {
  //           alert("No records existed");
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
  return (
    <div className="maindiv row">
      <div className="subdiv col-6 imagediv">
        <img className="imgg" src={image} alt="img" />
      </div>
      <div className="subdiv col-md-6 credentials">
        <p className="quotes">{quotes[random]}</p>
        <p></p>
        <form action="" onSubmit={handleSubmit}>

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
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
