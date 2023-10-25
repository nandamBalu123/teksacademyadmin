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
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Feefolloup.css";
import axios from "axios";

const Feefollowup = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [getstudentData, setData] = useState([{ name: "" }]);
  const [filtereddata, setfiltereddata] = useState([{ name: "" }]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [itemsPerPage, setrecordsPerPage] = useState(10);

  const handlerecorddata = (e) => {
    setrecordsPerPage(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);

  // Calculate the range of items to display on the current page
  ////////////////////pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const records = filtereddata.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
////////////


  useEffect(() => {
    axios
      .get("http://localhost:3030/getstudent_data")
      .then((response) => {
        setData(response.data);

        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
  const [filterCriteria, setFilterCriteria] = useState({
    dueamount: true,
    todaydate: "true",
    upcomingdate: "",
    pendingdate: "",
  });
  const today = new Date();
  const todayFormatted = today.toISOString().split("T")[0];

  useEffect(() => {
    const filteredResults = getstudentData.filter((item) => {
      const dueamount = filterCriteria.dueamount ? item.dueamount != 0 : true;
      const todaydateCondition = filterCriteria.todaydate
        ? item.nextduedate === todayFormatted
        : true;
      const upcomingdateCondition = filterCriteria.upcomingdate
        ? item.nextduedate > todayFormatted
        : true;
      const pendingdateCondition = filterCriteria.pendingdate
        ? item.nextduedate < todayFormatted
        : true;

      return (
        todaydateCondition &&
        upcomingdateCondition &&
        pendingdateCondition &&
        dueamount
      );
    });
    if (filterCriteria.pendingdate) {
      const sortData = () => {
        const sortedData = [...filteredResults].sort((a, b) =>
          b.nextduedate.localeCompare(a.nextduedate)
        );
        setfiltereddata(sortedData);
      };
      sortData();
    } else {
      const sortData = () => {
        const sortedData = [...filteredResults].sort((a, b) =>
          a.nextduedate.localeCompare(b.nextduedate)
        );
        setfiltereddata(sortedData);
      };
      sortData();
    }

    // setfiltereddata(filteredResults);
  }, [getstudentData, filterCriteria]);

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
  let recordCount = filtereddata.length;
  return (
    <div className="fee">
      <div className="feedetails">
        <button
          className="feefollowupbtn bg-danger"
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowFormatted = tomorrow.toISOString().split("T")[0];
            setFilterCriteria((e) => ({
              dueamount: true,
              todaydate: false,
              upcomingdate: false,
              pendingdate: true,
            }));
          }}
        >
          {" "}
          Pending
        </button>
        <button
          className="feefollowupbtn bg-warning"
          // className={`feebtn me-5 mb-2 ${displayTodayTable ? "active" : ""}`}
          // onClick={() => setDisplayTodayTable(true)}

          onClick={() => {
            setFilterCriteria((e) => ({
              dueamount: true,
              todaydate: true,
              upcomingdate: false,
              pendingdate: false,
            }));
          }}
        >
          Today
        </button>

        <button
          className="feefollowupbtn bg-secondary"
          // className={`feebtn me-5 mb-2 ${displayTodayTable ? "active" : ""}`}
          // onClick={() => setDisplayTodayTable(true)}

          onClick={() => {
            setFilterCriteria((e) => ({
              dueamount: true,
              todaydate: false,
              upcomingdate: true,
              pendingdate: false,
            }));
          }}
        >
          {" "}
          Upcoming{" "}
        </button>
      </div>
      <div className="row">
        <div className="col-12 col-md-8 col-lg-8 col-xl-8 ">
          <input
            type="text"
            className="input-field ps-2 "
            placeholder="Search Here..."
            autoComplete="off"
            style={{
              height: "45px",
              width: "100%",
              border: "none",
              outline: "none",
              borderTop: "none",
            
              background: "none",
              borderRadius: "5px",
            }}
          />
          <hr className="w-50 ms-3" />
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1 pt-2">
          <h6>
            {" "}
            {recordCount}/{initialDataCount}
          </h6>
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1 ">  
        <select  onChange={handlerecorddata}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
            </select>
        </div>
        <div className="col-4 col-md-1 col-lg-1 col-xl-1">
        <button
                className="btn btn-primary mr-20 ms-2 mb-2"
                style={{ textTransform: "capitalize" }}
                onClick={handleClick}
              >
                {" "}
                Filter{" "}
              </button>
         
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
                  name="branch"
                >
                  <option> Select Type</option>
                  <option value="paidamount"> Paid Amount</option>
                  <option value="dueamount"> Due Amount</option>
                </select>
              </MenuItem>
            </div>
          </Menu>
        </div>
      </div>
      {filterCriteria.todaydate && <h3 className="ms-3 mt-2">Today</h3>}
      {filterCriteria.upcomingdate && <h3 className="ms-3 mt-2">Upcoming</h3>}

      {filterCriteria.pendingdate && <h3 className="ms-3 mt-2 btn">Pending</h3>}
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
                  <br /> Branch <br /> Counsellor
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Contact
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Email
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Course
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Due Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Due Amount{" "}
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Paid Status
                </TableCell>

                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(records) && records.length > 0 ? (
                records.map((item, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" className="border border 1">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.name}
                      <br />
                      {item.branch}
                      <br />
                      {item.enquirytakenby}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.mobilenumber}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.email}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.courses}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.nextduedate}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.dueamount}
                    </TableCell>
                    <TableCell className="border border 1">
                      {item.totalinstallments &&
                        item.totalinstallments.length > 0 &&
                        item.totalinstallments.map((items, index) => {
                          if (true) {
                            return (
                              <div style={{ display: "flex" }}>
                                <span style={dynamicStyle}>
                                  {items.totalinstallmentspaid} /
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
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div style={{ display: "flex", justifyContent: "center" }} className="mt-3">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filtereddata.length / itemsPerPage)}
              onChange={handlePageChange}
              color="primary"
            />
          </Stack>
        </div>
              {/* <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                {" "}
                View
              </TableCell> */}
        </div>
  );
};
export default Feefollowup;

// import React, { useEffect, useState } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import { Link } from "react-router-dom";
// import "./Feefolloup.css";
// import axios from "axios";

// const Feefollowup = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const [displayTodayTable, setDisplayTodayTable] = useState(true);
//   const [getstudentData, setData] = useState("");

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:3030/getstudent_data")
//       .then((response) => {
//         setData(response.data);

//         console.log("data", response.data);
//       })
//       .catch((error) => {
//         // Handle any errors that occur during the request
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // serial number increasing
//   var sn = 1;
//   // style for paid status
//   const dynamicStyle = {
//     color: getstudentData.dueamount < 1 ? "green" : "red",
//     fontSize: getstudentData.dueamount < 1 ? "20px" : "16px",
//     fontWeight: getstudentData.dueamount < 1 ? "900" : "900",
//   };
//   const IconStyle = {
//     display: getstudentData.dueamount < 1 ? true : "none",
//     marginLeft: "10px",
//   };
//   return (
//     <div className="fee">
//       <div className="feedetails">
//         <button
//           className={`feebtn me-5 mb-2 ${displayTodayTable ? "active" : ""}`}
//           onClick={() => setDisplayTodayTable(true)}
//         >
//           {" "}
//           Today{" "}
//         </button>
//         <button
//           className={`feebtn ${!displayTodayTable ? "active" : ""}`}
//           onClick={() => setDisplayTodayTable(false)}
//         >
//           {" "}
//           Upcoming
//         </button>
//       </div>
//       <div className="d-flex justify-content-between">
//         <input
//           type="text"
//           className="input-field ps-2 "
//           placeholder="Search Here..."
//           autoComplete="off"
//           style={{
//             height: "45px",
//             width: "50%",
//             border: "none",
//             outline: "none",
//             borderTop: "none",
//             borderBottom: "1.5px solid black",
//             background: "none",
//             borderRadius: "5px",
//           }}
//         />
//         <h6 onClick={handleClick} className="pe-4">
//           {" "}
//           Filter
//         </h6>
//         <Menu
//           id="basic-menu"
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           MenuListProps={{
//             "aria-labelledby": "basic-button",
//           }}
//           style={{
//             width: "600px",
//             borderRadius: "25px",
//             marginTop: "20px",
//             cursor: "pointer",
//           }}
//         >
//           <MenuItem> Filter</MenuItem>
//           <hr />
//           <div className="d-flex">
//             <MenuItem className="pt-3 ">
//               <div>
//                 <label> From: </label>
//               </div>

//               <input
//                 type="date"
//                 className="form-control"
//                 style={{
//                   height: "45px",
//                   border: "1.5px solid black",
//                   borderRadius: "5px",
//                 }}
//                 name="fromdate"
//               />
//             </MenuItem>
//             <MenuItem className="pt-3 ">
//               <label> To: </label>
//               <br />
//               <input
//                 type="date"
//                 className="form-control"
//                 style={{
//                   height: "45px",
//                   border: "1.5px solid black",
//                   borderRadius: "5px",
//                 }}
//                 name="todate"
//               />
//             </MenuItem>
//           </div>
//           <div className="d-flex w-100 mt-3">
//             <MenuItem>
//               <select
//                 id=""
//                 placeholder="Filter Branch"
//                 style={{
//                   height: "45px",
//                   paddingLeft: "10px",
//                   paddingRight: "115px",
//                   border: "1.5px solid black",
//                   borderRadius: "5px",
//                 }}
//                 name="branch"
//               >
//                 <option value="">Branch</option>
//                 <option value="hitechcity"> Hitech city</option>
//                 <option value="ameerpet"> Ameerpet</option>
//                 <option value="dilsukhnagar"> Dilsukhnagar</option>
//                 <option value="gachibowli"> Gachibowli</option>
//               </select>
//             </MenuItem>
//             <MenuItem>
//               <select
//                 id=""
//                 placeholder="select Type"
//                 style={{
//                   height: "45px",

//                   paddingRight: "105px",
//                   border: "1.5px solid black",
//                   borderRadius: "5px",
//                 }}
//                 name="branch"
//               >
//                 <option> Select Type</option>
//                 <option value="paidamount"> Paid Amount</option>
//                 <option value="dueamount"> Due Amount</option>
//               </select>
//             </MenuItem>
//           </div>
//         </Menu>
//       </div>

//       {/* today followups */}
//       {displayTodayTable && (
//         <TableContainer component={Paper} className="pt-4" id="">
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <h3>Today</h3>
//               <TableRow>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   S.NO
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   Name
//                   <br /> Branch <br /> Counsellor
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Contact
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Email
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Course
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   Due Date
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Due Amount{" "}
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   Paid Status
//                 </TableCell>

//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   View
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.isArray(getstudentData) && getstudentData.length > 0 ? (
//                 getstudentData.map((item) => (
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" className="border border 1">
//                       {sn++}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.name}
//                       <br />
//                       {item.branch}
//                       <br />
//                       {item.enquirytakenby}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.mobilenumber}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.email}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.courses}
//                     </TableCell>
//                     <TableCell className="border border 1"></TableCell>
//                     <TableCell className="border border 1">
//                       {item.dueamount}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       <div style={{ display: "flex" }}>
//                         <span style={dynamicStyle}>
//                           {item.totalinstallments.totalinstallmentspaid}/
//                           {item.totalinstallments.totalinstallments}
//                         </span>

//                         <span style={dynamicStyle}>
//                           <CheckCircleIcon style={IconStyle} />
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       <Link to={`/feeview/${item.id}`}>view</Link>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3}>No data available</TableCell>
//                 </TableRow>
//               )}
//               {/* <TableRow

//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" className="border border 1">

//               </TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//               <TableCell className="border border 1"></TableCell>
//             </TableRow> */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* upcoming followups */}
//       {!displayTodayTable && (
//         <TableContainer component={Paper} className="pt-4" id="">
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead>
//               <h3>Upcoming</h3>
//               <TableRow>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   S.NO
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   Name
//                   <br /> Branch <br /> Counsellor
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Contact
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Email
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Course
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   Due Date
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   Due Amount{" "}
//                 </TableCell>
//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
//                   {" "}
//                   Paid Status
//                 </TableCell>

//                 <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
//                   {" "}
//                   View
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {Array.isArray(getstudentData) && getstudentData.length > 0 ? (
//                 getstudentData.map((item) => (
//                   <TableRow
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" className="border border 1">
//                       {sn++}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.name}
//                       <br />
//                       {item.branch}
//                       <br />
//                       {item.enquirytakenby}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.mobilenumber}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.email}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       {item.courses}
//                     </TableCell>
//                     <TableCell className="border border 1"></TableCell>
//                     <TableCell className="border border 1">
//                       {item.dueamount}
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       <div style={{ display: "flex" }}>
//                         <span style={dynamicStyle}>
//                           {item.totalinstallments.totalinstallmentspaid}/
//                           {item.totalinstallments.totalinstallments}
//                         </span>

//                         <span style={dynamicStyle}>
//                           <CheckCircleIcon style={IconStyle} />
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="border border 1">
//                       <Link to={`/feeview/${item.id}`}>view</Link>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3}>No data available</TableCell>
//                 </TableRow>
//               )}
//               {/* <TableRow

//         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//       >
//         <TableCell component="th" className="border border 1">

//         </TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//         <TableCell className="border border 1"></TableCell>
//       </TableRow> */}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// };
// export default Feefollowup;
