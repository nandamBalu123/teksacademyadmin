import React from "react";
import { useState, useEffect } from "react";
// import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import "./UserView.css";
import profilepic from "../../../../images/profilepicture.jpg";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFormattedDate from "../../../../hooks/useFormattedDate";

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
          <img className="pic" src={profilepic} alt="pic" />
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

          <TableContainer component={Paper} className="my-4">
            <Table
              sx={{ minWidth: 650 }}
              size="large"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="fs-6 text-center border border-2">
                    Date
                  </TableCell>
                  <TableCell className="fs-6 text-center border border-2">
                    Status
                  </TableCell>
                  <TableCell className="fs-6 text-center border border-2">
                    Remarks
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {singleUser.user_remarks_history &&
                  singleUser.user_remarks_history.map((userstatus, index) => {
                    // let date = useFormattedDate(userstatus.date);
                    // const originalDate = new Date(userstatus.date);
                    // const day = String(originalDate.getDate()).padStart(2, "0");
                    // const month = String(originalDate.getMonth() + 1).padStart(
                    //   2,
                    //   "0"
                    // ); // Month is zero-based, so we add 1.
                    // const year = originalDate.getFullYear();

                    // const formattedDate = `${day}-${month}-${year}`;
                    const date = new Date(userstatus.date);
                    const day = date.getUTCDate();
                    const monthIndex = date.getUTCMonth();
                    const year = date.getUTCFullYear();

                    const monthAbbreviations = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];

                    // Formatting the date
                    const Formatteddate = `${day < 10 ? "0" : ""}${day}-${
                      monthAbbreviations[monthIndex]
                    }-${year}`;

                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell className="text-center border border-2">
                          {" "}
                          {Formatteddate}
                        </TableCell>

                        {userstatus.Activate_remarks && (
                          <TableCell className="text-center border border-2">
                            Active
                          </TableCell>
                        )}
                        {userstatus.Inactivate_remarks && (
                          <TableCell className="text-center border border-2">
                            Inactive
                          </TableCell>
                        )}
                        {userstatus.Activate_remarks && (
                          <TableCell className="text-center border border-2">
                            {userstatus.Activate_remarks}
                          </TableCell>
                        )}
                        {userstatus.Inactivate_remarks && (
                          <TableCell className="text-center border border-2">
                            {userstatus.Inactivate_remarks}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default UserView;
