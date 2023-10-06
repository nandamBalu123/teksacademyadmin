import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./FeeView.css";
const FeeView = () => {
  return (
    <div className="fee">
      <div className="feeview">
        <h4 className="pt-3"> Student Fee Details</h4>{" "}
        <hr style={{ height: "30%", paddingBottom: "30px" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Name
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Email
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Contact Number
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Course
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Date Of Joining
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Total Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Initial Amount{" "}
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Paid Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Due Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Paid Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  className="border border 1"
                ></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <p className="fs-3 pt-3"> Paid Installments</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Due Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Paid Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Paid Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Mode of Payment
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  {" "}
                  Transition ID
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  className="border border 1"
                ></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
                <TableCell className="border border 1"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="instalment">
          <p className="ms-4"> Instalment 1 :10,000</p>
          <div className="d-flex  payment">
            <input type="date" name="duedate" />
            <input type="text" placeholder="paidamount" name="paidamount" />

            <input type="date" name="paiddate" />

            <select className="ms-3" placeholder="Mode of Payment">
              <option value="">Mode of Payment</option>
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="backtransfor"> Bank Transfor</option>
              <option value="cheque"> CHEQUE</option>
            </select>
            <input
              type="text"
              placeholder="Transation Id"
              name="transationid"
            />
          </div>
        <div className="updatebtn">    <button  className="update " > Update</button></div>
        </div>
      </div>
    </div>
  );
};
export default FeeView;
