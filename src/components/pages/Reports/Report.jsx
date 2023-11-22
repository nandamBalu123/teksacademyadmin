import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Report = () => {
  const { id } = useParams();
  const [data, setData] = useState([
    { reportName: "BranchWiseData" },
    { reportName: "CourseWiseData" },
    { reportName: "CounsellorWiseData" },
  ]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getreports`)
      .then((response) => {
        if (response.data) {
          // setData(response.data);
          console.log("response.data", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <div>Report Name : {data[parseInt(id)].reportName}</div>;
};

export default Report;
