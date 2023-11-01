import React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./Addtofee.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
const Addtofee = () => {
  const navigator = useNavigate();
  const [dueamount, setdueamount] = useState();
  const [initialpayment, setinitialpayment] = useState([
    { initialamount: 0, paiddate: "", modeofpayment: "", transactionID: "" },
  ]);
  const [totalinstallment, settotalinstallment] = useState();
  const [totalinstallments, settotalinstallments] = useState();
  const [totalpaidamount, settotalpaidamount] = useState();

  const { id } = useParams();
  const [studentdata, setstudentdata] = useState("");

  const handleInputChange = (event, index, key) => {
    const updatedPayments = [...initialpayment];
    updatedPayments[index][key] = event.target.value;
    setinitialpayment(updatedPayments);
  };
  useEffect(() => {
    settotalinstallments([
      {
        totalinstallments: parseInt(totalinstallment),
        totalinstallmentspaid: 0,
        totalinstallmentsleft: parseInt(totalinstallment),
      },
    ]);
  }, [totalinstallment]);
  useEffect(() => {
    // Make a GET request to your backend API endpoint
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
  console.log("studentdata", studentdata);

  const [selectedOption, setSelectedOption] = useState("option1");
  useEffect(() => {
    setdueamount(studentdata.dueamount);
  }, [studentdata]);
  useEffect(() => {
    setdueamount(studentdata.dueamount - initialpayment[0].initialamount);
  }, [initialpayment]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addfee = true;
    let installments = Array(parseInt(totalinstallment))
      .fill()
      .map((_, index) => ({
        id: Date.now(),
        duedate: "",
        paidamount: "",
        paiddate: "",
        modeofpayment: "",
        transactionid: "",
        paymentdone: false,
      }));
    const totalpaidamount = parseInt(initialpayment[0].initialamount);
    const updatedData = {
      dueamount,
      initialpayment,
      totalinstallments,
      addfee,
      installments,
      totalpaidamount,
    };
    console.log("installments", installments);
    console.log("updatedData", updatedData);
    axios
      .put(`${process.env.REACT_APP_API_URL}/addfee/${id}`, updatedData)

      .then((res) => {
        if (res.data.updated) {
          alert("Fee Added");

          navigator(`/feeview/${id}`);
        } else {
          alert("Try Again");
        }
      });
  };

  return (
    <>
      <div className="addfee container">
        <div className="adding">
          {" "}
          <h4> Add Fee Details</h4> <hr />
          {/* <div className="row pt-5">
            <TextField
              label="Name"
              className="col-12 col-md-4 col-lg-4 col-xl-4"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {studentdata.name}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Email"
              className="col-12 col-md-4 col-lg-4 col-xl-4"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {studentdata.email}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Mobile Number"
              className="col-12 col-md-4 col-lg-4 col-xl-4"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {studentdata.mobilenumber}
                  </InputAdornment>
                ),
              }}
            />
           
          </div> */}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="name"
                value={studentdata.name}
                required
              />
              <label> Full Name</label>
            </div>
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="email"
                value={studentdata.email}
                required
              />
              <label> Email</label>
            </div>
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="phonenumber"
                value={studentdata.mobilenumber}
                required
              />
              <label> Phone Number</label>
            </div>
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="courses"
                value={studentdata.courses}
                required
              />
              <label> Courses</label>
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="date"
                value={studentdata.admissiondate}
                required
              />
              <label> Date of Joining</label>
            </div>
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input
                type="text"
                name="text"
                value={studentdata.finaltotal}
                required
              />
              <label> Total Amount</label>
            </div>
            <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
              <input type="text" name="dueamount" value={dueamount} required />
              <label> Due Amount</label>
            </div>
            {/* <div className="col-12 col-md-3 col-lg-3 col-xl-3 inputgroup"> 
           <input
              type="number"
              value={initialamount}
              onChange={(e) => setinitialamount(e.target.value)}
            />
            <label> Initial Amount </label>
           </div> */}
            {/* <input type="text" value={studentdata.admissiondate} /> */}

            {/* <TextField id="outlined-basic"  label=" Course date" variant="outlined"  className="textfield" type="date"/> */}
          </div>
          <h4 className="my-3"> Admission Fee</h4>
          <hr></hr>
          {initialpayment.map((payment, index) => (
            <div className="row" key={index}>
              <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
                <input
                  type="number"
                  name="paidamount"
                  className="w-100"
                  value={payment.initialamount}
                  onChange={(e) => handleInputChange(e, index, "initialamount")}
                />
                <label>
                  {" "}
                  Admission Fee <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
                <input
                  type="date"
                  name="paiddate"
                  className="w-100"
                  value={payment.paiddate}
                  onChange={(e) => handleInputChange(e, index, "paiddate")}
                />
                <label>
                  {" "}
                  Paid Date <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup-select">
                <select
                  className="w-100"
                  name="modeofpayment"
                  value={payment.modeofpayment}
                  onChange={(e) => handleInputChange(e, index, "modeofpayment")}
                >
                  <option value="">---select---</option>
                  <option value="upi">UPI</option>
                  <option value="cash">Cash</option>
                  <option value="backtransfor"> Bank Transfor</option>
                  <option value="cheque"> CHEQUE</option>
                </select>
                <label>
                  {" "}
                  Mode of Payments <span className="text-danger"> * </span>
                </label>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-3 inputgroup">
                <input
                  type="text"
                  className="w-100"
                  name="transactionid"
                  value={payment.transactionID}
                  onChange={(e) => handleInputChange(e, index, "transactionID")}
                />
                <label>
                  {" "}
                  Transaction Id <span className="text-danger"> * </span>
                </label>
              </div>
            </div>
            // <div key={index}>
            //   <label>Initial Amount</label>
            //   <input
            //     type="text"
            //     value={payment.initialamount}
            //     onChange={(e) => handleInputChange(e, index, "initialamount")}
            //   />
            //   <label>Paid Date</label>
            //   <input
            //     type="text"
            //     value={payment.paiddate}
            //     onChange={(e) => handleInputChange(e, index, "paiddate")}
            //   />
            //   <label>Mode of Payment</label>
            //   <input
            //     type="text"
            //     value={payment.modeofpayment}
            //     onChange={(e) => handleInputChange(e, index, "modeofpayment")}
            //   />
            //   <label>Transaction ID</label>
            //   <input
            //     type="text"
            //     value={payment.transactionID}
            //     onChange={(e) => handleInputChange(e, index, "transactionID")}
            //   />
            // </div>
          ))}
          <div className="row ">
            <div className=" col-12 col-md-6 col-xl-6 col-lg-6 inputgroup">
              <input
                type="number"
                value={totalinstallment}
                onChange={(e) => settotalinstallment(e.target.value)}
              />
              <label>No.of Installments </label>
            </div>
            <div className="col-12 col-md-6 col-xl-6 col-lg-6">
              <button
                className=" btn btn-primary my-3 end "
                onClick={handleSubmit}
              >
                Add to Fee
              </button>
            </div>
            {/* <TextField
              id="outlined-basic"
              label="No. of Installments"
              variant="outlined"
              className="textfield"
              value={totalinstallment}
              onChange={(e) => settotalinstallment(e.target.value)}
            /> */}
          </div>
        </div>
      </div>{" "}
    </>
  );
};
export default Addtofee;
