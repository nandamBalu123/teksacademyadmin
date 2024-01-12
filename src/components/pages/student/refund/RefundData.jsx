import React, { useEffect, useState } from 'react'
import './RefundData.css';
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { Link, NavLink } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import axios from "axios"
const RefundData = () => {
    const [isChecked, setIsChecked] = useState(false);
    // for open and close the filters
    const [opening, setOpening] = React.useState(false);
    const [refunds, setRefunds] = useState()
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/studentrefundsfromrefunds`)
            .then((response) => {
                if (response.data) {
                    setRefunds(response.data)
                    // dispatch({ type: "SET_LEADSOURCES", payload: response.data });
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [])
    useEffect(() => {
        console.log("refunds", refunds)
    })
    const handleClickOpen = () => {
        setOpening(true);
    };

    const handleClosed = () => {
        setOpening(false);
    };
    const handleok = () => {
        setIsChecked(!isChecked);

        setOpening(false);
    };
    //  end
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='container mt-3'>
            <div className='refunddata mt-3'>
                <h5 className="mt-4  text-center">Refund Data</h5>
                <div className="row mb-1 ps-1 ">
                    <div className="col-12 col-md-6 col-lg-8 col-xl-8">
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

                        />
                        <hr />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <div className="d-flex justify-content-around">
                            <p className="pt-3">
                                10/10
                            </p>

                            <p>
                                <select className="mt-3">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                    <option value="250">250</option>
                                    <option value="500">500</option>
                                    <option value="750">750</option>
                                    <option value="1000">1000</option>
                                </select>
                            </p>
                            <p>
                                <Button
                                    id="demo-positioned-button"
                                    aria-controls={open ? "demo-positioned-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    <button
                                        className="btn btn-color"
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        Filter
                                    </button>
                                </Button>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                >
                                    <div className="d-flex justify-content-between m-2">
                                        <div> Filter</div>

                                        <div>
                                            {" "}
                                            <CloseIcon onClick={handleClose} />{" "}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row m-2">
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <TextField
                                                label=" From:"
                                                type="date"
                                                variant="standard"
                                                className="  w-100"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="fromdate"

                                            />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                                            <TextField
                                                label=" To:"
                                                type="date"
                                                variant="standard"
                                                className="w-100"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="todate"
                                            />
                                        </div>
                                    </div>
                                    <MenuItem className="d-flex justify-content-between">
                                        <button className="btn btn-color" >
                                            Clear
                                        </button>
                                        <button className="btn btn-color" >
                                            Save
                                        </button>
                                    </MenuItem>
                                </Menu>
                            </p>

                        </div>
                    </div>
                </div>
                <div className="student-table">
                    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-cell-heading">S:No</TableCell>
                                    <TableCell className="table-cell-heading">Student Name</TableCell>
                                    <TableCell className="table-cell-heading">Registration Number</TableCell>
                                    <TableCell className="table-cell-heading">Branch</TableCell>


                                    <TableCell className="table-cell-heading">Course</TableCell>
                                    <TableCell className="table-cell-heading">Counsellor</TableCell>
                                    {/* <TableCell className="table-cell-heading">Email</TableCell> */}
                                    {/* <TableCell className="table-cell-heading">Training Mode</TableCell> */}
                                    <TableCell className="table-cell-heading">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {refunds && refunds.length > 0 && refunds.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="Table-cell">{index + 1}</TableCell>
                                        <TableCell className="Table-cell">{item.refund[0].name}</TableCell>
                                        <TableCell className="Table-cell">{item.refund[0].registrationnumber}</TableCell>
                                        <TableCell className="Table-cell">{item.refund[0].branch}</TableCell>

                                        <TableCell className="Table-cell">{item.refund[0].courses}</TableCell>
                                        <TableCell className="Table-cell">{item.refund[0].enquirytakenby}</TableCell>
                                        {/* <TableCell className="Table-cell">{item.refund[0].email}</TableCell> */}
                                        {/* <TableCell className="Table-cell">Add Training Mode value</TableCell> */}
                                        <TableCell>
                                            <div className="d-flex justify-content-center">
                                                <NavLink to={`/refundview/${item.refund[0].registrationnumber}`}>
                                                    <VisibilityIcon
                                                        style={{ width: "40px" }}
                                                        className="icon-color"
                                                    />
                                                </NavLink>
                                                {/* <NavLink to="#">
                    <EditIcon style={{ width: "40px" }} className="icon-color" />
                  </NavLink> */}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-cell-heading">SNo</TableCell>
                                    <TableCell className="table-cell-heading">
                                        Student Name
                                    </TableCell>
                                    <TableCell className="table-cell-heading">

                                        Course
                                    </TableCell>

                                    <TableCell className="table-cell-heading">
                                        Counsellor

                                    </TableCell>

                                    <TableCell className="table-cell-heading">

                                        Email
                                    </TableCell>

                                    <TableCell className="table-cell-heading">

                                        Training Mode
                                    </TableCell>

                                    <TableCell className="table-cell-heading">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow >
                                    <TableCell className="Table-cell">
                                        1
                                    </TableCell>

                                    <TableCell className="Table-cell">
                                        tyhty
                                    </TableCell>

                                    <TableCell className="Table-cell">

                                        dgtxdrr

                                    </TableCell>
                                    <TableCell className="Table-cell">

                                        dgtxdrr

                                    </TableCell>
                                    <TableCell className="Table-cell">

                                        dgtxdrr

                                    </TableCell>
                                    <TableCell className="Table-cell">

                                        dgtxdrr

                                    </TableCell>

                                    <TableCell >
                                        <div className="d-flex justify-content-center">
                                            <NavLink to="#">
                                                <VisibilityIcon
                                                    style={{ width: "40px" }}
                                                    className="icon-color"
                                                />
                                            </NavLink>

                                            <NavLink to="#">
                                                <EditIcon
                                                    style={{ width: "40px" }}
                                                    className="icon-color"
                                                />
                                            </NavLink>

                                        </div>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </div>

                <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="my-3"
                >
                    <Stack spacing={2}>
                        <Pagination


                            color="info"
                        />
                    </Stack>
                </div>

            </div>
        </div>
    )
}

export default RefundData