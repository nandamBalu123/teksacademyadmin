import React, { useEffect } from "react";
import { useState } from "react";
import "./CreateUserForm.css";
import { useNavigate } from "react-router-dom";
import { useDepartmentContext } from "../../../../hooks/useDepartmentcontext";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckIcon from '@mui/icons-material/Check';
const CreateUserForm = () => {
  const { departments } = useDepartmentContext();
  const { roles } = useRoleContext();
  const { branches } = useBranchContext();

  const navigate = useNavigate();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenum] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [reportto, setreportto] = useState("");
  const [profile, setprofile] = useState("");
  const [branch, setbranch] = useState("");

  // const [profiles, setProfiles] = useState([]);
  const profilee = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!fullname) {
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
    if (!phonenumber) {
      alert("please enter mobilenumber");
      return;
    } else {
      if (phonenumber.length != 10) {
        alert("incorrect mobile number");
        return;
      }
    }
    if (!designation) {
      alert("please enter the designation");
      return;
    }
    if (!department) {
      alert("please enter the department");
      return;
    }
    if (!reportto) {
      alert("please enter the reportto");
      return;
    }
    if (!profile) {
      alert("please enter the profile");
      return;
    }
    if (!branch) {
      alert("please enter the branch");
      return;
    }

    // setErrors({});

    // if (!fullname.trim()) {
    //   newErrors.fullname = "Full Name is required";
    // }

    // // Validate Email
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = "Invalid email address";
    // }

    // // Validate Phone Number
    // if (phonenumber.length !== 10) {
    //   newErrors.phonenumber = "Phone number must be 10 digits";
    // }

    // // Validate Designation
    // if (!designation.trim()) {
    //   newErrors.designation = "Designation is required";
    // }

    // // Validate Department
    // if (!department.trim()) {
    //   newErrors.department = "Department is required";
    // }

    // // Validate Report To
    // if (!reportto.trim()) {
    //   newErrors.reportto = "Report To is required";
    // }

    // // Validate Profile
    // if (!profile) {
    //   newErrors.profile = "Profile is required";
    // }

    // // Validate Branch
    // if (!branch) {
    //   newErrors.branch = "Branch is required";
    // }

    // setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const user = {
        fullname,
        email,
        phonenumber,
        designation,
        department,
        reportto,
        profile,
        branch,
      };

      console.log("User Data:", user); // Log the user data being sent

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/createUser`,
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response); // Log the response from the server

      const json = await response.json();

      console.log("JSON Response:", json); // Log the parsed JSON response

      if (json.Status == "exists") {
        alert("Email already exists.");
        return false;
      }
      if (response.ok) {
        console.log("User created successfully.");
        alert("User created successfully.");
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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/getuserroles`
      );

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

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
    setProfiles(profilee);
  }, []); // Empty dependency array means it runs once after the initial render

  return (
    <div className="main-user-container container">
      <h3 className="mt-4">User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row ">
            <div className=" col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label="Full Name "
                name="fullname"
                type="text"
                variant="standard"
                className="mar w-75 "
                required
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                id="fullname"
              />
              {/* <label className="mar userlabel " htmlFor="fullname">
                Full Name<span className="star"> *</span>:
              </label> */}
              {/* <input
                className="mar w-50 "
                name="fullname"
                type="text"
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                id="fullname"
              /> */}
              {/* <div className="w-100  error">
                {" "}
                {errors.fullname && (
                  <span className="error">{errors.fullname}</span>
                )}
              </div> */}
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label="Email ID"
                name="email"
                type="email"
                variant="standard"
                className="mar w-75 "
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="email"
                required
              />
              {/* <label className="mar userlabel" htmlFor="email">
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
              /> */}
              {/* <div className="w-100   error">
                {errors.email && <span className="error">{errors.email}</span>}{" "}
              </div> */}
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label="Phone Number"
                className=" mar w-75"
                variant="standard"
                name="phonenum"
                type="number"
                onChange={(e) => setphonenum(e.target.value)}
                value={phonenumber}
                id="phonenumber"
                required
              />

              {/* <label className="mar userlabel" htmlFor="phonenumber">
                Phone No. <span className="star"> *</span>:
              </label>
              <input
                className=" mar w-50"
                name="phonenum"
                type="number"
                onChange={(e) => setphonenum(e.target.value)}
                value={phonenumber}
                id="phonenumber"
                required
              /> */}
              {/* <div className="w-100  error">
                {errors.phonenum && (
                  <span className="error">{errors.phonenum}</span>
                )}
              </div> */}
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>Designation <span>*</span></InputLabel>
                <Select
                  className=" mar  "
                  name="designation"
                  type="text"
                  onChange={(e) => setdesignation(e.target.value)}
                  value={designation}
                  id="designation"
                  required
                >
                  <MenuItem> ---select---</MenuItem>
                  <MenuItem value="sr.counsellor">Sr. Counsellor </MenuItem>
                  <MenuItem value="branchmanager">Branch Manager</MenuItem>
                </Select>
              </FormControl>

              {/* <label className="mar userlabel" htmlFor="designation">
                Designation<span className="star"> *</span> :
              </label>

              <select
                className=" mar w-50 ms-2"
                name="designation"
                type="text"
                onChange={(e) => setdesignation(e.target.value)}
                value={designation}
                id="designation"
                required
              >
                <option> ---select--- </option>
                <option> Sr. Counsellor </option>
                <option> Branch Manager </option>
              </select> */}
              {/* <div className=" w-100  error">
                {" "}
                {errors.designation && (
                  <span className="error">{errors.designation}</span>
                )}
              </div> */}
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>Department<span> *</span></InputLabel>
                <Select
                  className=" mar  "
                  name="department"
                  id="department"
                  required
                  onChange={(e) => setdepartment(e.target.value)}
                  value={department}
                >
                  <MenuItem> ---select---</MenuItem>\{" "}
                  {departments &&
                    departments.map((item, index) => (
                      <MenuItem key={item.id} value={item.department_name}>
                        {item.department_name}{" "}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/* <label className="mar userlabel" htmlFor="department">
                Department<span className="star"> *</span>:
              </label>

              <select
                // className="col-9 col-md-5"
                className=" mar "
                name="department"
                id="department"
                required
                style={{
                  height: "35px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                onChange={(e) => setdepartment(e.target.value)}
                value={department}
              >
                <option value="">--select--</option>

                {departments &&
                  departments.map((item, index) => (
                    <option key={item.id} value={item.department_name}>
                      {item.department_name}
                    </option>
                  ))}
              </select> */}

              {/* <div className="w-100  error">
                {" "}
                {errors.department && (
                  <span className="error">{errors.department}</span>
                )}
              </div> */}
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label="Report To"
                variant="standard"
                className=" mar w-75"
                name="reportto"
                type="text"
                onChange={(e) => setreportto(e.target.value)}
                value={reportto}
                id="reportto"
                required
              />

              {/* <label className="mar userlabel" htmlFor="reportto">
                Report to <span className="star"> *</span> :
              </label> */}
              {/* <input
                className=" mar w-50"
                name="reportto"
                type="text"
                onChange={(e) => setreportto(e.target.value)}
                value={reportto}
                id="reportto"
                required
              /> */}
              {/* <div className="w-100  error">
                {errors.reportto && (
                  <span className="error">{errors.reportto}</span>
                )}
              </div> */}
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>Role <span> *</span></InputLabel>
                <Select
                  className="mar "
                  name="profile"
                  id="profile"
                  required
                  onChange={(e) => setprofile(e.target.value)}
                  value={profile}
                >
                  <MenuItem> ---select---</MenuItem>
                  {roles &&
                    roles.map((item, index) => (
                      <MenuItem key={item.id} value={item.role}>
                        {item.role}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/* <label className="mar userlabel" htmlFor="profile">
                Role <span className="star"> *</span>:
              </label>
              <select
                // className="col-9 col-md-5"
                className="mar w-50 ms-2"
                name="profile"
                id="profile"
                required
                style={{
                  height: "35px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                onChange={(e) => setprofile(e.target.value)}
                value={profile}
              >
                <option value="">--select--</option>

                {roles &&
                  roles.map((item, index) => (
                    <option key={item.id} value={item.role}>
                      {item.role}
                    </option>
                  ))}
              </select> */}
              {/* 
              <div className="w-100 error">
                {" "}
                {errors.profile && (
                  <span className="error">{errors.profile}</span>
                )}
              </div> */}
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>Branch<span> *</span></InputLabel>
                <Select
                  className=" mar"
                  id="branch"
                  name="branch"
                  required
                  onChange={(e) => setbranch(e.target.value)}
                  value={branch}
                >
                  <MenuItem> ---select---</MenuItem>
                  {branches &&
                    branches.map((item, index) => (
                      <MenuItem key={item.id} value={item.branch_name}>
                        {item.branch_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* <label className="mar userlabel" htmlFor="branch">
                Branch <span className="star"> *</span>:
              </label>
              <select
                className=" mar w-50 ms-2"
                id="branch"
                name="branch"
                required
                style={{
                  height: "35px",
                  border: "1.5px solid black",
                  borderRadius: "5px",
                }}
                onChange={(e) => setbranch(e.target.value)}
                value={branch}
              >
                <option value="">--select--</option>

                {branches &&
                  branches.map((item, index) => (
                    <option key={item.id} value={item.branch_name}>
                      {item.branch_name}
                    </option>
                  ))}
              </select> */}
              {/* 
              <div className="w-100  error">
                {" "}
                {errors.branch && (
                  <span className="error">{errors.branch}</span>
                )}
              </div> */}
            </div>
          </div>
        
     
          <div className="create-button mt-5 ">
          <button
          type="submit"
                className="btn btn-primary mr-20 ms-2 mb-2 "
                style={{ textTransform: "capitalize"  }}
              >
               Create User
              </button>
            {/* <button  className="btn btn-primary"
            type="submit">
              
              Create User
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;
