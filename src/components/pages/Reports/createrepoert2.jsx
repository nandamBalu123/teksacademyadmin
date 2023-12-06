// import React from "react";

// const CreateReport = () => {
//   let studentData = [
//     {
//       name: "irsahd",
//       branch: "Hitech City",
//       leadsource: "JustDail",
//       counsellor: "kaaavya",
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
//       counsellor: "kavvya",
//       companyname: "kapil",
//       course: "python",
//       admissionDate: "25-06-2023",
//     },
//     {
//       name: "shasi",
//       branch: "ameerpet",
//       leadsource: "Naukri",
//       counsellor: "srikanth",
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
//     const { branch, companyname, counsellor } = student;

//     if (!acc[companyname]) {
//       acc[companyname] = {
//         branches: [{ branch, counsellor, count: 1 }],
//       };
//     } else {
//       const branchIndex = acc[companyname].branches.findIndex(
//         (b) => b.branch === branch
//       );

//       if (branchIndex === -1) {
//         acc[companyname].branches.push({ branch, counsellor, count: 1 });
//       } else {
//         acc[companyname].branches[branchIndex].count += 1;
//       }
//     }

//     return acc;
//   }, {});

//   return (
//     <div>
//       <h2>Student Admission Report</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>Branch</th>
//             <th>Counselor</th>
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
//                 <td>{companyGroups[companyname].branches[0].counsellor}</td>
//                 <td>{companyGroups[companyname].branches[0].count}</td>
//               </tr>
//               {companyGroups[companyname].branches
//                 .slice(1)
//                 .map((branchData, branchIndex) => (
//                   <tr key={branchIndex}>
//                     <td>{branchData.branch}</td>
//                     <td>{branchData.counsellor}</td>
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

// // ************8

// // import React from "react";

// // const CreateReport = () => {
// //   let studentData = [
// //     {
// //       name: "irsahd",
// //       branch: "Hitech City",
// //       leadsource: "JustDail",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "java",
// //       admissionDate: "25-01-2023",
// //     },
// //     {
// //       name: "balu",
// //       branch: "Dilshuknagar",
// //       leadsource: "IndiaMart",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "mern",
// //       admissionDate: "25-02-2023",
// //     },
// //     {
// //       name: "bhavita",
// //       branch: "Dilshuknagar",
// //       leadsource: "JustDail",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "java",
// //       admissionDate: "25-03-2023",
// //     },
// //     {
// //       name: "irshad",
// //       branch: "Dilshuknagar",
// //       leadsource: "IndiaMart",
// //       counsellor: "kavya",
// //       companyname: "kapil",
// //       course: "java",
// //       admissionDate: "25-04-2023",
// //     },
// //     {
// //       name: "irshad",
// //       branch: "Dilshuknagar",
// //       leadsource: "IndiaMart",
// //       counsellor: "kavya",
// //       companyname: "kapil",
// //       course: "java",
// //       admissionDate: "25-04-2023",
// //     },
// //     {
// //       name: "srikanth",
// //       branch: "ameerpet",
// //       leadsource: "Naukri",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "java",
// //       admissionDate: "25-05-2023",
// //     },
// //     {
// //       name: "kavya",
// //       branch: "ameerpet",
// //       leadsource: "JustDail",
// //       counsellor: "kavya",
// //       companyname: "kapil",
// //       course: "python",
// //       admissionDate: "25-06-2023",
// //     },
// //     {
// //       name: "shasi",
// //       branch: "ameerpet",
// //       leadsource: "Naukri",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "java",
// //       admissionDate: "25-07-2023",
// //     },
// //     {
// //       name: "preme",
// //       branch: "Hitech City",
// //       leadsource: "JustDail",
// //       counsellor: "kavya",
// //       companyname: "kapil",
// //       course: "java",
// //       admissionDate: "25-08-2023",
// //     },
// //     {
// //       name: "bhaskar",
// //       branch: "Hitech City",
// //       leadsource: "JustDail",
// //       counsellor: "kavya",
// //       companyname: "teks",
// //       course: "python",
// //       admissionDate: "25-09-2023",
// //     },
// //     {
// //       name: "suma",
// //       branch: "Hitech City",
// //       leadsource: "PhonePe",
// //       counsellor: "kavya",
// //       companyname: "kapil",
// //       course: "python",
// //       admissionDate: "25-10-2023",
// //     },
// //   ];
// //   // Grouping students by branch and counting the number of students in each branch
// //   const companyGroups = studentData.reduce((acc, student) => {
// //     const { branch, companyname } = student;

// //     if (!acc[companyname]) {
// //       acc[companyname] = {
// //         branches: [{ branch, count: 1 }],
// //       };
// //     } else {
// //       const branchIndex = acc[companyname].branches.findIndex(
// //         (b) => b.branch === branch
// //       );

// //       if (branchIndex === -1) {
// //         acc[companyname].branches.push({ branch, count: 1 });
// //       } else {
// //         acc[companyname].branches[branchIndex].count += 1;
// //       }
// //     }

// //     return acc;
// //   }, {});

// //   return (
// //     <div>
// //       <h2>Student Admission Report</h2>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Company Name</th>
// //             <th>Branch</th>
// //             <th>Number of Students</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {Object.keys(companyGroups).map((companyname, index) => (
// //             <React.Fragment key={index}>
// //               <tr>
// //                 <td rowSpan={companyGroups[companyname].branches.length}>
// //                   {companyname}
// //                 </td>
// //                 <td>{companyGroups[companyname].branches[0].branch}</td>
// //                 <td>{companyGroups[companyname].branches[0].count}</td>
// //               </tr>
// //               {companyGroups[companyname].branches
// //                 .slice(1)
// //                 .map((branchData, branchIndex) => (
// //                   <tr key={branchIndex}>
// //                     <td>{branchData.branch}</td>
// //                     <td>{branchData.count}</td>
// //                   </tr>
// //                 ))}
// //             </React.Fragment>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

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

  // Render the report
  return (
    <div>
      <input value={input1} onChange={(e) => setinput1(e.target.value)} />
      <h2>Branch-wise Student Report</h2>
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
