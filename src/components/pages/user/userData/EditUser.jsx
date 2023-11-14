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
import './EditUser.css';
import axios from "axios";
const EditUser = () => {
  const navigate = useNavigate("");
  const [profiles, setProfiles] = useState([]);
  const { departments } = useDepartmentContext();
  const { roles } = useRoleContext();
  const { branches } = useBranchContext();
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/viewuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data: " + data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setuser(data[0]);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/updateuser/${id}`, user)
      .then((res) => {
        if (res.data.updated) {
          alert("User Updated");
          navigate("/usersdata");
        } else {
          alert("not updated");
        }
      });
  };

  return (
    <div className="container main-edituser-container my-4 ">
      <h4 className="my-4 text-center"> Edit User Form</h4>
      <div className="sub-edituser-container">
        <form action="">
        <div className="row ">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
        <TextField
                label="Full Name "
                name="fullname"
                type="text"
                variant="standard"
                className="mar w-75 "
                required
                onChange={setdata}
                value={user.fullname}
                id="fullname"
              />
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
                label="Email ID"
                name="email"
                type="email"
                variant="standard"
                className="mar w-75 "
                value={user.email}
            onChange={setdata}
                id="email"
                required
              />
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
                label="Phone Number"
                className=" mar w-75"
                variant="standard"
                name="phonenumber"
                type="number"
                value={user.phonenumber}
            onChange={setdata}
                id="phonenumber"
                required
              />
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6"> 
        <TextField
                label="Designation"
                className=" mar w-75"
                variant="standard"
                name="designation"
                type="text"
                value={user.designation}
                onChange={setdata}
                id="designation"
                required
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
                  Department
                </InputLabel>
                <Select
                  className=" mar  "
                  name="department"
                  id="department"
                  required
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
                label="Report to"
                className=" mar w-75"
                variant="standard"
                name="reportto"
                type="text"
                value={user.reportto}
                onChange={setdata}
                id="reportto"
                required
              />
        </div>
       

     </div>
     
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 col-md-6"> 

              <FormControl variant="standard" className="w-75">
                <InputLabel>
                 Role
                </InputLabel>
                <Select
                  className=" mar  "
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
                 Branch
                </InputLabel>
                <Select
                  className=" mar  "
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
    
      <div className="row mb-3 ">
        <div className="col-2 col-md-6 col-lg-6 col-xl-6">
          <NavLink to="/usersdata" className="btn btn-primary ">
            Back
          </NavLink>
        </div>
        <div className="col-9 col-md-6 col-lg-6 col-xl-6 ">
          <button
            type="submit"
            onClick={handlesubmit}
            className="btn btn-primary end "
          >
            Submit
          </button>
        </div>
      </div>
        </form>
      </div>
    </div>
  );
};
export default EditUser;
