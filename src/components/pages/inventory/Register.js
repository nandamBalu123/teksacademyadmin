import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Navbaar from './Navbaar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import SideBar from '../Sidebar/SideBar';

// import Navbaar from '../Navbar/Navbaar';
const Register = () => {
  // var apiUrl = "https://demo.teksacademy.com:3000";
  // var apiUrl = 'http://localhost:3003/';

  // datepicker

  const handleDateChange = (date) => {
    setINP((prevState) => ({
      ...prevState,
      issueddate: date.target.value, // Update the 'work' property with the selected date
    }));
  };

  const { udata, setUdata } = useContext(adddata);

  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    name: "",
    vendername: "",
    designation: "",
    branch: "",
    assettype: "",
    issueddate: "",
    assetcode: "",
    anonymity: "",
    remarks: "",
  });
useEffect(()=>{
  console.log(inpval)
})
  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const {
      name,
      vendername,
      designation,
      branch,
      assettype,
      brandname,
      issueddate,
      assetcode,
      anonymity,
      remarks,
    } = inpval;

    if (name == "") {
      alert("name is required");
    }
    // else if(vendername == ""){
    //     alert("vender name is required")
    // }
    else if (designation == "") {
      alert("designation is required");
    } else if (branch == "") {
      alert("branch is required");
    } else if (assettype == "") {
      alert("assettype is required");
    }
    //   else if (brandname == "") {
    //     alert("brandname is required")
    // }
    else if (issueddate == "") {
      alert("issueddate is required");
    }
    // else if (assetcode == "") {
    //     alert("assetcode is required")
    // }
    else if (anonymity == "") {
      alert("quantity is required");
    }
    // else if (remarks == "") {
    //     alert("remarks is required")
    // }
    else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/assignasset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          vendername,
          designation,
          branch,
          assettype,
          brandname,
          issueddate,
          assetcode,
          anonymity,
          remarks,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error ");
        alert("Insufficient quantity in the inventory");
      } else {
        navigate("/assignassets");
        // setUdata(data)
        alert("Assigned Successefully")
        console.log("data added");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="container">
          <NavLink to="/assignassets">Back</NavLink>
          <form className="mt-4">
            <div className="row">
              <div className=" col-lg-6 col-md-6 col-12">
              <TextField
                label="Name"
                className=" mar w-75"
                variant="standard"
                name="name"
                type="text"
                value={inpval.name}
                  onChange={setdata}
                id="name"
                required
              />
                {/* <label for="exampleInputEmail1" class="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  value={inpval.name}
                  onChange={setdata}
                  name="name"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                /> */}
              </div>
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Vender Name*</label>
                            <input type="text" value={inpval.vendername} onChange={setdata} name="vendername" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div> */}
              <div className=" col-lg-6 col-md-6 col-12">
              <TextField
                label="Designation"
                className="mar w-75 ms-2"
                variant="standard"
                name="designation"
                type="text"
                value={inpval.designation}
                onChange={setdata}
                id="designation"
                required
              />
                {/* <label for="exampleInputPassword1" class="form-label">
                  Designation*
                </label>
                <input
                  type="text"
                  value={inpval.designation}
                  onChange={setdata}
                  name="designation"
                  class="form-control"
                  id="exampleInputPassword1"
                /> */}
              </div>
                     <div className="row"> 
                     <div className="mb-3 col-lg-6 col-md-6 col-12">
                     <FormControl variant="standard" className="w-75">
                <InputLabel>
                  Branch<span> *</span>
                </InputLabel>
                <Select
                  className="mar"
                  name="branch"
                  id="branch"
                  required
                  selected={inpval.branch}
                  onChange={setdata}
                >
                    <MenuItem value="">Select Branch</MenuItem>
                  <MenuItem value="Ameerpet">Ameerpet</MenuItem>
                  <MenuItem value="hi-tech city">Hi-tech city</MenuItem>
                  <MenuItem value="dilsupnagar">Dilsupnagar</MenuItem>
                </Select>
              </FormControl>
{/* <label htmlFor="exampleInputPassword1" className="form-label">
  Branch*
</label>
<select
  selected={inpval.branch}
  onChange={setdata}
  name="branch"
  className="form-select"
  id="exampleInputPassword1"
>
  <option value="">Select Branch</option>
  <option value="Ameerpet">Ameerpet</option>
  <option value="hi-tech city">Hi-tech city</option>
  <option value="dilsupnagar">Dilsupnagar</option>
</select> */}
</div>
<div className="mb-3 col-lg-6 col-md-6 col-12">
<FormControl variant="standard" className="w-75 ms-4">
                <InputLabel>
                  Asset Type<span> *</span>
                </InputLabel>
                <Select
                  className=" mar  "
                  name="assettype"
                  id="assettype"
                  required
                  value={inpval.assettype}
                  onChange={setdata}
                >
                <MenuItem value="">Select Asset</MenuItem>
                  <MenuItem value="shirt">Shirt</MenuItem>
                  <MenuItem value="t-shirt">T-Shirt</MenuItem>
                  <MenuItem value="laptop">Laptop</MenuItem>
                  <MenuItem value="charger">Charger</MenuItem>
                  <MenuItem value="mouse">Mouse</MenuItem>
                  <MenuItem value="student bags">Student Bags</MenuItem>
                </Select>
              </FormControl>
                {/* <label htmlFor="exampleInputPassword1" className="form-label">
                  Asset Type*
                </label>
                <select
                  value={inpval.assettype} // Use 'value' instead of 'selected' for select input
                  // selected={inpval.assettype}
                  onChange={setdata}
                  name="assettype"
                  className="form-select"
                  id="exampleInputPassword1"
                >
                  <option value="">Select Asset</option>
                  <option value="shirt">Shirt</option>
                  <option value="t-shirt">T-Shirt</option>
                  <option value="laptop">Laptop</option>
                  <option value="charger">Charger</option>
                  <option value="mouse">Mouse</option>
                  <option value="student bags">Student Bags</option>
                </select> */}
                {inpval.assettype === "laptop" && (
                  <div className="row">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">  
                    <TextField
                label="Brand Name"
                className=" mar w-75"
                variant="standard"
                name="brandname"
                type="text"
                value={inpval.brandname}
                onChange={setdata}
               
                id="brandname"
                required
              />
                    {/* <label htmlFor="brandname" className="form-label">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandname"
                      value={inpval.brandname}
                      onChange={setdata}
                      className="form-control"
                      id="brandname"
                    /> */}
                    </div>
                   <div className="col-12 col-md-6 col-lg-6 col-xl-6">  
                   <TextField
                label="Remarks"
                className=" mar w-75"
                variant="standard"
                name="remarks"
                type="text"
                value={inpval.remarks}
                      onChange={setdata}
               
                id="remarks"
                required
              />
                   </div> 

                    {/* <label htmlFor="remarks" className="form-label">
                      Remarks
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={inpval.remarks}
                      onChange={setdata}
                      className="form-control"
                      id="remarks"
                    /> */}
                  </div>
                )}
              </div>
                     </div>
             
              
              <div className="mb-3 col-lg-6 col-md-6 col-12">
              <TextField
                      label="Issue Date"
                      type="date"
                      name="issueddate"
                      variant="standard"
                      className="w-75"
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      selected={inpval.issueddate} // Set the selected date value
                      onChange={handleDateChange} // Handle date selection
                    />
              
                {/* <label htmlFor="exampleInputPassword1" className="form-label">
                  Issued Date*{" "}
                </label>
                <br></br>
                <DatePicker
                  selected={inpval.issueddate} // Set the selected date value
                  onChange={handleDateChange} // Handle date selection
                  name="issueddate"
                  className="form-select form-control"
                  id="exampleInputPassword1"
                  placeholderText="Select a date" // Placeholder text when no date is selected
                /> */}
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
              <TextField
                label="Asset Code"
                className=" mar w-75 ms-3"
                variant="standard"
                name="assetcode"
                type="text"
                value={inpval.assetcode}
                onChange={setdata}
               
                id="assetcode"
                required
              />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
              <TextField
                label="Quantity"
                className=" mar w-75 "
                variant="standard"
                name="anonymity"
                type="number"
                value={inpval.anonymity}
                  onChange={setdata}
               
                id="anonymity"
                required
              />
              </div>
              <div className="create-button">
            <button
              type="submit"
              onClick={addinpdata}
              className="btn btn-primary mr-20  mb-2 me-5 "
              style={{ textTransform: "capitalize" }}
            >
              submit
            </button>
           
          </div>

              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Remarks*</label>
                            <input type="text" value={inpval.remarks} onChange={setdata} name="remarks" class="form-control" id="exampleInputPassword1" />
                        </div> */}

              {/* <button
                type="submit"
                onClick={addinpdata}
                class="btn btn-primary"
              >
                Submit
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
