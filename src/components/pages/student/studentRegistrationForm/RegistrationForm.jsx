// import * as React from "react";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./RegistrationForm.css";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { blue } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
// import { blue } from "@mui/material/colors";
// import { useDropzone } from 'react-dropzone';
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
import { useCoursePackageContext } from "../../../../hooks/useCoursePackageContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";

const Popup = ({ show, onClose, children }) => {
  return (
    <div className={`popup ${show ? "show" : ""}`}>
      <div className="popup-content">
        {children}
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
export default function RegistrationForm() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  let select = "select";
  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);
  const { user } = useAuthContext();
  const { branches } = useBranchContext();
  const { leadsources } = useLeadSourceContext();
  const { getcourses } = useCourseContext();
  const { coursepackages } = useCoursePackageContext();
  const navigate = useNavigate();
  const [user_id, setuserid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [parentsname, setParentsName] = useState("");
  const [birthdate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [college, setCollege] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [area, setArea] = useState("");
  const [native, setNative] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [whatsappno, setWhatsAppNo] = useState(null);
  const [educationtype, setEducationType] = useState("");
  const [marks, setMarks] = useState("");
  const [academicyear, setAcademicyear] = useState("");
  const [file, setSelectedFile] = useState(null);
  // const [profilepic, setProfilePpic] = useState("");
  const [enquirydate, setEnquiryDate] = useState("");
  const [enquirytakenby, setEnquiryTakenBy] = useState("");
  const [coursepackage, setCoursepakage] = useState("");
  const [courses, setCourses] = useState("");
  const [leadsource, setLeadSource] = useState("");
  const [branch, setBranch] = useState("");
  const [modeoftraining, setModeOfTraining] = useState("");
  const [admissionstatus, setAdmissionStatus] = useState("");
  const [registrationnumber, setRegistrationNumber] = useState("");
  const [admissiondate, setAdmissionDate] = useState("");
  const [validitystartdate, setValidityStartDate] = useState("");
  const [validityenddate, setValidityEndDate] = useState("");

  const [feetype, setfeetype] = useState("");
  const [amount, setAmount] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [taxamount, setTaxamount] = useState(null);
  const [totalamount, setTotalamount] = useState(null);

  const [feedetails, setFeeDetails] = useState([]);
  const [grosstotal, setGrosstotal] = useState(null);
  const [totaldiscount, setTotalDiscount] = useState(0);
  const [totaltax, settotaltax] = useState(null);
  const [grandtotal, setGrandtotal] = useState(null);
  const [finaltotal, setfinaltotal] = useState(null);
  const [admissionremarks, setadmissionremarks] = useState("");
  const [assets, setassets] = useState([]);
  const [initialpayment, setinitialamount] = useState([]);
  const [dueamount, setdueamount] = useState(null);
  const [totalinstallments, settotalinstallments] = useState(0);
  const [duedatetype, setduedatetype] = useState("");
  const [addfee, setaddfee] = useState(false);
  const [installments, setinstallments] = useState([]);

  const [feedetailsbilling, setfeedetailsbilling] = useState([]);
  const [materialfee, setmaterialfee] = useState(null);

  const [totalfeewithouttax, settotalfeewithouttax] = useState(null);
  const [totalpaidamount, settotalpaidamount] = useState(0);
  const [othersOption, setOthersOption] = useState(false);
  const [customEducationType, setCustomEducationType] = useState("");
  const [student_status, setStudent_status] = useState([]);
  const [certificate_status, setcertificate_status] = useState([
    { courseStartDate: "", courseEndDate: "", certificateStatus: "" },
  ]);
  const handleAssetChange = (event) => {
    const assetName = event.target.name;
    if (event.target.checked) {
      // Add the selected asset to the array
      setassets([...assets, assetName]);
    } else {
      // Remove the asset from the array if it's unchecked
      setassets(assets.filter((asset) => asset !== assetName));
    }
  };
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "others") {
      setOthersOption(true);
      setCustomEducationType(""); // Clear the custom education type
      setEducationType(selectedValue);
    } else {
      setOthersOption(false);
      setEducationType(selectedValue);
    }
  };
  const handleFeecalculations = () => {
    let grosstotall = 0;
    let totaldiscountt = 0;
    let totalfeewithouttaxx = 0;
    let totaltaxx = 0;
    let grandtotall = 0;
    let materialfeee = 0;
    const array = [];
    for (let i = 0; i < feedetails.length; i++) {
      if (feedetails[i].feetype === "Admission Fee") {
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
        // totaldiscountt = totaldiscountt + parseInt(feedetails[i].discount);
        totaldiscountt = 0;
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
        grosstotall = grosstotall + Math.round(feedetails[i].amount * 0.65);
        totaldiscountt =
          totaldiscountt + parseInt(feedetails[i].discount * 0.65);

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
        materialfeeobject.feewithtax = Math.round(
          feedetails[i].totalamount * 0.35
        );
        materialfeeobject.feewithouttax = materialfeeobject.feewithtax;
        materialfeeobject.feetax = 0;

        // settotalfeewithouttax(
        //   (value) => value + materialfeeobject.feewithouttax
        // );
        // settotaltax((value) => value + materialfeeobject.feetax);
        // setGrandtotal((value) => value + materialfeeobject.feewithtax);
        grosstotall = grosstotall + parseInt(feedetails[i].amount * 0.35);
        totaldiscountt =
          totaldiscountt + parseInt(feedetails[i].discount * 0.35);
        materialfeee =
          materialfeee + Math.round(feedetails[i].totalamount * 0.35);
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
    if (feedetails.length === 0) {
      alert("please enter feedetails");
      return;
    }
    handleNext();
  };
  useEffect(() => {
    setfinaltotal(grandtotal + materialfee);
  }, [grandtotal, materialfee]);
  useEffect(() => {
    setdueamount(finaltotal);
  }, [finaltotal]);
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
    setfeetype("");
    setAmount("");
    setDiscount("");
    setTaxamount(0);

    setTotalamount(0);
  };

  useEffect(() => {
    const filterbranch = studentData.filter((item) => item.branch === branch);
    const branchCount = filterbranch.length;

    let date = toString(admissiondate);
    let DD = admissiondate[8] + admissiondate[9];
    let month = admissiondate[5] + admissiondate[6];
    let year = admissiondate[2] + admissiondate[3];
    let firstbranch;
    if (branch) {
      firstbranch = branch[0].toUpperCase();
    }
    let serialno;
    if (branch) {
      serialno = branchCount + 1;
    }

    if (serialno) {
      serialno = serialno + 500;
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

    if (!admissiondate) {
      setRegistrationNumber("");
    }
    if (admissiondate) {
      setRegistrationNumber("TA" + firstbranch + DD + month + year + serialno);
    }
  }, [admissiondate, branch]);

  const [activeStep, setActiveStep] = React.useState(0);
  /////////////------------------validations-------------------------------
  const handleBasicDetails = () => {
    if (!name) {
      alert("please enter the name");
      return;
    }
    if (name) {
      setName(
        name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
    if (!email) {
      alert("please  enter email id");
      return;
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailPattern.test(email)) {
        alert("Invalid Email Address");
        return;
        // errors.email = 'Invalid email address';
      }
    }
    if (!mobilenumber) {
      alert("please enter mobilenumber");
      return;
    } else {
      if (mobilenumber.length != 10) {
        alert("incorrect mobile number");
        return;
      }
    }
    handleNext();
  };
  const handleStudentDetails = () => {
    if (!parentsname) {
      alert("please enter parent's name");
      return;
    }
    if (parentsname) {
      setParentsName(
        parentsname
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
    if (!birthdate) {
      alert("please  enter Date of birth");
      return;
    }
    if (!gender) {
      alert("please enter gender");
      return;
    }
    if (!maritalstatus) {
      alert("please enter marital status");
      return;
    }
    if (!college) {
      alert("please enter college name");
      return;
    }
    handleNext();
  };

  const handleStudentContactDetails = () => {
    if (!country) {
      alert("please enter country");
      return;
    }
    if (!state) {
      alert("please  enter State");
      return;
    }
    if (!area) {
      alert("please enter area");
      return;
    }
    if (!native) {
      alert("please enter Native place");
      return;
    }
    if (!zipcode) {
      alert("please enter zipcode");
      return;
    }

    if (!whatsappno) {
      alert("please enter whatsappno");
      return;
    } else {
      if (whatsappno.length != 10) {
        alert("incorrect whatsappno ");
        return;
      }
    }
    handleNext();
  };
  const handleEducationDetails = () => {
    if (!educationtype) {
      alert("please enter educationtype");
      return;
    }
    if (!marks) {
      alert("please  enter marks");
      return;
    }
    if (!academicyear) {
      alert("please enter academicyear");
      return;
    }
    if (educationtype === "others") {
      setEducationType(customEducationType);
    }
    handleNext();
  };
  const handlePhoto = () => {
    // if (!file) {
    //   alert("please enter profilepic");
    //   return;
    // }

    handleNext();
  };
  const handleEnquirydetails = () => {
    if (!enquirydate) {
      alert("please enter enquirydate");
      return;
    }
    if (!enquirytakenby) {
      alert("please  enter enquirytakenby");
      return;
    }
    if (!coursepackage) {
      alert("please enter coursepackage");
      return;
    }
    if (!courses) {
      alert("please enter courses");
      return;
    }
    if (!leadsource) {
      alert("please enter leadsource");
      return;
    }

    handleNext();
  };
  const handleAdmissiondetails = () => {
    if (!branch) {
      alert("please enter branch");
      return;
    }
    if (!modeoftraining) {
      alert("please  enter modeoftraining");
      return;
    }
    if (!admissionstatus) {
      alert("please enter admissionstatus");
      return;
    }
    if (!admissiondate) {
      alert("please enter Native place");
      return;
    }
    if (!validitystartdate) {
      alert("please enter validitystartdate");
      return;
    }
    if (!validityenddate) {
      alert("please enter validityenddate ");
      return;
    }
    handleNext();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    setuserid(user.id);
  }, [user]);

  const handleSubmit = async () => {
    ///validations
    if (!admissionremarks) {
      alert("please enter admissionremarks");
      return;
    }
    if (!assets) {
      alert("please enter assets ");
      return;
    }

    // setuserid(user.id);
    // const formdata = new FormData();
    // formdata.append("file", file);
    // console.log("selected", file);
    // let file = selectedFile
    const studentRegistrationdata = {
      name,
      email,
      mobilenumber,
      parentsname,
      birthdate,
      gender,
      maritalstatus,
      college,
      country,
      state,
      area,
      native,
      zipcode,
      whatsappno,
      educationtype,
      marks,
      academicyear,
      file,
      enquirydate,
      enquirytakenby,
      coursepackage,
      courses,
      leadsource,
      branch,
      modeoftraining,
      admissionstatus,
      registrationnumber,
      admissiondate,
      validitystartdate,
      validityenddate,
      feedetails,
      grosstotal,
      totaldiscount,
      totaltax,
      grandtotal,
      finaltotal,
      admissionremarks,
      assets,
      totalinstallments,
      dueamount,
      addfee,
      initialpayment,
      duedatetype,
      installments,
      materialfee,
      feedetailsbilling,
      totalfeewithouttax,
      totalpaidamount,
      student_status,
      user_id,
      certificate_status,
    };
    // studentRegistrationdata.append('file', selectedFile)
    console.log("studentRegistration", studentRegistrationdata);
    console.log("photo", file);
    try {
      // Make the POST request
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/student_form`,

        studentRegistrationdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const id = response.data.insertId;
      navigate(`/addtofee/${id}`);

      // Handle a successful response here
      console.log("Responsee:", response.data.insertId);
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
  const { users } = useUsersContext();
  const [filteredcounsellor, setfilteredcounsellor] = useState([]);

  useEffect(() => {
    if (users) {
      const filteruser = users.filter((user) => {
        const filtercounsellar = user.profile === "counsellor";
        return filtercounsellar;
      });
      setfilteredcounsellor(filteruser);
    }
  }, [users]);
  const [studentData, setStudentData] = useState([{ name }, { name }]);
  useEffect(() => {
    // Make a GET request to your backend API endpoint
    axios
      .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
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

  const handleFeeDelete = (id) => {
    const updatedTasks = feedetails.filter((task) => task.id !== id);
    setFeeDetails(updatedTasks);
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
              <form className="form ">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Name"
                      type="text"
                      className=" w-100"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
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
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />{" "}
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                    <TextField
                      label="Number "
                      type="number"
                      variant="standard"
                      className="mar w-100"
                      required
                      onChange={(e) => setMobileNumber(e.target.value)}
                      value={mobilenumber}
                    />{" "}
                  </div>
                </div>

                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="bg-primary continue-btn"
                      style={{ cursor: "pointer" }}
                      variant="contained"
                      onClick={handleBasicDetails}
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
                      onChange={(e) => setParentsName(e.target.value)}
                      value={parentsname}
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
                      onChange={(e) => setBirthDate(e.target.value)}
                      value={birthdate}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6  ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Gender<span> *</span>
                      </InputLabel>
                      <Select
                        id="gender"
                        name="gender"
                        required
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Marital Status<span> *</span>
                      </InputLabel>
                      <Select
                        id="maritalstatus"
                        name="maritalstatus"
                        required
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        value={maritalstatus}
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
                      onChange={(e) => setCollege(e.target.value)}
                      value={college}
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
                    onClick={handleStudentDetails}
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
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Country<span> *</span>
                      </InputLabel>
                      <Select
                        name="country"
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="india">India</MenuItem>
                        <MenuItem value="usa">USA</MenuItem>
                        <MenuItem value="china">China</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        State<span> *</span>
                      </InputLabel>
                      <Select
                        name="state"
                        required
                        onChange={(e) => setState(e.target.value)}
                        value={state}
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Area"
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setArea(e.target.value)}
                      value={area}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Native Place"
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setNative(e.target.value)}
                      value={native}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Zip Code"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setZipcode(e.target.value)}
                      value={zipcode}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label="Whatsapp Number"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setWhatsAppNo(e.target.value)}
                      value={whatsappno}
                    />
                  </div>
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleStudentContactDetails}
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
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Education Type<span> *</span>
                      </InputLabel>
                      <Select
                        id="educationtype"
                        name="educationtype"
                        required
                        onChange={handleSelectChange}
                        value={educationtype}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>

                        <MenuItem value="btech">B.Tech</MenuItem>
                        <MenuItem value="degree">Degree</MenuItem>
                        <MenuItem value="mca">MCA</MenuItem>
                        <MenuItem value="ssc">SSC</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                      {othersOption && (
                        <div className="mt-3">
                          <TextField
                            label="Others"
                            type="text"
                            variant="standard"
                            className=" w-75"
                            required
                            onChange={(e) =>
                              setCustomEducationType(e.target.value)
                            }
                            value={customEducationType}
                          />
                          {/* <label className="col-12 col-md-2 label">
                            Others
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
                            onChange={(e) =>
                              setCustomEducationType(e.target.value)
                            }
                            value={customEducationType}
                          /> */}
                        </div>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 ">
                    <TextField
                      label="Percentage"
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setMarks(e.target.value)}
                      value={marks}
                    />{" "}
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 ">
                    <TextField
                      label="Academic Year "
                      type="number"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => setAcademicyear(e.target.value)}
                      value={academicyear}
                    />{" "}
                  </div>
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleEducationDetails}
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
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => {
                      setSelectedFile(e.target.files[0]);
                    }}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handlePhoto}
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
              <Typography fontSize={25}>Enquiry Details</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label=" Enquiry Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setEnquiryDate(e.target.value)}
                      value={enquirydate}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Enquiry Taken By<span> *</span>
                      </InputLabel>
                      <Select
                        id=" enquirytakenby"
                        name="enquirytakenby"
                        required
                        onChange={(e) => setEnquiryTakenBy(e.target.value)}
                        value={enquirytakenby}
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
                    </FormControl>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Course Package<span> *</span>
                      </InputLabel>
                      <Select
                        id="coursepackage"
                        name="coursepackage"
                        required
                        onChange={(e) => setCoursepakage(e.target.value)}
                        value={coursepackage}
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Course<span> *</span>
                      </InputLabel>
                      <Select
                        id="courses"
                        name="courses"
                        required
                        onChange={(e) => setCourses(e.target.value)}
                        value={courses}
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Lead Source<span> *</span>
                      </InputLabel>
                      <Select
                        id="leadsource"
                        name="leadsource"
                        required
                        onChange={(e) => setLeadSource(e.target.value)}
                        value={leadsource}
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
                    onClick={handleEnquirydetails}
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
                        onChange={(e) => setBranch(e.target.value)}
                        value={branch}
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
                        onChange={(e) => setModeOfTraining(e.target.value)}
                        value={modeoftraining}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="online">Online</MenuItem>
                        <MenuItem value="offline"> Offline</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Admission Status<span> *</span>
                      </InputLabel>
                      <Select
                        id="admissionstatus"
                        name="admissionstatus"
                        required
                        onChange={(e) => setAdmissionStatus(e.target.value)}
                        value={admissionstatus}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive"> Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Admission Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setAdmissionDate(e.target.value)}
                      value={admissiondate}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Validity Start Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setValidityStartDate(e.target.value)}
                      value={validitystartdate}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="validity End Date"
                      type="date"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setValidityEndDate(e.target.value)}
                      value={validityenddate}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Registration Number"
                      variant="standard"
                      className="w-75"
                      required
                      value={registrationnumber}
                    />
                  </div>
                </div>
              </form>
              <Box sx={{ mb: 2, mt: 2 }}>
                <div>
                  <Button
                    className="bg-primary"
                    variant="contained"
                    onClick={handleAdmissiondetails}
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
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        Fee Type<span> *</span>
                      </InputLabel>
                      <Select
                        id="feetype"
                        name="Fee Type"
                        required
                        onChange={(e) => setfeetype(e.target.value)}
                        value={feetype}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        <MenuItem value="Admission Fee">Admission Fee</MenuItem>
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
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label="Discount"
                      type="number"
                      variant="standard"
                      className="w-75"
                      required
                      onChange={(e) => setDiscount(e.target.value)}
                      value={discount}
                    />
                  </div>
                </div>
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
                <br />

                {/* {feedetails.length > 0 && (
                  <table className="table w-75 m-auto border border-1 ">
                    <thead>
                      <tr>
                        <th className="border border-1 ">Fee Type</th>
                        <th className="border border-1">Amount</th>
                        <th className="border border-1">Discount</th>
                        <th className="border border-1">Tax Amount</th>
                        <th className="border border-1">Total Amount</th>
                        <th className="border border-1 ">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedetails &&
                        feedetails.map((item) => (
                          <tr key={item.id}>
                            <td scope="row" className="border border-1">
                              {item.feetype}
                            </td>
                            <td className="border border-1">{item.amount}</td>
                            <td className="border border-1">{item.discount}</td>
                            <td className="border border-1">
                              {" "}
                              {parseFloat(item.taxamount.toFixed(2))}
                            </td>
                            <td className="border border-1">
                              {item.totalamount}
                            </td>
                            <td onClick={() => handleFeeDelete(item.id)}>
                              <DeleteIcon />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )} */}
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
                      <TableCell className="fs-6 py-3" align="center">
                        Action
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      {feedetails.length > 0 &&
                        feedetails.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell align="center">{item.feetype}</TableCell>
                            <TableCell align="center">{item.amount}</TableCell>
                            <TableCell align="center">
                              {item.discount}
                            </TableCell>
                            <TableCell align="center">
                              {parseFloat(item.taxamount.toFixed(2))}
                            </TableCell>
                            <TableCell align="center">
                              {item.totalamount}
                            </TableCell>
                            <TableCell
                              onClick={() => handleFeeDelete(item.id)}
                              align="center"
                            >
                              <DeleteIcon />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
              <form className="form ">
                <TableContainer component={Paper} className="billingtable ">
                  <Table sx={{ minWidth: 600 }} aria-label="spanning table">
                    <TableHead>
                      <TableCell className="fs-6 py-3" align="center">
                        Gross Total
                      </TableCell>
                      <TableCell className="fs-6" align="center">
                        Total Discount
                      </TableCell>
                      <TableCell className="fs-6" align="center">
                        Total Amount
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      <TableCell align="center">{grosstotal}</TableCell>
                      <TableCell align="center">{totaldiscount}</TableCell>
                      <TableCell align="center">{finaltotal}</TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer component={Paper} className="billingtable mt-4">
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow className="border border1">
                        <TableCell align="left" className="fs-6 py-3">
                          {" "}
                          Fee Type
                        </TableCell>
                        <TableCell align="left" className="fs-6">
                          Fee (Excl of GST)
                        </TableCell>
                        <TableCell align="left" className="fs-6">
                          Tax
                        </TableCell>
                        <TableCell align="left" className="fs-6">
                          Fee (Incl of GST)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {feedetailsbilling.length > 0 &&
                        feedetailsbilling.map((item) => {
                          if (item.feetype != "Material Fee") {
                            return (
                              <TableRow
                                key={item.id}
                                className="border border1"
                              >
                                <TableCell>{item.feetype}</TableCell>
                                <TableCell>
                                  {parseFloat(item.feewithouttax.toFixed(2))}
                                </TableCell>
                                <TableCell>
                                  {parseFloat(item.feetax.toFixed(2))}
                                </TableCell>
                                <TableCell>
                                  {parseFloat(item.feewithtax.toFixed(2))}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      {feedetailsbilling.length > 0 && (
                        <TableRow className="border border1">
                          <TableCell> Sub Total</TableCell>
                          <TableCell>
                            {parseFloat(totalfeewithouttax.toFixed(2))}{" "}
                          </TableCell>
                          <TableCell>
                            {parseFloat(totaltax.toFixed(2))}
                          </TableCell>
                          <TableCell>
                            {parseFloat(grandtotal.toFixed(2))}
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow className="border border1">
                        <TableCell rowSpan={3} />
                        <TableCell rowSpan={3} />
                        <TableCell>Material Fee</TableCell>
                        <TableCell align="left">{materialfee}</TableCell>
                      </TableRow>
                      <TableRow className="border border1">
                        <TableCell align="left">
                          <strong> Grand Total</strong>
                        </TableCell>
                        <TableCell align="left">{finaltotal}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

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
          <Step>
            <StepLabel>
              <Typography fontSize={25}>Others</Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label="Remarks"
                      type="text"
                      variant="standard"
                      className="w-75"
                      required
                      onChange={(e) => setadmissionremarks(e.target.value)}
                      value={admissionremarks}
                    />
                  </div>
                </div>
                <br />
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
                {/* <div className="col-9 col-md-5">
                    {" "}
                    <FormControlLabel control={<Checkbox />} label="Bag" />
                    <FormControlLabel control={<Checkbox />} label="Laptap" />
                    <FormControlLabel control={<Checkbox />} label="LMS" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Course Meterial"
                    />{" "}
                  </div> */}
                <div className="col-9 col-md-5">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="bag"
                        checked={assets.includes("bag")}
                        onChange={handleAssetChange}
                      />
                    }
                    label="Bag"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="laptop"
                        checked={assets.includes("laptop")}
                        onChange={handleAssetChange}
                      />
                    }
                    label="Laptop"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="lms"
                        checked={assets.includes("lms")}
                        onChange={handleAssetChange}
                      />
                    }
                    label="LMS"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="courseMaterial"
                        checked={assets.includes("courseMaterial")}
                        onChange={handleAssetChange}
                      />
                    }
                    label="Course Material"
                  />
                </div>
                {/* <select
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
                  </select> */}
              </form>

              <Box sx={{ mb: 2, mt: 2 }}>
                <Button
                  className="bg-primary"
                  variant="contained"
                  onClick={openPopup}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Preview
                </Button>
                {/* <button onClick={openPopup}>Preview</button> */}
                <Popup show={isPopupOpen} onClose={closePopup}>
                  <div className="row">
                    <div className="col-12 col-md-7 col-lg-4 col-xl-4">
                      {" "}
                      <img
                        className="pop-img rounded-circle"
                        src="https://assets-global.website-files.com/650865454c2393ac25711ff7/650865454c2393ac25714a3e_The%2520best%2520selfie%2520Ideas%2520for%2520sm%2520pfp-p-500.jpeg"
                        alt="profile"
                      />
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-4">
                      <p> Name :{name}</p>
                      <p> EMail: {email}</p>
                      <p> Mobile Number: {mobilenumber}</p>
                      <p> Registration No: {registrationnumber}</p>
                      <p> Whatsapp Number: {whatsappno}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-4">
                      <p> Admission Date: {admissiondate} </p>
                      <p> Course: {courses}</p>
                      <p> Branch : {branch}</p>
                      <p> Validity Start Date:{validitystartdate}</p>
                      <p> Validity End Date : {validityenddate}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4  mt-2 ">
                      <p>Country : {country}</p>
                      <p> State: {state} </p>
                      <p>Area: {area} </p>
                      <p> Native Place: {native}</p>
                      <p> Zipcode: {zipcode}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2 ">
                      <p> Parent's Name : {parentsname}</p>
                      <p> Birth Date: {birthdate}</p>
                      <p>
                        {" "}
                        Gender: {gender} , {maritalstatus}{" "}
                      </p>
                      <p>
                        {" "}
                        College: {college} , {academicyear}{" "}
                      </p>
                      <p>
                        {" "}
                        Education Type: {educationtype} ,{marks}{" "}
                      </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                      <p> Enquiry Date : {enquirydate}</p>
                      <p> Enquiry Taken By: {enquirytakenby}</p>
                      <p> Course Package: {coursepackage}</p>
                      <p>Lead Source: {leadsource} </p>
                      <p> Mode of Traning: {modeoftraining}</p>
                    </div>
                  </div>
                  <div>
                    <TableContainer component={Paper} className="my-4">
                      <Table
                        sx={{ minWidth: 650 }}
                        size="large"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Fee Type{" "}
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Amount{" "}
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Discount
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Tax Amount (Inclusive of GST)
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Total Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {feedetails &&
                            feedetails.map((item, index) => (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                key={index}
                              >
                                <TableCell className="text-center border border-2">
                                  {" "}
                                  {item.feetype}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {" "}
                                  {item.amount}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {item.discount}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {parseFloat(item.taxamount).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {item.feetype === "fee" ? (
                                    <>
                                      Materialfee:{materialfee}&nbsp; ,
                                      CourseFee:
                                      {item.totalamount - materialfee}
                                    </>
                                  ) : (
                                    <span></span>
                                  )}
                                  <br />
                                  <b>{item.totalamount}</b>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      Admission Remarks:{admissionremarks}
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                      Assets: {assets}
                    </div>
                  </div>
                  {/* <div className="studentdataview ">
                    <div className="bg">
                      <img
                        className="photo"
                        src="https://wallpapers.com/images/high/pretty-profile-pictures-k1qebyviiyl0wx0x.webp"
                        alt="photo"
                      />
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <h6> Basic Details</h6> <hr className="w-50" />
                        <p> Name : {name}</p>
                        <p> EMail: {email}</p>
                        <p> Mobile Number: {mobilenumber}</p>
                        <p></p>
                      </div>
                      <div className="col-6 text-end">
                        <h6> Education Details</h6>
                        <hr className="w-50  end" />{" "}
                        <p> Education Type: {educationtype}</p>
                        <p>Marks: {marks} </p>
                        <p> Academic Year: {academicyear}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-4">
                        <h6> Student Details</h6> <hr className="w-50" />
                        <p> Parent's Name : {parentsname}</p>
                        <p> Birth Date: {birthdate}</p>
                        <p> Gender: {gender}</p>
                        <p> Marital Status: {maritalstatus}</p>
                        <p> College: {college}</p>
                      </div>
                      <div className="col-4  text-start ">
                        <h6> Student Contact Details</h6>
                        <hr className="w-50  start " />
                        <p> Whatsapp Number: {whatsappno}</p>
                        <p> State: {state} </p>
                        <p>Area: {area} </p>
                        <p> Native Place: {native}</p>
                        <p> Zipcode: {zipcode}</p>
                      </div>
                      <div className="col-4 text-end">
                        <h6> Enquiry Details</h6> <hr className="w-50 end" />
                        <p> Enquiry Date : {enquirydate}</p>
                        <p> Enquiry Taken By: {enquirytakenby}</p>
                        <p> Course Package: {coursepackage}</p>
                        <p>Lead Source: {leadsource} </p>
                           <p> Course: {courses}</p>
                      </div>
                    </div>
                    <h5 className="text-center mt-1">Admission Details </h5>
                    <hr className="w-75 hr" />
                    <div className="row">
                      <div className="col-4">
                        <p> Branch : {branch}</p>
                        <p> Mode of Traning: {modeoftraining}</p>
                      </div>
                      <div className="col-4 text-start">
                        <p>
                          {" "}
                          Validity :{validitystartdate} to {validityenddate}
                        </p>
                        <p> Registration No: {registrationnumber}</p>
                      </div>
                      <div className="col-4 text-end">
                        {" "}
                        <p> Admission Date: {admissiondate} </p>
                        <p> Admission Status: {admissionstatus} </p>
                      </div>
                    </div>

                    <TableContainer component={Paper} className="my-4">
                      <Table
                        sx={{ minWidth: 650 }}
                        size="large"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Fee Type{" "}
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Amount{" "}
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Discount
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Tax Amount (Inclusive of GST)
                            </TableCell>
                            <TableCell className="fs-6 text-center border border-2">
                              {" "}
                              Total Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {feedetails &&
                            feedetails.map((item, index) => (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                key={index}
                              >
                                <TableCell className="text-center border border-2">
                                  {" "}
                                  {item.feetype}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {" "}
                                  {item.amount}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {item.discount}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {parseFloat(item.taxamount).toFixed(2)}
                                </TableCell>
                                <TableCell className="text-center border border-2">
                                  {item.totalamount}
                                  <br />
                                  {item.feetype === "fee" ? (
                                    <>
                                      Materialfee:{materialfee}
                                      <br /> CourseFee:
                                      {item.totalamount - materialfee}
                                    </>
                                  ) : (
                                    <span></span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div> */}

                  <div className="col-12 text-end ">
                    <Button
                      className="bg-primary "
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Submit
                    </Button>
                  </div>
                </Popup>
                {/* </div> */}
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
                  // disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
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
}

// import "./RegistrationForm.css";
// // import Popup from './Popup';
// const Popup = ({ show, onClose, children }) => {
//   return (
//     <div className={`popup ${show ? "show" : ""}`}>
//       <div className="popup-content">
//         {children}
//         <button className="close-button" onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };
// function RegistrationForm() {
//   const [isPopupOpen, setPopupOpen] = useState(false);

//   const openPopup = () => setPopupOpen(true);
//   const closePopup = () => setPopupOpen(false);

//   return (
//     <div>
//       <button onClick={openPopup}>Open Popup</button>
//       <Popup show={isPopupOpen} onClose={closePopup}>
//         <h2>My Popup Content</h2>
//         <p>This is the content of the popup.</p>
//       </Popup>
//     </div>
//   );
// }

// export default RegistrationForm;
