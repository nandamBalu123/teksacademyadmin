import React from "react";
import "./LoginPage.css";
import image from "../../../images/thumbnail_Login.jpg";
const LoginPage = () => {
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
        {/* <h3 className="loginlogo">Login to your Account</h3> */}
        <input className="inputcon" placeholder="  Email ID" />
        <input className="inputcon" placeholder="  Password" />
        <button className="btnn">Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
