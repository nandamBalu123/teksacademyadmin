import React from "react";
import userlogo from '../../../../images/userviewlogo.jpg';
import './UserViewCopy.css';
const UserViewCopy = () => {
    const backgroundImageUrl = 'url(../../../../images/userviewlogo.jpg)';
    const divStyle = {
        backgroundImage: backgroundImageUrl,
        backgroundSize: 'cover', // Adjust as needed
        backgroundRepeat: 'no-repeat', // Adjust as needed
      };
    return(
        <>  
        <div className="container"> 
        <div className="data">  
   
        <h3 className="text-center pt-3 title fs-3"> User Details</h3><hr className="w-50 m-auto"/>
      <div className="details pt-3">    <h5> Name : Bhavitha </h5> <br/>
                           <h5> Email : bhavitha@gmail.com</h5> <br/>
                           <h5> Phone No :6302337069</h5> <br/>
                           <h5> Designation: Developer</h5> <br/>
                           <h5> Department : IT</h5> <br/>
                           <h5> Report To : Krishna</h5> <br/>
                           <h5> Profile : Profile</h5> <br/>
                           <h5> Branch: Hi-Tech City</h5> </div>
        </div> </div>
        </>
    )
}
export default UserViewCopy;