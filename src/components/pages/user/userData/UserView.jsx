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
         
          {/* <h5> Name : {singleUser.fullname} </h5> <br />
           <h5> Email : {singleUser.email}</h5> <br />
    <h5> Phone No :{singleUser.phonenumber}</h5> <br />
           <h5> Designation: {singleUser.designation}</h5> <br />
         <h5> Department : {singleUser.department}</h5> <br />
           <h5> Report To : {singleUser.reportto}</h5> <br />
           <h5> Profile : {singleUser.profile}</h5> <br />
          <h5> Branch: {singleUser.branch}</h5> */}
         </div> 
         <h5> Name :  Bhavitha</h5>
         <p> Email : bhavitha@gmail.com </p>
         <p> phone No : 123456789 </p>
         <p> Designation : vgcffffgvgvb </p>
         <p> Department : hgcdsfhhvgvgvg</p>
         <p> Report To : nhvgvgvghh</p>
         <p> Profile: gvgvgvgvgh</p>
         <p> Branch : hvgfcfcff</p>
         </div>
      

      </div>

    // <div className="container">
    //   <div className="data">
    //     <h3 className="text-center pt-3 title fs-3"> User Details</h3>
    //     <hr className="w-50 m-auto" />
    //     <div className="details pt-3">
    //       <h5> Name : {singleUser.fullname} </h5> <br />
    //       <h5> Email : {singleUser.email}</h5> <br />
    //       <h5> Phone No :{singleUser.phonenumber}</h5> <br />
    //       <h5> Designation: {singleUser.designation}</h5> <br />
    //       <h5> Department : {singleUser.department}</h5> <br />
    //       <h5> Report To : {singleUser.reportto}</h5> <br />
    //       <h5> Profile : {singleUser.profile}</h5> <br />
    //       <h5> Branch: {singleUser.branch}</h5>{" "}
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserView;
