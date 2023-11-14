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
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useCoursePackageContext } from "../../../../hooks/useCoursePackageContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";
// import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
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

  const { students, dispatch } = useStudentsContext();
  const [feetype, setfeetype] = useState("");
  const [amount, setAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [taxamount, setTaxamount] = useState(0);
  const [totalamount, setTotalamount] = useState(0);
  const { getcourses } = useCourseContext();
  const { coursepackages } = useCoursePackageContext();
  const [grosstotal, setGrosstotal] = useState(0);
  const [totaldiscount, setTotalDiscount] = useState(0);
  const [totaltax, settotaltax] = useState(0);
  const [grandtotal, setGrandtotal] = useState(0);
  const [admissionremarks, setadmissionremarks] = useState("");
  const [assets, setassets] = useState("");
  const { leadsources } = useLeadSourceContext();
  const { branches } = useBranchContext();
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
    enquirydate: "",
    enquirytakenby: "",
    coursepackage: "",
    courses: "",
    leadsource: "",
    branch: "",
    modeoftraining: "",
    registrationnumber: "",
    admissiondate: "",
    validitystartdate: "",
    validityenddate: "",
    // feedetails: "",
    // grosstotal: "",
    // totaldiscount: "",
    // totaltax: "",
    // grandtotal: "",
    admissionremarks: "",
    assets: "",
    // settaxamount: "",
    // feetype: "",
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

  // const getdata = async () => {
  //   const res = await fetch(
  //     `${process.env.REACT_APP_API_URL}/  /${id}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   console.log("datan: " + data);

  //   if (res.status === 422 || !data) {
  //     console.log("error ");
  //   } else {
  //     setuser(data[0]);
  //     console.log("get data");
  //   }
  // };

  // useEffect(() => {
  //   getdata();
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
      setuser(filteredResults[0]);
    }
  }, [students, id, dispatch]);

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
    <div className="main-container container">
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
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Name"
                      type="text"
                      className=" w-100"
                      required
                      onChange={setdata}
                      name="name"
                      value={user.name}
                      variant="standard"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Email"
                      type="email"
                      variant="standard"
                      className="mar w-100"
                      required
                      name="email"
                      onChange={setdata}
                      value={user.email}
                    />{" "}
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Number "
                      type="number"
                      variant="standard"
                      className="mar w-100"
                      required
                      name="mobilenumber"
                      onChange={setdata}
                      value={user.mobilenumber}
                    />{" "}
                  </div>
                </div>
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 ">
                    <TextField
                      label=" Parent's Name "
                      type="text"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={setdata}
                      value={user.parentsname}
                      name="parentsname"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label=" Date of Birth"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.birthdate}
                      name="birthdate"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Gender<span> *</span>
                      </InputLabel>
                      <Select
                        id="gender"
                        name="gender"
                        required
                        onChange={setdata}
                        value={user.gender}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Marital Status<span> *</span>
                      </InputLabel>
                      <Select
                        id="maritalstatus"
                        name="maritalstatus"
                        required
                        onChange={setdata}
                        value={user.maritalstatus}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="single">Single</MenuItem>
                        <MenuItem value="married">Married</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label="College/School/Company"
                      type="text"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.college}
                      name="college"
                      variant="standard"
                    />
                  </div>
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
          {/* -----step 3--- */}

          <Step>
            <StepLabel>
              <Typography fontSize={25}>Student Contact Details</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Country<span> *</span>
                      </InputLabel>
                      <Select
                        name="country"
                        required
                        onChange={setdata}
                        value={user.country}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="india">India</MenuItem>
                        <MenuItem value="usa">USA</MenuItem>
                        <MenuItem value="china">China</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        State<span> *</span>
                      </InputLabel>
                      <Select
                        required
                        onChange={setdata}
                        value={user.state}
                        name="state"
                      >
                        <MenuItem value="">--select--</MenuItem>
                        <MenuItem value="Telangana">Telangana </MenuItem>
                        <MenuItem value="Andhra Pradesh">
                          Andhra Pradesh
                        </MenuItem>
                        <MenuItem value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </MenuItem>
                        <MenuItem value="Assam">Assam</MenuItem>
                        <MenuItem value="Bihar">Bihar</MenuItem>
                        <MenuItem value="Chhattisgarh">Chhattisgarh</MenuItem>
                        <MenuItem value="Goa">Goa</MenuItem>
                        <MenuItem value="Gujarat">Gujarat</MenuItem>
                        <MenuItem value="Haryana">Haryana</MenuItem>
                        <MenuItem value="Himachal Pradesh">
                          Himachal Pradesh
                        </MenuItem>
                        <MenuItem value="Jharkhand">Jharkhand</MenuItem>
                        <MenuItem value="Karnataka">Karnataka</MenuItem>
                        <MenuItem value="Kerala">Kerala</MenuItem>
                        <MenuItem value="Madhya Pradesh">
                          Madhya Pradesh
                        </MenuItem>
                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        <MenuItem value="Manipur">Manipur</MenuItem>
                        <MenuItem value="Meghalaya">Meghalaya</MenuItem>
                        <MenuItem value="Mizoram">Mizoram</MenuItem>
                        <MenuItem value="Nagaland">Nagaland</MenuItem>
                        <MenuItem value="Odisha">Odisha</MenuItem>
                        <MenuItem value="Punjab">Punjab</MenuItem>
                        <MenuItem value="Rajasthan">Rajasthan</MenuItem>
                        <MenuItem value="Sikkim">Sikkim</MenuItem>
                        <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
                        <MenuItem value="Tripura">Tripura</MenuItem>
                        <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
                        <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
                        <MenuItem value="West Bengal">West Bengal</MenuItem>
                        <MenuItem value="Andaman and NicobarIslands">
                          Andaman and Nicobar Islands
                        </MenuItem>
                        <MenuItem value="Chandigarh">Chandigarh</MenuItem>
                        <MenuItem value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </MenuItem>
                        <MenuItem value="Lakshadweep">Lakshadweep</MenuItem>
                        <MenuItem value="Delhi">Delhi</MenuItem>
                        <MenuItem value="Puducherry">Puducherry</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Area"
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.area}
                      name="area"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Native Place"
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.native}
                      name="native"
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Zip Code"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.zipcode}
                      name="zipcode"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Whatsapp Number"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.whatsappno}
                      name="whatsappno"
                    />
                  </div>
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
          {/* -----step 4--- */}
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Education Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Education Type<span> *</span>
                      </InputLabel>
                      <Select
                        id="educationtype"
                        required
                        onChange={setdata}
                        value={user.educationtype}
                        name="educationtype"
                      >
                        <MenuItem value="select"> ---select---</MenuItem>

                        <MenuItem value="btech">B.Tech</MenuItem>
                        <MenuItem value="degree">Degree</MenuItem>
                        <MenuItem value="mca">MCA</MenuItem>
                        <MenuItem value="ssc">SSC</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Percentage"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={setdata}
                      value={user.marks}
                      name="marks"
                    />{" "}
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Academic Year "
                      type="number"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={setdata}
                      value={user.academicyear}
                      name="academicyear"
                    />{" "}
                  </div>
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label=" Enquiry Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.enquirydate}
                      name="enquirydate"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                  <FormControl variant="standard" className="w-75">
                      <TextField
                          label="Enquiry Taken By"
                          variant="standard"
                          className="w-75"
                          required
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={setdata}
                          value={user.enquirytakenby}
                          name="enquirytakenby"
                        />
                    </FormControl>
                    {/* <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Enquiry Taken By<span> *</span>
                      </InputLabel>
                      <Select
                        id=" enquirytakenby"
                        required
                        onChange={setdata}
                        value={user.enquirytakenby}
                        name="enquirytakenby"
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {filteredcounsellor &&
                          filteredcounsellor.map((user, index) => (
                            <MenuItem value={user.fullname}>
                              {" "}
                              {user.fullname}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl> */}
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Course Package<span> *</span>
                      </InputLabel>
                      <Select
                        id="coursepackage"
                        name="coursepackage"
                        required
                        onChange={setdata}
                        value={user.coursepackage}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {coursepackages &&
                          coursepackages.map((item, index) => (
                            <MenuItem
                              key={item.id}
                              value={item.coursepackages_name}
                            >
                              {item.coursepackages_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Course<span> *</span>
                      </InputLabel>
                      <Select
                        id="courses"
                        name="courses"
                        required
                        onChange={setdata}
                        value={user.courses}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {getcourses &&
                          getcourses.map((item, index) => (
                            <MenuItem key={item.id} value={item.course_name}>
                              {item.course_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Lead Source<span> *</span>
                      </InputLabel>
                      <Select
                        id="leadsource"
                        name="leadsource"
                        required
                        onChange={setdata}
                        value={user.leadsource}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {leadsources &&
                          leadsources.map((item, index) => (
                            <MenuItem key={item.id} value={item.leadsource}>
                              {item.leadsource}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
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
          {/* -----step 7--- */}
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Admission Details</Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Branch<span> *</span>
                      </InputLabel>
                      <Select
                        id="branch"
                        name="branch"
                        required
                        onChange={setdata}
                        value={user.branch}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {branches &&
                          branches.map((item, index) => (
                            <MenuItem key={item.id} value={item.branch_name}>
                              {item.branch_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Mode of Training<span> *</span>
                      </InputLabel>
                      <Select
                        id="modeoftraining"
                        name="modeoftraining"
                        required
                        onChange={setdata}
                        value={user.modeoftraining}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="online">Online</MenuItem>
                        <MenuItem value="offline"> Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="row ">
                  {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Admission Status<span> *</span>
                      </InputLabel>
                      <Select
                        id="admissionstatus"
                        name="admissionstatus"
                        required
                        onChange={setdata}
                        value={user.admissionstatus}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive"> Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div> */}
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Admission Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.admissiondate}
                      name="admissiondate"
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Validity Start Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.validitystartdate}
                      name="validitystartdate"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-cl-6 col-lg-6 mt-2">
                    <TextField
                      label="validity End Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.validityenddate}
                      name="validityenddate"
                    />
                  </div>

                  {/* <label className="col-12 col-md-2 label">
                    Registration No <span className="text-danger"> *</span>
                    &nbsp;:
                  </label> */}
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
                  {/* {user.registrationnumber} */}
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                    <TextField
                      label="Registration Number"
                      variant="standard"
                      className="w-75"
                      required
                      value={user.registrationnumber}
                    />
                  </div>
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
          {/* -----step 8--- */}
          <Step>
            <StepLabel>
              {" "}
              <Typography fontSize={25}>Fee Details</Typography>{" "}
            </StepLabel>

            <StepContent>
              <form onSubmit={handleFeeDetails} className="form">
                <div className="row ">
                  {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Fee Type<span> *</span>
                      </InputLabel>
                      <Select
                        id="feetype"
                        name="Fee Type"
                        required
                        onChange={setdata}
                        value={user.feetype}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="admissionfee">Admission Fee</MenuItem>
                        <MenuItem value="fee"> Fee</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Amount"
                      type="number"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.grosstotal}
                      name="amount"
                    />
                  </div> */}

                  {/* added */}
                  <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 600 }} aria-label="spanning table">
                    <TableHead>
                      <TableCell className="fs-6 py-3" align="center">
                        Fee Type
                      </TableCell>
                      <TableCell className="fs-6 py-3" align="center">
                        Amount
                      </TableCell>
                      <TableCell className="fs-6 py-3" align="center">
                        Discount
                      </TableCell>
                      <TableCell className="fs-6 py-3" align="center">
                        Tax Amount
                      </TableCell>
                      <TableCell className="fs-6 py-3" align="center">
                        Total Amount
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      {user.feedetails &&
                        user.feedetails.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell align="center">{item.feetype}</TableCell>
                            <TableCell align="center">{item.amount}</TableCell>
                            <TableCell align="center">{item.discount}</TableCell>
                            <TableCell align="center">{parseFloat(item.taxamount.toFixed(2))}</TableCell>
                            <TableCell align="center">{item.totalamount}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                  {/* added end */}


                  
                  {/* <label className="col-12 col-md-2 label">
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
                  </select> */}
                </div>

                {/* <div className="row ">
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
                <br /> */}
                <div className="row ">
                  {/* <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label="Discount"
                      type="number"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={setdata}
                      value={user.totaldiscount}
                      name="discount"
                    />
                  </div> */}
                  {/* <label className="col-12 col-md-2 label">
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
                  /> */}
                </div>
                <br />

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
                {/*              
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
                </div> */}
                {/* <button
                  onClick={handleFeeDetails}
                  className="bg-primary text-light px-4 py-1  border border-none rounded-2 "
                >
                  save
                </button> */}
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
                  {user.grosstotal}
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
                  {user.totaldiscount}
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
                  {user.totaltax}
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
                  {user.grandtotal}
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
