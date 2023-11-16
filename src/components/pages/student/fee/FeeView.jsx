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
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import useFormattedDate from "../../../../hooks/useFormattedDate";

const FeeView = () => {
  const { students, dispatch } = useStudentsContext();
  const { id } = useParams();
  const navigator = useNavigate();
  const [studentdata, setstudentdata] = useState("");
  const [totalinstallments, settotalinstallments] = useState("");
  const [dueamountt, setdueamount] = useState();
  const [totalpaidamountt, settotalpaidamount] = useState();
  const [newpaidamount, setnewpaidamount] = useState();
  const [installmentamount, setinstallmentamount] = useState();
  const [extraDiscount, setExtraDiscount] = useState();
  const [text, setText] = useState("");
  const [Discountremarkshistory, setDiscount_remarks_history] = useState("");
  let DateOfJoining = useFormattedDate(studentdata.admissiondate);
  // const [totoalleft, settotalleft] = useState();

  let totalleft;

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       setstudentdata(response.data[0]); // Update the data state with the fetched data
  //       console.log("studentdata", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  useEffect(() => {
    if (students && id) {
      const filteredResults = students.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setstudentdata(filteredResults[0]);
    }
  }, [students, id, dispatch]);
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
  }, [studentdata, dispatch, students]);

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

      const updateContext = {
        installments,
        totalinstallments,
        dueamount,
        totalpaidamount,
        nextduedate,
        id: studentdata.id,
      };
      console.log("updatedData", updatedData, updateContext);
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/feeinstallments/${id}`,
          updatedData
        )

        .then((res) => {
          if (res.data.updated) {
            alert("Fee Added");
            dispatch({
              type: "UPDATE_INSTALLMENTS",
              payload: updateContext,
            });
            // navigator(`/feeview/${id}`);
            // window.location.reload();
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
    const updateContext = {
      installments,
      totalinstallments,
      id: studentdata.id,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/addnewinstallments/${id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          alert("Installment  Added");
          dispatch({
            type: "UPDATE_ADDNEWINSTALLMENTS",
            payload: updateContext,
          });
          // navigator(`/feeview/${id}`);
          // window.location.reload();
        } else {
          alert("Try Again");
        }
      });
  };
  /// extra discount

  const handleApplyDiscount = () => {
    setOpen(false);

    let dueamount;
    if (extraDiscount) {
      dueamount = parseInt(dueamountt) - parseInt(extraDiscount);
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
    if (extraDiscount) {
      let Extra_Discount_remarks_history = studentdata.extra_discount;
      let newObject = {
        Discount: parseInt(extraDiscount),
        Discount_remarks: text,
        date: new Date(),
      };
      Extra_Discount_remarks_history.push(newObject);
      const updatedData = {
        installments,
        dueamount,
        Extra_Discount_remarks_history,
      };
      const updateContext = {
        installments,
        dueamount,
        Extra_Discount_remarks_history,
        id: studentdata.id,
      };

      // let uploadcontext = { user_status, user_remarks_history, id };

      axios
        .put(
          `${process.env.REACT_APP_API_URL}/extra_discount/${id}`,
          updatedData
        )
        .then((res) => {
          if (res.data.updated) {
            alert("Discount Applied");
            dispatch({
              type: "UPDATE_EXTRA_DISCOUNT",
              payload: updateContext,
            });
            // window.location.reload();
          } else {
            alert("Error please Try Again");
          }
        });
      // setcourseStartDate("");
      setText("");
    } else {
      alert("enter remarks");
    }
  };
  let extra_discount_view = 0;
  if (studentdata.extra_discount) {
    let studentdata_extra_discount = studentdata.extra_discount;
    for (let i = 0; i < studentdata_extra_discount.length; i++) {
      extra_discount_view += parseInt(studentdata_extra_discount[i].Discount);
    }
  }
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
                    Name
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Email
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    Contact Number
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    Course
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                    Date Of Joining
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Total Amount
                  </TableCell>

                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Paid Amount
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                    Extra Discount
                  </TableCell>
                  <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
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
                        width: "5rem",
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
                        width: "2.5rem",
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
                      title={DateOfJoining}
                      style={{
                        width: "4.5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {DateOfJoining}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={Number(studentdata.finaltotal).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        width: "2.5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {Number(studentdata.finaltotal).toLocaleString("en-IN")}
                    </span>
                  </TableCell>

                  <TableCell className="border border 1">
                    <span
                      title={Number(studentdata.totalpaidamount).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        width: "2.5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {Number(studentdata.totalpaidamount).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      // title={studentdata.totalpaidamount}
                      style={{
                        width: "2.5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {extra_discount_view && (
                        <>
                          {Number(extra_discount_view).toLocaleString("en-IN")}
                        </>
                      )}
                      {/* {studentdata.totalpaidamount} */}
                    </span>
                  </TableCell>
                  <TableCell className="border border 1">
                    <span
                      title={Number(studentdata.dueamount).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        width: "2.5rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                        display: "block",
                      }}
                    >
                      {Number(studentdata.dueamount).toLocaleString("en-IN")}
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
              studentdata.initialpayment.map((item, index) => {
                let paidDate = new Date(item.paiddate);
                const day = paidDate.getUTCDate();
                const monthIndex = paidDate.getUTCMonth();
                const year = paidDate.getUTCFullYear();

                const monthAbbreviations = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                // Formatting the date
                paidDate = `${day < 10 ? "0" : ""}${day}-${
                  monthAbbreviations[monthIndex]
                }-${year}`;

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="border border 1 text-center">
                        {Number(item.initialamount).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {paidDate}
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
                );
              })}
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
              className="btn btn-warning"
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
                <DialogContentText>
                  <textarea
                    rows="3"
                    cols="50"
                    placeholder="Remarks"
                    name="comment"
                    form="usrform"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  ></textarea>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleApplyDiscount}>Apply</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Installment
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Due Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Due Amount
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Paid Date
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  Paid Amount
                </TableCell>

                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Mode of Payment
                </TableCell>
                <TableCell className="bg-primary fs-6 border border 1 text-center text-light">
                  Transition ID
                </TableCell>

                <TableCell className="bg-primary fs-6 border border 1 text-center text-light ">
                  {" "}
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            {readinstallments &&
              readinstallments.map((item, index) => {
                let paidDate = new Date(item.paiddate);
                const day = paidDate.getUTCDate();
                const monthIndex = paidDate.getUTCMonth();
                const year = paidDate.getUTCFullYear();
                let dueDate = new Date(item.duedate);
                const dueday = dueDate.getUTCDate();
                const duemonthIndex = dueDate.getUTCMonth();
                const dueyear = dueDate.getUTCFullYear();
                const monthAbbreviations = [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ];

                // Formatting the date
                paidDate = `${day < 10 ? "0" : ""}${day}-${
                  monthAbbreviations[monthIndex]
                }-${year}`;
                dueDate = `${dueday < 10 ? "0" : ""}${dueday}-${
                  monthAbbreviations[duemonthIndex]
                }-${dueyear}`;

                if (item.paidamount < 1) {
                  return null; // Do not render anything
                }

                return (
                  <TableBody>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell className="border border 1 text-center">
                        Installment {index + 1}
                      </TableCell>

                      <TableCell className="border border 1 text-center">
                        {dueDate}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {Number(
                          parseFloat(item.dueamount).toFixed(2)
                        ).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="border border 1 text-center">
                        {paidDate}
                      </TableCell>
                      <TableCell className="border border 1 text-center  ">
                        {Number(item.paidamount).toLocaleString("en-IN")}
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
                          style={{ width: "40px", paddingRight: "15px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="iconn" />
                          <div class="hover-text">admin</div>
                        </Link>
                        <Link
                          to={`/invoice/${id}/${index}/Installment/studentinvoice`}
                          style={{ width: "40px" }}
                          className=" hover-container"
                        >
                          <CreditScoreIcon className="iconn" />
                          <div class="hover-text">Student</div>
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
                  {Number(
                    parseFloat(installment.dueamount).toFixed(2)
                  ).toLocaleString("en-IN")}
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
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cheque">Cheque</option>
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
