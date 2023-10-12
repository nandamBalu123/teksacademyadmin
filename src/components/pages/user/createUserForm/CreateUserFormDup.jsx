import React, { useEffect } from "react";
import { useState } from "react";
import "./CreateUserForm.css";
import { useNavigate } from "react-router-dom";
const CreateUserForm = () => {
  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenum, setphonenum] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [reportto, setreportto] = useState("");
  const [profile, setprofile] = useState("");
  const [branch, setbranch] = useState("");
  const [errors, setErrors] = useState({});
  // const [profiles, setProfiles] = useState([]);
  const profilee = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    setErrors({});

   
  if (!fullname.trim()) {
    newErrors.fullname = "Full Name is required";
  }

  // Validate Email
  if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email address";
  }

  // Validate Phone Number
  if (phonenum.length !== 10) {
    newErrors.phonenum = "Phone number must be 10 digits";
  }

  // Validate Designation
  if (!designation.trim()) {
    newErrors.designation = "Designation is required";
  }

  // Validate Department
  if (!department.trim()) {
    newErrors.department = "Department is required";
  }

  // Validate Report To
  if (!reportto.trim()) {
    newErrors.reportto = "Report To is required";
  }

  // Validate Profile
  if (!profile) {
    newErrors.profile = "Profile is required";
  }

  // Validate Branch
  if (!branch) {
    newErrors.branch = "Branch is required";
  }

    // // Validate Full Name
    // if (!fullname.trim()) {
    //   // newErrors.fullname = 'Full Name is required';
    //   setErrors({ ...errors, fullname: "Full Name is required" });
    //   // return; // Prevent further validation
    // }
    

    // // Validate Email
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   setErrors({ ...errors, email: "Invalid email address" });
    //   return;
    // }

    // // Validate Phone Number
    // if (phonenum.length !== 10) {
    //   setErrors({ ...errors, phonenum: "Phone number must be 10 digits" });
    //   return;
    // }

    // // Validate Designation
    // if (!designation.trim()) {
    //   setErrors({ ...errors, designation: "Designation is required" });
    //   return;
    // }

    // // Validate Department
    // if (!department.trim()) {
    //   setErrors({ ...errors, department: "Department is required" });
    //   return;
    // }

    // // Validate Report To
    // if (!reportto.trim()) {
    //   setErrors({ ...errors, reportto: "Report To is required" });
    //   return;
    // }

    // // Validate Profile
    // if (!profile) {
    //   setErrors({ ...errors, profile: "Profile is required" });
    //   return;
    // }

    // // Validate Branch
    // if (!branch) {
    //   setErrors({ ...errors, branch: "Branch is required" });
    //   return;
    // }
 
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){ 
          
    const user = {
      fullname,
      email,
      phonenum,
      designation,
      department,
      reportto,
      profile,
      branch,
    };

    console.log("User Data:", user); // Log the user data being sent

    const response = await fetch("http://localhost:3030/createUser", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response); // Log the response from the server

    const json = await response.json();

    console.log("JSON Response:", json); // Log the parsed JSON response

    if (response.ok) {
      console.log("User created successfully.");

      // Reset the form fields
      setfullname("");
      setemail("");
      setphonenum("");
      setdesignation("");
      setdepartment("");
      setreportto("");
      setprofile("");
      setbranch("");
      navigate("/usersdata");
    }
    }

  };

  const [profiles, setProfiles] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/getuserroles");

      console.log("Response status:", response.status); // Log response status

      if (!response.ok) {
        console.error(
          "Network response error:",
          response.status,
          response.statusText
        );
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data.Result); // Log the fetched data
      const profileData = data.Result.map((item) => item.role);

      setProfiles(profileData); // Update the state with the extracted role data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   const [profiles, setProfiles] = useState([]);

  // // const profiles = []
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3030/getuserroles");

  //       console.log("Response status:", response.status); // Log response status

  //       if (!response.ok) {
  //         console.error("Network response error:", response.status, response.statusText);
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       console.log("Fetched data:", data.Result); // Log the fetched data
  //       const profile = data.Result
  //       // setProfiles(data.Result);

  //       console.log("ppppppp",profile[0].role)
  //       for(let i = 0;i<profile.length;i++){
  //         console.log("role",profile[i].role)
  //         profiles.push(profile[i].role)
  //         console.log("profiles",profiles)
  //         // setProfiles([...profiles,profile[i].role])
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
    setProfiles(profilee);
  }, []); // Empty dependency array means it runs once after the initial render

  return (
    <div className="main-user-container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row ">
            <div className="col-md-6"> 
            <label className="mar userlabel " htmlFor="fullname">
              Full Name<span className="star"> *</span>:
            </label>
            <input
              className="mar w-50 "
              name="fullname"
              type="text"
              onChange={(e) => setfullname(e.target.value)}
              value={fullname}
              id="fullname"
          
            />
           <div className="w-100  ms-5 error">  {errors.fullname && (
              <span className="error">{errors.fullname}</span>
            )}</div>
            </div>
           <div className="col-md-6">  <label className="mar userlabel" htmlFor="email">
              Email ID<span className="star"> *</span>:
            </label>
            <input
              className=" mar w-50"
              name="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              id="email"
              required
            />
           <div className="w-100  ms-5 error">{errors.email && <span className="error">{errors.email}</span>} </div>
            </div>
          </div>
          <div className="row ">
          <div className="col-md-6"> 
          <label className="mar userlabel" htmlFor="phonenumber">
              Phone No. <span className="star"> *</span>:
            </label>
            <input
              className=" mar w-50"
              name="phonenum"
              type="number"
              onChange={(e) => setphonenum(e.target.value)}
              value={phonenum}
              id="phonenumber"
              required
            />
           <div className="w-100  ms-5 error">  {errors.phonenum && (
              <span className="error">{errors.phonenum}</span>
            )}</div>
          </div>
           <div className="col-md-6"> 
            
           <label className="mar userlabel" htmlFor="designation">
              Designation<span className="star"> *</span> :
            </label>
            <input
              className=" mar w-50"
              name="designation"
              type="text"
              onChange={(e) => setdesignation(e.target.value)}
              value={designation}
              id="designation"
              required
            />
            <div className=" w-100  ms-5 error"> {errors.designation && (
              <span className="error">{errors.designation}</span>
            )}</div>
           </div>
          </div>
          <div className="row ">
            <div className="col-md-6"> 
            <label className="mar userlabel" htmlFor="department">
              Department<span className="star"> *</span>:
            </label>
            <input
              className=" mar w-50"
              name="department"
              type="text"
              onChange={(e) => setdepartment(e.target.value)}
              value={department}
              id="department"
              required
            />
            <div className="w-100 ms-5 error"> {errors.department && (
              <span className="error">{errors.department}</span>
            )}</div>

            </div>
            <div className="col-md-6"> 
            <label className="mar userlabel" htmlFor="reportto">
              Report to <span className="star"> *</span> :
            </label>
            <input
              className=" mar w-50"
              name="reportto"
              type="text"
              onChange={(e) => setreportto(e.target.value)}
              value={reportto}
              id="reportto"
              required
            />
           <div className="w-100 ms-5 error"> 
           {errors.reportto && (
              <span className="error">{errors.reportto}</span>
            )} 
           </div>
            </div>
          </div>
          <div className="row ">
           <div className="col-md-6"> 
           <label className="mar userlabel" htmlFor="profile">
              Role <span className="star"> *</span>:
            </label>

            <select
              className="mar w-50 ms-2"
              name="profile"
              id="profile"
              onChange={(e) => setprofile(e.target.value)}
              value={profile}
              required
            >
              <option value="">--select</option>
              {profiles.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
            <div className="w-100 ms-5 error"> {errors.profile && <span className="error">{errors.profile}</span>}</div>

   </div>         {/* <select
              className=" mar col-md-3 selectt"
              id="profile"
              onChange={(e) => setprofile(e.target.value)}
              value={profile}
              required
            >
              {profiles.map((profile) => {
                return <option value="{profile}">{profile} </option> 
              })}

              
            </select> */}
      <div className="col-md-6"> 
      <label className="mar userlabel" htmlFor="branch">
              Branch <span className="star"> *</span>:
            </label>
            <select
              className=" mar w-50 ms-2"
              
              id="branch"
              name="branch"
              onChange={(e) => setbranch(e.target.value)}
              value={branch}
              required
            >
              <option value="">--select--</option>
              <option value="hitechcity">Hitech City</option>
              <option value="ameerpet">Ameerpet</option>
              <option value="kukatpally">Kukatpally</option>
              <option value="secundrabad">Secundrabad</option>
              <option value="dilshuknagar">Dilshuknagar</option>
            </select>
           <div  className="w-100 ms-5 error">  {errors.branch && <span className="error">{errors.branch}</span>}</div>
      </div>
          </div>
          <div className="create-button">
            <button type="submit" className="btn btn-primary mr-20 mt-5  ">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;



// import React, { useEffect } from "react";
// import { useState } from "react";
// import "./CreateUserForm.css";

// const CreateUserForm = () => {
//   const [formData, setFormData] = useState({
//     fullname: '',
//     email:'',
//     phonenumber: '',
//     department: '',
//     designation: '',
//     reportto:'',
//     profile:'',
//     branch:''
//   });
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};
//      // Validate Name
//      if (!formData.fullname) {
//       newErrors.fullname = 'Name is required';
//     }
   

//     // Validate Email
//     if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Enter a valid email address';
//     }

//     // Validate Phone Number
//     if (!formData.phonenumber || !/^\d{10}$/.test(formData.phonenumber)) {
//       newErrors.phonenumber = 'Enter 10-digit number';
//     }

//     // Validate Department
//     if (!formData.department) {
//       newErrors.department = 'Department is required';
//     }

//     // Validate Designation
//     if (!formData.designation) {
//       newErrors.designation = 'Designation is required';
//     }
//     // Validation Reportto
//     if (!formData.reportto){ 
//       newErrors.reportto = 'Report to is required';
//     }
//     // validation Profile
//     if(!formData.profile){ 
//       newErrors.profile = 'Profile  is reqired';
//     }
//     if(!formData.branch){
//       newErrors.branch = 'Branch is required'
//     }

//     if (Object.keys(newErrors).length === 0) {
//       // Form is valid, you can submit the data to the server or perform other actions
//     } else {
//       setErrors(newErrors);
//     }
//   };
  
//   // const navigate = useNavigate();
//   // const [fullname, setfullname] = useState("");
//   // const [email, setemail] = useState("");
//   // const [phonenum, setphonenum] = useState("");
//   // const [designation, setdesignation] = useState("");
//   // const [department, setdepartment] = useState("");
//   // const [reportto, setreportto] = useState("");
//   // const [profile, setprofile] = useState("");
//   // const [branch, setbranch] = useState("");
//   // const [errors, setErrors] = useState({});
//   // // const [profiles, setProfiles] = useState([]);
//   // const profilee = [];

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   setErrors({});

//   //   // Validate Full Name
//   //   if (!fullname.trim()) {
//   //     setErrors({ ...errors, fullname: "Full Name is required" });
//   //     return; // Prevent further validation
//   //   }

//   //   // Validate Email
//   //   if (!/\S+@\S+\.\S+/.test(email)) {
//   //     setErrors({ ...errors, email: "Invalid email address" });
//   //     return;
//   //   }

//   //   // Validate Phone Number
//   //   if (phonenum.length !== 10) {
//   //     setErrors({ ...errors, phonenum: "Phone number must be 10 digits" });
//   //     return;
//   //   }

//   //   // Validate Designation
//   //   if (!designation.trim()) {
//   //     setErrors({ ...errors, designation: "Designation is required" });
//   //     return;
//   //   }

//   //   // Validate Department
//   //   if (!department.trim()) {
//   //     setErrors({ ...errors, department: "Department is required" });
//   //     return;
//   //   }

//   //   // Validate Report To
//   //   if (!reportto.trim()) {
//   //     setErrors({ ...errors, reportto: "Report To is required" });
//   //     return;
//   //   }

//   //   // Validate Profile
//   //   if (!profile) {
//   //     setErrors({ ...errors, profile: "Profile is required" });
//   //     return;
//   //   }

//   //   // Validate Branch
//   //   if (!branch) {
//   //     setErrors({ ...errors, branch: "Branch is required" });
//   //     return;
//   //   }
//   //   const user = {
//   //     fullname,
//   //     email,
//   //     phonenum,
//   //     designation,
//   //     department,
//   //     reportto,
//   //     profile,
//   //     branch,
//   //   };

//   //   console.log("User Data:", user); // Log the user data being sent

//   //   const response = await fetch("http://localhost:3030/createUser", {
//   //     method: "POST",
//   //     body: JSON.stringify(user),
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   });

//   //   console.log("Response:", response); // Log the response from the server

//   //   const json = await response.json();

//   //   console.log("JSON Response:", json); // Log the parsed JSON response

//   //   if (response.ok) {
//   //     console.log("User created successfully.");

//   //     // Reset the form fields
//   //     setfullname("");
//   //     setemail("");
//   //     setphonenum("");
//   //     setdesignation("");
//   //     setdepartment("");
//   //     setreportto("");
//   //     setprofile("");
//   //     setbranch("");
//   //     navigate("/usersdata");
//   //   }
//   // };

//   // const [profiles, setProfiles] = useState([]);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3030/getuserroles");

//   //     console.log("Response status:", response.status); // Log response status

//   //     if (!response.ok) {
//   //       console.error(
//   //         "Network response error:",
//   //         response.status,
//   //         response.statusText
//   //       );
//   //       throw new Error("Network response was not ok");
//   //     }

//   //     const data = await response.json();
//   //     console.log("Fetched data:", data.Result); // Log the fetched data
//   //     const profileData = data.Result.map((item) => item.role);

//   //     setProfiles(profileData); // Update the state with the extracted role data
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   //   const [profiles, setProfiles] = useState([]);

//   // // const profiles = []
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch("http://localhost:3030/getuserroles");

//   //       console.log("Response status:", response.status); // Log response status

//   //       if (!response.ok) {
//   //         console.error("Network response error:", response.status, response.statusText);
//   //         throw new Error("Network response was not ok");
//   //       }

//   //       const data = await response.json();
//   //       console.log("Fetched data:", data.Result); // Log the fetched data
//   //       const profile = data.Result
//   //       // setProfiles(data.Result);

//   //       console.log("ppppppp",profile[0].role)
//   //       for(let i = 0;i<profile.length;i++){
//   //         console.log("role",profile[i].role)
//   //         profiles.push(profile[i].role)
//   //         console.log("profiles",profiles)
//   //         // setProfiles([...profiles,profile[i].role])
//   //       }
//   //     } catch (error) {
//   //       console.error("Error:", error);
//   //     }
//   //   };

//   // useEffect(() => {
//   //   fetchData(); // Call fetchData when the component mounts
//   //   setProfiles(profilee);
//   // }, []); // Empty dependency array means it runs once after the initial render

//   return (
//     <div className="main-user-container">
//       <h3>User Creation Form</h3>
//       <div className="sub-user-container">
//         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//           <div className="row ">
//            <div className="col-md-6">
//            <label className="mar userlabel " htmlFor="fullname">
//               Full Name<span className="star"> *</span>:
//             </label>
//             <input
//               className="mar w-50"
//               type="text"
//               name="fullname"
//               value={formData.fullname}
//               onChange={handleChange}
//               // onChange={(e) => setfullname(e.target.value)}
//               // value={fullname}
//               id="fullname"
//               required/>
//            <div className="w-100  ms-5 error">{errors.fullname && <div className="error"> {errors.fullname} </div> }</div>
//             </div> 
//             {/* {errors.fullname && (
//               <span className="error">{errors.fullname}</span>
//             )} */}
//            <div className="col-md-6"> 
//            <label className="mar userlabel " htmlFor="email">
//               Email ID<span className="star"> *</span>:
//             </label>
//             <input
//               className=" mar w-50"
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               // onChange={(e) => setemail(e.target.value)}
//               // value={email}
//               id="email" 
//               required/>
//             <div className="w-100  ms-5 error"> {errors.email && <div className="error">{errors.email}</div>}</div>

//             </div>            {/* {errors.email && <span className="error">{errors.email}</span>} */}
//           </div>
//           <div className="row">
//             <div className="col-md-6">
//             <label className="mar userlabel" htmlFor="phonenumber">
//               Phone No.<span className="star"> *</span>:
//             </label>
//             <input
//               className=" mar w-50 "
//               type="number"
//               name="phonenumber"
//               value={formData.phonenumber}
//               onChange={handleChange}
//               // onChange={(e) => setphonenum(e.target.value)}
//               // value={phonenum}
//               id="phonenumber"
//               required
             
//             />
//             <div className="w-100  ms-5 error"> {errors.phonenumber && <div className="error">{errors.phonenumber} </div>}</div>
//                </div>
//             {/* {errors.phonenum && (
//               <span className="error">{errors.phonenum}</span>
//             )} */}

//             <div className="col-md-6"> 
//              <label className="mar userlabel " htmlFor="designation">
//               Designation<span className="star"> *</span> :
//             </label>
//             <input
//               className=" mar w-50"
//               type="text"
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               // onChange={(e) => setdesignation(e.target.value)}
//               // value={designation}
//               id="designation"
//               required
//             />
//           <div className="w-100 ms-5 error">   {errors.designation && <div className="error"> {errors.designation}</div>}</div>
//             </div>
//             {/* {errors.designation && (
//               <span className="error">{errors.designation}</span>
//             )} */}
//           </div>
//           <div className="row ">
//             <div className="col-md-6"> 
//             <label className="mar userlabel " htmlFor="department">
//               Department<span className="star"> *</span>:
//             </label>
//             <input
//               className=" mar w-50"
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               // onChange={(e) => setdepartment(e.target.value)}
//               // value={department}
//               id="department"
//               required
//             />
//           <div className="w-100 ms-5 error">   {errors.department && <div className="error">{errors.department} </div>}</div>
//             </div>
//             {/* {errors.department && (
//               <span className="error">{errors.department}</span>
//             )} */}
//             <div className="col-md-6"> 
//             <label className="mar userlabel" htmlFor="reportto">
//               Report to <span className="star"> *</span> :
//             </label>
//             <input
//               className=" mar w-50"
//               type="text"
//               name="reportto"
//               value={formData.reportto}
//               onChange={handleChange}
//               // onChange={(e) => reportto(e.target.value)}
//               // value={reportto}
//               id="reportto"
//               required
            
//             />
//             <div className="w-100 ms-5 error"> {errors.reportto && <div className="error">{errors.reportto}</div> }</div>
//             </div>
//             {/* {errors.reportto && (
//               <span className="error">{errors.reportto}</span>
//             )} */}
//           </div>
//           <div className="row ">
//             <div className="col-md-6"> 
//             <label className="mar userlabel" htmlFor="profile">
//               Role <span className="star"> *</span>:
//             </label>

//             <select
//               className="mar w-50 ms-2"
//               id="profile"
//               name="profile"
//               value={formData.profile}
//               onChange={handleChange}
//               // onChange={(e) => setprofile(e.target.value)}
//               // value={profile}
//             required
//             >
//               {/* <option value="">--select</option>
//               {profiles.map((profile) => (
//                 <option key={profile} 
//                 value={profile}
//                 >
//                   {profile}
//                 </option>
//               ))} */}
//             </select>
//             <div className="w-100 ms-5 error">   {errors.profile && <div className="error"> {errors.profile} </div>}</div>
//             </div>
         
//             {/* {errors.profile && <span className="error">{errors.profile}</span>} */}

//             {/* <select
//               className=" mar col-md-3 selectt"
//               id="profile"
//               onChange={(e) => setprofile(e.target.value)}
//               value={profile}
//               required
//             >
//               {profiles.map((profile) => {
//                 return <option value="{profile}">{profile} </option> 
//               })}</select> */}
//            <div className="col-md-6">
//            <label className="mar userlabel" htmlFor="branch">
//               Branch <span className="star"> *</span>:
//             </label>
//             <select
//               className=" mar w-50 ms-2"
//               id="branch"
//               name="branch"
//               value={formData.branch}
//               onChange={handleChange}
//               // onChange={(e) => setbranch(e.target.value)}
//               // value={branch}
//               required
//             >
//               <option value="">--select--</option>
//               <option value="hitechcity">Hitech City</option>
//               <option value="ameerpet">Ameerpet</option>
//               <option value="kukatpally">Kukatpally</option>
//               <option value="secundrabad">Secundrabad</option>
//               <option value="dilshuknagar">Dilshuknagar</option>
//             </select>
//            <div className=" w-100 ms-5 error">  {errors.branch && <div className="error">{errors.branch} </div>}</div>
//              </div> 
//             {/* {errors.branch && <span className="error">{errors.branch}</span>} */}
//           </div>
//           <div className="create-button">
//             <button type="submit" className="btn btn-primary mr-20 mt-5  ">
//               Create User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default CreateUserForm;
