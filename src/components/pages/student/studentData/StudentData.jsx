import * as React from "react";

import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import PrintIcon from "@mui/icons-material/Print";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import ShowChartIcon from "@mui/icons-material/ShowChart";


import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import "./StudentData.css";

import { useState } from "react";

import { useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";

import VisibilityIcon from "@mui/icons-material/Visibility";

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import DownloadIcon from '@mui/icons-material/Download';

import RefreshIcon from '@mui/icons-material/Refresh';

// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { CSVLink } from "react-csv";


import { initialDataa } from "./data";

import { Link } from "react-router-dom";

import { LastPage } from "@mui/icons-material";

import axios from "axios";
// import { CSVLink } from "react-csv";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,

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

const StudentData = () => {
  const [initialData, setData] = useState([{ name: "" }]);
  // const initialData = initialDataa;
  let initialDataCount = initialData.length;

  const [filteredData, setFilteredData] = useState(initialData);

  let recordCount = filteredData.length;

  const [filterCriteria, setFilterCriteria] = useState({
    fromdate: "",

    todate: "",

    branch: "",

    leadsource: "",

    modeoftraining: "",

    enquirytakenby: "",

    search: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });
  };

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("http://localhost:3030/getstudent_data")
      .then((response) => {
        // Handle the successful response here
        setData(response.data); // Update the data state with the fetched data

        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    const filteredResults = initialData.filter((item) => {
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

    setFilteredData(filteredResults);
  }, [filterCriteria, initialData]);

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const lastIndex = currentPage * recordsPerPage;

  const firstIndex = lastIndex - recordsPerPage;

  const records = filteredData.slice(firstIndex, lastIndex);

  const npage = Math.ceil(initialData.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // for date

  return ( 
    <>
      <h3 className="ms-5"> Student Data </h3>

      <div className="studetdetails ">
        <div className="row mb-3 px-4 pt-3">
          <div className="col-8 col-md-8  input-field">
           
              <input
                type="text"
                className="input-field"
                placeholder="Search Here..."
                autoComplete="off"
                style={{
                  height: "45px",
                  border: "hidden",
                  borderRadius: "5px",
                  background:"none"
                }}
                name="search"
                value={filterCriteria.search}
                onChange={handleInputChange}
              /><hr/>
            
           
            
          </div>
          <div className="col-1 pt-2"> <RefreshIcon/> </div>
          <div className="col-1 pt-2">
            <h6>
              {" "}
              {recordCount}/{initialDataCount}
            </h6>
          </div>
          {/* <div className="col-1 ">
            <h6> Export</h6>{" "}
            <CSVLink
              data={filteredData}
              filename={"studentsdata.csv"}
              className="btn btn-primary"
              target="_blank"
            >
              export
            </CSVLink>
          </div> */}

          <div className="col-1 pt-2">
            {" "}
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
                    <option value="hitechcity"> Hitech city</option>
                    <option value="ameerpet"> Ameerpet</option>
                    <option value="dilsukhnagar"> Dilsukhnagar</option>
                    <option value="gachibowli"> Gachibowli</option>
                  </select>
                </MenuItem>
                <MenuItem>
                  <select
                    id=""
                    placeholder="Lead Source"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "115px",

                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="leadsource"
                    value={filterCriteria.leadsource}
                    onChange={handleInputChange}
                  >
                    <option value="">LeadSource</option>
                    <option value="walkin"> Walkin</option>
                    <option value="justdail"> JustDail</option>
                    <option value="referral"> Referral</option>
                  </select>
                </MenuItem>{" "}
              </div>
              <div className="d-flex w-100 mt-3 mb-2">
                <MenuItem>
                  <select
                    id=""
                    placeholder="Mode of Traning"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "102px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    //
                    name="modeoftraining"
                    value={filterCriteria.modeoftraining}
                    onChange={handleInputChange}
                  >
                    <option value="">Mode Of Training</option>
                    <option value="online"> Online</option>
                    <option value="offline"> Offline</option>
                  </select>
                </MenuItem>
                <MenuItem>
                  <select
                    id=""
                    placeholder="Counsellors"
                    required
                    style={{
                      height: "45px",
                      paddingRight: "110px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    name="enquirytakenby"
                    value={filterCriteria.enquirytakenby}
                    onChange={handleInputChange}
                  >
                    <option value="">Counsellors</option>
                    <option value="kavya"> kavya</option>
                    <option value="mark"> Mark</option>
                    <option value="david"> David</option>
                    <option value="kavya"> kavya</option>
                  </select>
                </MenuItem>{" "}
              </div>
            </Menu>
          </div>
          <div className="col-1 pt-2 ">
          <CSVLink
            data={filteredData}
            filename={"studentsdata.csv"}
        
            target="_blank"
          >
           <DownloadIcon className="text-dark" ></DownloadIcon>
          </CSVLink>{" "}
          </div>
          </div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell className="bg-primary fs-6 border border 1 text-center ">
                  SNo
                </StyledTableCell>
                  {/* 
                <StyledTableCell
                  className="bg-secondary fs-6  border border 1 text-center"
                  align="left"
                >
                  Photo
                </StyledTableCell> */}

                <StyledTableCell
                  className="  bg-primary fs-6 border border 1 text-centerborder border 1 text-center"
                  align="left"
                >
                  Student Name <br /> Registration No
                </StyledTableCell>

                <StyledTableCell
                  className="bg-primary fs-6 border border 1 text-center"
                  align="left"
                >
                  Branch <br /> Course
                </StyledTableCell>

                <StyledTableCell
                  className="bg-primary fs-6 border border 1 text-center"
                  align="left"
                >
                  Counseller
                  <br /> Source
                </StyledTableCell>

                <StyledTableCell
                  className="bg-primary fs-6 border border 1 text-center "
                  align="left"
                >
                  Contact Number <br />
                  Email
                </StyledTableCell>

                <StyledTableCell
                  className="bg-primary fs-6 border border 1 text-center "
                  align="left"
                >
                  Joining Date <br />
                  Traning Mode
                </StyledTableCell>

                <StyledTableCell
                  className="bg-primary fs-6 border border 1 text-center"
                  align="left"
                >
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((item) => (
                // <li key={item.id}>{item.name}</li>

                <StyledTableRow key={item.id}>
                  <StyledTableCell className=" border border 2 text-center">
                    {item.id}
                  </StyledTableCell>
{/* 
                  <StyledTableCell className=" border border 2 text-center">
                    {item.profilepic}
                  </StyledTableCell> */}

                  <StyledTableCell className=" border border 1 text-center">
                    {item.name}
                    <br />

                    {item.registrationnumber}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {item.branch}
                    <br />
                    {item.courses}
                  </StyledTableCell>

                  <StyledTableCell className=" border border 1 text-center">
                    {item.enquirytakenby}
                    <br />

                    {item.leadsource}
                  </StyledTableCell>

                  <StyledTableCell className=" border border 1 text-center  ">
                    {item.mobilenumber}
                    <br />

                    <p style={{
                       width:"200px",
                       whiteSpace:"nowrap",
                       overflow:"hidden",
                       textOverflow:"ellipsis"
                  }}>{item.email}</p>
                  </StyledTableCell>

                  <StyledTableCell className=" border border 1 text-center">
                    {item.admissiondate
                      ? item.admissiondate.substring(0, 10)
                      : "No Date"}{" "}
                    <br />
                    {item.modeoftraining}
                  </StyledTableCell>

                  <StyledTableCell className=" border border 1 text-center d-flex pb-3  ">
                    <Link
                      to={`/studentdataview/${item.id}`}
                      style={{ width: "40px", marginBottom:"10px" }}
                    >
                      <VisibilityIcon className="iconn" />
                    </Link>

                    <Link
                      to={`/registrationform/${item.id}`}
                      style={{ width: "40px" }}
                    >
                      <EditIcon className="iconn" />
                    </Link>
                    <Link to={`//${item.id}`} style={{ width: "40px" }}>
                      <CurrencyRupeeIcon className="iconn" />
                    </Link>
                    <Link to={`//${item.id}`} style={{ width: "40px" }}>
                      <PrintIcon className="iconn" />
                    </Link>
                    <Link to={`//${item.id}`} style={{ width: "40px" }}>
                      <DeleteOutlineIcon
                        style={{ color: "red" }}
                        className="iconn"
                      />
                    </Link>
                    
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="prev" onClick={prevPage}>
                  {" "}
                  Prev{" "}
                </a>
              </li>

              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage == n ? "active" : ""}`}
                  key={i}
                >
                  <a href="#" className="mx-2 num " onClick={changePage(n)}>
                    {n}{" "}
                  </a>
                </li>
              ))}

              <li className="page-item">
                <a href="#" className="next" onClick={nextPage}>
                  {" "}
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );

  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {}

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default StudentData;

// import * as React from "react";

// import { styled } from "@mui/material/styles";

// import Table from "@mui/material/Table";

// import TableBody from "@mui/material/TableBody";

// import TableCell, { tableCellClasses } from "@mui/material/TableCell";

// import TableContainer from "@mui/material/TableContainer";

// import TableHead from "@mui/material/TableHead";

// import TableRow from "@mui/material/TableRow";

// import Paper from "@mui/material/Paper";

// import RotateLeftIcon from "@mui/icons-material/RotateLeft";

// import ShowChartIcon from "@mui/icons-material/ShowChart";

// import DownloadIcon from "@mui/icons-material/Download";

// import "./StudentData.css";

// import { useState } from "react";

// import { useEffect } from "react";
// import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import './StudentData.css';
// import SearchIcon from '@mui/icons-material/Search';

// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { initialDataa } from "./data";

// import { Link } from "react-router-dom";

// import { LastPage } from "@mui/icons-material";

// import axios from 'axios';

// import { Pagination } from "@mui/material";
// // import ReactPaginate from 'react-paginate';
// const StyledTableCell = styled(TableCell)(({ theme }) => ({

//   [`&.${tableCellClasses.head}`]: {

//     backgroundColor: theme.palette.common.black,

//     color: theme.palette.common.white,

//   },

//   [`&.${tableCellClasses.body}`]: {

//     fontSize: 14,

//   },

// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({

//   "&:nth-of-type(odd)": {

//     backgroundColor: theme.palette.action.hover,

//   },

//   "&:last-child td, &:last-child th": {

//     border: 0,

//   },

// }));

// const initialData = initialDataa;

// let initialDataCount = initialData.length;

// const StudentData = () => {

//   const [filteredData, setFilteredData] = useState(initialData);
//   let recordCount = filteredData.length;
//   const [filterCriteria, setFilterCriteria] = useState({

//     date: "",

//     branch: "",

//     source: "",

//     mode: "",

//     counsellar: "",

//     search: "",

//   });

//   const handleInputChange = (e) => {

//     const { name, value } = e.target;

//     setFilterCriteria({ ...filterCriteria, [name]: value });

//   };

//   useEffect(() => {
//     const filteredResults = initialData.filter((item) => {

//       const dateCondition = filterCriteria.date

//         ? item.joiningdata === filterCriteria.date

//         : true;

//       const branchCondition = filterCriteria.branch

//         ? item.branch === filterCriteria.branch

//         : true;

//       const sourceCondition = filterCriteria.source

//         ? item.source === filterCriteria.source

//         : true;

//       const modeCondition = filterCriteria.mode

//         ? item.trainingmode === filterCriteria.mode

//         : true;

//       const counsellarCondition = filterCriteria.counsellar

//         ? item.counsellar === filterCriteria.counsellar

//         : true;

//       return (

//         dateCondition &&

//         branchCondition &&

//         sourceCondition &&

//         modeCondition &&

//         counsellarCondition

//       );

//     });

//     setFilteredData(filteredResults);

//   }, [filterCriteria, initialData]);

//   const [currentPage, setCurrentPage] = useState(1);

//   const recordsPerPage = 10;

//   const lastIndex = currentPage * recordsPerPage;

//   const firstIndex = lastIndex - recordsPerPage;

//   const records = filteredData.slice(firstIndex, lastIndex);

//   const npage = Math.ceil(initialData.length / recordsPerPage);

//   const numbers = [...Array(npage + 1).keys()].slice(1);

// //  for fillter dropdown
// const [anchorEl, setAnchorEl] = React.useState(null);
// const open = Boolean(anchorEl);
// const handleClick = (event) => {
//   setAnchorEl(event.currentTarget);
// };
// const handleClose = () => {
//   setAnchorEl(null);
// };

//   return (
//     <>
//     <h3 className="ms-5"> Student Data</h3>
//     <div className="  studetdetails ">
//       <div className="row mb-3 px-4 pt-3">
//         <div className="col-9 col-md-9 ">
//           <p className="search"><SearchIcon/> Search Here.....</p> <hr className="w-50"/>
//           {/* <input
//             type="text"

//             placeholder="Search Here......"

//             style={{

//               height: "55px",

//               width: "100%",

//               padding: "10px",

//               border: "1.5px solid black",

//               borderRadius: "5px",

//             }}

//           />

//         </div>

//         <div className="col-3 col-md-3 text-end pt-lg-3">

//           {recordCount}/{initialDataCount}

//         </div>

//       </div>

//       <div className="row mb-3 ">

//             value={searchTerm}
//             value={search}
//             onChange={handleSearchChange}
//             onChange={(e) => {
//               handleFilter();
//               setSearch(e.target.value);
//             }}
//           /> */}
//         </div>
//         <div className="col-1">
//           <h6> {recordCount}/{initialDataCount}</h6>
//         </div>
//         <div className="col-1 "><h6> Export</h6> </div>
//         <div className="col-1 "> <h6 onClick={handleClick} > Filter</h6>

//          {/* <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//        <h6> Fillter</h6>
//       </Button> */}
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//         style={{width:"600px",
//                 borderRadius:"25px",
//                 marginTop:"20px",
//                 }}
//       >
//           <MenuItem  > Filter</MenuItem><hr/>
//         <MenuItem className="pt-3" >
//        <label> Enter Date : </label><br/>
//         <input
//           type="date"
//           className="form-control"

//           style={{
//             height: "45px",
//             border: "1.5px solid black",
//             borderRadius: "5px",
//           }}
//           // onChange={(e) => handleDateFilter(e.target.value)}
//           onChange={(e) => {
//             handleFilter();
//             setdate(e.target.value);
//           }}
//         />

//         </MenuItem>
//   <div className="d-flex w-100 mt-3">
//   <MenuItem  >

//         <select

//           id=""
//           placeholder="Filter Branch"
//           required
//           style={{
//             height: "45px",
//             paddingLeft:"10px",
//             paddingRight:"50px",
//             border: "1.5px solid black",
//             borderRadius: "5px",
//           }}
//           // onChange={(e) => handleBranchFilter(e.target.value)}
//           onChange={(e) => {
//             setbranch(e.target.value);
//           }}
//         >
//           <option value="">Branch</option>
//           <option value="hitechcity"> Hitech city</option>
//           <option value="ameerpet"> Ameerpet</option>
//           <option value="dilsukhnagar"> Dilsukhnagar</option>
//           <option value="gachibowli"> Gachibowli</option>
//         </select></MenuItem>
//         <MenuItem > <select

//           id=""
//           placeholder="Lead Source"
//           required
//           style={{
//             height: "45px",
//             paddingRight:"65px",

//             border: "1.5px solid black",
//             borderRadius: "5px",
//           }}
//           // onChange={(e) => handleLeadFilter(e.target.value)}
//           onChange={(e) => {
//             setsource(e.target.value);
//           }}
//         >
//           <option value="">LeadSource</option>
//           <option value="walkin"> Walkin</option>
//           <option value="justdail"> JustDail</option>
//           <option value="referral"> Referral</option>
//         </select></MenuItem> </div>
//         <div className="d-flex w-100 mt-3 mb-2">
//   <MenuItem  >
//   <select

//           id=""
//           placeholder="Mode of Traning"
//           required
//           style={{
//             height: "45px",
//             paddingRight:"37px",
//             border: "1.5px solid black",
//             borderRadius: "5px"
//           }}
//           // onChange={(e) => handleModeOfTrainingFilter(e.target.value)}
//           onChange={(e) => {
//             setmode(e.target.value);
//           }}
//         >
//           <option value="">Mode Of Training</option>
//           <option value="online"> Online</option>
//           <option value="offline"> Offline</option>
//         </select>
//         </MenuItem>
//         <MenuItem > <select

//           id=""
//           placeholder="Councellors"
//           required
//           style={{
//             height: "45px",
//             paddingRight:"65px",
//             border: "1.5px solid black",
//             borderRadius: "5px",
//           }}
//           // onChange={(e) => handleLeadFilter(e.target.value)}
//           onChange={(e) => {
//             setsource(e.target.value);
//           }}
//         >
//           <option value="">Councellors</option>
//           <option value="walkin"> </option>

//         </select></MenuItem> </div>

//       </Menu></div>

//       </div>
//       {/* <div className="row mb-3 ">
//         <input

//           type="date"

//           className="col-12 col-md-5 col-lg-3 me-2 felids"

//           placeholder="Enter Date"

//           style={{

//             height: "45px",

//             padding: "15px",

//             border: "1.5px solid black",

//             borderRadius: "5px",

//           }}

//           name="date"

//           value={filterCriteria.date}

//           onChange={handleInputChange}

//         />

//         <select

//           className="col-12 col-md-5 col-lg-2 me-2 felids"

//           id=""

//           placeholder="Filter Branch"

//           required

//           style={{

//             height: "45px",

//             border: "1.5px solid black",

//             borderRadius: "5px",

//           }}

//           name="branch"

//           value={filterCriteria.branch}

//           onChange={handleInputChange}

//         >

//           <option value="">Branch</option>

//           <option value="hitechcity"> Hitech city</option>

//           <option value="ameerpet"> Ameerpet</option>

//           <option value="dilsukhnagar"> Dilsukhnagar</option>

//           <option value="gachibowli"> Gachibowli</option>

//         </select>

//         <select

//           className="col-12 col-md-5 col-lg-2 me-2 felids"

//           id=""

//           placeholder="Lead Source"

//           required

//           style={{

//             height: "45px",

//             border: "1.5px solid black",

//             borderRadius: "5px",

//           }}

//           name="source"

//           value={filterCriteria.source}

//           onChange={handleInputChange}

//         >

//           <option value="">LeadSource</option>

//           <option value="walkin"> Walkin</option>

//           <option value="justdail"> JustDail</option>

//           <option value="referral"> Referral</option>

//         </select>

//         <select

//           className="col-12 col-md-5 col-lg-2 me-2 felids"

//           id=""

//           placeholder="Mode of Traning"

//           required

//           style={{

//             height: "45px",

//             border: "1.5px solid black",

//             borderRadius: "5px",

//           }}

//           name="mode"

//           value={filterCriteria.mode}

//           onChange={handleInputChange}

//         >

//           <option value="">Mode Of Training</option>

//           <option value="online"> Online</option>

//           <option value="offline"> Offline</option>

//         </select>

//         <select

//           className="col-12 col-md-5 col-lg-2 me-2 felids"

//           id=""

//           placeholder="Counsellar"

//           required

//           style={{

//             height: "45px",

//             border: "1.5px solid black",

//             borderRadius: "5px",

//           }}

//           name="counsellar"

//           value={filterCriteria.counsellar}

//           onChange={handleInputChange}

//         >

//           <option value="">Counsellar</option>

//           <option value="kavya"> kavya</option>

//           <option value="keerthana"> keerthana</option>

//           <option value="david"> David</option>

//         </select>

//         <RotateLeftIcon

//           sx={{ fontSize: 48 }}

//           className="col-sm-12 col-md-4 col-lg-2  me-lg-3 "

//         />

//         <ShowChartIcon

//           sx={{ fontSize: 48 }}

//           className="col-sm-12 col-md-4 col-lg-2 me-lg-4 "

//         />

//         <DownloadIcon

//           sx={{ fontSize: 48 }}

//           className="col-sm-12 col-md-4 col-lg-2   "

//         />

//       </div>

//       <TableContainer component={Paper}>

//         <Table sx={{ minWidth: 1000 }} aria-label="customized table">

//       </div> */}

//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 1000 }} aria-label="customized table ">
//           <TableHead>

//             <TableRow>
//               <StyledTableCell className=" bg-primary fs-9 border border 1 text-center ">
//                 SNo

//               </StyledTableCell>
//               <StyledTableCell className=" bg-primary fs-9 border border 1 text-center" align="left">
//                 Photo

//               </StyledTableCell>
//               <StyledTableCell className="  bg-primary fs-9 border border 1 text-centerborder border 1 text-center" align="left">
//                 Registration No
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-10 border border 1 text-center" align="left">
//                 Student Name & Student ID
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-10 border border 1 text-center " align="left">
//                 Contact Number & Email
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-10 border border 1 text-center" align="left">
//                 Course Counseller Source

//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-10 border border 1 text-center " align="left">
//                 Joining Date & Traning Mode

//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-10 border border 1 text-center" align="left">
//                 Action

//               </StyledTableCell>

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {records.map((item) => (

//               // <li key={item.id}>{item.name}</li>

//               <StyledTableRow key={item.id}>

//                 <StyledTableCell align="left">{item.id}</StyledTableCell>

//                 <StyledTableCell align="left">{item.profilepic}</StyledTableCell>

//                 <StyledTableCell className=" border border 1 text-center">

//                   {item.name}

//                   <hr />

//                   {item.registrationnumber}

//                 </StyledTableCell>

//                 <StyledTableCell align="left">{item.branch}</StyledTableCell>

//                 <StyledTableCell className=" border border 1 text-center">

//                   {item.courses} <hr />

//                   {item.counsellar} <hr />

//                   {item.source}

//                 </StyledTableCell>

//                 <StyledTableCell className=" border border 1 text-center">

//                   {item.mobilenumber} <hr />

//                   {item.email}

//                 </StyledTableCell>

//                 <StyledTableCell className=" border border 1 text-center">

//                   {item.joiningdata} <hr />

//                   {item.modeoftraining}

//                 </StyledTableCell>

//                 <StyledTableCell className=" border border 1 text-center d-flex ">

//                   <Link to={`/studentdataview/${item.id}`}>

//                     <EditIcon />

//                   </Link>

//                   <Link to={`/registrationform/${item.id}`}>

//                     <VisibilityIcon />

//                   </Link>

//                 </StyledTableCell>

//               </StyledTableRow>

//             ))}

//           </TableBody>

//         </Table>

//       </TableContainer>

//       <div>

//         <nav>

//           <ul className="pagination">

//             <li className="page-item">

//               <a

//                 href="#"

//                 className="bg-primary text-light px-3 py-2"

//                 onClick={prevPage}

//               >

//                 {" "}

//                 Prev{" "}

//               </a>

//             </li>

//             {numbers.map((n, i) => (

//               <li

//                 className={`page-item ${currentPage == n ? "active" : ""}`}

//                 key={i}

//               >

//                 <a href="#" className="mx-1 " onClick={changePage(n)}>

//                   {n}{" "}

//                 </a>

//               </li>

//             ))}

//             <li className="page-item">

//               <a

//                 href="#"

//                 className="bg-primary text-light px-3 py-2"

//                 onClick={nextPage}

//               >

//                 {" "}

//                 Next

//               </a>

//             </li>

//           </ul>

//         </nav>

//       </div>

//     </div>

//   );
