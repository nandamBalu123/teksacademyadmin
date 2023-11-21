import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Report = () => {
  const { id } = useParams();
  const [data, setData] = useState([
    { reportName: "BranchWiseData" },
    { reportName: "CourseWiseData" },
    { reportName: "CounsellorWiseData" },
  ]);
  return <div>Report Name : {data[parseInt(id)].reportName}</div>;
};

export default Report;
