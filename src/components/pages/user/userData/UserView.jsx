import React from "react";
import { useState, useEffect } from "react";
// import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import "./UserView.css";
import axios from "axios";
const UserView = () => {
  const [singleUser, setUser] = useState("");

  // const { user } = useAuthContext();
  const { id } = useParams("");
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewuser/${id}`)
      .then((response) => {
        // Handle the successful response here
        setUser(response.data[0]); // Update the data state with the fetched data
        console.log("studentdata---", response.data[0]);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, [id]);

  // const backgroundImageUrl = "url(../../../../images/userviewlogo.jpg)";
  // const divStyle = {
  //   backgroundImage: backgroundImageUrl,
  //   backgroundSize: "cover", // Adjust as needed
  //   backgroundRepeat: "no-repeat", // Adjust as needed
  // };

  return (
    <div className="container">
      <div className="userviewing">
        <div className="backimg">
          <img
            className="pic"
            src="https://wallpapers.com/images/high/pretty-profile-pictures-k1qebyviiyl0wx0x.webp"
            alt="pic"
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-xl-6 col-lg-6">
            <p className="text-start"> User Name :{singleUser.fullname}</p>
            <p className="text-start"> Email: {singleUser.email}</p>
            <p className="text-start"> Phone No: {singleUser.phonenumber}</p>
            <p className="text-start"> Designation: {singleUser.designation}</p>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6  text-start ">
            <p className="text-end">Department : {singleUser.department}</p>
            <p className="text-end"> Report To : {singleUser.reportto}</p>
            <p className="text-end"> Profile : {singleUser.profile} </p>
            <p className="text-end"> Branch: {singleUser.branch}</p>
          </div>
          <p>
            {singleUser.user_remarks_history &&
              JSON.parse(singleUser.user_remarks_history).map(
                (userstatus, index) => {
                  const originalDate = new Date(userstatus.date);
                  const day = String(originalDate.getDate()).padStart(2, "0");
                  const month = String(originalDate.getMonth() + 1).padStart(
                    2,
                    "0"
                  ); // Month is zero-based, so we add 1.
                  const year = originalDate.getFullYear();

                  const formattedDate = `${day}-${month}-${year}`;
                  return (
                    <span>
                      {userstatus.Activate_remarks && (
                        <div>
                          <span>Date : {formattedDate}</span> &nbsp;
                          <span>Status : Active</span>
                          <span>Remakrs:{userstatus.Activate_remarks}</span>
                          &nbsp;
                        </div>
                      )}
                      {userstatus.Inactivate_remarks && (
                        <span>
                          <span>Date : {formattedDate}</span> &nbsp;
                          <span>Status : Inactive</span> &nbsp;
                          <span>
                            Remakrs:{userstatus.Inactivate_remarks}
                          </span>{" "}
                          &nbsp;
                        </span>
                      )}
                    </span>
                  );
                }
              )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserView;
