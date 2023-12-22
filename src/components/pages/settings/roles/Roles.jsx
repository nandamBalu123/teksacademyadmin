import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Roles.css";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { Link } from "react-router-dom";
const Roles = () => {
  const { roles } = useRoleContext();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createrole");
  };

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


  // for filters

  const [filteredData, setFilteredData] = useState(roles);
  const [filterCriteria, setFilterCriteria] = useState({
    role: "",
    description: "",
    search: "", // Add the search property
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria({ ...filterCriteria, [name]: value })
  }

  useEffect(() => {
    const filteredResults = roles.filter((item) => {
      const searchCondition = filterCriteria.search
        ? item.role.toLowerCase().includes(filterCriteria.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filterCriteria.search.toLowerCase())
        : true;

      return (
        searchCondition
      );
    });
    setFilteredData(filteredResults);
  }, [filterCriteria, roles]);
  // useEffect(() => {
  //   const filteredResults = roles.filter((item) => {
  //     const searchCondition = filterCriteria.search
  //       ? item.role
  //         .toLowerCase()
  //         .includes(filterCriteria.search.toLowerCase()) ||
  //       item.description
  //         .toLowerCase()
  //         .includes(filterCriteria.search.toLowerCase())
  //       : true;
  //     return (
  //       searchCondition
  //     );
  //   });
  //   setFilteredData(filteredResults);
  // }, [filterCriteria, roles]);

  // const filterreset = () => {
  //   setFilterCriteria({
  //     name: "",
  //     description: ""
  //   })
  // }
  return (
    <div className="container mt-3">
      <div className="roles">
        <div className="flex mt-3">
          <h5 className="ms-3">Roles</h5>
          <button
            type="submit"
            className="btn btn-color me-3 mb-2"
            onClick={handleSubmit}
          >
            Add Role
          </button>
        </div>
        <input
          type="text"
          className="input-field"
          placeholder="Search Here..."
          autoComplete="off"
          style={{
            height: "45px",
            width: "100%",
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
        <hr />
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading" align="center">
                  SI.NO
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Name
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Description
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Create By
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Create At
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Actions
                </TableCell>
                {/* <TableCell className='  bg-primary fs-6 Table-cell' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody className="Table-cell">
              {Array.isArray(roles) && roles.length > 0 ? (
                roles.map((item, index) => (

                  <TableRow key={item.id}  >
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}> {index + 1}</span>
                    </TableCell>
                    <TableCell className="Table-cell " >
                      <span style={{ fontSize: "0.8rem" }} >{item.role} </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {" "}
                        {item.description}{" "}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {item.createdby}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {new Date(item.date).toLocaleDateString("en-GB")}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <Link to={`/roleaccess/${item.id}`}>
                        <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                      </Link>
                      {/* <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                      {/* <EditIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                      <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} />
                    </TableCell>
                    {/* <TableCell className=" Table-cell text-center"> Custom</TableCell> */}
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



      </div>
    </div>
  );
};

export default Roles;

// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import { useNavigate } from "react-router-dom";
// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';

// const Roles = () => {

//   const [getuserroles, setData] = useState();
// useEffect(() => {
//     // Make a GET request to your backend API endpoint
//     axios.get('http://localhost:3030/getuserroles')
//       .then((response) => {
//         // Handle the successful response here
//         setData(response.data); // Update the data state with the fetched data
//         console.log(response.data);

//       })
//       .catch((error) => {
//         // Handle any errors that occur during the request
//         console.error('Error fetching data:', error);

//       });
//   }, []);
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     navigate("/createrole");
//   };

//   const TableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//   }));
//   return (
//     <div className="contianer" >
//       <div className="flex">
//       <p className="fs-5 ms-3">All Profile Permissions</p>
//       <button type="submit" className="btn btn-primary mr-20 ms-2 mb-2" onClick={handleSubmit}>  Add Role </button>
//       {/* <button type="submit" className="btn btn-primary mr-20 ms-2 mb-2" onClick={handleSubmit}>
//               Add Role
//             </button> */}
//             </div>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 1000 }} aria-label="customized table " >
//           <TableHead  >
//             <TableRow  >
//               <TableCell className=' bg-primary fs-6  Table-cell' align="center">id</TableCell>
//               <TableCell className=' bg-primary fs-6  Table-cell' align="center">Name</TableCell>
//               <TableCell className=' bg-primary fs-6 Table-cell' align="center">Description</TableCell>
//               {/* <TableCell className='  bg-primary fs-6 Table-cell' align="center">Type</TableCell> */}

//             </TableRow>
//           </TableHead>

//           <TableBody className="Table-cell">
//             {getuserroles.map((item) => (
//             <StyledTableRow>
//               <TableCell className=" Table-cell text-center">{item.id}</TableCell>
//               <TableCell className=" Table-cell text-center">{item.role}</TableCell>
//               <TableCell className=" Table-cell text-center">{item.description}</TableCell>
//               {/* <TableCell className=" Table-cell text-center"> Custom</TableCell> */}
//             </StyledTableRow>
//              ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//     </div>
//   );
// };

// export default Roles;
