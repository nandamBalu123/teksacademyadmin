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

const Branch = () => {
  const [getbranches, setData] = useState([]);
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("http://localhost:3030/getbranch")
      .then((response) => {
        // Handle the successful response here
        if (response.data.Status === "Success") {
          setData(response.data.Result); // Update the data state with the fetched data
          console.log("branch", response.data);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createbranch");
  };

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div className="container">
      <div className="flex">
        <p className="fs-5 ms-3">Branches</p>
        <button
          type="submit"
          className="btn btn-primary mr-20 ms-2 mb-2"
          onClick={handleSubmit}
        >
          Add Branch
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                id
              </StyledTableCell>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                className="bg-primary fs-6 border border 1"
                align="center"
              >
                Description
              </StyledTableCell>
              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
            </TableRow>
          </TableHead>

          <TableBody className="border border 1">
            {Array.isArray(getbranches) && getbranches.length > 0 ? (
              getbranches.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell className="border border 1 text-center">
                    {item.id}
                  </StyledTableCell>
                  <StyledTableCell className="border border 1 text-center">
                    {item.branch_name}
                  </StyledTableCell>
                  <StyledTableCell className="border border 1 text-center">
                    {/* {item.description} */}
                  </StyledTableCell>
                  {/* <StyledTableCell className=" border border 1 text-center"> Custom</StyledTableCell> */}
                </StyledTableRow>
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
  );
};

export default Branch;