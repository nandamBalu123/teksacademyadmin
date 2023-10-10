// import * as React from "react";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./RegistrationForm.css";
import axios from "axios";

import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
// import { blue } from "@mui/material/colors";
export default function RegistrationForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);
  const [parentsname, setParentsName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [college, setCollege] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [native, setNative] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [whatsAppNo, setWhatsAppNo] = useState(null);
  const [educationType, setEducationType] = useState("");
  const [marks, setMarks] = useState("");
  const [academicyear, setAcademicyear] = useState("");
  const [profilepic, setProfilePpic] = useState("");
  const [enquiryDate, setEnquiryDate] = useState("");
  const [enquiryTakenBy, setEnquiryTakenBy] = useState("");
  const [coursePackage, setCoursepakage] = useState("");
  const [courses, setCourses] = useState("");
  const [leadSource, setLeadSource] = useState("");
  const [branch, setBranch] = useState("");
  const [modeOfTraining, setModeOfTraining] = useState("");
  const [admissionStatus, setAdmissionStatus] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [validityStartDate, setValidityStartDate] = useState("");
  const [validityEndDate, setValidityEndDate] = useState("");

  const [feetype, setfeetype] = useState("");
  const [amount, setAmount] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [taxamount, setTaxamount] = useState(null);
  const [totalamount, setTotalamount] = useState(null);
  const [feedetails, setFeeDetails] = useState([]);
  const [feedetailsbilling, setfeedetailsbilling] = useState([]);
  const [materialfee, setmaterialfee] = useState(null);
  const [finaltotal, setfinaltotal] = useState(null);
  const [admissionremarks, setadmissionremarks] = useState("");
  const [assets, setassets] = useState("");

  const [totalfeewithouttax, settotalfeewithouttax] = useState(null);
  const [totaltax, settotaltax] = useState(null);
  const [grandtotal, setGrandtotal] = useState(null);

  const [grosstotal, setGrosstotal] = useState(null);
  const [totaldiscount, setTotalDiscount] = useState(null);

  const handleFeecalculations = () => {
    let grosstotall = 0;
    let totaldiscountt = 0;
    let totalfeewithouttaxx = 0;
    let totaltaxx = 0;
    let grandtotall = 0;
    let materialfeee = 0;
    const array = [];
    for (let i = 0; i < feedetails.length; i++) {
      if (feedetails[i].feetype === "admissionfee") {
        let admissionobject = {
          id: "",
          feetype: "",
          feewithtax: 0,
          feewithouttax: 0,
          feetax: 0,
        };
        admissionobject.id = feedetails[i].id;
        admissionobject.feetype = "Admission Fee";
        admissionobject.feewithtax = feedetails[i].totalamount;
        admissionobject.feewithouttax = admissionobject.feewithtax / 1.18;
        admissionobject.feetax =
          admissionobject.feewithtax - admissionobject.feewithouttax;
        grosstotall = grosstotall + parseInt(feedetails[i].amount);
        totaldiscountt = totaldiscountt + feedetails[i].discount;
        totalfeewithouttaxx =
          totalfeewithouttaxx + admissionobject.feewithouttax;
        totaltaxx = totaltaxx + admissionobject.feetax;
        grandtotall = grandtotall + admissionobject.feewithtax;

        array.push(admissionobject);
      }
      if (feedetails[i].feetype === "fee") {
        let coursefeeobject = {
          id: "",
          feetype: "",
          feewithtax: 0,
          feewithouttax: 0,
          feetax: 0,
        };
        coursefeeobject.id = feedetails[i].id;
        coursefeeobject.feetype = "Course Fee";
        coursefeeobject.feewithtax = feedetails[i].totalamount * 0.65;
        coursefeeobject.feewithouttax = coursefeeobject.feewithtax / 1.18;
        coursefeeobject.feetax =
          coursefeeobject.feewithtax - coursefeeobject.feewithouttax;
        // settotalfeewithouttax((value) => value + coursefeeobject.feewithouttax);
        // settotaltax((value) => value + coursefeeobject.feetax);
        // setGrandtotal((value) => value + coursefeeobject.feewithtax);
        grosstotall = grosstotall + parseInt(feedetails[i].amount * 0.65);
        totaldiscountt = totaldiscountt + feedetails[i].discount * 0.65;

        totalfeewithouttaxx =
          totalfeewithouttaxx + coursefeeobject.feewithouttax;
        totaltaxx = totaltaxx + coursefeeobject.feetax;
        grandtotall = grandtotall + coursefeeobject.feewithtax;
        array.push(coursefeeobject);
        let materialfeeobject = {
          id: "",
          feetype: "",
          feewithtax: 0,
          feewithouttax: 0,
          feetax: 0,
        };
        materialfeeobject.id = feedetails[i].id;
        materialfeeobject.feetype = "Material Fee";
        materialfeeobject.feewithtax = feedetails[i].totalamount * 0.35;
        materialfeeobject.feewithouttax = materialfeeobject.feewithtax;
        materialfeeobject.feetax = 0;

        // settotalfeewithouttax(
        //   (value) => value + materialfeeobject.feewithouttax
        // );
        // settotaltax((value) => value + materialfeeobject.feetax);
        // setGrandtotal((value) => value + materialfeeobject.feewithtax);
        grosstotall = grosstotall + parseInt(feedetails[i].amount * 0.35);
        totaldiscountt = totaldiscountt + feedetails[i].discount * 0.35;
        materialfeee =
          materialfeee + parseInt(feedetails[i].totalamount * 0.35);
        // totalfeewithouttaxx =
        //   totalfeewithouttaxx + materialfeeobject.feewithouttax;
        totaltaxx = totaltaxx + materialfeeobject.feetax;
        // grandtotall = grandtotall + materialfeeobject.feewithtax;
        array.push(materialfeeobject);
      }
    }
    setTotalDiscount(totaldiscountt);
    setGrosstotal(grosstotall);
    settotalfeewithouttax(totalfeewithouttaxx);
    settotaltax(totaltaxx);
    setGrandtotal(grandtotall);
    setfeedetailsbilling(array);
    setmaterialfee(materialfeee);

    handleNext();
  };
  useEffect(() => {
    setfinaltotal(grandtotal + materialfee);
  }, [grandtotal, materialfee]);
  useEffect(() => {
    setTotalamount(amount - discount);
    let actualfee = (totalamount * 100) / 118;

    setTaxamount(totalamount - actualfee);
  });
  const handleFeeDetails = (e) => {
    e.preventDefault();

    setFeeDetails([
      ...feedetails,
      {
        id: Date.now(),
        feetype: feetype,
        amount: amount,
        discount: discount,
        taxamount: taxamount,
        totalamount: totalamount,
      },
    ]);
    setAmount(0);
    setDiscount(0);
    setTaxamount(0);

    setTotalamount(0);
  };

  useEffect(() => {
    let date = toString(admissionDate);
    let month = admissionDate[5] + admissionDate[6];
    let year = admissionDate[2] + admissionDate[3];
    let firstbranch;
    if (branch) {
      firstbranch = branch[0].toUpperCase();
    }
    let serialno;
    if (branch == "hitechcity") {
      serialno = hitechcitycount + 1;
    }
    if (branch == "ameerpet") {
      serialno = ameerpetcount + 1;
    }
    if (branch == "dilsukhnagar") {
      serialno = dilsukhnagarcount + 1;
    }
    if (branch == "gachibowli") {
      serialno = gachibowlicount + 1;
    }
    if (serialno) {
      serialno = serialno.toString();
      if (serialno.length === 3) {
        serialno = "0" + serialno;
      }
      if (serialno.length === 2) {
        serialno = "00" + serialno;
      }
      if (serialno.length === 1) {
        serialno = "000" + serialno;
      }
    }

    if (!admissionDate) {
      setRegistrationNumber("");
    }
    if (admissionDate) {
      setRegistrationNumber("TA" + firstbranch + month + year + serialno);
    }
  }, [admissionDate, branch]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = async () => {
    const studentRegistrationdata = {
      name,
      email,
      mobileNumber,
      parentsname,
      birthdate,
      gender,
      maritalStatus,
      college,
      country,
      state,
      area,
      native,
      zipcode,
      whatsAppNo,
      educationType,
      marks,
      academicyear,
      profilepic,
      enquiryDate,
      enquiryTakenBy,
      coursePackage,
      courses,
      leadSource,
      branch,
      modeOfTraining,
      admissionStatus,
      registrationNumber,
      admissionDate,
      validityStartDate,
      validityEndDate,

      feedetails,
      feedetailsbilling,
      totalfeewithouttax,
      grosstotal,
      totaldiscount,
      totaltax,
      grandtotal,
      admissionremarks,
      assets,
    };
    console.log("studentRegistration", studentRegistrationdata);
    try {
      // Make the POST request
      const response = await axios.post(
        "http://localhost:3030/student_form",
        studentRegistrationdata
      );

      navigate("/studentdata");

      // Handle a successful response here
      console.log("Response:", response.data);
    } catch (error) {
      // Handle the error here
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.log(
          "Server returned an error:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // The request was made, but no response was received
        console.log("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request error:", error.message);
      }
    }
  };
  const [getusers, setgetusers] = useState([]);
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3030/userdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setgetusers(data.Result);
      } catch (err) {
        // setError(err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const filteruser = getusers.filter((user) => {
      const filtercounsellar = user.profile === "counsellor";
      return filtercounsellar;
    });
    setfilteredcounsellor(filteruser);
  }, [getusers]);
  const [studentData, setStudentData] = useState([{ name }, { name }]);
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get("http://localhost:3030/getstudent_data")
      .then((response) => {
        // Handle the successful response here
        setStudentData(response.data); // Update the data state with the fetched data

        console.log("data", response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      });
  }, []);

  const ameerpetbranch = studentData.filter(
    (item) => item.branch === "ameerpet"
  );
  const ameerpetcount = ameerpetbranch.length;
  const hitechcitybranch = studentData.filter(
    (item) => item.branch === "hitechcity"
  );
  const hitechcitycount = hitechcitybranch.length;
  const dilsukhnagarbranch = studentData.filter(
    (item) => item.branch === "dilsukhnagar"
  );
  const dilsukhnagarcount = dilsukhnagarbranch.length;
  const gachibowlibranch = studentData.filter(
    (item) => item.branch === "gachibowli"
  );
  const gachibowlicount = gachibowlibranch.length;

  const handleFeeDelete = (id) => {
    const updatedTasks = feedetails.filter((task) => task.id !== id);
    setFeeDetails(updatedTasks);
  };
  return (
    <div className="main-container">
      <div className="main-sub-container ">
        <Typography fontSize={35}>Registration form</Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {/* -----step 1--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Basic Details</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row input ">
                  <label className="col-12 col-md-2 label">
                    Name <span className="text-danger">*</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid Black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <br />
                <div className="row input ">
                  <label className="col-12 col-md-2 label">
                    Email <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="email"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Mobile Number<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                  />
                </div>
                <br />

                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="bg-primary"
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 2--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Details</Typography>
            </StepLabel>
            <StepContent className="">
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Parent's Name <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setParentsName(e.target.value)}
                    value={parentsname}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Birth Date <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthdate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Gender <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Female </option>
                    <option value="degree">Male</option>
                    <option value="mca"> Others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Marital Status <span className="text-danger"> *</span>&nbsp;
                    :
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    value={maritalStatus}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Single</option>
                    <option value="degree">Married</option>
                  </select>
                </div>
                <br />
                <div className="row  ">
                  <label className="col-12 col-md-2 label">
                    College / School / Company{" "}
                    <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  &nbsp;
                  <input
                    type="text"
                    className="col-9 col-md-5  mt-3 "
                    require
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCollege(e.target.value)}
                    value={college}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 3--- */}

          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Contact Details</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Country <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value="">--select--</option>
                    <option value="india">India </option>
                    <option value="usa">USA </option>
                    <option value="australia">Australia </option>
                    <option value="china">China </option>
                    <option value="others">Others </option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    State<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  >
                    <option value="">--select--</option>
                    <option value="Telangana">Telangana </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>

                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Area<span className="text-danger"> *</span>&nbsp;:
                  </label>

                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Native Place <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setNative(e.target.value)}
                    value={native}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Zip Code <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setZipcode(e.target.value)}
                    value={zipcode}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    WhatsApp Number <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setWhatsAppNo(e.target.value)}
                    value={whatsAppNo}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 4--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Education Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Education Type <span className="text-danger"> *</span>:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id="educationtype"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEducationType(e.target.value)}
                    value={educationType}
                  >
                    <option value="">--select--</option>
                    <option value="btech">B.Tech </option>
                    <option value="degree">Degree</option>
                    <option value="mca"> MCA</option>
                    <option value="ssc"> SSC</option>
                    <option value="other">others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Percentage<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMarks(e.target.value)}
                    value={marks}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Academic Year<span className="text-danger"> *</span>&nbsp;:
                  </label>

                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAcademicyear(e.target.value)}
                    value={academicyear}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* Step 5 */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Photo</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  {/* <label className="col-12 col-md-2">Image:</label> */}
                  {/* <input
                    type="image"
                    // className="col-9 col-md-5"
                    // style={{
                    //   height: "35px",
                    //   border: "1.5px solid black",
                    //   borderRadius: "5px",
                    // }}
                  /> */}

                  <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    src="your-image-url.jpg"
                    alt="Submit"
                    class="image-input"
                  />
                  {/* <input type="file" accept=".jpg, .jpeg, .png" /> */}

                  <input
                    type="file"
                    id="imageInput"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                  />
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 6--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Enquiry Details:</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Enquiry Date<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEnquiryDate(e.target.value)}
                    value={enquiryDate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Enquiry Taken By<span className="text-danger"> *</span>:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEnquiryTakenBy(e.target.value)}
                    value={enquiryTakenBy}
                  >
                    {filteredcounsellor &&
                      filteredcounsellor.map((user, index) => (
                        <option value={user.fullname}> {user.fullname}</option>
                      ))}
                    {/* <option value="">--select--</option>
                    <option value="Bhavitha">Bhavitha</option>
                    <option value="keerty">keerty</option>
                    <option value="harsha">harsha</option>
                    <option value="Bhavitha">Bhavitha</option> */}
                  </select>
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Course Package<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCoursepakage(e.target.value)}
                    value={coursePackage}
                  >
                    <option value="">--select--</option>
                    <option value="businessanalytics">
                      Business Analytics
                    </option>
                    <option value="postgraduationprogram">
                      Business Analytics
                    </option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Courses<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCourses(e.target.value)}
                    value={courses}
                  >
                    <option value="">--select--</option>
                    <option value="fullstack">Full Stack Java</option>
                    <option value="reactjs">React JS </option>
                    <option value="nodejs">Node JS</option>
                    <option value="angular">Angular</option>
                    <option value="revit">Revit</option>
                    <option value="salesforce">Sales Force</option>
                    <option value="devops">Devops</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Lead Source<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setLeadSource(e.target.value)}
                    value={leadSource}
                  >
                    <option value="">--select--</option>
                    <option value="justdail">Just Dail</option>
                    <option value="walkin">Walkin</option>
                    <option value="ivr">IVR</option>
                    <option value="test">Test</option>
                    <option value="studentrefferal">Student Refferal</option>
                    <option value="employeeRefferal">Employee Refferal</option>
                    <option value="crm">CRM</option>
                    <option value="buddy">Buddy</option>
                    <option value="sulekha">sulekha</option>
                    <option value="personalReference">
                      personal Reference
                    </option>
                    <option value="website">website</option>
                    <option value="primelead">Prime Lead</option>
                  </select>
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 7--- */}
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Admission Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Branch<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setBranch(e.target.value)}
                    value={branch}
                  >
                    <option value="">--select--</option>
                    <option value="hitechcity">Hitech-city</option>
                    <option value="ameerpet">Ameerpet</option>
                    <option value="dilsukhnagar">Dilsukhnagar</option>
                    <option value="gachibowli">Gachibowli</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Mode of Traning<span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5 "
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setModeOfTraining(e.target.value)}
                    value={modeOfTraining}
                  >
                    <option value="">--select--</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Admission Status<span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5  "
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAdmissionStatus(e.target.value)}
                    value={admissionStatus}
                  >
                    <option value="">--select--</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Admission Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    value={admissionDate}
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Registration No <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>

                  {registrationNumber}
                </div>
                <br />

                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Validity Start Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setValidityStartDate(e.target.value)}
                    value={validityStartDate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Validity End Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setValidityEndDate(e.target.value)}
                    value={validityEndDate}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 8--- */}
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Fee Details</Typography>{" "}
            </StepLabel>

            <StepContent>
              <form onSubmit={handleFeeDetails} className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Fee Type <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setfeetype(e.target.value)}
                    value={feetype}
                  >
                    <option value="">--select--</option>
                    <option value="fee">Fee </option>
                    <option value="admissionfee">Admission Fee</option>
                  </select>
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Amount <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Discount <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                  />
                </div>

                <br />
                {/* <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Tax Amount <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {taxamount}
                </div> */}
                <br />
                {/* <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Total Amount (Inclusive of GST){" "}
                    <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {totalamount}
                </div> */}
                <button
                  onClick={handleFeeDetails}
                  className="bg-primary text-light px-4 py-1  border border-none rounded-2 "
                >
                  save
                </button>
                <br />
                {feedetails.length > 0 && (
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Fee Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Tax Amount</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedetails &&
                        feedetails.map((item) => (
                          <tr key={item.id}>
                            <th scope="row">{item.feetype}</th>
                            <td>{item.amount}</td>
                            <td>{item.discount}</td>
                            <td>{item.taxamount}</td>
                            <td>{item.totalamount}</td>
                            <td>
                              <button onClick={() => handleFeeDelete(item.id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleFeecalculations}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
          {/* -----step 9--- */}
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Billing</Typography>{" "}
            </StepLabel>

            <StepContent>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Gross Total</th>
                    <th scope="col">Total Discount</th>
                    <th scope="col">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{grosstotal}</td>
                    <td>{totaldiscount}</td>
                    <td>{finaltotal}</td>
                  </tr>
                </tbody>
              </table>
              <p></p>
              <form className="form">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Fee Type</th>
                      <th scope="col">Fee (exclusive Of GST) </th>
                      <th scope="col">tax</th>
                      <th scope="col">Fee (inclusive Of GST)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedetailsbilling.length > 0 &&
                      feedetailsbilling.map((item) => {
                        if (item.feetype != "Material Fee") {
                          return (
                            <tr key={item.id}>
                              <th scope="row">{item.feetype}</th>
                              <td>
                                {parseFloat(item.feewithouttax.toFixed(2))}
                              </td>
                              <td>{parseFloat(item.feetax.toFixed(2))}</td>
                              <td>{parseFloat(item.feewithtax.toFixed(2))}</td>
                            </tr>
                          );
                        }
                      })}
                    {feedetailsbilling.length > 0 && (
                      <tr>
                        <td></td>
                        <th>
                          Total Fee (exclusive of GST)
                          {parseFloat(totalfeewithouttax.toFixed(2))}{" "}
                        </th>
                        <th>Total Tax:{parseFloat(totaltax.toFixed(2))}</th>
                        <th>
                          Total Fee (inclusive of GST)
                          {parseFloat(grandtotal.toFixed(2))}
                        </th>
                      </tr>
                    )}
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>MaterialFee:{materialfee}</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>Grand Total:{finaltotal}</th>
                    </tr>
                  </tbody>
                </table>

                {/* <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Gross Total <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {grosstotal}
                </div> */}
                <br />
                {/* <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Discount <span className="text-danger"> *</span>
                    &nbsp; :
                  </label>
                  
                  {totaldiscount}
                </div> */}
                <br />
                {/* <div className="row ">
                  <label className="col-12 col-md-2">
                    Net Total <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div> */}

                {/* <div className="row "> */}
                {/* <label className="col-12 col-md-2 label">
                    Total Tax (GST) <span className="text-danger"> *</span>
                    &nbsp;:
                  </label> */}
                {/* <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  /> */}
                {/* {totaltax} */}
                {/* </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Grand Total(inclusive of GST)
                    <span className="text-danger"> *</span>&nbsp;:
                  </label> */}
                {/* <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  /> */}
                {/* {grandtotal}

                  <h4> fee split</h4>
                  <p> admission fee {admissionfee}</p>
                  <p>coursefee {coursefee}</p>
                  <p>Materialfee {materialfee}</p>

                  <p>total--{grandtotal}</p>
                </div> */}
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    {" "}
                    Admission Remarks <span className="text-danger "> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setadmissionremarks(e.target.value)}
                    value={admissionremarks}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Assets <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;
                  {/* <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  /> */}
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setassets(e.target.value)}
                    value={assets}
                  >
                    <option value="">--select--</option>
                    <option value="laptop">Laptop </option>
                    <option value="bag"> Bag</option>
                    <option value="lms"> LMS</option>
                    <option value="coursematerial"> Course Materials</option>
                  </select>
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                    Submit
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
        {/* {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )} */}
      </div>
      {/* <div className="main-sub-container ">
        <Typography fontSize={35}>Registration form</Typography>

        <Stepper activeStep={activeStep} orientation="vertical" >
         
          <Step >
            <StepLabel >
              <Typography fontSize={25} >Basic Details</Typography>
            </StepLabel>
            <StepContent  >
              <form className="form">
                <div className="row input ">
                  <label className="col-12 col-md-2 label">
                    Name <span className="text-danger">*</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid Black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
           <br/>
                <div className="row input ">
                  <label className="col-12 col-md-2 label">
                    Email <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
           <br/>
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Mobile Number<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    value={mobileNumber}
                  />
                </div>
                <br />
                
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1,  }}
                  >

                    Continue
                  </Button>
                </div>
              </Box>
              </form>

            </StepContent>
          </Step>
   
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Details</Typography>
            </StepLabel>
            <StepContent className="">
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Parent's  Name <span className="text-danger"> *</span>&nbsp;:
                  </label>&nbsp;&nbsp;
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setParentsName(e.target.value)}
                    value={parentsname}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Birth Date <span className="text-danger"> *</span>&nbsp;:
                  </label>&nbsp;&nbsp;
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setBirthDate(e.target.value)}
                    value={birthdate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Gender <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Female </option>
                    <option value="degree">Male</option>
                    <option value="mca"> Others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Marital Status <span className="text-danger"> *</span>&nbsp;
                    :
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    value={maritalStatus}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Single</option>
                    <option value="degree">Marriage</option>
                  </select>
                </div>
                <br />
                <div className="row  ">
                  <label className="col-12 col-md-2 label">
                    College / School / Company{" "}
                    <span className="text-danger"> *</span>&nbsp; :
                  </label>&nbsp;
                  <input
                    type="text"
                    className="col-9 col-md-5 mt-3 "
                    require
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCollege(e.target.value)}
                    value={college}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                 
                    Continue
                  </Button>
                  <Button
                  className="bg-primary"
                    variant="contained"
                 
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>


          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Contact Details</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Country <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                  >
                    <option value="">--select--</option>
                    <option value="india">India </option>
                    <option value="usa">USA </option>
                    <option value="australia">Australia </option>
                    <option value="china">China </option>
                    <option value="others">Others </option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    State<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                  >
                    <option value="">--select--</option>
                    <option value="Telangana">Telangana </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>

                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Area<span className="text-danger"> *</span>&nbsp;:
                  </label>

                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setArea(e.target.value)}
                    value={area}
                  />
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Native Place <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setNative(e.target.value)}
                    value={native}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Zip Code <span className="text-danger"> *</span>&nbsp; :
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setZipcode(e.target.value)}
                    value={zipcode}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    WhatsApp Number <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5 mt-3"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setWhatsAppNo(e.target.value)}
                    value={whatsAppNo}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >

                    Continue
                  </Button>
                  <Button
                  className="bg-primary"
                    variant="contained"
               
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              <Typography fontSize={25}>Education Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Education Type <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id="educationtype"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEducationType(e.target.value)}
                    value={educationType}
                  >
                    <option value="">--select--</option>
                    <option value="btech">B.Tech </option>
                    <option value="degree">Degree</option>
                    <option value="mca"> MCA</option>
                    <option value="ssc"> SSC</option>
                    <option value="other">others</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Marks<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setMarks(e.target.value)}
                    value={marks}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Academic Year<span className="text-danger"> *</span>&nbsp;:
                  </label>

                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAcademicyear(e.target.value)}
                    value={academicyear}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    
                    Continue
                  </Button>
                  <Button
                  className="bg-primary"
                    variant="contained"
                 
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
      
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Photo</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                 

                  <input
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    src="your-image-url.jpg"
                    alt="Submit"
                    class="image-input"
                  />
                 

                  <input
                    type="file"
                    id="imageInput"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }}
                  />
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                
                    Continue
                  </Button>
                  <Button
                  className="bg-primary"
                    variant="contained"
                 
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
      
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Enquiry Details:</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Enquiry Date<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEnquiryDate(e.target.value)}
                    value={enquiryDate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Enquiry Taken By<span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setEnquiryTakenBy(e.target.value)}
                    value={enquiryTakenBy}
                  >
                    <option value="">--select--</option>
                    <option value="btech">Bhavitha</option>
                  </select>
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Course Package<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCoursepakage(e.target.value)}
                    value={coursePackage}
                  >
                    <option value="">--select--</option>
                    <option value="businessanalytics">
                      Business Analytics
                    </option>
                    <option value="postgraduationprogram">
                      Business Analytics
                    </option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Courses<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setCourses(e.target.value)}
                    value={courses}
                  >
                    <option value="">--select--</option>
                    <option value="fullstack">Full Stack Java</option>
                    <option value="reactjs">React JS </option>
                    <option value="nodejs">Node JS</option>
                    <option value="angular">Angular</option>
                    <option value="revit">Revit</option>
                    <option value="salesforce">Sales Force</option>
                    <option value="devops">Devops</option>
                  </select>
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Lead Source<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setLeadSource(e.target.value)}
                    value={leadSource}
                  >
                    <option value="">--select--</option>
                    <option value="justdail">Just Dail</option>
                    <option value="walkin">Walkin</option>
                    <option value="ivr">IVR</option>
                    <option value="test">Test</option>
                    <option value="studentrefferal">Student Refferal</option>
                    <option value="employeeRefferal">Employee Refferal</option>
                    <option value="crm">CRM</option>
                    <option value="buddy">Buddy</option>
                    <option value="sulekha">sulekha</option>
                    <option value="personalReference">
                      personal Reference
                    </option>
                    <option value="website">website</option>
                    <option value="primelead">Prime Lead</option>
                  </select>
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                  className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >

                    Continue
                  </Button>
                  <Button
                  className="bg-primary"
                    variant="contained"
                  
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
      
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Admission Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Branch<span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setBranch(e.target.value)}
                    value={branch}
                  >
                    <option value="">--select--</option>
                    <option value="hitechcity">Hitech-city</option>
                    <option value="ameerpet">Ameerpet</option>
                    <option value="dilsukhnagar">Dilsukhnagar</option>
                    <option value="gachibowli">Gachibowli</option>
                  </select>
                </div>

                <div className="row ">
                  <label className="col-12 col-md-2">
                    Mode of Traning<span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5 mt-3"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setModeOfTraining(e.target.value)}
                    value={modeOfTraining}
                  >
                    <option value="">--select--</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>

                <div className="row ">
                  <label className="col-12 col-md-2">
                    Admission Status<span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5  mt-3"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAdmissionStatus(e.target.value)}
                    value={admissionStatus}
                  >
                    <option value="">--select--</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="row ">
                  <label className="col-12 col-md-2">
                    Registration No <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5 mt-3"
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    value={registrationNumber}
                  />
                </div>

                <div className="row ">
                  <label className="col-12 col-md-2">
                    Admission Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5 mt-3"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    value={admissionDate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Validity Start Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setValidityStartDate(e.target.value)}
                    value={validityStartDate}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Validity End Date <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="date"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setValidityEndDate(e.target.value)}
                    value={validityEndDate}
                  />
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
   
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
   
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Fee Details</Typography>{" "}
            </StepLabel>

            <StepContent>
              <form onSubmit={handleFeeDetails} className="form">
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Fee Type <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setfeetype(e.target.value)}
                    value={feetype}
                  >
                    <option value="">--select--</option>
                    <option value="coursefee">Course fee </option>
                    <option value="admissionfee">Admission Fee </option>
                  </select>
                </div>
                <br />

                <div className="row ">
                  <label className="col-12 col-md-2">
                    Amount <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Discount <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  <input
                    type="number"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                  />
                </div>
                <br />
               
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Tax Amount <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {taxamount}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Total Amount (Inclusive of GST){" "}
                    <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {totalamount}
                </div>
                <button
                  onClick={handleFeeDetails}
                  className="bg-primary text-light px-4 py-1  border border-none rounded-2 "
                >
                  save
                </button>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                 
                    Continue
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>

          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Billing</Typography>{" "}
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Gross Total <span className="text-danger"> *</span>&nbsp;:
                  </label>
                  
                  {grosstotal}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Discount <span className="text-danger"> *</span>
                    &nbsp; :
                  </label>
                  
                  {totaldiscount}
                </div>
                <br />
               
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Total Tax <span className="text-danger"> *</span>&nbsp;:
                  </label>
                 
                  {totaltax}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Grand Total<span className="text-danger"> *</span>&nbsp;:
                  </label>
                 
                  {grandtotal}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    {" "}
                    Admission Remarks <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  <input
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2">
                    Assets <span className="text-danger"> *</span>&nbsp;:
                  </label>
                 
                  <select
                    className="col-9 col-md-5"
                    id=""
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="">--select--</option>
                    <option value="laptop">Laptop </option>
                    <option value="bag"> Bag</option>
                    <option value="lms"> LMS</option>
                    <option value="coursematerial"> Course Materials</option>
                  </select>
                </div>
                <br />
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    
                    Submit
                  </Button>
                  <Button
                    className="bg-primary"
                    variant="contained"
                  
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        </Stepper>
       
      </div> */}
    </div>
  );
}
