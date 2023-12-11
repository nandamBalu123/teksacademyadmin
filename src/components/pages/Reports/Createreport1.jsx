import React, { useEffect } from "react";
import { useState } from "react";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
import { padding } from "@mui/system";

const CreateReport = () => {
  const { students } = useStudentsContext();
  const [dimension1, setDimension1] = useState("");
  const [dimension2, setDimension2] = useState("");
  const [dimension3, setDimension3] = useState("");
  const [metrics, setMetrics] = useState("");
  const [organizedData, setOrganizedData] = useState(null);

  useEffect(() => {
    if (students) {
      const organizedData = students.reduce((acc, student) => {
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
      setOrganizedData(organizedData);
    }
  }, [students, dimension1, dimension2, dimension3]);
  // useEffect(() => {
  //   if (students) {
  //     const organizedData = students.reduce((acc, student) => {
  //       const dim1 = student[dimension1] || "Unknown";
  //       const dim2 = student[dimension2] || "Unknown";
  //       const dim3 = student[dimension3] || "Unknown";

  //       if (!acc[dim1]) {
  //         acc[dim1] = {};
  //       }
  //       if (!acc[dim1][dim2]) {
  //         acc[dim1][dim2] = {};
  //       }
  //       if (!acc[dim1][dim2][dim3]) {
  //         acc[dim1][dim2][dim3] = new Set(); // Use Set to store unique names
  //       }

  //       acc[dim1][dim2][dim3].add(student); // Add the name to the set
  //       return acc;
  //     }, {});

  //     // Convert sets back to arrays for rendering
  //     const formattedData = Object.entries(organizedData).map(
  //       ([dim1, dim1Data]) => ({
  //         dim1,
  //         dim2Data: Object.entries(dim1Data).map(([dim2, dim2Data]) => ({
  //           dim2,
  //           dim3Data: Object.entries(dim2Data).map(([dim3, namesSet]) => ({
  //             dim3,
  //             names: Array.from(namesSet),
  //           })),
  //         })),
  //       })
  //     );

  //     setOrganizedData(formattedData);
  //   }
  // }, [students, dimension1, dimension2, dimension3]);

  useEffect(() => {
    console.log("organizedData", organizedData);
  });
  return (
    <div>
      <div>
        <label>first dimension</label>

        <select
          value={dimension1}
          onChange={(e) => setDimension1(e.target.value)}
        >
          <option value=""></option>

          <option value="courses">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
          <option value="state">State</option>
          <option value="educationtype">Education Type</option>
          <option value="academicyear">Academic year</option>
          <option value="leadsource">Lead source</option>
        </select>
        <label>Second dimension</label>

        <select
          value={dimension2}
          onChange={(e) => setDimension2(e.target.value)}
        >
          <option value=""></option>

          <option value="courses">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
          <option value="state">State</option>
          <option value="educationtype">Education Type</option>
          <option value="academicyear">Academic year</option>
          <option value="leadsource">Lead source</option>
        </select>
        <label>Third dimension</label>

        <select
          value={dimension3}
          onChange={(e) => setDimension3(e.target.value)}
        >
          <option value=""></option>

          <option value="courses">course</option>
          <option value="branch">branch</option>

          <option value="enquirytakenby">counsellor</option>

          <option value="coursepackage">course package</option>
          <option value="modeoftraining">Mode of training</option>
          <option value="state">State</option>
          <option value="educationtype">Education Type</option>
          <option value="academicyear">Academic year</option>
          <option value="leadsource">Lead source</option>
        </select>
        <label>Metrics</label>

        <select value={metrics} onChange={(e) => setMetrics(e.target.value)}>
          <option value=""></option>

          <option value="numberOfStudents">Number of Students</option>
        </select>
      </div>

      {organizedData && (
        <table>
          <thead>
            <tr>
              <th>
                <b>{dimension1}</b>
              </th>
              <th>
                <b>{dimension2}</b>
              </th>
              <th>
                <b>{dimension3}</b>
              </th>
              <th>Student Name</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(organizedData).map(([dim1, dim1Data]) => (
              <>
                {Object.entries(dim1Data).map(([dim2, dim2Data]) => (
                  <>
                    {Object.entries(dim2Data).map(([dim3, students]) => (
                      <>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td>{dim1}</td>
                            <td>{dim2}</td>
                            <td>{dim3}</td>
                            <td>{student.name}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </>
            ))}
          </tbody>
        </table>
      )}
      {/* {metrics && organizedData && (
        <table>
          <thead>
            <tr>
              <th>
                <b>{dimension1}</b>
              </th>
              <th>
                <b>{dimension2}</b>
              </th><th>
              <b>{dimension3}</b>
              </th>
              <th>Student Names</th>
              <th>
                <b>Number of Students</b>
              </th>
            </tr>
          </thead>
          <tbody>
            {organizedData.map(({ dim1, dim2Data }) => (
              <React.Fragment key={dim1}>
                {dim2Data.map(({ dim2, dim3Data }) => (
                  <React.Fragment key={dim2}>
                    {dim3Data.map(({ dim3, names }) => (
                      <tr key={`${dim1}-${dim2}-${dim3}`}>
                        <td style={{ padding: "8px" }}>{dim1}</td>
                        <td style={{ padding: "8px" }}>{dim2}</td>
                        <td style={{ padding: "8px" }}>{dim3}</td>
                        <td>{names.join(", ")}</td>
                        <td>{names.length}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
};

export default CreateReport;
