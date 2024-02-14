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
import CheckIcon from "@mui/icons-material/Check";
import { useUsersContext } from "../../../../hooks/useUsersContext";
import axios from "axios";
import $ from 'jquery';
const CreateUserForm = () => {
  // for number scrolling disable
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });
  // 

  const { users, dispatch } = useUsersContext();
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
  const [user_status, setUser_status] = useState(true);
  const [user_remarks_history, setuser_remarks_history] = useState([]);
  const profilee = [];
  const [reportToDropDown, setreportToDropDown] = useState()
  useEffect(() => {
    if (users) {
      const filtered = users.filter(user => user.profile.toLowerCase() !== 'counsellor');
      setreportToDropDown(filtered);
    }
  }, [users])
  useEffect(() => {
    console.log("reportToDropDown", reportToDropDown)
  })
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

    if (Object.keys(newErrors).length === 0) {
      let user = {
        fullname,
        email,
        phonenumber,
        designation,
        department,
        reportto,
        profile,
        branch,
        user_remarks_history,
        user_status,
      };

      console.log("User Data:", user); // Log the user data being sent
      user = [user];
      const dataWithTitleCase = user.map((item) => {
        const newItem = {};

        for (const key in item) {
          if (Object.prototype.hasOwnProperty.call(item, key)) {
            if (typeof item[key] === "string" && key !== "email") {
              newItem[key] = item[key]
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            } else {
              newItem[key] = item[key];
            }
          }
        }

        return newItem;
      });
      user = dataWithTitleCase[0];

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
        // let parseJson = json;
        // parseJson.user_remarks_history = JSON.parse(json.user_remarks_history);
        // console.log(parseJson);

        const id = json.Result.insertId;
        json.reqBody.id = id;
        dispatch({ type: "CREATE_USER", payload: json.reqBody });

        console.log("User created successfully.", user);
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

  return (
    <div className="main-user-container container my-4">
        <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <h5 className="mt-4  text-center">User Creation Form</h5>
      <div className="sub-user-container text-center ">
        <form onSubmit={handleSubmit} className="needs-validation " noValidate>
          <div className="row">
            <div className=" col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Full Name</span>}
                name="fullname"
                type="text"
                variant="standard"
                className="mar w-75  "
                required
                onChange={(e) => setfullname(e.target.value)}
                value={fullname}
                id="fullname"
              />
             
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Email ID</span>}
                name="email"
                type="email"
                variant="standard"
                className="mar w-75 "
                onChange={(e) => setemail(e.target.value)}
                value={email}
                id="email"
                required
              />
             
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Phone Number</span>}
                className=" mar w-75"
                variant="standard"
                name="phonenum"
                type="number"
                onChange={(e) => setphonenum(e.target.value)}
                value={phonenumber}
                id="phonenumber"
                required
              />

              
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              
              <TextField
                label={<span className="label-family">Designation</span>}
                className=" mar w-75"
                variant="standard"
                name="designation"
                type="text"
                onChange={(e) => setdesignation(e.target.value)}
                value={designation}
                id="designation"
                required
              />

            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  {
                    <span className="label-family">
                      Department <span>*</span>
                    </span>
                  }
              
                </InputLabel>
                <Select
                  className="mar"
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

             
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">
                    Report To <span>*</span>
                  </span>

                </InputLabel>
                <Select
                  className="mar "
                  name="reportto"
                  id="reportto"
                  required
                  onChange={(e) => setreportto(e.target.value)}
                  value={reportto}
                >
                  <MenuItem> ---select---</MenuItem>
                  {reportToDropDown &&
                    reportToDropDown.map((item, index) => (
                      <MenuItem key={item.id} value={item.fullname}>
                        {item.fullname}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
        

           
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">
                    Role <span>*</span>
                  </span>

         
                </InputLabel>
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

             
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">
                    Branch <span>*</span>
                  </span>

                </InputLabel>
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
             
            </div>
          </div>

          <div className="create-button mt-4 ">
            <button
              type="submit"
              className=" btn btn-color  mb-4 me-5"
              style={{ textTransform: "capitalize" }}
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateUserForm;
