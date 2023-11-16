import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { styled } from "@mui/material/styles";
import axios from "axios";

export default function AssetType() {
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="container">
      <div className="flex mt-3">
        <p className="fs-5 ms-3">Asset Type</p>
        <React.Fragment>
        <button
         onClick={handleClickOpen}
          type="submit"
          className="btn btn-primary mr-20 ms-2">
          Add Asset Type
        </button>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Asset Type</DialogTitle>
        <DialogContent>
        
          <TextField
            autoFocus
            
            
            label="Asset Type"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button >submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

        {/* <button
          type="submit"
          className="btn btn-primary mr-20 ms-2 mb-2">
          Add Asset Type
        </button> */}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                SI.NO
              </StyledTableCell>
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                Name
              </StyledTableCell>

              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
            </TableRow>
          </TableHead>

          {/* <TableBody className="border border 1">
            {Array.isArray(branches) && branches.length > 0 ? (
              branches.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell className="border border 1 text-center">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell className="border border 1 text-center">
                    {item.branch_name}
                  </StyledTableCell>

                  
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  )
}
