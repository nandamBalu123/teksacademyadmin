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
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      },
    });
    const json = await response.json();

    // if (!response.ok) {
    //   setError(json.error);
    //   setEmptyFields(json.emptyFields);
    // }
    if (response.ok) {
      // setEmptyFields([]);
      // setError(null);
      setfullname("");
      setemail("");
      setphonenum("");
      setdesignation("");
      setdepartment("");
      setreportto("");
      setprofile("");
      setbranch("");

      // dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="main-user-container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label className="mar col-md-2">Full Name:</label>
            <input
              className="mar col-md-3"
              type="text"
              onChange={(e) => setfullname(e.target.value)}
              value={fullname}
            />
            <label className="mar col-md-2">Email ID:</label>
            <input
              className="mar col-md-4"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </div>
          <div className="row">
            <label className="mar col-md-2">Phone Number :</label>
            <input
              className="mar col-md-3"
              type="number"
              onChange={(e) => setphonenum(e.target.value)}
              value={phonenum}
            />
            <label className="mar col-md-2">Designation :</label>
            <input
              className="mar col-md-4"
              type="text"
              onChange={(e) => setdesignation(e.target.value)}
              value={designation}
            />
          </div>
          <div className="row">
            <label className="mar col-md-2">Department:</label>
            <input
              className="mar col-md-3"
              type="text"
              onChange={(e) => setdepartment(e.target.value)}
              value={department}
            />
            <label className="mar col-md-2">Report to :</label>
            <input
              className="mar col-md-4"
              type="text"
              onChange={(e) => setreportto(e.target.value)}
              value={reportto}
            />
          </div>
          <div className="row">
            <label className="mar col-md-2">Profile :</label>
            <input
              className="mar col-md-3"
              type="text"
              onChange={(e) => setprofile(e.target.value)}
              value={profile}
            />
            <label className="mar col-md-2">Branch :</label>
            {/* <select className="mar col-md-4" id="branch" name="branch">
              <option value="">--select--</option>
              <option value="hitechcity">Hitech City</option>
              <option value="ameerpet">Ameerpet</option>
              <option value="kukatpally">Kukatpally</option>
              <option value="secundrabad">Secundrabad</option>
              <option value="dilshuknagar">Dilshuknagar</option>
            </select> */}
            <input
              className="mar col-md-3"
              type="text"
              onChange={(e) => setbranch(e.target.value)}
              value={branch}
            />
          </div>
          {/* <div className="create-button">
            <button type="button" class="btn btn-primary mt-5">
              Create User
            </button>
          </div> */}
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
