let studentData = [
  {
    name: "irsahd",
    branch: "Hitech City",
    leadsource: "JustDail",
    counsellor: "kavya",
    companyname: "teks",
    course: "java",
    admissionDate: "25-01-2023",
  },
  {
    name: "balu",
    branch: "Dilshuknagar",
    leadsource: "IndiaMart",
    counsellor: "kavya",
    companyname: "kapil",
    course: "java",
    admissionDate: "25-02-2023",
  },
  {
    name: "bhavita",
    branch: "Dilshuknagar",
    leadsource: "JustDail",
    counsellor: "kavya",
    companyname: "teks",
    course: "java",
    admissionDate: "25-03-2023",
  },
  {
    name: "irshad",
    branch: "kukatpally",
    leadsource: "IndiaMart",
    counsellor: "kavya",
    companyname: "kapil",
    course: "java",
    admissionDate: "25-04-2023",
  },
  {
    name: "srikanth",
    branch: "ameerpet",
    leadsource: "Naukri",
    counsellor: "kavya",
    companyname: "teks",
    course: "java",
    admissionDate: "25-05-2023",
  },
  {
    name: "kavya",
    branch: "ameerpet",
    leadsource: "JustDail",
    counsellor: "kavya",
    companyname: "kapil",
    course: "python",
    admissionDate: "25-06-2023",
  },
  {
    name: "shasi",
    branch: "",
    leadsource: "Naukri",
    counsellor: "kavya",
    companyname: "teks",
    course: "java",
    admissionDate: "25-07-2023",
  },
  {
    name: "preme",
    branch: "Hitech City",
    leadsource: "JustDail",
    counsellor: "kavya",
    companyname: "kapil",
    course: "java",
    admissionDate: "25-08-2023",
  },
  {
    name: "bhaskar",
    branch: "Hitech City",
    leadsource: "JustDail",
    counsellor: "kavya",
    companyname: "teks",
    course: "python",
    admissionDate: "25-09-2023",
  },
  {
    name: "suma",
    branch: "Hitech City",
    leadsource: "PhonePe",
    counsellor: "kavya",
    companyname: "kapil",
    course: "python",
    admissionDate: "25-10-2023",
  },
];


import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Report.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from '@mui/material/NativeSelect';
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';
import axios from "axios";
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddBusinessTwoTone } from "@mui/icons-material";
import { useStudentsContext } from "../../../hooks/useStudentsContext";

const Report = () => {
  const { id } = useParams();
  const { students } = useStudentsContext();
  // const [reports, setReports] = useState();
  const [reportForm, setReportForm] = useState(


  )
  const [dimension1, setDimension1] = useState("");
  const [dimension2, setDimension2] = useState("");
  const [dimension3, setDimension3] = useState("");
  const [metrics, setMetrics] = useState("");
  const [organizedData, setOrganizedData] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          const filtered = response.data.filter(item => item.id === parseInt(id));
          setReportForm(filtered[0].reports[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log("reportForm", reportForm)

  })
  // const [DateRangeFilter, setDateRangeFilter] = useState({
  //   fromdate: "",

  //   todate: "",
  // });


  // const handleDateRangeFilter = (e) => {
  //   const { name, value } = e.target;

  //   setDateRangeFilter({ ...DateRangeFilter, [name]: value });
  // };

  useEffect(() => {
    if (reportForm) {
      setDimension1(reportForm.dimensions.dimension1)
      setDimension2(reportForm.dimensions.dimension2)
      setDimension3(reportForm.dimensions.dimension3)
      // setDateRangeFilter({ fromdate: reportForm.dateRange.fromDate, todate: reportForm.dateRange.toDate });

    }
  }, [reports])
  // console.log("DateRangeFilter", DateRangeFilter)
  const [filteredStudents, setFilteredStudents] = useState()
  useEffect(() => {
    if (students && reportForm.dateRange.fromdate && reportForm.dateRange.todate) {
      const filteredResults = students.filter((item) => {
        const dateCondition =
        reportForm.dateRange.fromdate && reportForm.dateRange.todate
            ? item.admissiondate >= reportForm.dateRange.fromdate &&
            item.admissiondate <= reportForm.dateRange.todate
            : true;
        return (
          dateCondition
        );
      });
      setFilteredStudents(filteredResults);
    }
  }, [DateRangeFilter, students]);
  useEffect(() => {
    if (filteredStudents) {
      let organizedData;
      if (reportForm) {
        if (reportForm.reportType === "Three Dimensional") {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[dimension1] || "Unknown";
            const dim2 = student[dimension2] || "Unknown";
            const dim3 = student[dimension3] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }
            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = {};
            }
            if (!acc[dim1][dim2][dim3]) {
              acc[dim1][dim2][dim3] = [];
            }

            acc[dim1][dim2][dim3].push(student);
            return acc;
          }, {});
        }
        if (reportForm.reportType === "Two Dimensional") {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[dimension1] || "Unknown";
            const dim2 = student[dimension2] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }

            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = [];
            }

            acc[dim1][dim2].push(student);
            return acc;
          }, {});
        }
        if (reportForm.reportType === "One Dimensional") {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[dimension1] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = [];
            }

            acc[dim1].push(student);
            return acc;
          }, {});
        }
        setOrganizedData(organizedData);
      }

    }
  }, [filteredStudents, dimension1, dimension2, dimension3]);
  // // filter
  // const [dateRangeType, setDateRangeType] = useState()
  // const handleDateRangeType = () => {

  // }
