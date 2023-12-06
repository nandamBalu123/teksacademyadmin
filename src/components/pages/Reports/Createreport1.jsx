import React, { useEffect, useState } from "react";

const CreateReport = () => {
  const [branchCounsellorMap, setBranchCounsellorMap] = useState({});
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
      counsellor: "srikant",
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
  useEffect(() => {
    // Create a mapping of branch and counsellor to the number of students
    const map = {};
    studentData.forEach((student) => {
      const branch = student.branch;
      const counsellor = student.counsellor;

      // Initialize the count if not present
      if (!map[branch]) {
        map[branch] = {};
      }

      // Initialize the count for the counsellor if not present
      if (!map[branch][counsellor]) {
        map[branch][counsellor] = 0;
      }

      // Increment the count for the counsellor
      map[branch][counsellor]++;
    });

    setBranchCounsellorMap(map);
  }, [studentData]);

  return (
    <table>
      <thead>
        <tr>
          <th>
            <b>Branch</b>
          </th>
          <th>
            <b>Counsellor</b>
          </th>
          <th>
            <b>Number of Students</b>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(branchCounsellorMap).map(([branch, counsellors]) =>
          Object.entries(counsellors).map(([counsellor, studentCount]) => (
            <tr key={`${branch}-${counsellor}`}>
              <td>{branch}</td>
              <td>{counsellor}</td>
              <td>{studentCount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CreateReport;

// import React, { useState } from "react";

// const CreateReport = () => {
//   let studentData = [
//     {
//       name: "irsahd",
//       branch: "Hitech City",
//       leadsource: "JustDail",
//       counsellor: "kavya",
//       companyname: "teks",
//       course: "java",
//       admissionDate: "25-01-2023",
//     },
//     {
//       name: "balu",
//       branch: "Dilshuknagar",
//       leadsource: "IndiaMart",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "java",
//       admissionDate: "25-02-2023",
//     },
//     {
//       name: "bhavita",
//       branch: "Dilshuknagar",
//       leadsource: "JustDail",
//       counsellor: "kavya",
//       companyname: "teks",
//       course: "java",
//       admissionDate: "25-03-2023",
//     },
//     {
//       name: "irshad",
//       branch: "kukatpally",
//       leadsource: "IndiaMart",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "java",
//       admissionDate: "25-04-2023",
//     },
//     {
//       name: "srikanth",
//       branch: "ameerpet",
//       leadsource: "Naukri",
//       counsellor: "kavya",
//       companyname: "teks",
//       course: "java",
//       admissionDate: "25-05-2023",
//     },
//     {
//       name: "kavya",
//       branch: "ameerpet",
//       leadsource: "JustDail",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "python",
//       admissionDate: "25-06-2023",
//     },
//     {
//       name: "shasi",
//       branch: "",
//       leadsource: "Naukri",
//       counsellor: "kavya",
//       companyname: "teks",
//       course: "java",
//       admissionDate: "25-07-2023",
//     },
//     {
//       name: "preme",
//       branch: "Hitech City",
//       leadsource: "JustDail",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "java",
//       admissionDate: "25-08-2023",
//     },
//     {
//       name: "bhaskar",
//       branch: "Hitech City",
//       leadsource: "JustDail",
//       counsellor: "kavya",
//       companyname: "teks",
//       course: "python",
//       admissionDate: "25-09-2023",
//     },
//     {
//       name: "suma",
//       branch: "Hitech City",
//       leadsource: "PhonePe",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "python",
//       admissionDate: "25-10-2023",
//     },
//   ];

//   const [reportType, setReportType] = useState("");
//   const [generatedReport, setGeneratedReport] = useState("");

//   const generateReport = () => {
//     switch (reportType) {
//       case "branch":
//         setGeneratedReport(generateBranchWiseReport());
//         break;
//       case "lead_source":
//         setGeneratedReport(generateLeadSourceReport());
//         break;
//       case "counsellor":
//         setGeneratedReport(generateCounsellorReport());
//         break;
//       case "company":
//         setGeneratedReport(generateCompanyWiseReport());
//         break;
//       case "admission_date":
//         setGeneratedReport(generateAdmissionDateReport());
//         break;
//       default:
//         setGeneratedReport(
//           "Invalid report type. Please choose from branch, lead_source, counsellor, company, or admission_date."
//         );
//     }
//   };

//   const generateBranchWiseReport = () => {
//     // Group students by branch
//     const branchGroups = studentData.reduce((acc, student) => {
//       const { branch } = student;
//       if (!acc[branch]) {
//         acc[branch] = [];
//       }
//       acc[branch].push(student);
//       return acc;
//     }, {});

//     // Generate branch-wise report
//     const report = Object.keys(branchGroups).map((branch) => ({
//       branch,
//       totalStudents: branchGroups[branch].length,
//       courses: getCourseDistribution(branchGroups[branch]),
//     }));

//     return JSON.stringify(report, null, 2);
//   };

//   const generateLeadSourceReport = () => {
//     // Group students by lead source
//     const leadSourceGroups = studentData.reduce((acc, student) => {
//       const { leadsource } = student;
//       if (!acc[leadsource]) {
//         acc[leadsource] = [];
//       }
//       acc[leadsource].push(student);
//       return acc;
//     }, {});

//     // Generate lead source-wise report
//     const report = Object.keys(leadSourceGroups).map((leadsource) => ({
//       leadsource,
//       totalStudents: leadSourceGroups[leadsource].length,
//       courses: getCourseDistribution(leadSourceGroups[leadsource]),
//     }));

//     return JSON.stringify(report, null, 2);
//   };

//   const generateCounsellorReport = () => {
//     // Group students by counsellor
//     const counsellorGroups = studentData.reduce((acc, student) => {
//       const { counsellor } = student;
//       if (!acc[counsellor]) {
//         acc[counsellor] = [];
//       }
//       acc[counsellor].push(student);
//       return acc;
//     }, {});

//     // Generate counsellor-wise report
//     const report = Object.keys(counsellorGroups).map((counsellor) => ({
//       counsellor,
//       totalStudents: counsellorGroups[counsellor].length,
//       courses: getCourseDistribution(counsellorGroups[counsellor]),
//     }));

//     return JSON.stringify(report, null, 2);
//   };

//   const generateCompanyWiseReport = () => {
//     // Group students by company
//     const companyGroups = studentData.reduce((acc, student) => {
//       const { companyname } = student;
//       if (!acc[companyname]) {
//         acc[companyname] = [];
//       }
//       acc[companyname].push(student);
//       return acc;
//     }, {});

//     // Generate company-wise report
//     const report = Object.keys(companyGroups).map((companyname) => ({
//       companyname,
//       totalStudents: companyGroups[companyname].length,
//       courses: getCourseDistribution(companyGroups[companyname]),
//     }));

//     return JSON.stringify(report, null, 2);
//   };

//   const generateAdmissionDateReport = () => {
//     // Group students by admission date
//     const admissionDateGroups = studentData.reduce((acc, student) => {
//       const { admissionDate } = student;
//       if (!acc[admissionDate]) {
//         acc[admissionDate] = [];
//       }
//       acc[admissionDate].push(student);
//       return acc;
//     }, {});

//     // Generate admission date-wise report
//     const report = Object.keys(admissionDateGroups).map((admissionDate) => ({
//       admissionDate,
//       totalStudents: admissionDateGroups[admissionDate].length,
//       courses: getCourseDistribution(admissionDateGroups[admissionDate]),
//     }));

//     return JSON.stringify(report, null, 2);
//   };

//   const getCourseDistribution = (students) => {
//     // Count the distribution of courses within a group of students
//     return students.reduce((acc, student) => {
//       const { course } = student;
//       if (!acc[course]) {
//         acc[course] = 1;
//       } else {
//         acc[course] += 1;
//       }
//       return acc;
//     }, {});
//   };

//   return (
//     <div>
//       <h2>Student Report Generator</h2>
//       <label>
//         Select Report Type:
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//         >
//           <option value="">Select</option>
//           <option value="branch">Branch-wise</option>
//           <option value="lead_source">Lead Source-wise</option>
//           <option value="counsellor">Counsellor-wise</option>
//           <option value="company">Company-wise</option>
//           <option value="admission_date">Admission Date-wise</option>
//         </select>
//       </label>
//       <button onClick={generateReport}>Generate Report</button>

//       {/* Display the generated report here */}
//       <div>
//         <h3>Generated Report:</h3>
//         <pre>{generatedReport}</pre>
//       </div>
//     </div>
//   );
// };

// export default CreateReport;
