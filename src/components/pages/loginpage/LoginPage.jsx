import React, { useState } from "react";
import "./LoginPage.css";
// import image from "../../../images/thumbnail_Login.jpg";
import loginimg1 from "../../../images/loginimg1.jpg";
// import loginimg from '../../../images/loginimg.jpg'
// import education from '../../../images/education.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./Loginvalidation";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material"; 
// import { useUsersContext } from "../../../hooks/useUsersContext";
// import { useEffect } from "react";
const LoginPage = () => {
  const navigate = useNavigate();
  // const { users } = useUsersContext();
  const { dispatch } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false); 
  const [values, setValues] = useState({
    email: "",

    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // Move the error check after setting errors in state to ensure they are updated

    setErrors(validation(values));

    // Check if there are errors after setting them

    if (!errors.email && !errors.password && values.email && values.password) {
      axios

        .post(`${process.env.REACT_APP_API_URL}/adminlogin`, values)

        .then((res) => {
          if (res.data.Status === "Success") {
            const id = res.data.adminData.id;

            const token = res.data.token;

            let role = res.data.adminData.profile;
            role = role.toLowerCase();
            const reportto = res.data.adminData.reportto;

            console.log("Received Token:", token);

            console.log("role: ", role);
            let user = res.data.adminData;
            user.profile = user.profile.toLowerCase();
            localStorage.setItem("role", role);
            localStorage.setItem("id", id);
            localStorage.setItem("reportto", reportto);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Store token in a cookie
            document.cookie = `token=${token}; path=/`; // Set the token cookie

            dispatch({ type: "LOGIN", payload: res.data.adminData });
            console.log("res.data", res.data);
            navigate("/");
            window.location.reload();
          } else {
            alert("Wrong Email or Password");
          }
        })

        .catch((err) => {
          console.error("API Error:", err);

          alert(err.response.data.Error || "An error occurred. Please try again later.");
        });
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Move the error check after setting errors in state to ensure they are updated
  //   setErrors(validation(values));

  //   // Check if there are errors after setting them
  //   if (!errors.email && !errors.password) {
  //     try {
  //       const response = await axios.post(`${process.env.REACT_APP_API_URL}/adminlogin`, values);
  //       const data = response.data;

  //       console.log("API Response:", data);

  //       if (data.Status === "Success") {
  //         const { id, token, adminData } = data;
  //         const { profile, reportto } = adminData;

  //         // Ensure consistent case for role and store user data in localStorage
  //         const role = profile.toLowerCase();
  //         const user = { ...adminData, profile: role };

  //         localStorage.setItem("role", role);
  //         localStorage.setItem("id", id);
  //         localStorage.setItem("reportto", reportto);
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("user", JSON.stringify(user));

  //         // Store token in a cookie
  //         document.cookie = `token=${token}; path=/`;

  //         // Update your Redux state or context with the user data
  //         dispatch({ type: "LOGIN", payload: user });

  //         console.log("res.data", data);
  //         navigate("/");
  //         window.location.reload();
  //       } else {
  //         alert(data.Error || "Wrong Email or Password");
  //       }
  //     } catch (error) {
  //       console.error("API Error:", error.response.data.Error);
  //       alert(error.response.data.Error || "An error occurred. Please try again later.");
  //     }
  //   }
  // };


  // let quotes = [
  //   "Your commitment to excellence is an inspiration to us all. Keep up the great work!",
  //   "Teamwork makes the dream work. Together, we can achieve greatness.",
  //   "Your dedication and hard work have contributed to our success. Thank you for being an invaluable part of our team.",
  //   "Success is not the result of one person's effort, but the collective effort of a great team. Thank you for being a part of our success story.",
  //   "In this company, we don't just hire employees, we hire future leaders. You're on your way to becoming one.",
  //   "Your creativity and innovation are what drive our progress. Keep thinking outside the box.",
  //   "Every day may not be good, but there's something good in every day. Your positive attitude is contagious.",
  //   "Your dedication and passion for your work are evident in everything you do. You're an inspiration to us all.",
  //   "The strength of the team is each individual member. The strength of each member is the team.",
  //   "A company's success is built on the dedication and passion of its employees. You're the foundation of our success.",
  //   "Your commitment to excellence is an inspiration to us all. Keep up the great work!",
  //   "Remember, success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
  //   "Your dedication to your work is not just appreciated; it's an inspiration to us all.",
  //   "Great employees are like rare gems, and we are fortunate to have you shine so brightly in our team.",
  //   "Your positive attitude and resilience in the face of challenges are qualities that make you a valuable asset to our organization.",
  //   "In the journey of success, employees like you are the driving force. Your hard work and dedication are truly appreciated.",
  // ];
  // let random = Math.round(Math.random() * 15);
  // console.log(random);
  return (
    <div className="login">
      <div className="containers ">
        <form className="login-section  ">
          <div className="form-box">
            <h2> Welcome Back!</h2>
               {/* <p>Enter your Details</p>  */}
            <div className="input-box">
            <label htmlFor=""> Enter Email<span>*</span></label>
              <input
                type="email"
                name="email"
                required
                onChange={handleInput}
              />

             

            </div>
            {errors.email && (
              <span className="text-danger text-start mail">{errors.email}</span>
            )}

            <div className="input-box col-12 col-md-6 col-md-6">
            <label htmlFor=""> Enter Password<span>*</span></label>
              <input
               type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleInput}
              />
             {showPassword ? (
                <Visibility className="eyeicon" onClick={togglePasswordVisibility} /> // Show hide icon based on state
              ) : (
                <VisibilityOff className="eyeicon" onClick={togglePasswordVisibility} />
              )}
            </div>
            {errors.password && (
              <span className="text-danger passwrd" >{errors.password}</span>
            )}
            <button
              className="btn btn-color input-box btnbrder"
              onClick={handleSubmit}
            >

              Login
            </button>
          </div>
        </form>
        <div className="img">
          <img className="img w-100" src={loginimg1} alt="img" />
        </div>
      </div>
    </div>
    // <div className="login row ">
    //   <div className="subdiv col-12  col-md-6  col-lg-6 imagediv">
    //     <img className="img w-100" src={loginimg1} alt="img" />
    //   </div>
    //   <div className="subdiv col-12  col-md-6  col-lg-6 credentials">
    //     <p className="quotes">{quotes[random]}</p>
    //     <p></p>
    //     <form action="" onSubmit={handleSubmit}>

    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Enter Email"
    //         className="inputcon form-control rounded-0"
    //         onChange={handleInput}
    //       />
    //       {errors.email && <span className="text-danger">{errors.email}</span>}

    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Enter Password"
    //         className="inputcon form-control rounded-0"
    //         onChange={handleInput}
    //       />
    //       {errors.password && (
    //         <span className="text-danger">{errors.password}</span>
    //       )}

    //       <button type="submit" className="btnn">
    //         Login
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default LoginPage;
