import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useRoleContext } from "../../../../hooks/useRoleContext";
import { useBranchContext } from "../../../../hooks/useBranchContext";
import { useDepartmentContext } from "../../../../hooks/useDepartmentcontext";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./EditUser.css";
import axios from "axios";
import $ from 'jquery';
import { useUsersContext } from "../../../../hooks/useUsersContext";
const EditUser = () => {
  // for number scrolling disable
  $('input[type=number]').on('mousewheel', function (e) {
    $(e.target).blur();
  });
  // 
  const navigate = useNavigate("");
  const [profiles, setProfiles] = useState([]);
  const { departments } = useDepartmentContext();
  const { roles } = useRoleContext();
  const { branches } = useBranchContext();
  const { users, dispatch } = useUsersContext();
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    designation: "",
    department: "",
    reportto: "",
    profile: "",
    branch: "",
  });
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
    setProfiles(profiles);
  }, []); // Empty dependency array means it runs once after the initial render

  const [user, setuser] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    designation: "",
    department: "",
    reportto: "",
    profile: "",
    branch: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setuser((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams();
  console.log(id);

  // const getdata = async () => {
  //   const res = await fetch(`${process.env.REACT_APP_API_URL}/viewuser/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();
  //   console.log("data: " + data);

  //   if (res.status === 422 || !data) {
  //     console.log("error ");
  //   } else {
  //     setuser(data[0]);
  //     console.log("get data");
  //   }
  // };

  useEffect(() => {
    if (users && id) {
      const filteredResults = users.filter((item) => {
        const singleUserCondition = id ? item.id === parseInt(id) : true;

        return singleUserCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setuser(filteredResults[0]);
    }
  }, [users, id, dispatch]);
  // useEffect(() => {
  //   getdata();
  // }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!user.fullname) {
      newErrors.fullname = "Please enter the name";
    }
    else if (user.fullname.length < 3) {
newErrors.fullname = "please enter minimum 3 letters"
    }
    else if (!user.email) {
      newErrors.email = "Please enter email id";
    } else {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailPattern.test(user.email)) {
        newErrors.email = "Invalid Email Address";
      }
      if (!user.phonenumber) {
        newErrors.phonenumber = "Please enter mobile number";
      } else if (user.phonenumber.length !== 10) {
        newErrors.phonenumber = "Incorrect mobile number";
      }
    }

    // if (!user.designation) {
    //   newErrors.designation = "Please enter the designation";
    // } 
    // if (!user.department) {
    //   newErrors.department = "Please enter the department";
    // } 
    // if (!user.reportto) {
    //   newErrors.reportto = "Please enter the reportto";
    // } 
    // if (!user.profile) {
    //   newErrors.profile = "Please enter the profile";
    // } 
    // if (!user.branch) {
    //   newErrors.branch = "Please enter the branch";
    // }

    // Update the state with the new error messages
    setErrors(newErrors);

    // Proceed with the update only if there are no errors
    if (Object.keys(newErrors).length === 0) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/updateuser/${id}`, user)
        .then((res) => {
          if (res.data.updated) {
            alert("User Updated");

            let updateContext = { user, id: parseInt(id) };
            console.log("updateContext", updateContext);
            dispatch({
              type: "UPDATE_USER",
              payload: updateContext,
            });
            navigate("/usersdata");
          } else {
            alert("not updated");
          }
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error if update fails
        });
    }
  };

  return (
    <div className="container main-edituser-container my-4 ">
      <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <h5 className="my-3 text-center"> Edit User Form</h5>
      <div className="sub-edituser-container text-start">
        <form action="">
          <div className="row ">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family"> Full Name *</span>}
                name="fullname"
                type="text"
                variant="standard"
                className="mar w-75 "
                onChange={setdata}
                value={user.fullname}
                id="fullname"
              />
              {errors.fullname && (
                <div className="error-message" style={{ color: "red"}}>{errors.fullname}</div>
              )}
             
            </div>
            
            {/* <div className="mb-4 col-xl-5 col-lg-5 col-md-6 col-12 ">
          <label>Full Name</label>
          <input
            type="text"
            value={user.fullname}
            onChange={setdata}
            className="form-control"
            name="fullname"
            required
          />
        </div> */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Email ID *</span>}
                name="email"
                type="email"
                variant="standard"
                className="mar w-75 "
                value={user.email}
                onChange={setdata}
                id="email"
              />
              {errors.email && (
                <div className="error-message" style={{ color: "red"}}>{errors.email}</div>
              )}
            </div>
            {/* <div className=" mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={setdata}
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div> */}
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Phone No.*</span>}
                className=" mar w-75"
                variant="standard"
                name="phonenumber"
                type="number"
                value={user.phonenumber}
                onChange={setdata}
                id="phonenumber"
              />
              {errors.phonenumber && (
                <div className="error-message" style={{ color: "red"  }}>{errors.phonenumber}</div>
              )}
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Designation</span>}
                className=" mar w-75"
                variant="standard"
                name="designation"
                type="text"
                value={user.designation}
                onChange={setdata}
                id="designation"
              />
            </div>
          </div>
          {/* <div className="row m-auto">
        <div className="mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Designation
          </label>
          <input
            type="text"
            value={user.designation}
            onChange={setdata}
            name="designation"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className=" mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            value={user.phonenumber}
            onChange={setdata}
            name="phonenumber"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
      </div> */}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">Department</span>
                </InputLabel>
                <Select
                  className="mar"
                  name="department"
                  value={user.department}
                  onChange={setdata}
                >
                  {departments &&
                    departments.map((item, index) => (
                      <MenuItem key={item.id} value={item.department_name}>
                        {item.department_name}{" "}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* <TextField
                label="Department"
                className=" mar w-75"
                variant="standard"
                name="department"
                type="text"
                value={user.department}
            onChange={setdata}
                id="department"
                required
              /> */}
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <TextField
                label={<span className="label-family">Report To</span>}
                className=" mar w-75"
                variant="standard"
                name="reportto"
                type="text"
                value={user.reportto}
                onChange={setdata}
                id="reportto"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 col-md-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">Role</span>
                </InputLabel>
                <Select
                  className="mar"
                  name="profile"
                  id="profile"
                  required
                  value={user.profile}
                  onChange={setdata}
                >
                  {roles &&
                    roles.map((item, index) => (
                      <MenuItem key={item.id} value={item.role}>
                        {item.role}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-md-6 col-lg-6 col-md-6">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">Branch</span>
                </InputLabel>
                <Select
                  className="mar"
                  name="branch"
                  id="branch"
                  required
                  value={user.branch}
                  onChange={setdata}
                >
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

          <div className="d-flex justify-content-between my-3">
            {/* <NavLink to="/usersdata" className="btn btn-color  ms-sm-5">
              Back
            </NavLink> */}
            <button
              type="submit"
              onClick={handlesubmit}
              className="btn btn-color me-sm-5 subbtn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
