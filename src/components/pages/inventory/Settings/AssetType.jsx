import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import axios from "axios";

export default function AssetType() {
  const navigate = useNavigate();
  const [assettype, setAssetype] = useState(["kavya", "bhavita"]);
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/getvendorname`)
  //     .then((response) => {
  //       if (response.data) {
  //         // dispatch({ type: "SET_BRANCHES", payload: response.data });
  //         setAssetype(response.data);
  //         console.log("response.data", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);
  const [newAssettype, setNewAssettype] = useState();
  const handlesubmit = () => {
    assettype.unshift(newAssettype);
    console.log("assettype", assettype);
    axios
      .put(`${process.env.REACT_APP_API_URL}/addassettype`, assettype)
      .then((res) => {
        if (res.data.updated) {
          alert("assest Updated");
          setOpen(false);
          setNewAssettype("");
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
    let updatedAssetType = [...assettype];
    updatedAssetType.splice(index, 1);
    setAssetype(updatedAssetType);
  };
  const [i, setI] = useState();
  const handleEdit = (index) => {
    setI(index);
    seteditOpen(true);
    let updatedAssetType = [...assettype];
    setNewAssettype(updatedAssetType[index]);
  };

  const SubmithandleEdit = () => {
    let updatedAssetType = [...assettype];

    updatedAssetType[i] = newAssettype;
    setAssetype(updatedAssetType);

    axios
      .put(`${process.env.REACT_APP_API_URL}/addassettype`, assettype)
      .then((res) => {
        if (res.data.updated) {
          alert("vendor Updated");
          setNewAssettype("");

          seteditOpen(false);
        } else {
          alert("not updated");
        }
      });
  };
  return (
    <div className="container">
      <div className="flex mt-3">
        <p className="fs-5 ms-3">Asset Type</p>
        <React.Fragment>
          <button
            onClick={handleClickOpen}
            type="submit"
            className="btn btn-primary mr-20 ms-2"
          >
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
                value={newAssettype}
                onChange={(e) => setNewAssettype(e.target.value)}
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
                label="Asset Name"
                type="text"
                fullWidth
                variant="standard"
                value={newAssettype}
                onChange={(e) => setNewAssettype(e.target.value)}
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
              <StyledTableCell
                className="bg-primary fs-6  border border 1"
                align="center"
              >
                Actions
              </StyledTableCell>
              {/* <StyledTableCell className='  bg-primary fs-6 border border 1' align="center">Type</StyledTableCell> */}
            </TableRow>
          </TableHead>

          {assettype &&
            assettype.map((element, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell className="border border 1 text-center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell className="border border 1 text-center">
                  {element}
                </StyledTableCell>
                <StyledTableCell className="border border 1 text-center">
                  <button onClick={(e) => handleDelete(index)}>delete</button>
                  <button onClick={(e) => handleEdit(index)}>edit</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </Table>
      </TableContainer>
    </div>
  );
}
