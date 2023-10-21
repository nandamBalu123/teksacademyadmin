import React, { useEffect } from "react";
import { useState } from "react";
import "./CreateUserForm.css";
import { useNavigate } from "react-router-dom";
import { useDepartmentContext } from "../../../../hooks/useDepartmentcontext";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";

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
    if (phonenumber.length !== 10) {
      newErrors.phonenumber = "Phone number must be 10 digits";
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

    setErrors(newErrors);
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

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
    setProfiles(profilee);
  }, []); // Empty dependency array means it runs once after the initial render

  return (
    <div className="main-user-container container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row ">
            <div className=" col-12 col-md-6 col-lg-6 col-xl-6">
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
              <div className="w-100  ms-5 error">
                {" "}
                {errors.fullname && (
                  <span className="error">{errors.fullname}</span>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              {" "}
              <label className="mar userlabel" htmlFor="email">
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
              <div className="w-100  ms-5 error">
                {errors.email && <span className="error">{errors.email}</span>}{" "}
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <label className="mar userlabel" htmlFor="phonenumber">
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
              />
              <div className="w-100  ms-5 error">
                {" "}
                {errors.phonenum && (
                  <span className="error">{errors.phonenum}</span>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <label className="mar userlabel" htmlFor="designation">
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
              </select>
              <div className=" w-100  ms-5 error">
                {" "}
                {errors.designation && (
                  <span className="error">{errors.designation}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <label className="mar userlabel" htmlFor="department">
                Department<span className="star"> *</span>:
              </label>

              <select
                // className="col-9 col-md-5"
                className=" mar w-50 ms-2"
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
              </select>

              <div className="w-100 ms-5 error">
                {" "}
                {errors.department && (
                  <span className="error">{errors.department}</span>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
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
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <label className="mar userlabel" htmlFor="profile">
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
              </select>

              <div className="w-100 ms-5 error">
                {" "}
                {errors.profile && (
                  <span className="error">{errors.profile}</span>
                )}
              </div>
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <label className="mar userlabel" htmlFor="branch">
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
              </select>

              <div className="w-100 ms-5 error">
                {" "}
                {errors.branch && (
                  <span className="error">{errors.branch}</span>
                )}
              </div>
            </div>
          </div>
          <div className="create-button">
            <button type="submit" className="btn btn-primary   ">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;
