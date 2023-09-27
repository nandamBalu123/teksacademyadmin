import React from "react";
import { useState } from "react";
import "./CreateUserForm.css";
const CreateUserForm = () => {
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenum, setphonenum] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [reportto, setreportto] = useState("");
  const [profile, setprofile] = useState("");
  const [branch, setbranch] = useState("");
  const [errors, setErrors] = useState({ fullname: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname.trim()) {
      errors.fullname = "UserName is required";
    }
    if (fullname.trim()) {
      errors.fullname = "";
    }
    // Validate email
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (phonenum != 10) {
      errors.phonenum = "please enter correct phone number";
    }
    if (!designation) {
      errors.designation = "Designation is required";
    }
    if (!department) {
      errors.department = "Department is required";
    }
    if (!reportto) {
      errors.reportto = "Report To is required";
    }
    if (!profile) {
      errors.profile = "Profile is required";
    }
    if (!branch) {
      errors.branch = "Branch is required";
    }
    console.log("errors" + errors);
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
    }
  };

  return (
    <div className="main-user-container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row roww mb-4">
            <label className="mar col-md-1 " for="fullname">
              Full Name<span className="star"> *</span>:
            </label>
            <input
              className="mar col-md-1 inputt "
              type="text"
              onChange={(e) => setfullname(e.target.value)}
              value={fullname}
              id="fullname"
              required
            />

            <label className="mar col-md-2" for="email">
              Email ID<span className="star"> *</span>:
            </label>
            <input
              className=" mar col-md-4 inputt"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              id="email"
              required
            />
            {errors.fullname && (
              <span className="error">{errors.fullname}</span>
            )}
          </div>
          <div className="row roww mb-4">
            <label className="mar col-md-2" for="phonenumber">
              Phone Number <span className="star"> *</span>:
            </label>
            <input
              className=" mar col-md-3 inputt"
              type="number"
              onChange={(e) => setphonenum(e.target.value)}
              value={phonenum}
              id="phonenumber"
              required
            />
            <label className="mar col-md-2" for="designation">
              Designation<span className="star"> *</span> :
            </label>
            <input
              className=" mar col-md-4 inputt"
              type="text"
              onChange={(e) => setdesignation(e.target.value)}
              value={designation}
              id="designation"
              required
            />
          </div>
          <div className="row roww mb-4">
            <label className="mar col-md-2" for="department">
              Department<span className="star"> *</span>:
            </label>
            <input
              className=" mar col-md-3 inputt"
              type="text"
              onChange={(e) => setdepartment(e.target.value)}
              value={department}
              id="department"
              required
            />
            <label className="mar col-md-2" for="reportto">
              Report to <span className="star"> *</span> :
            </label>
            <input
              className=" mar col-md-4 inputt"
              type="text"
              onChange={(e) => setreportto(e.target.value)}
              value={reportto}
              id="reportto"
              required
            />
          </div>
          <div className="row roww mb-4">
            <label className="mar col-md-2" for="profile">
              Profile <span className="star"> *</span>:
            </label>

            <select
              className=" mar col-md-3 selectt"
              id="profile"
              onChange={(e) => setprofile(e.target.value)}
              value={profile}
              required
            >
              <option value="">--select--</option>
              <option value="Counseller">Counseller </option>
              <option value="manager">Manager</option>
              <option value="regionalmanager">Regional Manager</option>
              <option value="managingdirector">Managing Director</option>
            </select>
            <label className="mar col-md-2" for="branch">
              Branch <span className="star"> *</span>:
            </label>
            <select
              className=" mar col-md-4 selectt"
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
          </div>
          <div className="create-button">
            <button type="submit" class="btn btn-primary mr-20 mt-5  ">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
