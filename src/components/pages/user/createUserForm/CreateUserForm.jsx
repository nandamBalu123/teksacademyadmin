import React from "react";
import { useState } from "react";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";

import "./CreateUserForm.css";
// import ValidationTextFields from "./casdfas";
const CreateUserForm = () => {
  const { dispatch } = useUsersContext();
  const { user } = useAuthContext();
  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [phonenum, setphonenum] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");
  const [reportto, setreportto] = useState("");
  const [profile, setprofile] = useState("");
  const [branch, setbranch] = useState("");
  // const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!user) {
    //   setError('You must be logged in')
    //   return
    // }
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

    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();
    // if (!response.ok) {
    //   setError(json.error);
    //   setEmptyFields(json.emptyFields);
    // }
    if (response.ok) {
      setfullname("");
      setemail("");
      setphonenum("");
      setdesignation("");
      setdepartment("");
      setreportto("");
      setprofile("");
      setbranch("");
      // setError(null);
      // setEmptyFields([]);
      // dispatch({type: 'CREATE_USER', payload: json})
    }
  };
  return (
    <div className="main-user-container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit} className="needs-validation" novalidate>
          <div className="row roww mb-4">
            <label className="mar col-md-2 " for="fullname">
              Full Name<span className="star"> *</span>:
            </label>
            <input
              className="mar col-md-3 inputt "
              type="text"
              onChange={(e) => setfullname(e.target.value)}
              value={fullname}
              id="fullname"
              required
            />
            <div class="valid-feedback">Looks good!</div>
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
          </div>
          <div className="row roww mb-4">
            <label className="mar col-md-2" for="phonenumber">
              Phone Number <span className="star"> *</span>:
            </label>
            <input
              className=" mar col-md-3"
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
              className=" mar col-md-3"
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
