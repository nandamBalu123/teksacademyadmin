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
  const [initialamount, setinitialamount] = useState();
  const [totalinstallments, settotalinstallments] = useState();
  const { id } = useParams();
  const [studentdata, setstudentdata] = useState("");

  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`http://localhost:3030/viewstudentdata/${id}`)
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
  
  useEffect(() => {
    setdueamount(studentdata.dueamount);
  }, [studentdata]);
  const [selectedOption, setSelectedOption] = useState("option1");

  
  useEffect(() => {
    setdueamount(studentdata.dueamount - initialamount);
  }, [initialamount]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



  

  const handleSubmit = (e) => {
    // dueamount,initialamount,totalinstallments5
    e.preventDefault();
    axios.put(`http://localhost:3030/addfee/${id}`, dueamount, initialamount, totalinstallments)
    .then(res => {
      if(res.data.updated){
        alert('Fee Added')
        navigator('/studentdata')
      }else{
        alert("Try Again");
      }
    })



  };
  return (
    <>
      <div className="addfee">
        <div className="adding">
          {" "}
          <h4> Add Fee Details</h4> <hr />
          <div className="d-flex justify-content-around pt-5">
            <TextField
              label="Name"
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
            <TextField
              label="Course"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {studentdata.courses}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-flex justify-content-around pt-5">
            {/* <input type="text" value={studentdata.admissiondate} /> */}
            <TextField
              id="outlined-basic"
              label="Date Of Joining"
              variant="outlined"
              className="textfield"
              type="date"
              value={studentdata.admissiondate}
              InputLabelProps={{
                shrink: true, // This will make the label float when there is a value
              }}
              InputProps={{
                style: {
                  // Hide the placeholder text
                  textOverflow: "clip",
                  padding: "0", // Adjust padding as needed
                  "&::-webkit-calendar-picker-indicator": {
                    display: "none", // Hide the calendar icon in Chrome
                  },
                },
              }}
            />
            {/* <TextField id="outlined-basic"  label=" Course date" variant="outlined"  className="textfield" type="date"/> */}
            <TextField
              label="Total Amount"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {studentdata.finaltotal}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Initial Pay Amount"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={initialamount}
              onChange={(e) => setinitialamount(e.target.value)}
            />
            <TextField
              label="Due Amount"
              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{dueamount}</InputAdornment>
                ),
              }}
            />
          </div>
          <div className="d-flex justify-content-around pt-5">
            <TextField
              id="outlined-basic"
              label="No. of Installments"
              variant="outlined"
              className="textfield"
              value={totalinstallments}
              onChange={(e) => settotalinstallments(e.target.value)}
            />
            <p>Due Date Type</p>
            <label>
              <input
                type="radio"
                name="fixed"
                value="fixed"
                checked={selectedOption === "option1"}
                onChange={handleOptionChange}
              />
              Fixed
            </label>

            <label>
              <input
                type="radio"
                name="customized"
                value="customized"
                checked={selectedOption === "option2"}
                onChange={handleOptionChange}
              />
              Customized
            </label>
          </div>
          <button onClick={handleSubmit}>Add to Fee</button>
        </div>{" "}
      </div>
    </>
  );
};
export default Addtofee;
