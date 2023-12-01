import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
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
  const [studentdata, setstudentdata] = useState("");
  const { id } = useParams();
  const navigator = useNavigate();
  const [dueamount, setdueamount] = useState();
  const [totalpaidamount, settotalpaidamount] = useState();
  const [noOfinstallments, setNoOfinstallments] = useState();
  const [installments, setInstallments] = useState();
  const [totalinstallments, settotalinstallments] = useState();
  const [extraDiscount, setExtraDiscount] = useState();
  const [Discountremarkshistory, setDiscount_remarks_history] = useState("");
  const [text, setText] = useState("");

  const [admissionFee, setAdmissionFee] = useState({
    initialamount: 0,
    paiddate: "",
    modeofpayment: "",
    transactionID: "",
    paymentdone: false,
  });
  useEffect(() => {
    if (students && id) {
      const filteredResults = students.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      setstudentdata(filteredResults[0]);
    }
  }, [students, id, dispatch]);
  useEffect(() => {
    settotalinstallments(studentdata.totalinstallments);
    setInstallments(studentdata.installments);
  }, [studentdata, dispatch, students]);
  useEffect(() => {
    setdueamount(studentdata.dueamount);
    settotalpaidamount(studentdata.totalpaidamount);
  }, [studentdata]);
  // useEffect(() => {
  //   setdueamount(studentdata.dueamount - admissionFee.admissionfee);
  // }, [admissionFee]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmissionFee((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };
  const handleAdmissionFee = () => {
    let initialpayment = [];
    initialpayment.push(admissionFee);
    initialpayment[0].initialamount = parseInt(initialpayment[0].initialamount);
    initialpayment[0].paymentdone = true;
    let totalpaidamount =
      parseInt(studentdata.totalpaidamount) +
      parseInt(admissionFee.initialamount);
    let dueamount =
      parseInt(studentdata.dueamount) - parseInt(admissionFee.initialamount);
    const updatedData = {
      dueamount,
      initialpayment,
      totalpaidamount,
    };
    const updateContext = {
      dueamount,
      initialpayment,
      totalpaidamount,
      id: studentdata.id,
    };

    axios
      .put(`${process.env.REACT_APP_API_URL}/admissionfee/${id}`, updatedData)

      .then((res) => {
        if (res.data.updated) {
          alert("Admission Fee Paid");
          dispatch({
            type: "UPDATE_ADMISSIONFEE",
            payload: updateContext,
          });

          // navigator(`/feeview/${id}`);
        } else {
          alert("Try Again");
        }
      });
    setAdmissionFee({
      initialamount: 0,
      paiddate: "",
      modeofpayment: "",
      transactionID: "",
      paymentdone: false,
    });
  };
  const handleNoOfInstallments = (e) => {
    e.preventDefault();
    const addfee = true;
    let installments = Array(parseInt(noOfinstallments))
      .fill()
      .map((_, index) => ({
        id: Date.now(),
        installmentNumber: index + 1,
        duedate: "",
        // dueamount: parseInt(dueamount) / parseInt(noOfinstallments),
        dueamount: 0,
        paidamount: 0,
        paiddate: "",
        modeofpayment: "",
        transactionid: "",
        paymentdone: false,
        subInstallmentNumber: 0,
      }));
    let totalinstallments = [
      {
        totalinstallments: parseInt(noOfinstallments),
        totalinstallmentspaid: 0,
        totalinstallmentsleft: parseInt(noOfinstallments),
      },
    ];
    const updatedData = {
      totalinstallments,
      addfee,
      installments,
    };
    const updateContext = {
      totalinstallments,
      installments,
      addfee,
      id: studentdata.id,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/noofinstallments/${id}`,
        updatedData
      )

      .then((res) => {
        if (res.data.updated) {
          alert("Installments Added");
          dispatch({
            type: "UPDATE_NO_OF_INSTALLMENTS",
            payload: updateContext,
          });
          navigator(`/feeview/${id}`);
        } else {
          alert("Try Again");
        }
      });
  };

  const handleInstallmentUpdate = (index, name, value) => {
    setInstallments((prevInstallments) => {
      const updatedInstallments = [...prevInstallments];
      updatedInstallments[index] = {
        ...updatedInstallments[index],
        [name]: value,
      };
      return updatedInstallments;
    });
  };

  const UpdateDueDateAndDueAmount = () => {
    // e.preventDefault();

    // let nextduedate = [];
    let nextduedate;
    for (let i = 0; i < installments.length; i++) {
      if (installments[i].paidamount < 1) {
        nextduedate = installments[i].duedate;
        break;
      }
      // nextduedate.push(installments[i].duedate);
    }

    const updatedData = {
      installments,
      // totalinstallments,
      // dueamount,
      // totalpaidamount,
      nextduedate,
    };

    const updateContext = {
      installments,
      // totalinstallments,
      // dueamount,
      // totalpaidamount,
      nextduedate,
      id: studentdata.id,
    };
    console.log("updatedData", updatedData, updateContext);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateduedateanddueamount/${id}`,
        updatedData
      )

      .then((res) => {
        if (res.data.updated) {
          alert("Date and Amount Added");
          dispatch({
            type: "UPDATE_DUE_DATE_DUE_AMOUNT",
            payload: updateContext,
          });
          // navigator(`/feeview/${id}`);
          // window.location.reload();
        } else {
          alert("Try Again");
        }
      });
  };
  const handleUpdateClick = async (index) => {
    if (installments[index].paidamount > 0) {
      // Update state
      const updatedInstallments = await updateInstallments(index);

      // Now that state is updated, proceed with other actions
      let nextduedate;
      for (let i = 0; i < updatedInstallments.length; i++) {
        if (updatedInstallments[i].paidamount < 1) {
          nextduedate = updatedInstallments[i].duedate;
          break;
        }
      }

      // let totalpaidamount = 0;
      // totalpaidamount = totalpaidamount + parseInt(admissionFee.admissionfee);
      // for (let i = 0; i < updatedInstallments.length; i++) {
      //   if (updateInstallments[i].paidamount) {
      //     totalpaidamount =
      //       totalpaidamount + parseInt(updateInstallments[i].paidamount);
      //   }
      // }
      let totalpaidamount = 0;
      totalpaidamount =
        totalpaidamount + studentdata.initialpayment[0].initialamount;
      for (let i = 0; i < updatedInstallments.length; i++) {
        totalpaidamount = totalpaidamount + updatedInstallments[i].paidamount;
        // console.log("updatedInstallments", updatedInstallments[i].paidamount);
      }
      let dueamount = parseInt(studentdata.finaltotal);
      dueamount = dueamount - studentdata.initialpayment[0].initialamount;
      for (let i = 0; i < updatedInstallments.length; i++) {
        dueamount = dueamount - updatedInstallments[i].paidamount;
      }
      const updatedData = {
        installments: updatedInstallments,
        totalinstallments,
        dueamount,
        totalpaidamount,
        nextduedate,
      };
      console.log(
        "studentdata.initialpayment[0].initialamount",
        studentdata.initialpayment[0].initialamount
      );
      // console.log("updatedDataa", updatedData, updateContext);

      const updateContext = {
        installments: updatedInstallments,
        totalinstallments,
        dueamount,
        totalpaidamount,
        nextduedate,
        id: studentdata.id,
      };

      console.log("updatedDataaa", updatedData, updateContext);

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}/feeinstallments/${id}`,
          updatedData
        );

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
      } catch (error) {
        console.error("Error updating data:", error);
        // Handle errors here
      }
    } else {
      alert("Paid should be greater than 0");
    }
  };

  const updateInstallments = (index) => {
    return new Promise((resolve) => {
      setInstallments((prevInstallments) => {
        const updatedInstallments = [...prevInstallments];
        if (parseInt(updatedInstallments[index].paidamount) > 0) {
          updatedInstallments[index].paymentdone = true;
        }
        if (
          parseInt(updatedInstallments[index].paidamount) < 1 ||
          updatedInstallments[index].paidamount === ""
        ) {
          updatedInstallments[index].paymentdone = false;
        }
        // Check if paidamount is less than dueamount
        if (
          updatedInstallments[index].paidamount <
          updatedInstallments[index].dueamount
        ) {
          // Calculate the subInstallmentNumber based on the existing installment
          const existingSubInstallmentNumber =
            updatedInstallments[index].subInstallmentNumber || 0;
          const newSubInstallmentNumber = existingSubInstallmentNumber + 1;

          // Create a new installment with the remaining amount and updated subInstallmentNumber
          const newInstallment = {
            ...updatedInstallments[index],
            installmentNumber: updatedInstallments[index].installmentNumber,
            dueamount:
              updatedInstallments[index].dueamount -
              updatedInstallments[index].paidamount,
            paidamount: 0,
            paiddate: "",
            modeofpayment: "",
            transactionid: "",
            paymentdone: false,
            subInstallmentNumber: newSubInstallmentNumber,
          };

          // Insert the new installment after the current one
          updatedInstallments.splice(index + 1, 0, newInstallment);
        }
        resolve(updatedInstallments);
        return updatedInstallments;
      });
    });
  };

  /// extra discount

  const handleApplyDiscount = () => {
    setOpen(false);

    let dueamount;
    if (extraDiscount) {
      dueamount = parseInt(studentdata.dueamount) - parseInt(extraDiscount);
    }
    // let updatedInstallmentAmount =
    //   dueamount / totalinstallments[0].totalinstallmentsleft;
    // for (let i = 0; i < installments.length; i++) {
    //   const updatedInstallments = [...installments];
    //   if (updatedInstallments[i].paymentdone === false) {
    //     updatedInstallments[i].dueamount = parseInt(updatedInstallmentAmount);
    //   }

    //   setInstallments(updatedInstallments);
    // }
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <div className="container mt-3">
      <div className="feeview">
        <div className="d-flex justify-content-between my-2 ms-2">
          {studentdata && (
            <h4 className="pt-3"> {studentdata.name} Fee Details</h4>
          )}
          <span>
            {studentdata && studentdata.installments[0] && (
              <div>
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
            )}{" "}
          </span>
        </div>
        <div className="mb-3">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table-cell-heading">
                    Total Amount
                  </StyledTableCell>

                  <StyledTableCell className="table-cell-heading">
                    Paid Amount
                  </StyledTableCell>

                  <StyledTableCell className="table-cell-heading">
                    Due Amount
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Extra Discount
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Paid Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell className="Table-cell text-center">
                    <span
                      title={Number(studentdata.finaltotal).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        // width: "2.5rem",
                        // whiteSpace: "nowrap",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                        fontSize: "13px",
                        // display: "block",
                      }}
                    >
                      {Number(studentdata.finaltotal).toLocaleString("en-IN")}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell className="Table-cell text-center">
                    <span
                      title={Number(studentdata.totalpaidamount).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        // width: "2.5rem",
                        // whiteSpace: "nowrap",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                        fontSize: "13px",
                        // display: "block",
                      }}
                    >
                      {Number(studentdata.totalpaidamount).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell className="Table-cell text-center">
                    <span
                      title={Number(studentdata.dueamount).toLocaleString(
                        "en-IN"
                      )}
                      style={{
                        // width: "2.5rem",
                        // whiteSpace: "nowrap",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                        fontSize: "13px",
                        // display: "block",
                      }}
                    >
                      {Number(studentdata.dueamount).toLocaleString("en-IN")}
                    </span>

                    {/* {dueamount} */}
                  </StyledTableCell>

                  <StyledTableCell className="Table-cell text-center">
                    <span
                      title={studentdata.totalpaidamount}
                      style={{
                        // width: "2.5rem",
                        // whiteSpace: "nowrap",
                        // overflow: "hidden",
                        // textOverflow: "ellipsis",
                        fontSize: "13px",
                        // display: "block",
                      }}
                    >
                      {extra_discount_view && (
                        <>
                          {Number(extra_discount_view).toLocaleString("en-IN")}
                        </>
                      )}
                    </span>
                  </StyledTableCell>

                  <StyledTableCell className="Table-cell text-center">
                    {studentdata.totalinstallments &&
                      studentdata.totalinstallments.length > 0 &&
                      studentdata.totalinstallments.map((item, index) => {
                        if (true) {
                          return (
                            <div style={{ fontSize: "13px" }}>
                              <span
                                style={dynamicStyle}
                                className="text-center"
                              >
                                {item.totalinstallmentspaid}/
                                {item.totalinstallments}
                              </span>
                              <span style={dynamicStyle}>
                                <CheckCircleIcon
                                  style={IconStyle}
                                  className="icon-color"
                                />
                              </span>
                            </div>
                          );
                        }
                      })}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <h4 className="ms-2"> Collect Fee</h4>
        <hr className="mb-2 w-75" /> */}
        {/* admission fee payment */}
        {studentdata && !studentdata.initialpayment[0] && (
          <div>
            <h4 className="my-3 ms-2"> Admission Fee</h4>
            <hr></hr>
            <div className="row mb-3">
              <div className="col-12 col-md-6 col-lg-2 col-xl-2 inputgroup">
                <input
                  type="number"
                  name="initialamount"
                  value={admissionFee.initialamount}
                  onChange={handleInputChange}
                />
                <label>
                  Admission Fee <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-2 col-xl-2 inputgroup">
                <input
                  type="date"
                  name="paiddate"
                  value={admissionFee.paiddate}
                  onChange={handleInputChange}
                />
                <label>
                  Paid Date <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-2 col-xl-2 inputgroup-select">
                <select
                  name="modeofpayment"
                  value={admissionFee.modeofpayment}
                  onChange={handleInputChange}
                >
                  <option value="">---select---</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>
                <label>
                  Mode of Payments <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-2 col-xl-2 inputgroup ms-3">
                <input
                  type="text"
                  name="transactionID"
                  value={admissionFee.transactionID}
                  onChange={handleInputChange}
                />
                <label>
                  Transaction Id <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-2 col-xl-2 mt-3">
                <button
                  className="btn btn-color end"
                  onClick={handleAdmissionFee}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

        {/* enter no of installments */}
        {studentdata &&
          studentdata.initialpayment[0] &&
          studentdata.initialpayment[0].paymentdone === true &&
          !studentdata.totalinstallments[0] && (
            // !studentdata.totalinstallments[0] &&
            <div>
              <h4 className="mt-3"> Fee Installments</h4>
              <hr className="mt-1 mb-3" />
              <div className="row m-0 p-0">
                <div className="col-3 col-md-3 col-lg-3 col-xl-3 pt-2">
                  Enter No.of Installments :-
                </div>

                <span className="col-2 col-md-2 col-lg-2 col-xl-2">
                  <TextField
                    type="number"
                    variant="standard"
                    className="w-75 "
                    value={noOfinstallments}
                    onChange={(e) => setNoOfinstallments(e.target.value)}
                  />
                </span>

                {/* <div className=" col-12 col-md-6 col-xl-6 col-lg-6 inputgroup">
                    <input
                      type="number"
                      value={noOfinstallments}
                      onChange={(e) => setNoOfinstallments(e.target.value)}
                    />
                    <label> Enter No.of Installments </label>
                  </div> */}
                <div className="col-12 col-md-6 col-xl-6 col-lg-6">
                  <button
                    className=" btn btn-primary "
                    onClick={handleNoOfInstallments}
                  >
                    Add No. of Installments
                  </button>
                </div>
              </div>
            </div>
          )}

        {/* installments payment */}
        <div>
          {studentdata &&
            installments &&
            installments.map((installment, index) => {
              if (installment.paymentdone === true) {
                return null; // Do not render anything
              }
              return (
                <div className="installment" key={index}>
                  <h5 className="mt-1 ms-2">
                    Installment {installment.installmentNumber}
                    {installment.subInstallmentNumber != 0 && (
                      <>/ {installment.subInstallmentNumber}</>
                    )}
                  </h5>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                      <input
                        type="date"
                        name="Installment Date"
                        className="w-100"
                        onChange={(e) =>
                          handleInstallmentUpdate(
                            index,
                            "duedate",
                            e.target.value
                          )
                        }
                        value={installment.duedate}
                      />
                      <label> Installment Date</label>
                    </div>

                    <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                      <input
                        type="number"
                        name="Installment Amount"
                        className="w-100"
                        onChange={(e) =>
                          handleInstallmentUpdate(
                            index,
                            "dueamount",
                            parseFloat(e.target.value)
                          )
                        }
                        value={installment.dueamount}
                      />
                      <label> Installment Amount</label>
                    </div>
                    {studentdata &&
                      studentdata.installments[index] &&
                      studentdata.installments[index].duedate &&
                      studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                          <input
                            type="date"
                            name="paiddate"
                            className="w-100"
                            onChange={(e) =>
                              handleInstallmentUpdate(
                                index,
                                "paiddate",
                                e.target.value
                              )
                            }
                            value={installment.paiddate}
                          />
                          <label> Paid Date</label>
                        </div>
                      )}
                    {studentdata &&
                      studentdata.installments[index] &&
                      studentdata.installments[index].duedate &&
                      studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                          <input
                            type="number"
                            name="paidamount"
                            className="w-100"
                            onChange={(e) =>
                              handleInstallmentUpdate(
                                index,
                                "paidamount",
                                parseFloat(e.target.value)
                              )
                            }
                            value={installment.paidamount}
                          />
                          <label> Paid Amount</label>
                        </div>
                      )}
                    {studentdata &&
                      studentdata.installments[index] &&
                      studentdata.installments[index].duedate &&
                      studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 mul-input">
                          <select
                            className="w-100"
                            name="modeofpayment"
                            onChange={(e) =>
                              handleInstallmentUpdate(
                                index,
                                "modeofpayment",
                                e.target.value
                              )
                            }
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
                      )}
                    {studentdata &&
                      studentdata.installments[index] &&
                      studentdata.installments[index].duedate &&
                      studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input">
                          <input
                            type="text"
                            className="w-100"
                            name="transactionid"
                            onChange={(e) =>
                              handleInstallmentUpdate(
                                index,
                                "transactionid",
                                e.target.value
                              )
                            }
                            value={installment.transactionid}
                          />
                          <label> Transaction Id</label>
                        </div>
                      )}

                    {studentdata &&
                      studentdata.installments[index] &&
                      studentdata.installments[index].duedate &&
                      studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input ">
                          <button
                            className="btn btn-color center"
                            onClick={() => handleUpdateClick(index)}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    {studentdata &&
                      studentdata.installments[index] &&
                      !studentdata.installments[index].duedate &&
                      !studentdata.installments[index].dueamount && (
                        <div className="col-12 col-md-6 col-lg-2 col-xl-2 student-input ">
                          <button
                            className="btn btn-color center"
                            onClick={UpdateDueDateAndDueAmount}
                          >
                            Update
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
        </div>
        {/* Display admission fee payment table*/}

        {studentdata &&
          studentdata.initialpayment[0] &&
          studentdata.initialpayment[0].paymentdone === true && (
            <TableContainer component={Paper} className="mt-4">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="table-cell-heading">
                      Admission Fee
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      {" "}
                      Paid Date
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      {" "}
                      Mode of Payment
                    </StyledTableCell>
                    <StyledTableCell className="table-cell-heading">
                      {" "}
                      Transition ID
                    </StyledTableCell>
                    {/* <TableCell className="table-cell-heading">
                  {" "}
                  Admin Invoice
                </TableCell> */}
                    <StyledTableCell className="table-cell-heading">
                      {" "}
                      Invoice
                    </StyledTableCell>
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
                        <StyledTableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell className="border border 1 text-center">
                            {Number(item.initialamount).toLocaleString("en-IN")}
                          </StyledTableCell>
                          <StyledTableCell className="border border 1 text-center">
                            {paidDate}
                          </StyledTableCell>
                          <StyledTableCell className="border border 1 text-center">
                            {item.modeofpayment}
                          </StyledTableCell>
                          <StyledTableCell className="border border 1 text-center">
                            {item.transactionID}
                          </StyledTableCell>
                          {/* <TableCell className="border border 1 text-center">
                      <Link
                        to={`/invoice/${id}/${index}/Admission Fee/admininvoice`}
                        style={{ width: "40px" }}
                      >
                        <CreditScoreIcon className="iconn" />
                      </Link>
                    </TableCell> */}
                          <StyledTableCell className="border border 1 text-center">
                            <Link
                              to={`/invoice/${id}/${index}/Admission Fee/studentinvoice`}
                              style={{ width: "40px" }}
                            >
                              <CreditScoreIcon className="icon-color" />
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      </TableBody>
                    );
                  })}
              </Table>
            </TableContainer>
          )}
        {/* Display course fee payment table*/}

        {studentdata && studentdata.installments[0] && (
          <TableContainer component={Paper} className="mt-4">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="table-cell-heading">
                    {" "}
                    Installment
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Due Date
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Due Amount
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Paid Date
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Paid Amount
                  </StyledTableCell>

                  <StyledTableCell className="table-cell-heading">
                    Mode of Payment
                  </StyledTableCell>
                  <StyledTableCell className="table-cell-heading">
                    Transition ID
                  </StyledTableCell>

                  <StyledTableCell className="table-cell-heading">
                    {" "}
                    Invoice
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              {installments &&
                installments.map((item, index) => {
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
                      <StyledTableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell className="Table-cell text-center">
                          Installment {item.installmentNumber}{" "}
                          {item.subInstallmentNumber != 0 && (
                            <>/ {item.subInstallmentNumber}</>
                          )}
                        </StyledTableCell>

                        <StyledTableCell className="Table-cell text-center">
                          {dueDate}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell text-center">
                          {Number(
                            parseFloat(item.dueamount).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell text-center">
                          {paidDate}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell text-center">
                          {Number(item.paidamount).toLocaleString("en-IN")}
                        </StyledTableCell>

                        <StyledTableCell className="Table-cell text-center">
                          {item.modeofpayment}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell text-center">
                          {item.transactionid}
                        </StyledTableCell>
                        <StyledTableCell className="Table-cell text-center">
                          <Link
                            to={`/invoice/${id}/${index}/Installment/admininvoice`}
                            style={{ width: "40px", paddingRight: "15px" }}
                            className=" hover-container"
                          >
                            <CreditScoreIcon className="icon-color" />
                            <div class="hover-text">admin</div>
                          </Link>
                          <Link
                            to={`/invoice/${id}/${index}/Installment/studentinvoice`}
                            style={{ width: "40px" }}
                            className=" hover-container"
                          >
                            <CreditScoreIcon className="icon-color" />
                            <div class="hover-text">Student</div>
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  );
                })}
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default FeeView;
