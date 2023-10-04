
import * as React from "react";

import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import ShowChartIcon from "@mui/icons-material/ShowChart";

import DownloadIcon from "@mui/icons-material/Download";

import "./StudentData.css";

import { useState } from "react";

import { useEffect } from "react";

import EditIcon from "@mui/icons-material/Edit";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { initialDataa } from "./data";

import { Link } from "react-router-dom";

import { LastPage } from "@mui/icons-material";

import axios from 'axios';

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

 

const initialData = initialDataa;

 

let initialDataCount = initialData.length;

 

const StudentData = () => {

  const [initialData, setData] = useState([{name: ''}]);

  const [filteredData, setFilteredData] = useState(initialData);
  let recordCount = filteredData.length;
  const [filterCriteria, setFilterCriteria] = useState({

    date: "",

    branch: "",

    source: "",

    mode: "",

    counsellar: "",

    search: "",

  });

 

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFilterCriteria({ ...filterCriteria, [name]: value });

  };

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios.get('http://localhost:3030/getstudent_data')
      .then((response) => {
        // Handle the successful response here
        setData(response.data); // Update the data state with the fetched data
        console.log(response.data);

      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error fetching data:', error);
        
      });
  }, []);


  useEffect(() => {
    const filteredResults = initialData.filter((item) => {

      const dateCondition = filterCriteria.date

        ? item.joiningdata === filterCriteria.date

        : true;

      const branchCondition = filterCriteria.branch

        ? item.branch === filterCriteria.branch

        : true;

      const sourceCondition = filterCriteria.source

        ? item.source === filterCriteria.source

        : true;

      const modeCondition = filterCriteria.mode

        ? item.trainingmode === filterCriteria.mode

        : true;

      const counsellarCondition = filterCriteria.counsellar

        ? item.counsellar === filterCriteria.counsellar

        : true;

      return (

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

 

  return (

    <div className="studetdetails container">

      <div className="row mb-3">

        <div className="col-9 col-md-9 ">

          <input

            type="text"

            placeholder="Search Here......"

            style={{

              height: "55px",

              width: "100%",

              padding: "10px",

              border: "1.5px solid black",

              borderRadius: "5px",

            }}

          />

        </div>

        <div className="col-3 col-md-3 text-end pt-lg-3">

          {recordCount}/{initialDataCount}

        </div>

      </div>

      <div className="row mb-3 ">

        <input

          type="date"

          className="col-12 col-md-5 col-lg-3 me-2 felids"

          placeholder="Enter Date"

          style={{

            height: "45px",

 

            padding: "15px",

            border: "1.5px solid black",

            borderRadius: "5px",

          }}

          name="date"

          value={filterCriteria.date}

          onChange={handleInputChange}

        />

        <select

          className="col-12 col-md-5 col-lg-2 me-2 felids"

          id=""

          placeholder="Filter Branch"

          required

          style={{

            height: "45px",

 

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

        <select

          className="col-12 col-md-5 col-lg-2 me-2 felids"

          id=""

          placeholder="Lead Source"

          required

          style={{

            height: "45px",

 

            border: "1.5px solid black",

            borderRadius: "5px",

          }}

          name="source"

          value={filterCriteria.source}

          onChange={handleInputChange}

        >

          <option value="">LeadSource</option>

          <option value="walkin"> Walkin</option>

          <option value="justdail"> JustDail</option>

          <option value="referral"> Referral</option>

        </select>

        <select

          className="col-12 col-md-5 col-lg-2 me-2 felids"

          id=""

          placeholder="Mode of Traning"

          required

          style={{

            height: "45px",

 

            border: "1.5px solid black",

            borderRadius: "5px",

          }}

          name="mode"

          value={filterCriteria.mode}

          onChange={handleInputChange}

        >

          <option value="">Mode Of Training</option>

          <option value="online"> Online</option>

          <option value="offline"> Offline</option>

        </select>

        <select

          className="col-12 col-md-5 col-lg-2 me-2 felids"

          id=""

          placeholder="Counsellar"

          required

          style={{

            height: "45px",

 

            border: "1.5px solid black",

            borderRadius: "5px",

          }}

          name="counsellar"

          value={filterCriteria.counsellar}

          onChange={handleInputChange}

        >

          <option value="">Counsellar</option>

          <option value="kavya"> kavya</option>

          <option value="keerthana"> keerthana</option>

          <option value="david"> David</option>

        </select>

        <RotateLeftIcon

          sx={{ fontSize: 48 }}

          className="col-sm-12 col-md-4 col-lg-2  me-lg-3 "

        />

        <ShowChartIcon

          sx={{ fontSize: 48 }}

          className="col-sm-12 col-md-4 col-lg-2 me-lg-4 "

        />

        <DownloadIcon

          sx={{ fontSize: 48 }}

          className="col-sm-12 col-md-4 col-lg-2   "

        />

      </div>

 

      <TableContainer component={Paper}>

        <Table sx={{ minWidth: 1000 }} aria-label="customized table">

          <TableHead>

            <TableRow>

              <StyledTableCell className=" bg-primary fs-6 border border 1 text-center ">

                SNo

              </StyledTableCell>

              <StyledTableCell

                className=" bg-primary fs-6 border border 1 text-center"

                align="left"

              >

                Photo

              </StyledTableCell>

              <StyledTableCell

                className="  bg-primary fs-6 border border 1 text-centerborder border 1 text-center"

                align="left"

              >

                Student Name & Registration No

              </StyledTableCell>

              <StyledTableCell

                className="bg-primary fs-6 border border 1 text-center"

                align="left"

              >

                Branch

              </StyledTableCell>

 

              <StyledTableCell

                className="bg-primary fs-6 border border 1 text-center"

                align="left"

              >

                Course Counseller Source

              </StyledTableCell>

              <StyledTableCell

                className="bg-primary fs-6 border border 1 text-center "

                align="left"

              >

                Contact Number & Email

              </StyledTableCell>

 

              <StyledTableCell

                className="bg-primary fs-6 border border 1 text-center "

                align="left"

              >

                Joining Date & Traning Mode

              </StyledTableCell>

              <StyledTableCell

                className="bg-primary fs-6 border border 1 text-center"

                align="left"

              >

                Action

              </StyledTableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {records.map((item) => (

              // <li key={item.id}>{item.name}</li>

              <StyledTableRow key={item.id}>

                <StyledTableCell align="left">{item.id}</StyledTableCell>

                <StyledTableCell align="left">{item.profilepic}</StyledTableCell>

                <StyledTableCell className=" border border 1 text-center">

                  {item.name}

                  <hr />

                  {item.registrationnumber}

                </StyledTableCell>

                <StyledTableCell align="left">{item.branch}</StyledTableCell>

                <StyledTableCell className=" border border 1 text-center">

                  {item.courses} <hr />

                  {item.counsellar} <hr />

                  {item.source}

                </StyledTableCell>

                <StyledTableCell className=" border border 1 text-center">

                  {item.mobilenumber} <hr />

                  {item.email}

                </StyledTableCell>

 

                <StyledTableCell className=" border border 1 text-center">

                  {item.joiningdata} <hr />

                  {item.modeoftraining}

                </StyledTableCell>

                <StyledTableCell className=" border border 1 text-center d-flex ">

                  <Link to={`/studentdataview/${item.id}`}>

                    <EditIcon />

                  </Link>

                  <Link to={`/registrationform/${item.id}`}>

                    <VisibilityIcon />

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

              <a

                href="#"

                className="bg-primary text-light px-3 py-2"

                onClick={prevPage}

              >

                {" "}

                Prev{" "}

              </a>

            </li>

            {numbers.map((n, i) => (

              <li

                className={`page-item ${currentPage == n ? "active" : ""}`}

                key={i}

              >

                <a href="#" className="mx-1 " onClick={changePage(n)}>

                  {n}{" "}

                </a>

              </li>

            ))}

            <li className="page-item">

              <a

                href="#"

                className="bg-primary text-light px-3 py-2"

                onClick={nextPage}

              >

                {" "}

                Next

              </a>

            </li>

          </ul>

        </nav>

      </div>

    </div>

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
// import { initialDataa } from "./data";
// import axios from "axios";
// import { LastPage } from "@mui/icons-material";
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
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// // function createData(name, calories, fat, carbs, protein) {

// // // for  Static table data


// const StudentData = () => {

//   const [initialData, setInitialData] = useState()
//   // Add more data objects as needed  
//   let initialDataCount = initialData.length;
    
  
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Make a GET request to fetch the list of students
//     axios.get('http://localhost:3030/getstudent_data')
//       .then((response) => {
//         setInitialData(response.data)
//         // setRows(response.data); // Assuming the response is an array of student objects
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching student list:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   // const [filteredData, setFilteredData] = useState(initialData);
//   // let recordCount = filteredData.length;
//   // //
//   // let [date, setdate] = useState("");
//   // let [branch, setbranch] = useState("");

//   // let [source, setsource] = useState("");

//   // let [mode, setmode] = useState("");
//   // let [search, setSearch] = useState("");
//   // const handleFilter = () => {
//   //   const filteredResult = initialData.filter((item) => {
//   //     if (
//   //       item.joiningdata.includes(date) &&
//   //       item.branch.includes(branch) &&
//   //       item.source.includes(source) &&
//   //       item.trainingmode.includes(mode)
//   //     )
//   //       return (
//   //         item.joiningdata.includes(date) &&
//   //         item.branch.includes(branch) &&
//   //         item.source.includes(source) &&
//   //         item.trainingmode.includes(mode)
//   //       );
//   //   });
//   //   setFilteredData(filteredResult);
//   // };
//   // useEffect(() => {
//   //   handleFilter();
//   // }, [date, source, mode, branch]);

//   // const [searchTerm, setSearchTerm] = useState("");

//   const handleSearchChange = (e) => {
//     const newSearchTerm = e.target.value;
//     // setSearchTerm(newSearchTerm);
//     // const filteredResults = initialData.filter((item) => {
//     //   if (item.name.toLowerCase().includes(newSearchTerm.toLowerCase())) {
//     //     return item.name.toLowerCase().includes(newSearchTerm.toLowerCase());
//     //   }
//     //   if (item.branch.toLowerCase().includes(newSearchTerm.toLowerCase())) {
//     //     return item.branch.toLowerCase().includes(newSearchTerm.toLowerCase());
//     //   }
//     //   if (item.counsellar.toLowerCase().includes(newSearchTerm.toLowerCase())) {
//     //     return item.counsellar
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase());
//     //   }

//     //   if (item.course.toLowerCase().includes(newSearchTerm.toLowerCase())) {
//     //     return item.course.toLowerCase().includes(newSearchTerm.toLowerCase());
//     //   }
//     //   if (
//     //     item.registrationnumber
//     //       .toString()
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase())
//     //   ) {
//     //     return item.registrationnumber
//     //       .toString()
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase());
//     //   }
//     //   if (
//     //     item.studentid
//     //       .toString()
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase())
//     //   ) {
//     //     return item.studentid
//     //       .toString()
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase());
//     //   }
//     //   if (
//     //     item.trainingmode.toLowerCase().includes(newSearchTerm.toLowerCase())
//     //   ) {
//     //     return item.trainingmode
//     //       .toLowerCase()
//     //       .includes(newSearchTerm.toLowerCase());
//     //   }
//     // });

//     // setFilteredData(filteredResults);
//   };
//   const [currentPage , setCurrentPage] = useState(1)
//   const recordsPerPage = 10;
//   const lastIndex = currentPage * recordsPerPage;
//   const firstIndex = lastIndex - recordsPerPage; 
//   const records = initialData.slice(firstIndex , lastIndex);
//   const npage = Math.ceil(initialData.length/recordsPerPage)
//  const numbers = [...Array(npage +1).keys()].slice(1)


//   return (
//     <div className="studetdetails container">
//       <div className="row mb-3">
//         <div className="col-9 col-md-9 ">
//           <input
//             type="text"
//             placeholder="Search Here......"
//             style={{
//               height: "55px",
//               width: "100%",
//               padding: "10px",
//               border: "1.5px solid black",
//               borderRadius: "5px",
//             }}
//             value={searchTerm}
//             // value={search}
//             onChange={handleSearchChange}
//             // onChange={(e) => {
//             //   handleFilter();
//             //   setSearch(e.target.value);
//             // }}
//           />
//         </div>
//         <div className="col-3 col-md-3 text-end pt-lg-3">
//           {recordCount}/{initialDataCount}
//         </div>
//       </div>
//       <div className="row mb-3 ">
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
//           // onChange={(e) => handleDateFilter(e.target.value)}
//           onChange={(e) => {
//             handleFilter();
//             setdate(e.target.value);
//           }}
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
//           // onChange={(e) => handleLeadFilter(e.target.value)}
//           onChange={(e) => {
//             setsource(e.target.value);
//           }}
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
//           // onChange={(e) => handleModeOfTrainingFilter(e.target.value)}
//           onChange={(e) => {
//             setmode(e.target.value);
//           }}
//         >
//           <option value="">Mode Of Training</option>
//           <option value="online"> Online</option>
//           <option value="offline"> Offline</option>
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
//           <TableHead>
//             <TableRow>
//               <StyledTableCell className=" bg-primary fs-6 border border 1 text-center ">
//                 SNo
//               </StyledTableCell>
//               <StyledTableCell className=" bg-primary fs-6 border border 1 text-center" align="left">
//                 Photo
//               </StyledTableCell>
//               <StyledTableCell className="  bg-primary fs-6 border border 1 text-centerborder border 1 text-center" align="left">
//                 Registration No
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
//                 Student Name & Student ID
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-6 border border 1 text-center " align="left">
//                 Contact Number & Email
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
//                 Course Counseller Source
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-6 border border 1 text-center " align="left">
//                 Joining Date & Traning Mode
//               </StyledTableCell>
//               <StyledTableCell className="bg-primary fs-6 border border 1 text-center" align="left">
//                 Action
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* <StyledTableRow>
//               <StyledTableCell align="center">1</StyledTableCell>
//               <StyledTableCell align="center">Photo</StyledTableCell>
//               <StyledTableCell align="center"> 23745859757</StyledTableCell>
//               <StyledTableCell align="center">Bhavitha</StyledTableCell>
//               <StyledTableCell align="center">12345</StyledTableCell>
//               <StyledTableCell align="center">Full Stack</StyledTableCell>
//               <StyledTableCell align="center">23-09-01</StyledTableCell>
//               <StyledTableCell align="center"></StyledTableCell>
//             </StyledTableRow> */}
           
          
           
            
//             {/* <StyledTableRow>
//               <StyledTableCell align="center">1</StyledTableCell>
//               <StyledTableCell align="center">Photo</StyledTableCell>
//               <StyledTableCell align="center"> 23745859757</StyledTableCell>
//               <StyledTableCell align="center">Bhavitha</StyledTableCell>
//               <StyledTableCell align="center">12345</StyledTableCell>
//               <StyledTableCell align="center">Full Stack</StyledTableCell>
//               <StyledTableCell align="center">23-09-01</StyledTableCell>
//               <StyledTableCell align="center"></StyledTableCell>
//             </StyledTableRow>
//       */}
            
//             {records.map((item) => (
//               // <li key={item.id}>{item.name}</li>
//               <StyledTableRow key={item.id}>
//                 <StyledTableCell className=" border border 2 text-center">{item.id}</StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">{item.photo}</StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   <p> {item.registrationnumber}</p>  {item.branch}
//                 </StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   {item.name} 
//                   {item.studentid}
//                 </StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   {item.contactnumber} <hr />
//                   {item.email}
//                 </StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   {item.course} <hr />
//                   {item.counsellar} <hr />
//                   {item.source}
//                 </StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   {item.joiningdata} <hr />
//                   {item.trainingmode}
//                 </StyledTableCell>
//                 <StyledTableCell className=" border border 1 text-center">
//                   <EditIcon/>
//                   <VisibilityIcon/>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//           {/* <Stack spacing={2}>
      
//       <Pagination count={10} color="primary" />
      
//     </Stack> */}
//         </Table>
//       </TableContainer>
//       <nav> 
//         <ul className="pagination"> 
//         <li className="page-item"> 
//         <a href="#" className="bg-primary text-light px-3 py-2" onClick={prevPage}> Prev </a></li> 
//         { 
//         numbers.map((n, i) =>( 
//           <li className={`page-item ${currentPage == n ? 'active': "" }`} key={i}> 
//           <a href="#" className="mx-1 " onClick={changePage(n)}>{n} </a></li>
//         ) )
         
//         }
//         <li className="page-item"> 
//         <a href="#" className="bg-primary text-light px-3 py-2" onClick={nextPage} > Next</a></li>
//         </ul>
//       </nav>
//       {/* {rows.map((row) => (
//               <StyledTableRow key={row.SNo}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.SNo}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.Photo}</StyledTableCell>
//                 <StyledTableCell align="right">{row.Registration}</StyledTableCell>

//                 <StyledTableCell align="right">{row.Studentname}</StyledTableCell>
//                 <StyledTableCell align="right">{row.Contactnumber}</StyledTableCell>
//                 <StyledTableCell align="right">{row.Counseller}</StyledTableCell>
//                 <StyledTableCell align="right">{row.Date}</StyledTableCell>
//                 <StyledTableCell align="right">{row.Action}</StyledTableCell>

//               </StyledTableRow>
//             ))} */}
//     </div>
//   );
//    function prevPage(){ 
//     if(currentPage !== firstIndex){ 
//       setCurrentPage(currentPage - 1)
//     }

//    }
//     function changePage(id){ 
      

//     }
//   function nextPage(){ 
//     if(currentPage !==  lastIndex){ 
//       setCurrentPage( currentPage + 1)
//     }

//   }
// };

// export default StudentData;
