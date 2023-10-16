import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./FeeDetails.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const FeeDetails = () => {
  const navigator = useNavigate();
  const [getstudentData, setData] = useState("");
  const [studentFeeRecordss, setFeerecords] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("http://localhost:3030/getstudent_data")
      .then((response) => {
        // Handle the successful response here
        setData(response.data); // Update the data state with the fetched data
        setFeerecords(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
    // fetchData();
  }, []);
  const noDueRecords = () => {
    const filteredResults = getstudentData.filter((item) => {
      const dueamount = item.dueamount === 0;

      return dueamount;
    });
    setData(filteredResults);
  };
  const studentFeeRecords = () => {
    setData(studentFeeRecordss);
  };
  // style for paid status
  const dynamicStyle = {
    color: getstudentData.dueamount < 1 ? "green" : "red",
    fontSize: getstudentData.dueamount < 1 ? "20px" : "16px",
    fontWeight: getstudentData.dueamount < 1 ? "900" : "900",
  };
  const IconStyle = {
    display: getstudentData.dueamount < 1 ? true : "none",
    marginLeft: "10px",
  };
  return (
    <>
      <div className="fee">
        <div className="feedetails">
          {" "}
          <h4> Fee Management(Registered Students)</h4>
          <div className="d-flex justify-content-between pt-3">
            <button className="feebtn" onClick={studentFeeRecords}>
              Student Fee Records
            </button>
            <button onClick={noDueRecords}>No Due Records</button>
            <button
              className="feebtn"
              onClick={() => navigator("/feefollowup")}
            >
              {" "}
              Fee FollowUps
            </button>
          </div>
          <div className="d-flex justify-content-between pt-3 pb-3">
            <input
              type="text"
              className="input-field ps-2 "
              placeholder="Search Here..."
              autoComplete="off"
              style={{
                height: "45px",
                width: "50%",
                border: "none",
                outline: "none",
                borderTop: "none",
                borderBottom: "1.5px solid black",
                background: "none",
                borderRadius: "5px",
              }}
            />{" "}
            <h6 onClick={handleClick}> Filter</h6>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              style={{
                width: "600px",
                borderRadius: "25px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              <MenuItem> Filter</MenuItem>
              <hr />
              <div className="d-flex">
                <MenuItem className="pt-3 ">
                  <div>
                    <label> From: </label>
                  </div>

                  <input
                    type="date"
                    className="form-control"
                    style={{
                      height: "45px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="fromdate"
                  />
                </MenuItem>
                <MenuItem className="pt-3 ">
                  <label> To: </label>
                  <br />
                  <input
                    type="date"
                    className="form-control"
                    style={{
                      height: "45px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="todate"
                  />
                </MenuItem>
              </div>
              <div className="d-flex w-100 mt-3">
                <MenuItem>
                  <select
                    id=""
                    placeholder="Filter Branch"
                    style={{
                      height: "45px",
                      paddingLeft: "10px",
                      paddingRight: "115px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="branch"
                  >
                    <option value="">Branch</option>
                    <option value="hitechcity"> Hitech city</option>
                    <option value="ameerpet"> Ameerpet</option>
                    <option value="dilsukhnagar"> Dilsukhnagar</option>
                    <option value="gachibowli"> Gachibowli</option>
                  </select>
                </MenuItem>
                <MenuItem>
                  <select
                    id=""
                    placeholder="select Type"
                    style={{
                      height: "45px",

                      paddingRight: "105px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="amount"
                  >
                    <option> Select Type</option>
                    <option value="paidamount"> Paid Amount</option>
                    <option value="dueamount"> Due Amount</option>
                  </select>
                </MenuItem>
              </div>
            </Menu>
          </div>
          <TableContainer component={Paper} className="pt-4">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    {" "}
                    S.NO
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Name
                    <br /> Branch <br />
                    Counsellor
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    {" "}
                    Contact
                    <br />
                    Email
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    {" "}
                    Course <br /> Date of Joining
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    {" "}
                    Total Fee
                    <br /> Paid Fee
                    <br /> Due Amount
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    {" "}
                    Created Date <br /> Next Due Date
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    {" "}
                    Paid Status{" "}
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    {" "}
                    View
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(getstudentData) && getstudentData.length > 0 ? (
                  getstudentData.map((item, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={item.id}
                    >
                      <TableCell component="th" className="border border 1">
                        {" "}
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border 1">
                        {" "}
                        {item.branchname} <br />
                        {item.name}
                      </TableCell>
                      <TableCell className="border border 1">
                        {" "}
                        {item.mobilenumber}
                        <br /> {item.email}
                      </TableCell>
                      <TableCell className="border border 1">
                        {" "}
                        {item.courses}
                        <br />
                        {item.admissiondate}
                      </TableCell>
                      <TableCell className="border border 1">
                        {" "}
                        {item.finaltotal}
                        <br /> {item.totalpaidamount} <br />
                        {item.dueamount}
                        <br />
                      </TableCell>
                      <TableCell className="border border 1">
                        {" "}
                        {item.admissiondate}
                        <br />
                        {item.nextduedate}
                        
                      </TableCell>
                      <TableCell className="border border 1">
                        {item.totalinstallments &&
                          item.totalinstallments.length > 0 &&
                          item.totalinstallments.map((items, index) => {
                            if (true) {
                              // settotalleft(item.totalinstallmentsleft);
                              // totalleft = item.totalinstallmentsleft;
                              return (
                                <div style={{ display: "flex" }}>
                                  <span style={dynamicStyle}>
                                    {items.totalinstallmentspaid}/
                                    {items.totalinstallments}
                                  </span>
                                  <span style={dynamicStyle}>
                                    <CheckCircleIcon style={IconStyle} />
                                  </span>
                                </div>
                              );
                            }
                          })}
                      </TableCell>
                      <TableCell className="border border 1">
                        <Link to={`/feeview/${item.id}`}>view</Link>{" "}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No data available</TableCell>
                  </TableRow>
                )}{" "}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};
export default FeeDetails;
