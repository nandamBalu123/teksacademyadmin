import React from "react";
import { useState, useEffect } from "react";
// import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import "./UserView.css";
import profilepic from "../../../../images/profilepicture.jpg";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import useFormattedDate from "../../../../hooks/useFormattedDate";

const label = { inputProps: { "aria-label": "Switch demo" } };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.blue,

    color: theme.palette.common.white,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
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
    <div className="container mt-3">
      <div className="userviewing">
        <h5 className="my-3 text-center"> User View</h5>

        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 col-xl-3">
            <img className="w-75" src={profilepic} alt="pic" />
            {/* {!studentdata.studentImg && <img src={profilePic} alt="photo" />}
            {studentdata.studentImg && (
              <img
                className=" w-75"
                src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
                alt="photo"
              />
            )} */}
          </div>
          <div className="col-12 col-md-4 col-lg-5 col-xl-5">
            <p>
              <b> User Name :</b>
              {singleUser.fullname}
            </p>
            <p>
              <b>Email: </b>
              {singleUser.email}
            </p>
            <p>
              <b> Phone No:</b> {singleUser.phonenumber}
            </p>
            <p>
              <b> Designation:</b> {singleUser.designation}
            </p>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 ">
            <p>
              <b> Department :</b> {singleUser.department}
            </p>
            <p>
              {" "}
              <b> Report To :</b> {singleUser.reportto}
            </p>
            <p>
              <b> Profile :</b> {singleUser.profile}{" "}
            </p>
            <p>
              <b> Branch:</b> {singleUser.branch}
            </p>
            <Link to={`/resetpassword/${id}`}>
              Change Password
            </Link>
          </div>
        </div>
        <TableContainer component={Paper} className="my-4" style={{ overflow: "hidden" }}>
          <Table size="large" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="table-cell-heading">
                  Date
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading">
                  Status
                </StyledTableCell>
                <StyledTableCell className="table-cell-heading">
                  Remarks
                </StyledTableCell>
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
                  const Formatteddate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                    }-${year}`;

                  return (
                    <StyledTableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      key={index}
                    >
                      <StyledTableCell className="table-cell-heading">
                        {" "}
                        {Formatteddate}
                      </StyledTableCell>

                      {userstatus.Activate_remarks && (
                        <StyledTableCell className="table-cell-heading">
                          Active
                        </StyledTableCell>
                      )}
                      {userstatus.Inactivate_remarks && (
                        <StyledTableCell className="table-cell-heading">
                          Inactive
                        </StyledTableCell>
                      )}
                      {userstatus.Activate_remarks && (
                        <StyledTableCell className="table-cell-heading">
                          {userstatus.Activate_remarks}
                        </StyledTableCell>
                      )}
                      {userstatus.Inactivate_remarks && (
                        <StyledTableCell className="table-cell-heading">
                          {userstatus.Inactivate_remarks}
                        </StyledTableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <div className="backimg">
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
            <p >Department : {singleUser.department}</p>
            <p > Report To : {singleUser.reportto}</p>
            <p > Profile : {singleUser.profile} </p>
            <p > Branch: {singleUser.branch}</p>
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
        </div> */}
      </div>
    </div>
  );
};

export default UserView;
