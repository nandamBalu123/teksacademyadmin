import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./UserView.css";
import axios from "axios";
const UserView = () => {
  const [singleUser, setUser] = useState("");

  const { user } = useAuthContext();
  const { id } = useParams("");
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`http://localhost:3030/viewuser/${id}`)
      .then((response) => {
        // Handle the successful response here
        setUser(response.data[0]); // Update the data state with the fetched data
        console.log("studentdata---", response.data[0]);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);

  const backgroundImageUrl = "url(../../../../images/userviewlogo.jpg)";
  const divStyle = {
    backgroundImage: backgroundImageUrl,
    backgroundSize: "cover", // Adjust as needed
    backgroundRepeat: "no-repeat", // Adjust as needed
  };

  return (
    <div className="container">
        <div className="userviewing">
           <div className="backimg"> 
        <img
            className="pic"
            src="https://wallpapers.com/images/high/pretty-profile-pictures-k1qebyviiyl0wx0x.webp"
            alt="photo"
          />
         </div> 
         <div className="row">
          <div className="col-12 col-md-6 col-xl-6 col-lg-6">
            
            <p> User Name :{singleUser.fullname}</p>
            <p> Email: {singleUser.email}</p>
            <p> Phone No: {singleUser.phonenumber}</p>
            <p> Designation: {singleUser.designation}</p>
       
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6  text-start ">
         
            <p>Department : {singleUser.department}</p>
            <p> Report To : {singleUser.reportto}</p>
            <p> Profile : {singleUser.profile} </p>
            <p> Branch: {singleUser.branch}</p>
           
          </div>
        
        </div>
      
       </div>
     </div>
  );
};

export default UserView;
