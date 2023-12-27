// import * as React from "react";
import React, { useEffect, useState, useRef } from "react";
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
import pictureprofile from "../../../../images/profilepicture.jpg";
import NativeSelect from "@mui/material/NativeSelect";
import DatePicker from 'react-datepicker';
// import { blue } from "@mui/material/colors";
// import { useDropzone } from 'react-dropzone';
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useLeadSourceContext } from "../../../../hooks/useLeadSourceContext";
import { useCoursePackageContext } from "../../../../hooks/useCoursePackageContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import moment from 'moment';

import { DateField } from "@mui/x-date-pickers/DateField";
import $ from 'jquery';
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
  // for number scrolling disable
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });
  // 

  const { dispatch } = useStudentsContext();
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

  // registraion form data
  const [user_id, setuserid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [parentsname, setParentsName] = useState("");
  const [parentsnumber, SetParentsNumber] = useState("");
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
  // const [studentImage, setSelectedFile] = useState(null);
  // const [profilepic, setProfilePpic] = useState("");
  const [enquirydate, setEnquiryDate] = useState("");
  const [enquirytakenby, setEnquiryTakenBy] = useState("");
  const [coursepackage, setCoursepakage] = useState("");
  const [courses, setCourses] = useState("");
  const [leadsource, setLeadSource] = useState("");
  const [branch, setBranch] = useState("");
  const [modeoftraining, setModeOfTraining] = useState("");
  // const [admissionstatus, setAdmissionStatus] = useState("");
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
  const [leadsourceOptions, setleadsourceOptions] = useState(false);
  const [CustomLeadSource, setCustomLeadSource] = useState("");
  const [feedetailsbilling, setfeedetailsbilling] = useState([]);
  const [materialfee, setmaterialfee] = useState(null);

  const [totalfeewithouttax, settotalfeewithouttax] = useState(null);
  const [totalpaidamount, settotalpaidamount] = useState(0);
  const [educationOthersOption, setEducationOthersOption] = useState(false);
  const [customEducationType, setCustomEducationType] = useState("");
  const [student_status, setStudent_status] = useState([]);
  const [certificate_status, setcertificate_status] = useState([
    { courseStartDate: "", courseEndDate: "", certificateStatus: "" },
  ]);
  const [extra_discount, setExtra_Discount] = useState([]);
  let LoggedInuser = JSON.parse(localStorage.getItem("user"));
  let userName;
  // if (LoggedInuser) {
  //   userName = LoggedInuser.fullname;
  //   setEnquiryTakenBy(userName);
  // }

  const [imageUrl, setImageUrl] = useState(null);
  const displayImage = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageUrl = e.target.result; // Get the base64 image data
      setImageUrl(imageUrl);
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (LoggedInuser) {
      userName = LoggedInuser.fullname;
      setEnquiryTakenBy(userName);
      console.log("userName", userName);
    }
  }, [LoggedInuser]);
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
  const handleEducationSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "others") {
      setEducationOthersOption(true);
      setCustomEducationType("");
      setEducationType(selectedValue);
    } else {
      setEducationOthersOption(false);
      setEducationType(selectedValue);
    }
  };
  const handleLeadSourceSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (
      selectedValue.toLowerCase() === "student referral" ||
      selectedValue.toLowerCase() === "employee referral"
    ) {
      setleadsourceOptions(true);
      setCustomLeadSource({ source: selectedValue });
      setLeadSource([{ source: selectedValue }]);
    } else {
      setleadsourceOptions(false);
      setLeadSource([{ source: selectedValue }]);
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

  // fee binding as per course selected

  useEffect(() => {
    if (feetype === "Admission Fee") {
      setAmount(499)
    }
    if (feetype === "fee") {
      let coursefee;
      let course = getcourses.filter((course) => course.course_name === courses)
      console.log("course fee", course)
      setAmount(course[0].fee)
    }
  }, [feetype])
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
      // do{}
      // while()
    }
  }, [admissiondate, branch]);

  const [activeStep, setActiveStep] = React.useState(0);
  /////////////------------------validations-------------------------------
  const handleBasicDetails = () => {
    if (!name) {
      alert("please enter the name");
      return;
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
    if (!birthdate) {
      alert("please  enter Date of birth");
      return;
    }
    handleNext();
  };
  const handleStudentDetails = () => {
    if (!parentsname) {
      alert("please enter parent's name");
      return;
    }

    if (!parentsnumber) {
      alert("please enter parent's mobilenumber");
      return;
    } else {
      if (parentsnumber.length != 10) {
        alert("incorrect  parent's mobile number");
        return;
      }
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
  // -----photo start--------------------------------------
  const fileInputRef = useRef(null);
  // const [resizedImage, setResizedImage] = useState(null);

  const [studentImage, setSelectedFile] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const targetSizeInBytes = 45 * 1024;
        const resizedImage = await resizeImage(file, targetSizeInBytes);
        const { width, height } = await getImageSize(resizedImage);
        const sizeInKB = (resizedImage.size / 1024).toFixed(2);
        console.log('Resized Image Dimensions:', { width, height });
        console.log('Resized Image Size:', sizeInKB, 'KB');
        setSelectedFile(resizedImage);

      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
  };

  const getImageSize = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = (error) => {
        reject(error);
      };

      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const resizeImage = async (file, targetSize) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.src = URL.createObjectURL(file);

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    let width = img.width;
    let height = img.height;
    let resizedFile = file;

    while (resizedFile.size > targetSize) {
      width *= 0.9;
      height *= 0.9;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.85);
      });

      resizedFile = new File([blob], file.name, { type: blob.type });
    }

    return resizedFile;
  };

  const handlePhoto = () => {
    if (!studentImage) {
      alert("Please select an image to upload");
      return;
    }

    // const maxSizeInBytes = 45 * 1024; // 40 KB in bytes
    // if (studentImage.size > maxSizeInBytes) {
    //   alert("Image size is too large. Maximum allowed size is 45 KB");
    //   return;
    // }

    // Image size is within the limit, proceed to the next step
    handleNext();
  };
  console.log("studentImage", studentImage)

  // ----photo end--------------------------------------------
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
    if (
      leadsource[0].source.toLowerCase() === "student referral" ||
      leadsource[0].source.toLowerCase() === "employee referral"
    ) {
      setLeadSource([CustomLeadSource]);
    }

    handleNext();
  };

  useEffect(() => {
    const today = new Date(validitystartdate);
    const futureDate = new Date(today.getFullYear(), today.getMonth() + 10, today.getDate());

    // Format the future date as a string (e.g., "YYYY-MM-DD")
    const formattedFutureDate = `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
    setValidityEndDate(formattedFutureDate)

  }, [validitystartdate])
  const handleAdmissiondetails = () => {

    if (!branch) {
      alert("please enter branch");
      return;
    }
    if (!modeoftraining) {
      alert("please  enter modeoftraining");
      return;
    }
    // if (!admissionstatus) {
    //   alert("please enter admissionstatus");
    //   return;
    // }
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
    const reader = new FileReader();

    reader.onload = async () => {
      // Read the student image as a data URL
      const photoData = reader.result.split(",")[1];

      // Validate the form data
      if (!admissionremarks) {
        alert("Please enter admission remarks");
        return;
      }
      if (!assets) {
        alert("Please enter assets");
        return;
      }

      // Create the data object with the form fields
      let studentRegistrationdata = {
        name,
        email,
        mobilenumber,
        parentsname,
        parentsnumber,
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
        filename: studentImage.name,
        data: photoData,
        enquirydate,
        enquirytakenby,
        coursepackage,
        courses,
        leadsource,
        branch,
        modeoftraining,
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
        extra_discount,
      };
      console.log("studentRegistrationdata", studentRegistrationdata);
      ///title case
      studentRegistrationdata = [studentRegistrationdata];
      const dataWithTitleCase = studentRegistrationdata.map((item) => {
        const newItem = {};

        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (typeof item[key] === "string" && key !== "email") {
              newItem[key] = item[key]
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            } else {
              newItem[key] = item[key];
            }
          }
        }

        return newItem;
      });
      studentRegistrationdata = dataWithTitleCase[0];
      try {
        // Make the POST request
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/student_form`,
          studentRegistrationdata
        );

        // Handle the response as needed
        console.log("Response:", response.data);
        const id = response.data.insertId;
        let updateContext = studentRegistrationdata;
        updateContext.id = response.data.insertId;
        dispatch({
          type: "CREATE_STUDENT",
          payload: updateContext,
        });
        navigate(`/feeview/${id}`);

        // You can navigate to another page or perform other actions here.
      } catch (error) {
        // Handle errors
        if (error.response) {
          console.log(
            "Server returned an error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.error("Request error:", error.message);
        }
      }
    };

    // Read the student image as a data URL
    reader.readAsDataURL(studentImage);
  };

  //   const handleSubmit =  () => {

  //     const reader = new FileReader();

  //     reader.onload = async () => {
  //     reader.readAsDataURL(studentImage);
  //       const photoData = reader.result.split(',')[1];

  //     ///validations
  //     if (!admissionremarks) {
  //       alert("please enter admissionremarks");
  //       return;
  //     }
  //     if (!assets) {
  //       alert("please enter assets ");
  //       return;
  //     }

  //     // setuserid(user.id);
  //     // const formdata = new FormData();
  //     // formdata.append("file", file);
  //     // console.log("selected", file);
  //     // let file = selectedFile
  //     const studentRegistrationdata = {
  //       name,
  //       email,
  //       mobilenumber,
  //       parentsname,
  //       birthdate,
  //       gender,
  //       maritalstatus,
  //       college,
  //       country,
  //       state,
  //       area,
  //       native,
  //       zipcode,
  //       whatsappno,
  //       educationtype,
  //       marks,
  //       academicyear,
  //       filename: studentImage.name,
  //       data: photoData,
  //       enquirydate,
  //       enquirytakenby,
  //       coursepackage,
  //       courses,
  //       leadsource,
  //       branch,
  //       modeoftraining,
  //       admissionstatus,
  //       registrationnumber,
  //       admissiondate,
  //       validitystartdate,
  //       validityenddate,
  //       feedetails,
  //       grosstotal,
  //       totaldiscount,
  //       totaltax,
  //       grandtotal,
  //       finaltotal,
  //       admissionremarks,
  //       assets,
  //       totalinstallments,
  //       dueamount,
  //       addfee,
  //       initialpayment,
  //       duedatetype,
  //       installments,
  //       materialfee,
  //       feedetailsbilling,
  //       totalfeewithouttax,
  //       totalpaidamount,
  //       student_status,
  //       user_id,
  //       certificate_status,
  //     };

  //     console.log("studentRegistration", studentRegistrationdata);

  //     //      const reader = new FileReader();
  //     //     reader.readAsDataURL(selectedFile);
  //     //     reader.onload = () => {
  //     //       const photoData = reader.result.split(',')[1];

  //     //       axios.post('http://localhost:3030/upload', {
  //     //         filename: selectedFile.name,
  //     //         data: photoData,
  //     //       })
  //     //       .then(response => {
  //     //         console.log('File uploaded successfully', response.data);
  //     //       })
  //     //       .catch(error => {
  //     //         console.error('Error uploading file:', error);
  //     //       });
  //     //     };
  //     //   };

  //     try {
  //       // Make the POST request
  //       const response = await axios.post(
  //         `${process.env.REACT_APP_API_URL}/student_form`,
  //         studentRegistrationdata,

  //       );
  //       const id = response.data.insertId;
  //       // navigate(`/addtofee/${id}`);

  //       // Handle a successful response here
  //       console.log("Responsee:", response.data.insertId);
  //     } catch (error) {
  //       // Handle the error here
  //       if (error.response) {
  //         // The request was made and the server responded with a non-2xx status code
  //         console.log(
  //           "Server returned an error:",
  //           error.response.status,
  //           error.response.data
  //         );
  //       } else if (error.request) {
  //         // The request was made, but no response was received
  //         console.log("No response received:", error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an error
  //         console.error("Request error:", error.message);
  //       }
  //     }

  //     }
  // }

  // this is for date DD-MM-YYY

  // $("input").on("change", function () {
  //   this.setAttribute(
  //     "data-date",
  //     moment(this.value, "yy-MM-DD")
  //       .format(this.getAttribute("data-date-format"))
  //   )
  // }).trigger("change")


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
    if (studentImage) {
      displayImage(studentImage);
    }
  }, [studentImage]);
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

  // pin code api
  // const fetchData = async () => {
  //   if (zipcode && zipcode.length > 2) {
  //     try {
  //       const response = await axios.get(
  //         `https://api.postalpincode.in/pincode/${zipcode}`
  //       );

  //       if (response.data.length > 0) {
  //         const postOffice = response.data[0]?.PostOffice[0];

  //         if (postOffice) {
  //           const { Region: city, State: state, Country: country, Block: area } = postOffice;

  //           setCountry(country);
  //           setState(state);
  //           setArea(area || '');
  //           setNative(city || '');
  //         } else {
  //           // Handle case when post office data is not available
  //           // setCountry('');
  //           // setState('');
  //           // setArea('');
  //           // setNative('');
  //         }
  //       } else {
  //         // Handle case when no data is returned
  //         // setCountry('');
  //         // setState('');
  //         // setArea('');
  //         // setNative('');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching location information:', error);
  //       // Handle error as needed
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [zipcode]);

  const fetchData = async () => {
    if (zipcode && zipcode.length > 2) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${zipcode}`
        );

        if (response.data.length > 0) {
          const postOffice = response.data[0]?.PostOffice[0];

          if (postOffice) {
            const {
              Region: city,
              State: state,
              Country: country,
              Block: area,
            } = postOffice;

            setCountry(country);
            setState(state);
            setArea(area || "");
            setNative(city || "");
          } else {
            // Clear the state if no post office data is available
            setCountry("");
            setState("");
            setArea("");
            setNative("");
          }
        } else {
          // Clear the state if no data is returned
          setCountry("");
          setState("");
          setArea("");
          setNative("");
        }
      } catch (error) {
        console.error("Error fetching location information:", error);
        // Handle error as needed
      }
    } else {
      // Clear the state if the pincode is not valid
      setCountry("");
      setState("");
      setArea("");
      setNative("");
    }
  };

  useEffect(() => {
    fetchData();
  }, [zipcode]);

  // pin code end

  return (
    <div className="main-container container">
      {/* <div>
      <form>
        <label>
          Zip Code:
          <input type="text" value={zipCode} onChange={handleZipCodeChange} />
        </label>
      </form>
      <div>
        <p>Area Name: {locationInfo.areaName}</p>
        <p>City: {locationInfo.city}</p>
        <p>State: {locationInfo.state}</p>
        <p>Country: {locationInfo.country}</p>
      </div>
    </div> */}
      {/* <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div> */}
      <div className="main-sub-container ">
        <Typography>
          <h5 className="mt-3"> Registration form</h5>
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {/* -----step 1--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6> Basic Details</h6>
              </Typography>
            </StepLabel>
            <StepContent>
              <form className="form ">
                {/* */}
                {/* <FormControl variant="standard" className="w-75">
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
                </FormControl> */}
                {/*  */}
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Full Name</span>}
                      type="text"
                      className=" w-75"
                      required
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      variant="standard"
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Email ID</span>}
                      type="email"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Phone Number</span>}
                      type="number"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => setMobileNumber(e.target.value)}
                      value={mobilenumber}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={
                        <span className="label-family">Date of Birth</span>
                      }
                      type="date"
                      variant="standard"
                      className="w-75"

                      // data-date-format="DD­/MM/YYYY"

                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setBirthDate(e.target.value)}
                      value={birthdate}
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="datePicker">Date:</label>
                    <DatePicker
                      id="datePicker"

                      onChange={(e) => setBirthDate(e.target.value)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                    />
                  </div> */}
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
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
              <Typography>
                <h6> Student Details</h6>
              </Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={
                        <span className="label-family">Parent's Name</span>
                      }
                      type="text"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => setParentsName(e.target.value)}
                      value={parentsname}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6  ">
                    <TextField
                      label={
                        <span className="label-family">Parent's Number</span>
                      }
                      type="number"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => SetParentsNumber(e.target.value)}
                      value={parentsnumber}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6  ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        <span className="label-family">
                          Gender<span>*</span>
                        </span>
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
                        <span className="label-family">
                          Marital Status <span>*</span>
                        </span>
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
                      label={
                        <span className="label-family">
                          College/School/Company
                        </span>
                      }
                      type="text"
                      className=" w-75"
                      required
                      onChange={(e) => setCollege(e.target.value)}
                      value={college}
                      variant="standard"
                    />
                  </div>
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleStudentDetails}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 3--- */}

          <Step>
            <StepLabel>
              <Typography>
                <h6>Student Contact Details</h6>
              </Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={<span className="label-family">Pin Code</span>}
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setZipcode(e.target.value)}
                      value={zipcode}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Country</span>}
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={<span className="label-family">State</span>}
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={<span className="label-family">Native Place</span>}
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
                      label={<span className="label-family">Area</span>}
                      type="text"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setArea(e.target.value)}
                      value={area}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={
                        <span className="label-family">Whatsapp Number</span>
                      }
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setWhatsAppNo(e.target.value)}
                      value={whatsappno}
                    />
                  </div>
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleStudentContactDetails}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 4--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6>Education Details</h6>
              </Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        <span className="label-family">
                          Education Type <span>*</span>
                        </span>
                      </InputLabel>
                      <Select
                        id="educationtype"
                        name="educationtype"
                        required
                        onChange={handleEducationSelectChange}
                        value={educationtype}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>

                        <MenuItem value="btech">B.Tech</MenuItem>
                        <MenuItem value="degree">Degree</MenuItem>
                        <MenuItem value="mca">MCA</MenuItem>
                        <MenuItem value="ssc">SSC</MenuItem>
                        <MenuItem value="others">Others</MenuItem>
                      </Select>
                      {educationOthersOption && (
                        <div className="mt-3">
                          <TextField
                            label={<span className="label-family">Others</span>}
                            type="text"
                            variant="standard"
                            className=" w-75"
                            required
                            onChange={(e) =>
                              setCustomEducationType(e.target.value)
                            }
                            value={customEducationType}
                          />
                        </div>
                      )}
                    </FormControl>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-1 ">
                    <TextField
                      label={<span className="label-family">Percentage</span>}
                      type="number"
                      variant="standard"
                      className=" w-75"
                      required
                      onChange={(e) => setMarks(e.target.value)}
                      value={marks}
                    />
                  </div>
                  <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-1">
                    <TextField
                      label={
                        <span className="label-family">Academic Year</span>
                      }
                      type="number"
                      variant="standard"
                      className="mar w-75"
                      required
                      onChange={(e) => setAcademicyear(e.target.value)}
                      value={academicyear}
                    />
                  </div>
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleEducationDetails}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* Step 5 */}
          <Step>
            <StepLabel>
              <Typography>
                <h6>Photo</h6>
              </Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <input ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />

                  {studentImage && (
                    <div style={{ marginTop: '10px' }}>
                      {/* <strong>Resized Image Dimensions:</strong>{' '} */}
                      {/* {`Width: ${studentImage.width}px, Height: ${studentImage.height}px`} */}
                      <br />
                      {/* <strong>Resized Image Size:</strong>  */}
                      {/* {`${(studentImage.size / 1024).toFixed(2)} KB`} */}
                      {/* <br /> */}
                      <img src={URL.createObjectURL(studentImage)} alt="Resized" />
                    </div>
                  )}
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handlePhoto}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 6--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6>Enquiry Details</h6>
              </Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={<span className="label-family">Enquiry Date</span>}
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
                      {enquirytakenby && (
                        <TextField
                          label={
                            <span className="label-family">
                              Enquiry Taken By
                            </span>
                          }
                          defaultValue={enquirytakenby}
                          InputProps={{
                            readOnly: true,
                          }}
                          variant="standard"
                          required
                        />
                      )}
                    </FormControl>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        <span className="label-family">
                          Course Package<span>*</span>
                        </span>
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
                        <span className="label-family">
                          Course <span> *</span>
                        </span>
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
                        <span className="label-family">
                          Lead Source <span>*</span>
                        </span>
                      </InputLabel>
                      <Select
                        id="leadsource"
                        name="leadsource"
                        required
                        onChange={handleLeadSourceSelectChange}
                        value={leadsource.source}
                      >
                        <MenuItem value="select"> ---select---</MenuItem>
                        {leadsources &&
                          leadsources.map((item, index) => (
                            <MenuItem key={item.id} value={item.leadsource}>
                              {item.leadsource}
                            </MenuItem>
                          ))}
                      </Select>
                      {leadsourceOptions && (
                        <div className="mt-3">
                          <TextField
                            label={<span className="label-family">Name</span>}
                            type="text"
                            variant="standard"
                            className=" w-75"
                            required
                            onChange={(e) =>
                              setCustomLeadSource((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            value={CustomLeadSource.name || ""}
                          />
                          <TextField
                            label={
                              <span className="label-family">
                                Mobile Number
                              </span>
                            }
                            type="text"
                            variant="standard"
                            className=" w-75"
                            required
                            onChange={(e) =>
                              setCustomLeadSource((prev) => ({
                                ...prev,
                                mobileNumber: e.target.value,
                              }))
                            }
                            value={CustomLeadSource.mobileNumber || ""}
                          />
                        </div>
                      )}
                    </FormControl>
                  </div>
                </div>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleEnquirydetails}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 7--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6>Admission Details</h6>
              </Typography>
            </StepLabel>

            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        <span className="label-family">
                          Branch <span>*</span>
                        </span>
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
                        <span className="label-family">
                          Mode of Traning<span>*</span>
                        </span>
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
                    <TextField
                      label={
                        <span className="label-family">Admission Date</span>
                      }
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
                    {/* <FormControl variant="standard" className="w-75">
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
                    </FormControl> */}
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={
                        <span className="label-family">
                          Registration Number
                        </span>
                      }
                      variant="standard"
                      className="w-75"
                      required
                      value={registrationnumber}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label={
                        <span className="label-family">
                          Validity Start Date
                        </span>
                      }
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
                      label={
                        <span className="label-family">Validity End Date</span>
                      }
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
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleAdmissiondetails}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
                {/* <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
                    <TextField
                      label="Registration Number"
                      variant="standard"
                      className="w-75"
                      required
                      value={registrationnumber}
                    />
                  </div>
                </div> */}
              </form>
            </StepContent>
          </Step>
          {/* -----step 8--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6> Fee Details</h6>
              </Typography>
            </StepLabel>

            <StepContent>
              <form onSubmit={handleFeeDetails} className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <FormControl variant="standard" className="w-75">
                      <InputLabel>
                        <span className="label-family">
                          Fee Type<span>*</span>
                        </span>
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
                      label={<span className="label-family">Amount</span>}
                      type="number"
                      variant="standard"
                      className="w-75"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Discount</span>}
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
                    Total Amount (Inclusive of GST)
                    <span className="text-danger"> *</span>&nbsp;:
                  </label>

                  {totalamount}
                </div> */}
                <button onClick={handleFeeDetails} className="btn btn-color">
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
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableCell
                        className="table-cell-heading "
                        align="center"
                      >
                        Fee Type
                      </TableCell>
                      <TableCell
                        align="center"
                        className="table-cell-heading "
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        align="center"
                        className="table-cell-heading "
                      >
                        Discount
                      </TableCell>
                      <TableCell
                        align="center"
                        className="table-cell-heading "
                      >
                        Tax Amount
                      </TableCell>
                      <TableCell
                        align="center"
                        className="table-cell-heading "
                      >
                        Total Amount
                      </TableCell>
                      <TableCell
                        align="center "
                        className="table-cell-heading "
                      >
                        Action
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      {feedetails.length > 0 &&
                        feedetails.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell
                              align="center"
                              className="Table-cell "
                            >
                              {item.feetype}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="Table-cell "
                            >
                              {item.amount}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="Table-cell "
                            >
                              {item.discount}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="Table-cell "
                            >
                              {parseFloat(item.taxamount.toFixed(2))}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="Table-cell "
                            >
                              {item.totalamount}
                            </TableCell>
                            <TableCell onClick={() => handleFeeDelete(item.id)}>
                              <DeleteIcon />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleFeecalculations}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  </div>
                </Box>
              </form>
            </StepContent>
          </Step>
          {/* -----step 9--- */}
          <Step>
            <StepLabel>
              <Typography>
                <h6>Billing</h6>
              </Typography>
            </StepLabel>

            <StepContent>
              <form className="form ">
                <TableContainer component={Paper} className="billingtable px-4">
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableCell
                        className="table-cell-heading"
                        align="center"
                      >
                        Gross Total
                      </TableCell>
                      <TableCell
                        className="table-cell-heading"
                        align="center"
                      >
                        Total Discount
                      </TableCell>
                      <TableCell
                        className="table-cell-heading"
                        align="center"
                      >
                        Total Amount
                      </TableCell>
                    </TableHead>
                    <TableBody>
                      <TableCell
                        align="center"
                        className="Table-cell"
                      >
                        {grosstotal}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="Table-cell "
                      >
                        {totaldiscount}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="Table-cell "
                      >
                        {finaltotal}
                      </TableCell>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer component={Paper} className="billingtable mt-4 px-4">
                  <Table aria-label="spanning table">
                    <TableHead>
                      <TableRow className="border border1">
                        <TableCell
                          align="center"
                          className="table-cell-heading"
                        >
                          Fee Type
                        </TableCell>
                        <TableCell
                          align="center"
                          className="table-cell-heading"
                        >
                          Fee (Excl of GST)
                        </TableCell>
                        <TableCell
                          align="center"
                          className="table-cell-heading"
                        >
                          Tax
                        </TableCell>
                        <TableCell
                          align="center"
                          className="table-cell-heading"
                        >
                          Fee (Incl of GST)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {feedetailsbilling.length > 0 &&
                        feedetailsbilling.map((item) => {
                          if (item.feetype != "Material Fee") {
                            return (
                              <TableRow key={item.id}>
                                <TableCell
                                  align="center"
                                  className="Table-cell "
                                >
                                  {item.feetype}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="Table-cell "
                                >
                                  {parseFloat(item.feewithouttax.toFixed(2))}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="Table-cell "
                                >
                                  {parseFloat(item.feetax.toFixed(2))}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="Table-cell "
                                >
                                  {parseFloat(item.feewithtax.toFixed(2))}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      {feedetailsbilling.length > 0 && (
                        <TableRow className="border border1">
                          <TableCell
                            align="center"
                            className="Table-cell "
                          >
                            Sub Total
                          </TableCell>
                          <TableCell
                            align="center"
                            className="Table-cell "
                          >
                            {parseFloat(totalfeewithouttax.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="Table-cell "
                          >
                            {parseFloat(totaltax.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="Table-cell "
                          >
                            {parseFloat(grandtotal.toFixed(2))}
                          </TableCell>
                        </TableRow>
                      )}

                      <TableRow className="border border1">
                        <TableCell rowSpan={3} />
                        <TableCell rowSpan={3} />
                        <TableCell
                          align="center"
                          className="Table-cell "
                        >
                          Material Fee
                        </TableCell>
                        <TableCell
                          align="center"
                          className="Table-cell "
                        >
                          {materialfee}
                        </TableCell>
                      </TableRow>
                      <TableRow className="border border1">
                        <TableCell
                          align="center"
                          className="Table-cell "
                        >
                          <strong> Grand Total</strong>
                        </TableCell>
                        <TableCell
                          align="center"
                          className="Table-cell  vy"
                        >
                          {finaltotal}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mb: 2, mt: 2 }}>
                  <div>
                    <Button
                      className="btn btn-color"
                      variant="contained"
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {/* {index === steps.length - 1 ? "Finish" : "Continue"} */}
                      Back
                    </Button>

                    <Button
                      className="btn btn-color"
                      variant="contained"
                      // disabled={index === 0}
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
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
              <Typography>
                <h6>Others</h6>
              </Typography>
            </StepLabel>
            <StepContent>
              <form className="form">
                <div className="row ">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <TextField
                      label={<span className="label-family">Remarks</span>}
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
                    
                    <FormControlLabel control={<Checkbox />} label="Bag" />
                    <FormControlLabel control={<Checkbox />} label="Laptap" />
                    <FormControlLabel control={<Checkbox />} label="LMS" />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Course Meterial"
                    />
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
                <Box sx={{ mb: 2, mt: 2 }}>
                  <Button
                    className="btn btn-color"
                    variant="contained"
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                  {/* <button onClick={openPopup}>Preview</button> */}
                  <Popup show={isPopupOpen} onClose={closePopup}>
                    <div className="row">
                      <div className="col-12 col-md-7 col-lg-4 col-xl-4">
                        {/* <img
                        className="pop-img rounded-circle w-100"
                        src={pictureprofile}
                        alt="profile"
                      /> */}
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt="Selected"
                            style={{ width: "60%" }}
                          />
                        )}
                        {/* {!studentdata.studentImg && (
                        <img src={profilePic} alt="photo" />
                      )}
                      {studentdata.studentImg && (
                        <img
                          src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
                          alt="photo"
                        />
                      )} */}
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
                          Gender: {gender} , {maritalstatus}
                        </p>
                        <p>
                          College: {college} , {academicyear}
                        </p>
                        <p>
                          Education Type: {educationtype} ,{marks}
                        </p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-4 col-xl-4 mt-2">
                        <p> Enquiry Date : {enquirydate}</p>
                        <p> Enquiry Taken By: {enquirytakenby}</p>
                        <p> Course Package: {coursepackage}</p>
                        {/* <p>Lead Source: {leadsource} </p> */}
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
                                Fee Type
                              </TableCell>
                              <TableCell className="fs-6 text-center border border-2">
                                Amount
                              </TableCell>
                              <TableCell className="fs-6 text-center border border-2">
                                Discount
                              </TableCell>
                              <TableCell className="fs-6 text-center border border-2">
                                Tax Amount (Inclusive of GST)
                              </TableCell>
                              <TableCell className="fs-6 text-center border border-2">
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
                                    {item.feetype}
                                  </TableCell>
                                  <TableCell className="text-center border border-2">
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

                    <div className="col-12 text-end ">
                      <Button
                        className="btn btn-color"
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Submit
                      </Button>
                    </div>
                  </Popup>
                  {/* </div> */}
                  {/* <Button
                  className="bg-primary"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Submit
                </Button> */}
                  <Button
                    className="btn btn-color"
                    variant="contained"
                    // disabled={index === 0}
                    onClick={openPopup}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Preview
                  </Button>
                </Box>
              </form>
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
