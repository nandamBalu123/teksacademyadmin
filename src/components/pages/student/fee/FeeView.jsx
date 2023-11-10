import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./FeeView.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { Link } from "react-router-dom";

const FeeView = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const [studentdata, setstudentdata] = useState("");
  const [totalinstallments, settotalinstallments] = useState("");
  const [dueamountt, setdueamount] = useState();
  const [totalpaidamountt, settotalpaidamount] = useState();
  const [newpaidamount, setnewpaidamount] = useState();
  const [installmentamount, setinstallmentamount] = useState();
  const [extraDiscount, setExtraDiscount] = useState();

  // const [totoalleft, settotalleft] = useState();

  let totalleft;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
      .then((response) => {
        // Handle the successful response here
        setstudentdata(response.data[0]); // Update the data state with the fetched data
        console.log("studentdata", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);
  // let totalinstallments;
  const [installments, setInstallments] = useState();
  const [readinstallments, setreadinstallments] = useState();

  useEffect(() => {
    // totalinstallments = studentdata.totalinstallments;
    settotalinstallments(studentdata.totalinstallments);
    setInstallments(studentdata.installments);
    setreadinstallments(studentdata.installments);
    settotalpaidamount(studentdata.totalpaidamount);
    setdueamount(studentdata.dueamount);
    setinstallmentamount(parseInt(studentdata.dueamount) / totalleft);
  }, [studentdata]);

  const handleInstallmentUpdate = (index, updatedInstallment) => {
    const updatedInstallments = [...installments];
    updatedInstallments[index] = updatedInstallment;
    if (parseInt(updatedInstallments[index].paidamount) > 0) {
      updatedInstallments[index].paymentdone = true;
    }
    if (
      parseInt(updatedInstallments[index].paidamount) < 1 ||
      updatedInstallments[index].paidamount === ""
    ) {
      updatedInstallments[index].paymentdone = false;
    }

    console.log("updatedInstallment", updatedInstallment.paidamount);
    setnewpaidamount(updatedInstallment.paidamount);
    setInstallments(updatedInstallments);
  };
  useEffect(() => {}, []);

  const updatedata = (e) => {
    e.preventDefault();

    if (newpaidamount <= dueamountt) {
      if (newpaidamount) {
        const updatedDataa = [...totalinstallments];
        updatedDataa[0].totalinstallmentsleft =
          updatedDataa[0].totalinstallmentsleft - 1;
        updatedDataa[0].totalinstallmentspaid =
          updatedDataa[0].totalinstallmentspaid + 1;
        settotalinstallments(updatedDataa);
      }

      let totalpaidamount;
      let dueamount;
      if (newpaidamount) {
        totalpaidamount = parseInt(totalpaidamountt) + parseInt(newpaidamount);
        dueamount = parseInt(dueamountt) - parseInt(newpaidamount);
      } else {
        totalpaidamount = parseInt(totalpaidamountt);
        dueamount = parseInt(dueamountt);
      }

      // let nextduedate = [];
      let nextduedate;
      for (let i = 0; i < installments.length; i++) {
        if (installments[i].paidamount < 1) {
          nextduedate = installments[i].duedate;
          break;
        }
        // nextduedate.push(installments[i].duedate);
      }

      let updatedInstallmentAmount =
        dueamount / totalinstallments[0].totalinstallmentsleft;
      for (let i = 0; i < installments.length; i++) {
        const updatedInstallments = [...installments];
        if (updatedInstallments[i].paymentdone === false) {
          updatedInstallments[i].dueamount = parseInt(updatedInstallmentAmount);
        }

        setInstallments(updatedInstallments);
      }
      const updatedData = {
        installments,
        totalinstallments,
        dueamount,
        totalpaidamount,
        nextduedate,
      };
      console.log("updatedData", updatedData);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/feeinstallments/${id}`,
          updatedData
        )

        .then((res) => {
          if (res.data.updated) {
            alert("Fee Added");

            navigator(`/feeview/${id}`);
            window.location.reload();
          } else {
            alert("Try Again");
          }
        });
    } else alert("amount is not added");
  };
  const dynamicStyle = {
    color: studentdata.dueamount < 1 ? "green" : "red",
    fontSize: studentdata.dueamount < 1 ? "20px" : "16px",
    fontWeight: studentdata.dueamount < 1 ? "900" : "900",
  };
  const IconStyle = {
    display: studentdata.dueamount < 1 ? true : "none",
    marginLeft: "10px",
  };
  const addInstallmentstyles = {
    display: studentdata.dueamount < 1 ? "none" : true,
    height: "40px",
    margin: "20px",
  };
  //  for discount dialogue box
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //////add installment
  const addInstallment = () => {
    const updatedDataa = [...totalinstallments];
    updatedDataa[0].totalinstallmentsleft =
      updatedDataa[0].totalinstallmentsleft + 1;
    updatedDataa[0].totalinstallments = updatedDataa[0].totalinstallments + 1;
    settotalinstallments(updatedDataa);

    let iinstallment = installments;
    let newInstallment = {
      id: Date.now(),
      duedate: "",
      dueamount: 0,
      paidamount: 0,
      paiddate: "",
      modeofpayment: "",
      transactionid: "",
      paymentdone: false,
    };
    iinstallment.push(newInstallment);
    let updatedInstallmentAmount =
      dueamountt / totalinstallments[0].totalinstallmentsleft;

    for (let i = 0; i < iinstallment.length; i++) {
      const updatedInstallments = [...iinstallment];
      if (updatedInstallments[i].paymentdone === false) {
        updatedInstallments[i].dueamount = parseInt(updatedInstallmentAmount);
      }

      setInstallments(updatedInstallments);
    }
    // setInstallments(iinstallment);

    const updatedData = {
      installments,
      totalinstallments,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/addnewinstallments/${id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          alert("Installment  Added");
          navigator(`/feeview/${id}`);
          window.location.reload();
        } else {
          alert("Try Again");
        }
      });
  };
  return (
    <div className="fee container mt-3">
      <div className="feeview">
        <h4 className="pt-3"> Student Fee Details</h4>{" "}
        <hr style={{ height: "30%", paddingBottom: "30px" }} />
        <div className="w-100">
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
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.name}
                      style={{
                        width: "7rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                        display: "block",
                      }}
                    >
                      {studentdata.name}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.email}
                      style={{
                        width: "7rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                        display: "block",
                      }}
                    >
                      {studentdata.email}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.mobilenumber}
                      style={{
                        width: "5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {studentdata.mobilenumber}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.courses}
                      style={{
                        width: "3rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                        display: "block",
                      }}
                    >
                      {studentdata.courses}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.admissiondate}
                      style={{
                        width: "5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {studentdata.admissiondate}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.finaltotal}
                      style={{
                        width: "3rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {studentdata.finaltotal}
                    </span>
                  </TableCell>

                  <TableCell className="border border 1">
                    <span
                      title={studentdata.totalpaidamount}
                      style={{
                        width: "3rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {studentdata.totalpaidamount}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={studentdata.dueamount}
                      style={{
                        width: "3rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {studentdata.dueamount}
                    </span>

                    {/* {dueamount} */}
                  </TableCell>

                  <TableCell className="border border 1">
                    {studentdata.totalinstallments &&
                      studentdata.totalinstallments.length > 0 &&
                      studentdata.totalinstallments.map((item, index) => {
                        if (true) {
                          // settotalleft(item.totalinstallmentsleft);
                          totalleft = item.totalinstallmentsleft;
                          return (
                            <div style={{ display: "flex" }}>
                              <span style={dynamicStyle}>
                                {item.totalinstallmentspaid}/
                                {item.totalinstallments}
                              </span>
                              <span style={dynamicStyle}>
                                <CheckCircleIcon style={IconStyle} />
                              </span>
                            </div>
                          );
                        }
                      })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <TableContainer component={Paper} className="mt-4">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Admission Fee
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
                {/* <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Admin Invoice
                </TableCell> */}
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            {studentdata.initialpayment &&
              studentdata.initialpayment.map((item, index) => (
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="border border 1 text-center">
                      {item.initialamount}
                    </TableCell>
                    <TableCell className="border border 1 text-center">
                      {item.paiddate}
                    </TableCell>
                    <TableCell className="border border 1 text-center">
                      {item.modeofpayment}
                    </TableCell>
                    <TableCell className="border border 1 text-center">
                      {item.transactionID}
                    </TableCell>
                    {/* <TableCell className="border border 1 text-center">
                      <Link
                        to={`/invoice/${id}/${index}/Admission Fee/admininvoice`}
                        style={{ width: "40px" }}
                      >
                        <CreditScoreIcon className="iconn" />
                      </Link>
                    </TableCell> */}
                    <TableCell className="border border 1 text-center">
                      <Link
                        to={`/invoice/${id}/${index}/Admission Fee/studentinvoice`}
                        style={{ width: "40px" }}
                      >
                        <CreditScoreIcon className="iconn" />
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </TableContainer>
        <div className="row">
          <span className="fs-3  col-6 col-md-8 col-lg-8 col-xl-8">
            {" "}
            Paid Installments
          </span>
          <button
            className="btn btn-warning col-12 col-md-2 col-lg-2 col-xl-2 my-2"
            onClick={addInstallment}
            // style={{ height: "40px", margin: "20px" }}
          >
            Add Installment
          </button>
          <div className="col-6 col-md-2 col-lg-2 col-xl-2 my-2 ">
            <button
              className="btn btn-primary"
              variant="outlined"
              onClick={handleClickOpen}
            >
              Extra Discount
            </button>
            {/* <Button variant="outlined" onClick={handleClickOpen} className="btn btn-primary">
        Open form dialog
      </Button> */}
            <Dialog open={open} onClose={handleClose}>
              {/* <DialogTitle>DISCOUNT</DialogTitle> */}
              <DialogContent>
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
                <TextField
                  autoFocus
                  margin="dense"
                  label="Discount"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(e) => setExtraDiscount(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Discount</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
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
                  Paid Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Mode of Payment
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Transition ID
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Admin Invoice
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Student Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            {readinstallments &&
              readinstallments.map((item, index) => {
                if (item.paidamount < 1) {
                  return null; // Do not render anything
                }

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="border border 1 text-center">
                        {item.duedate}
                      </TableCell>
                      <TableCell className="border border 1 text-center  ">
                        {item.paidamount}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {item.paiddate}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {item.modeofpayment}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {item.transactionid}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        <Link
                          to={`/invoice/${id}/${index}/Installment/admininvoice`}
                          style={{ width: "40px" }}
                        >
                          <CreditScoreIcon className="iconn" />
                        </Link>
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        <Link
                          to={`/invoice/${id}/${index}/Installment/studentinvoice`}
                          style={{ width: "40px" }}
                        >
                          <CreditScoreIcon className="iconn" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
          </Table>
        </TableContainer>
        {installments &&
          studentdata.dueamount > 0 &&
          installments.map((installment, index) => {
            if (readinstallments[index].paidamount > 0) {
              return null; // Do not render anything
            }

            return (
              <div className="installment  mt-5" key={index}>
                <p className="ms-4">
                  {" "}
                  Installment {index + 1} :{" "}
                  {parseFloat(installment.dueamount).toFixed(2)}
                </p>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                    <input
                      type="date"
                      name="duedate"
                      className="w-100"
                      onChange={(e) => {
                        const updatedInstallment = {
                          ...installment,
                          duedate: e.target.value,
                        };
                        handleInstallmentUpdate(index, updatedInstallment);
                      }}
                      value={installment.duedate}
                    />
                    <label> Due Date</label>
                  </div>

                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                    <input
                      type="number"
                      name="paidamount"
                      className="w-100"
                      onChange={(e) => {
                        const updatedInstallment = {
                          ...installment,
                          paidamount: e.target.value,
                        };
                        handleInstallmentUpdate(index, updatedInstallment);
                      }}
                      value={installment.paidamount}
                    />
                    <label> Paid Amount</label>
                  </div>
                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                    <input
                      type="date"
                      name="paiddate"
                      className="w-100"
                      onChange={(e) => {
                        const updatedInstallment = {
                          ...installment,
                          paiddate: e.target.value,
                        };
                        handleInstallmentUpdate(index, updatedInstallment);
                      }}
                      value={installment.paiddate}
                    />
                    <label> Paid Date</label>
                  </div>
                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 mul-input">
                    <select
                      className="w-100"
                      name="modeofpayment"
                      onChange={(e) => {
                        const updatedInstallment = {
                          ...installment,
                          modeofpayment: e.target.value,
                        };
                        handleInstallmentUpdate(index, updatedInstallment);
                      }}
                      value={installment.modeofpayment}
                    >
                      <option value="">---select---</option>
                      <option value="upi">UPI</option>
                      <option value="cash">Cash</option>
                      <option value="banktransfer"> Bank Transfer</option>
                      <option value="cheque"> CHEQUE</option>
                    </select>
                    <label> Mode of Payments</label>
                  </div>
                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                    <input
                      type="text"
                      className="w-100"
                      name="transactionid"
                      onChange={(e) => {
                        const updatedInstallment = {
                          ...installment,
                          transactionid: e.target.value,
                        };
                        handleInstallmentUpdate(index, updatedInstallment);
                      }}
                      value={installment.transactionid}
                    />
                    <label> Transaction Id</label>
                  </div>
                  <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input ">
                    <button
                      className="btn btn-primary center"
                      // onClick={() => handleInstallmentUpdate(index, installment)}
                      onClick={updatedata}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default FeeView;
