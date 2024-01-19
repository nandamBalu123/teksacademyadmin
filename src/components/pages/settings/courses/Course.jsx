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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import axios from "axios";
import "./Course.css";
import { useCourseContext } from "../../../../hooks/useCourseContext";
const Course = () => {
  const { getcourses, dispatch } = useCourseContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/createcourse");
  };


  const handleDeleteCourse = (id) => {
    let courseID = { id: id }
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deletecourse/${id}`)

      .then((response) => {
        dispatch({
          type: "DELETE_COURSE",
          payload: courseID,

        });
        alert("deleted")
      })
      .catch((error) => {
        alert("Error")
      });
  };

  return (
    <div className="container mt-3">
      <div className="course">
        <div className="flex my-3">
          <h5 className=" ms-3">Courses</h5>
          <button
            type="submit"
            className="btn btn-color me-3"
            onClick={handleSubmit}
          >
            Add Course
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell-heading" align="center">
                  SI.NO
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Course Name
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Course Package
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Fee
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Max Discount
                </TableCell>
                {/* <TableCell className="table-cell-heading" align="center">
                  Create By
                </TableCell> */}
                <TableCell className="table-cell-heading" align="center">
                  Create At
                </TableCell>
                <TableCell className="table-cell-heading" align="center">
                  Actions
                </TableCell>

                {/* <TableCell className='  bg-primary fs-6 border border 1' align="center">Type</TableCell> */}
              </TableRow>
            </TableHead>

            {Array.isArray(getcourses) && getcourses.length > 0 ? (
              getcourses.map((item, index) => {
                let date = new Date(item.date);
                const day = date.getUTCDate();
                const monthIndex = date.getUTCMonth();
                const year = date.getUTCFullYear();

                const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                // Formatting the date
                date = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                  }-${year}`;

                return (
                  <TableRow key={item.id}>
                    <TableCell className="Table-cell text-center">
                      <span style={{ fontSize: "0.8rem" }}> {index + 1}</span>
                    </TableCell>
                    <TableCell
                      className="Table-cell text-center"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span style={{ fontSize: "0.8rem" }}>{item.course_name}</span>
                    </TableCell>
                    <TableCell
                      className="Table-cell text-center"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <span style={{ fontSize: "0.8rem" }}>{item.course_package}</span>
                    </TableCell>
                    <TableCell className="Table-cell text-center">
                      <span style={{ fontSize: "0.8rem" }}>
                        {item.fee}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {item.max_discount}
                      </span>
                    </TableCell>
                    {/* <TableCell className="Table-cell ">
                    <span style={{ fontSize: "0.8rem" }}>
                      {item.createdby}
                    </span>
                  </TableCell> */}
                    <TableCell className="Table-cell ">
                      <span style={{ fontSize: "0.8rem" }}>
                        {date}
                        {/* {new Date(item.date).toLocaleDateString("en-GB")} */}
                      </span>
                    </TableCell>
                    <TableCell className="Table-cell ">
                      {/* <VisibilityIcon className="icon-color" style={{ cursor: "pointer" }} /> */}
                      <EditIcon className="icon-color" style={{ cursor: "pointer" }} />
                      <DeleteIcon className="text-danger" style={{ cursor: "pointer" }} onClick={e => handleDeleteCourse(item.id)} />
                    </TableCell>
                    {/* <TableCell className=" border border 1 text-center"> Custom</TableCell> */}
                  </TableRow>
                )

              })
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No data available</TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Course;
