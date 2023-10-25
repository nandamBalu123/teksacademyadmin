import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditStudentForm.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const EditStudentForm = () => {
  // const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [mobileNumber, setMobileNumber] = useState("");
  //   const [parentsname, setParentsName] = useState("");
  //   const [birthdate, setBirthDate] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [maritalStatus, setMaritalStatus] = useState("");
  //   const [college, setCollege] = useState("");
  //   const [country, setCountry] = useState("");
  //   const [state, setState] = useState("");
  //   const [area, setArea] = useState("");
  //   const [native, setNative] = useState("");
  //   const [zipcode, setZipcode] = useState("");
  //   const [whatsAppNo, setWhatsAppNo] = useState("");
  //   const [educationType, setEducationType] = useState("");
  //   const [marks, setMarks] = useState("");
  //   const [academicyear, setAcademicyear] = useState("");
  //   const [profilepic, setProfilePpic] = useState("");
  //   const [enquiryDate, setEnquiryDate] = useState("");
  //   const [enquiryTakenBy, setEnquiryTakenBy] = useState("");
  //   const [coursePackage, setCoursepakage] = useState("");
  //   const [courses, setCourses] = useState("");
  //   const [leadSource, setLeadSource] = useState("");
  //   const [branch, setBranch] = useState("");
  //   const [modeOfTraining, setModeOfTraining] = useState("");
  //   const [admissionStatus, setAdmissionStatus] = useState("");
  //   const [registrationNumber, setRegistrationNumber] = useState("");
  //   const [admissionDate, setAdmissionDate] = useState("");
  //   const [validityStartDate, setValidityStartDate] = useState("");
  //   const [validityEndDate, setValidityEndDate] = useState("");

  const [feetype, setfeetype] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxamount, setTaxamount] = useState(0);
  const [totalamount, setTotalamount] = useState(0);

  const [grosstotal, setGrosstotal] = useState(0);
  const [totaldiscount, setTotalDiscount] = useState(0);
  const [totaltax, settotaltax] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [admissionremarks, setadmissionremarks] = useState("");
  const [assets, setassets] = useState("");

  const [feedetails, setFeeDetails] = useState([]);

  // useEffect(() => {
  //   setTotalamount(amount - discount);
  //   let actualfee = (totalamount * 100) / 118;
  //   setTaxamount(totalamount - actualfee);
  // });
  // // useEffect(() => {}, [totalamount]);
  // useEffect(() => {
  //   let date = toString(admissionDate);
  //   let month = admissionDate[5] + admissionDate[6];
  //   let year = admissionDate[2] + admissionDate[3];
  //   let firstbranch;
  //   if (branch) {
  //     firstbranch = branch[0].toUpperCase();
  //   }
  //   let serialno;
  //   if (branch == "hitechcity") {
  //     serialno = hitechcitycount + 1;
  //   }
  //   if (branch == "ameerpet") {
  //     serialno = ameerpetcount + 1;
  //   }
  //   if (branch == "dilsukhnagar") {
  //     serialno = dilsukhnagarcount + 1;
  //   }
  //   if (branch == "gachibowli") {
  //     serialno = gachibowlicount + 1;
  //   }
  //   if (serialno) {
  //     serialno = serialno.toString();
  //     if (serialno.length === 3) {
  //       serialno = "0" + serialno;
  //     }
  //     if (serialno.length === 2) {
  //       serialno = "00" + serialno;
  //     }
  //     if (serialno.length === 1) {
  //       serialno = "000" + serialno;
  //     }
  //   }

  //   if (!admissionDate) {
  //     setRegistrationNumber("");
  //   }
  //   if (admissionDate) {
  //     setRegistrationNumber("TA" + firstbranch + month + year + serialno);
  //   }
  // }, [admissionDate, branch]);

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

  // const handleFeeDetails = (e) => {
  //   e.preventDefault();

  //   setFeeDetails([
  //     ...feedetails,
  //     {
  //       feetype: feetype,
  //       amount: amount,
  //       discount: discount,
  //       taxamount: taxamount,
  //       totalamount: totalamount,
  //     },
  //   ]);
  //   setTaxamount(0);
  //   setAmount(0);
  //   setDiscount(0);
  //   setTotalamount(0);
  //   setGrosstotal((grosstotal) => grosstotal + parseInt(amount));
  //   setTotalDiscount((totaldiscount) => totaldiscount + parseInt(discount));
  //   settotaltax((totaltax) => totaltax + parseInt(taxamount));
  //   setGrandtotal((grandtotal) => grandtotal + parseInt(totalamount));

  //   console.log(feedetails);
  // };
  // const handleSubmit = async () => {
  //   const studentRegistrationdata = {
  //     name,
  //     email,
  //     mobileNumber,
  //     parentsname,
  //     birthdate,
  //     gender,
  //     maritalStatus,
  //     college,
  //     country,
  //     state,
  //     area,
  //     native,
  //     zipcode,
  //     whatsAppNo,
  //     educationType,
  //     marks,
  //     academicyear,
  //     profilepic,
  //     enquiryDate,
  //     enquiryTakenBy,
  //     coursePackage,
  //     courses,
  //     leadSource,
  //     branch,
  //     modeOfTraining,
  //     admissionStatus,
  //     registrationNumber,
  //     admissionDate,
  //     validityStartDate,
  //     validityEndDate,
  //     feedetails,
  //     grosstotal,
  //     totaldiscount,
  //     totaltax,
  //     grandtotal,
  //     admissionremarks,
  //     assets,
  //   };
  //   console.log("studentRegistration", studentRegistrationdata);
  //   try {
  //     // Make the POST request
  //     const response = await axios.put(
  //       `http://localhost:3030/updatestudentdata/${id}`,
  //       studentRegistrationdata
  //     );

  //     // Handle a successful response here
  //     console.log("Response:", response.data);
  //   } catch (error) {
  //     // Handle the error here
  //     if (error.response) {
  //       // The request was made and the server responded with a non-2xx status code
  //       console.log(
  //         "Server returned an error:",
  //         error.response.status,
  //         error.response.data
  //       );
  //     } else if (error.request) {
  //       // The request was made, but no response was received
  //       console.log("No response received:", error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an error
  //       console.error("Request error:", error.message);
  //     }
  //   }
  // };
  const [getusers, setgetusers] = useState([]);
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/userdata`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setgetusers(data);
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
  // const [studentData, setStudentData] = useState([{ name }, { name }]);
  // useEffect(() => {
  //   // Make a GET request to your backend API endpoint
  //   axios
  //     .get(`http://localhost:3030/viewstudentdata/${id}`)
  //     .then((response) => {
  //       // Handle the successful response here
  //       setStudentData(response.data); // Update the data state with the fetched data

  //       console.log("data", response.data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occur during the request
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const ameerpetbranch = studentData.filter(
  //   (item) => item.branch === "ameerpet"
  // );
  // const ameerpetcount = ameerpetbranch.length;
  // const hitechcitybranch = studentData.filter(
  //   (item) => item.branch === "hitechcity"
  // );
  // const hitechcitycount = hitechcitybranch.length;
  // const dilsukhnagarbranch = studentData.filter(
  //   (item) => item.branch === "dilsukhnagar"
  // );
  // const dilsukhnagarcount = dilsukhnagarbranch.length;
  // const gachibowlibranch = studentData.filter(
  //   (item) => item.branch === "gachibowli"
  // );
  // const gachibowlicount = gachibowlibranch.length;

  // new

  const navigate = useNavigate("");

  const [user, setuser] = useState({
    name: "",
    email: "",
    mobilenumber: "",
    parentsname: "",
    birthdate: "",
    gender: "",
    maritalstatus: "",
    college: "",
    country: "",
    state: "",
    area: "",
    native: "",
    zipcode: "",
    whatsappno: "",
    educationtype: "",
    marks: "",
    academicyear: "",
    profilepic: "",
    enquirydate: "",
    enquirytakenby: "",
    coursepackage: "",
    courses: "",
    leadsource: "",
    branch: "",
    modeoftraining: "",
    admissionstatus: "",
    registrationnumber: "",
    admissiondate: "",
    validitystartdate: "",
    validityenddate: "",
    feedetails: "",
    grosstotal: "",
    totaldiscount: "",
    totaltax: "",
    grandtotal: "",
    admissionremarks: "",
    assets: "",
    settaxamount: "",
    feetype: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setuser((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const handleFeeDetails = (e) => {
    e.preventDefault();

    setFeeDetails([
      ...feedetails,
      {
        feetype: feetype,
        amount: amount,
        discount: discount,
        taxamount: taxamount,
        totalamount: totalamount,
      },
    ]);
    setTaxamount(0);
    setAmount(0);
    setDiscount(0);
    setTotalamount(0);
    setGrosstotal((grosstotal) => grosstotal + parseInt(amount));
    setTotalDiscount((totaldiscount) => totaldiscount + parseInt(discount));
    settotaltax((totaltax) => totaltax + parseInt(taxamount));
    setGrandtotal((grandtotal) => grandtotal + parseInt(totalamount));

    console.log(feedetails);
  };

  const { id } = useParams("");
  // console.log(id);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/viewstudentdata/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("datan: " + data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setuser(data[0]);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/updatestudentdata/${id}`, user)
      .then((res) => {
        if (res.data.updated) {
          alert("User Updated");
          navigate("/studentdata");
        } else {
          alert("not updated");
        }
      });
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
                    onChange={setdata}
                    name="name"
                    value={user.name}
                  />
                </div>
                <br />
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
                    name="email"
                    onChange={setdata}
                    value={user.email}
                  />
                </div>
                <br />
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
                    name="mobilenumber"
                    onChange={setdata}
                    value={user.mobilenumber}
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
                    onChange={setdata}
                    value={user.parentsname}
                    name="parentsname"
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
                    onChange={setdata}
                    value={user.birthdate}
                    name="birthdate"
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
                    onChange={setdata}
                    value={user.gender}
                    name="gender"
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
                    onChange={setdata}
                    value={user.maritalstatus}
                    name="maritalstatus"
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
                    onChange={setdata}
                    value={user.college}
                    name="college"
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
                    onChange={setdata}
                    value={user.country}
                    name="country"
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
                    onChange={setdata}
                    value={user.state}
                    name="state"
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
                    onChange={setdata}
                    value={user.area}
                    name="area"
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
                    onChange={setdata}
                    value={user.native}
                    name="native"
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
                    onChange={setdata}
                    value={user.zipcode}
                    name="zipcode"
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
                    className="col-9 col-md-5 "
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={setdata}
                    value={user.whatsappno}
                    name="whatsappno"
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
                    onChange={setdata}
                    value={user.educationtype}
                    name="educationtype"
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
                    type="text"
                    className="col-9 col-md-5"
                    required
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={setdata}
                    value={user.marks}
                    name="marks"
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
                    onChange={setdata}
                    value={user.academicyear}
                    name="academicyear"
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
                    onChange={setdata}
                    value={user.enquirydate}
                    name="enquirydate"
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
                    onChange={setdata}
                    value={user.enquirytakenby}
                    name="enquirytakenby"
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
                    onChange={setdata}
                    value={user.coursepackage}
                    name="coursepackage"
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
                    onChange={setdata}
                    value={user.courses}
                    name="courses"
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
                    onChange={setdata}
                    value={user.leadsource}
                    name="leadsource"
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
                    onChange={setdata}
                    value={user.branch}
                    name="branch"
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
                    onChange={setdata}
                    value={user.modeoftraining}
                    name="modeoftraining"
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
                    onChange={setdata}
                    value={user.admissionstatus}
                    name="admissionstatus"
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
                    onChange={setdata}
                    value={user.admissiondate}
                    name="admissiondate"
                  />
                </div>
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Registration No <span className="text-danger"> *</span>
                    &nbsp;:
                  </label>
                  {/* <input
                    type="text"
                    className="col-9 col-md-5 "
                    style={{
                      height: "35px",
                      border: "1.5px solid black",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    value={registrationNumber}
                  /> */}
                  {user.registrationnumber}
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
                    onChange={setdata}
                    value={user.validitystartdate}
                    name="validitystartdate"
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
                    onChange={setdata}
                    value={user.validityenddate}
                    name="validityenddate"
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
                    onChange={setdata}
                    value={user.feetype}
                    name="feetype"
                  >
                    <option value="">--select--</option>
                    <option value="coursefee">Course fee </option>
                    <option value="admissionfee">Admission Fee </option>
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
                    onChange={setdata}
                    value={user.amount}
                    name="amount"
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
                    onChange={setdata}
                    value={user.discount}
                    name="discount"
                  />
                </div>

                {/* <div className="row ">
                  <label className="col-12 col-md-2">
                    Tax <span className="text-danger"> *</span>&nbsp;:
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
                  >
                    <option value="">--select--</option>
                    <option value="btech">Exclusive Tax </option>
                    <option value="degree">Inclusive Tax</option>
                  </select>
                </div> */}
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Tax Amount <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {taxamount}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
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
              <form className="form">
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Gross Total <span className="text-danger"> *</span>&nbsp;:
                  </label>
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
                  {grosstotal}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Discount <span className="text-danger"> *</span>
                    &nbsp; :
                  </label>
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
                  {totaldiscount}
                </div>
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

                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Total Tax <span className="text-danger"> *</span>&nbsp;:
                  </label>
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
                  {totaltax}
                </div>
                <br />
                <div className="row ">
                  <label className="col-12 col-md-2 label">
                    Grand Total<span className="text-danger"> *</span>&nbsp;:
                  </label>
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
                  {grandtotal}
                </div>
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
                    onChange={setdata}
                    value={user.admissionremarks}
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
                    onChange={setdata}
                    value={user.assets}
                    name="assets"
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
                    onClick={handlesubmit}
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
    </div>
  );
};

export default EditStudentForm;
