import React, { useEffect } from "react";
import { useState } from "react";
import { useStudentsContext } from "../../../hooks/useStudentsContext";

const CreateReport = () => {
  const { students } = useStudentsContext();
  let [dimension1, setdimension1] = useState();
  let [dimension2, setdimension2] = useState();
  let [dimension3, setdimension3] = useState();
  console.log(dimension1, dimension2, dimension3);

  // Organize data by branches
  useEffect(() => {
    if (students) {
      const OrganizeData = students.reduce((acc, student) => {
        const dimension1 = student[dimension1] || "Unknown Branch";
        if (!acc[dimension1]) {
          acc[dimension1] = [];
        }
        acc[dimension1].push(student);
        return acc;
      }, {});
      console.log("OrganizeData", OrganizeData);
    }
  }, [students]);

  return (
    <div>
      <div>
        <label>first dimension</label>

        <select
          value={dimension1}
          onChange={(e) => setdimension1(e.target.value)}
        >
          <option value=""></option>

          <option value="course">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
        </select>
        <label>Second dimension</label>

        <select
          value={dimension2}
          onChange={(e) => setdimension2(e.target.value)}
        >
          <option value=""></option>

          <option value="course">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
        </select>
        <label>Third dimension</label>

        <select
          value={dimension3}
          onChange={(e) => setdimension3(e.target.value)}
        >
          <option value=""></option>

          <option value="course">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
        </select>
      </div>
    </div>
  );
};

export default CreateReport;
