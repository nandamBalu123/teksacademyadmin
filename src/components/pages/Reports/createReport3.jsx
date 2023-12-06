// import React, { useState } from "react";

// const CreateReport = () => {
//   let [companyKey, setCompanykey] = useState();
//   let [leadsourceKey, setleadsourceKey] = useState();
//   let [counsellorKey, setcounsellorKey] = useState();

//   let data = [
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
//       course: "mern",
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
//       branch: "ameerpet",
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
//       counsellor: "priya",
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
//       counsellor: "srinath",
//       companyname: "kapil",
//       course: "python",
//       admissionDate: "25-10-2023",
//     },
//   ];
//   const reportData = data.reduce((acc, student) => {
//     const companyname = student[companyKey];
//     const leadsource = student[leadsourceKey];
//     const counsellor = student[counsellorKey];

//     if (!acc[companyname]) {
//       acc[companyname] = {};
//     }

//     if (!acc[companyname][leadsource]) {
//       acc[companyname][leadsource] = [];
//     }

//     acc[companyname][leadsource].push(counsellor);

//     return acc;
//   }, {});
//   console.log("reportData", reportData);
//   return (
//     <div>
//       <div>
//         <label>first dimension</label>
//         <input
//           value={companyKey}
//           onChange={(e) => setCompanykey(e.target.value)}
//         />
//         <label>Second dimension</label>

//         <input
//           value={leadsourceKey}
//           onChange={(e) => setleadsourceKey(e.target.value)}
//         />
//         <label>Third dimension</label>

//         <input
//           value={counsellorKey}
//           onChange={(e) => setcounsellorKey(e.target.value)}
//         />
//       </div>
//       {/* <h1>Student Report</h1> */}
//       {Object.entries(reportData).map(([companyname, leadsourceData]) => (
//         <div key={companyname}>
//           <hr />
//           <b>{companyname}</b>
//           <hr />
//           {Object.entries(leadsourceData).map(([leadsource, counsellors]) => (
//             <div key={leadsource}>
//               <span>{leadsource}</span>
//               <ul>
//                 {counsellors.map((counsellor, index) => (
//                   <li key={index}>{counsellor}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CreateReport;

//// three filters

// import React from "react";

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
//       course: "mern",
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
//       branch: "ameerpet",
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
//       counsellor: "priya",
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
//       counsellor: "srinath",
//       companyname: "kapil",
//       course: "python",
//       admissionDate: "25-10-2023",
//     },
//   ];
//   // Create a nested hierarchy: companyname -> leadsource -> counsellor
//   const reportData = studentData.reduce((acc, student) => {
//     const { companyname, leadsource, counsellor } = student;

//     // Create company if not exists
//     if (!acc[companyname]) {
//       acc[companyname] = {};
//     }

//     // Create leadsource if not exists
//     if (!acc[companyname][leadsource]) {
//       acc[companyname][leadsource] = [];
//     }

//     // Add counsellor to leadsource
//     acc[companyname][leadsource].push(counsellor);

//     return acc;
//   }, {});

//   return (
//     <div>
//       <h1>Student Report</h1>
//       {Object.entries(reportData).map(([companyname, leadsourceData]) => (
//         <div key={companyname}>
//           <span>{companyname}</span>
//           {Object.entries(leadsourceData).map(([leadsource, counsellors]) => (
//             <div key={leadsource}>
//               <span>{leadsource}</span>
//               <ul>
//                 {counsellors.map((counsellor, index) => (
//                   <li key={index}>{counsellor}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CreateReport;

import React from "react";
import { useState } from "react";

const CreateReport = () => {
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
      course: "mern",
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
      branch: "ameerpet",
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
      counsellor: "priya",
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
      counsellor: "srinath",
      companyname: "kapil",
      course: "python",
      admissionDate: "25-10-2023",
    },
  ];
  let [input1, setinput1] = useState();

  // Organize data by branches
  const branchData = studentData.reduce((acc, student) => {
    const branch = student[input1] || "Unknown Branch";
    if (!acc[branch]) {
      acc[branch] = [];
    }
    acc[branch].push(student);
    return acc;
  }, {});

  // Calculate the number of students in each branch
  const branchCount = Object.keys(branchData).reduce((acc, branch) => {
    acc[branch] = branchData[branch].length;
    return acc;
  }, {});
  console.log("branchData", branchData, "branchCount", branchCount);
  // Render the report
  return (
    <div>
      <input value={input1} onChange={(e) => setinput1(e.target.value)} />
      {/* <h2>Branch-wise Student Report</h2> */}
      <ul>
        {Object.keys(branchCount).map((branch) => (
          <li key={branch}>
            <strong>{branch}:</strong> {branchCount[branch]} students
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateReport;
// ************8

// import React from "react";
// import { useEffect } from "react";

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
//       companyname: "teks",
//       course: "mern",
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
//       branch: "Dilshuknagar",
//       leadsource: "IndiaMart",
//       counsellor: "kavya",
//       companyname: "kapil",
//       course: "java",
//       admissionDate: "25-04-2023",
//     },
//     {
//       name: "irshad",
//       branch: "Dilshuknagar",
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
//       branch: "ameerpet",
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
//   // Grouping students by branch and counting the number of students in each branch
//   const companyGroups = studentData.reduce((acc, student) => {
//     const { branch, companyname } = student;

//     if (!acc[companyname]) {
//       acc[companyname] = {
//         branches: [{ branch, count: 1 }],
//       };
//     } else {
//       const branchIndex = acc[companyname].branches.findIndex(
//         (b) => b.branch === branch
//       );

//       if (branchIndex === -1) {
//         acc[companyname].branches.push({ branch, count: 1 });
//       } else {
//         acc[companyname].branches[branchIndex].count += 1;
//       }
//     }

//     return acc;
//   }, {});
//   useEffect(() => {
//     console.log("companyGroups", companyGroups);
//   });

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>Branch</th>
//             <th>Number of Students</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.keys(companyGroups).map((companyname, index) => (
//             <React.Fragment key={index}>
//               <tr>
//                 <td rowSpan={companyGroups[companyname].branches.length}>
//                   {companyname}
//                 </td>
//                 <td>{companyGroups[companyname].branches[0].branch}</td>
//                 <td>{companyGroups[companyname].branches[0].count}</td>
//               </tr>
//               {companyGroups[companyname].branches
//                 .slice(1)
//                 .map((branchData, branchIndex) => (
//                   <tr key={branchIndex}>
//                     <td>{branchData.branch}</td>
//                     <td>{branchData.count}</td>
//                   </tr>
//                 ))}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CreateReport;
// import React from "react";
// import { useState } from "react";

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
//       course: "mern",
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
//       branch: "ameerpet",
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
//   let [input1, setinput1] = useState();

//   // Organize data by branches
//   const branchData = studentData.reduce((acc, student) => {
//     const branch = student[input1] || "Unknown Branch";
//     if (!acc[branch]) {
//       acc[branch] = [];
//     }
//     acc[branch].push(student);
//     return acc;
//   }, {});

//   // Calculate the number of students in each branch
//   const branchCount = Object.keys(branchData).reduce((acc, branch) => {
//     acc[branch] = branchData[branch].length;
//     return acc;
//   }, {});

//   // Render the report
//   return (
//     <div>
//       <input value={input1} onChange={(e) => setinput1(e.target.value)} />
//       <h2>Branch-wise Student Report</h2>
//       <ul>
//         {Object.keys(branchCount).map((branch) => (
//           <li key={branch}>
//             <strong>{branch}:</strong> {branchCount[branch]} students
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CreateReport;
