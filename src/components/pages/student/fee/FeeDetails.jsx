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
import CloseIcon from "@mui/icons-material/Close";
import "./FeeDetails.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useBranchContext } from "../../../../hooks/useBranchContext";
const FeeDetails = () => {
  const { branches } = useBranchContext();

  const navigator = useNavigate();
  const [getstudentData, setData] = useState([{ name: "" }]);
  const [studentFeeRecordss, setFeerecords] = useState(getstudentData);
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
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
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
  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    search: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };
  useEffect(() => {
    const filteredResults = getstudentData.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.name
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.branch
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.registrationnumber.includes(filterCriteria.search) ||
          item.courses
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase()) ||
          item.enquirytakenby
            .toLowerCase()
            .includes(filterCriteria.search.toLowerCase())
        : true;

      const dateCondition =
        filterCriteria.fromdate && filterCriteria.todate
          ? item.admissiondate >= filterCriteria.fromdate &&
            item.admissiondate <= filterCriteria.todate
          : true;

      const branchCondition = filterCriteria.branch
        ? item.branch === filterCriteria.branch
        : true;

      const sourceCondition = filterCriteria.leadsource
        ? item.leadsource === filterCriteria.leadsource
        : true;

      const modeCondition = filterCriteria.modeoftraining
        ? item.modeoftraining === filterCriteria.modeoftraining
        : true;

      const counsellarCondition = filterCriteria.enquirytakenby
        ? item.enquirytakenby === filterCriteria.enquirytakenby
        : true;

      return (
        searchCondition &&
        dateCondition &&
        branchCondition &&
        sourceCondition &&
        modeCondition &&
        counsellarCondition
      );
    });
    setFeerecords(filteredResults);
  }, [filterCriteria, getstudentData]);
  const filterreset = () => {
    setFilterCriteria({
      fromdate: "",

      todate: "",

      branch: "",

      search: "",
    });
  };
  const noDueRecords = () => {
    const filteredResults = getstudentData.filter((item) => {
      const dueamount = item.dueamount === 0;

      return dueamount;
    });
    setFeerecords(filteredResults);
  };
  const studentFeeRecords = () => {
    // setData(studentFeeRecordss);
    setFeerecords(getstudentData);
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
  let initialDataCount = getstudentData.length;
  let recordCount = studentFeeRecordss.length;
  return (
    <>
      <div className="fee">
        <div className="feedetails">
          {" "}
          <h4> Fee Management(Registered Students)</h4>
          <div className="row pt-3">
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
              <button className="feebtn" onClick={studentFeeRecords}>
                Student Fee Records
              </button>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
              <button
                className="btn bg-success text-light"
                onClick={noDueRecords}
              >
                No Due Records
              </button>
            </div>
            <div className="col-12 col-md-4 col-lg-4 col-xl-4 mb-3">
              <button
                className="feebtn "
                onClick={() => navigator("/feefollowup")}
              >
                {" "}
                Fee FollowUps
              </button>
            </div>
          </div>
          <div className="row pt-3 pb-3">
            <div className="col-9 col-md-9 col-lg-9 col-xl-9">
              <input
                type="text"
                className="input-field ps-2 "
                placeholder="Search Here..."
                autoComplete="off"
                style={{
                  height: "45px",
                  width: "50%",

                  outline: "none",
                  borderTop: "none",
                  borderBottom: "1.5px solid black",
                  background: "none",
                  border: "hidden",
                  borderRadius: "5px",
                }}
                name="search"
                value={filterCriteria.search}
                onChange={handleInputChange}
              />
              <hr className="w-50" />
            </div>
            <div className="col-1 col-md-1 col-lg-1 col-xl-1 pt-2">
              <h6>
                {" "}
                {recordCount}/{initialDataCount}
              </h6>
            </div>
            <div className="col-1 col-md-1 col-lg-1 col-xl-1">
              <button
                onClick={handleClick}
                className="btn btn-primary mr-20 ms-2 mb-2"
                style={{ textTransform: "capitalize" }}
              >
                {" "}
                Filter{" "}
              </button>
              {/* <h6 onClick={handleClick}> Filter</h6> */}
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
                <div className="d-flex justify-content-between">
                  <MenuItem> Filter</MenuItem>
                  <MenuItem>
                    {" "}
                    <CloseIcon onClick={handleClose} />{" "}
                  </MenuItem>
                </div>
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
                      value={filterCriteria.fromdate}
                      onChange={handleInputChange}
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
                      value={filterCriteria.todate}
                      onChange={handleInputChange}
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
                      value={filterCriteria.branch}
                      onChange={handleInputChange}
                    >
                      <option value="">Branch</option>
                      {branches &&
                        branches.map((item, index) => (
                          <option key={item.id} value={item.branch_name}>
                            {item.branch_name}
                          </option>
                        ))}
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
                <MenuItem className="d-flex justify-content-between">
                  {/* <button className="save"> Save</button> */}
                  <button className="clear" onClick={filterreset}>
                    {" "}
                    Clear
                  </button>
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
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
                  {Array.isArray(studentFeeRecordss) &&
                  studentFeeRecordss.length > 0 ? (
                    studentFeeRecordss.map((item, index) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={item.id}
                      >
                        <TableCell className="border border 1">
                          {" "}
                          {index + 1}
                        </TableCell>
                        <TableCell className="border border 1">
                          {" "}
                          {item.name}
                          <br />
                          {item.branch} <br />
                          {item.enquirytakenby}
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
                              const dynamicStyle = {
                                color: item.dueamount < 1 ? "green" : "red",
                                fontSize: item.dueamount < 1 ? "20px" : "16px",
                                fontWeight: item.dueamount < 1 ? "900" : "900",
                              };
                              const IconStyle = {
                                display: item.dueamount < 1 ? true : "none",
                                marginLeft: "10px",
                              };
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
                          <Link to={`/feeview/${item.id}`}>
                            <VisibilityIcon />
                          </Link>{" "}
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
          </Paper>
        </div>
      </div>
    </>
  );
};
export default FeeDetails;
