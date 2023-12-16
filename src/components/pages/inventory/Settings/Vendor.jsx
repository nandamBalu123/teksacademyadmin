import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import "./Vendor.css";

export default function Vendor() {
  const navigate = useNavigate();

  const [vendorName, setVendorName] = useState(["kiran", "kumar"]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/getvendorname`)
  //     .then((response) => {
  //       if (response.data) {
  //         // dispatch({ type: "SET_BRANCHES", payload: response.data });
  //         setVendorName(response.data);
  //         console.log("response.data", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const [newVendorName, setNewVendorName] = useState();
  const handlesubmit = () => {
    vendorName.unshift(newVendorName);
    console.log("vendorName", vendorName);
    axios
      .put(`${process.env.REACT_APP_API_URL}/addvendorname`, vendorName)
      .then((res) => {
        if (res.data.updated) {
          alert("vendor Updated");
          setOpen(false);
          setNewVendorName("");
        } else {
          alert("not updated");
        }
      });
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
  const [editopen, seteditOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickEditOpen = () => {
    seteditOpen(true);
  };

  const handleeditClose = () => {
    seteditOpen(false);
  };
  const handleDelete = (index) => {
    let updatedVendorName = [...vendorName];
    updatedVendorName.splice(index, 1);
    setVendorName(updatedVendorName);
  };
  const [i, setI] = useState();
  const handleEdit = (index) => {
    setI(index);
    seteditOpen(true);
    let updatedVendorName = [...vendorName];
    setNewVendorName(updatedVendorName[index]);
  };

  const SubmithandleEdit = () => {
    let updatedVendorName = [...vendorName];
    console.log("fgdf", i);
    updatedVendorName[i] = newVendorName;
    setVendorName(updatedVendorName);

    axios
      .put(`${process.env.REACT_APP_API_URL}/addvendorname`, vendorName)
      .then((res) => {
        if (res.data.updated) {
          alert("vendor Updated");
          setNewVendorName("");

          seteditOpen(false);
        } else {
          alert("not updated");
        }
      });
  };
  return (
    <div className="container mt-3">
      <div className="vendor">
        <div className="flex my-3">
          <h5 className=" ms-3">Vendor</h5>

          <React.Fragment>
            <button
              onClick={handleClickOpen}
              type="submit"
              className="btn btn-color me-3"
            >
              Add Vendor
            </button>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add Vendor Name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  label="Vendor Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                // autoFocus
                // label="Vendor Name"
                // type="text"
                // fullWidth
                // variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handlesubmit}>submit</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={editopen} onClose={handleeditClose}>
              <DialogTitle>Edit Vendor Name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  label="Vendor Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={newVendorName}
                  onChange={(e) => setNewVendorName(e.target.value)}
                // autoFocus
                // label="Vendor Name"
                // type="text"
                // fullWidth
                // variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleeditClose}>Cancel</Button>
                <Button onClick={SubmithandleEdit}>Update</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
        <TableContainer component={Paper} className="mb-3">
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            {vendorName &&
              vendorName.map((element, index) => (
                <TableRow key={index}>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}> {index + 1}</span>
                  </TableCell>
                  <TableCell className="Table-cell text-center">
                    <span style={{ fontSize: "15px" }}> {element}</span>
                  </TableCell>
                  <TableCell
                    className="Table-cell text-center"
                    style={{ fontSize: "15px" }}
                  >
                    <ModeEditIcon style={{ cursor: "pointer" }}
                      onClick={(e) => handleEdit(index)}
                      className="icon-color"
                    />
                    <DeleteOutlineIcon style={{ cursor: "pointer" }}
                      onClick={(e) => handleDelete(index)}
                      className="text-danger ms-2"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
