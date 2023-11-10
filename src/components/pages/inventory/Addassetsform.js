import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "./context/ContextProvider";
// import Navbaar from './Navbaar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import SideBar from '../Sidebar/SideBar';

// import Navbaar from '../Navbar/Navbaar';
export default function Addassetsform() {
  // var apiUrl = 'https://demo.teksacademy.com:3000';
  // var apiUrl = "http://localhost:3003";
  // datepicker

  const handleDateChange = (date) => {
    setINP((prevState) => ({
      ...prevState,
      returndate: date, // Update the 'work' property with the selected date
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
    brandname: "",
    remarks: "",
    issueddate: "",
    assetcode: "",
    anonymity: "",
    returndate: "",
  });

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
      returndate,
      remarks,
    } = inpval;

    if (vendername == "") {
      alert("name is required");
    }
    // else if(vendername == ""){
    //     alert("Vender name is required")
    // }
    // else if (designation == "") {
    //     alert("email is required")
    // }
    // else if (branch == "") {
    //     alert("work is required")
    // }
    else if (assettype == "") {
      alert("Asset Type is required");
    } else if (assetcode == "") {
      alert("Asset code is required");
    } else if (anonymity == "") {
      alert("quantity is required");
    }
    // else if (remarks == "") {
    //     alert("remarks is required")
    // }
    else {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/create`, {
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
          returndate,
          remarks,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");
      } else {
        navigate("/addassets");
        // setUdata(data)
        console.log("data added");
      }
    }
  };

  return (
    <div>
      <div>
        <div className="container">
          <NavLink to="/addassets">Back</NavLink>
          <form className="mt-4">
            <div className="row">
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputEmail1" class="form-label">Name*</label>
                            <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div> */}
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">
                  Vender Name*
                </label>
                <input
                  type="text"
                  value={inpval.vendername}
                  onChange={setdata}
                  name="vendername"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Designation*</label>
                            <input type="text" value={inpval.designation} onChange={setdata} name="designation" class="form-control" id="exampleInputPassword1" />
                        </div> */}
              {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Branch*</label>
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
                            </select>
                        </div> */}
              <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="exampleInputPassword1" className="form-label">
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
                </select>
                {inpval.assettype === "laptop" && (
                  <div>
                    <label htmlFor="brandname" className="form-label">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      name="brandname"
                      value={inpval.brandname}
                      onChange={setdata}
                      className="form-control"
                      id="brandname"
                    />

                    <label htmlFor="remarks" className="form-label">
                      Remarks
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={inpval.remarks}
                      onChange={setdata}
                      className="form-control"
                      id="remarks"
                    />
                  </div>
                )}
              </div>
              {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Issued Date* </label><br></br>
                            <DatePicker
                                selected={inpval.issueddate} // Set the selected date value
                                onChange={handleDateChange} // Handle date selection
                                name="issueddate"
                                className="form-select form-control"
                                id="exampleInputPassword1"
                                placeholderText="Select a date" // Placeholder text when no date is selected
                            />
                        </div> */}
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Asset Code*
                </label>
                <input
                  type="text"
                  value={inpval.assetcode}
                  onChange={setdata}
                  name="assetcode"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">
                  Quantity*
                </label>
                <input
                  type="number"
                  value={inpval.anonymity}
                  onChange={setdata}
                  name="anonymity"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              {/* <div className="mb-3 col-lg-3 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Return Date* </label><br></br>
                            <DatePicker
                                selected={inpval.returndate} // Set the selected date value
                                onChange={handleDateChange} // Handle date selection
                                name="returndate"
                                className="form-select form-control"
                                id="exampleInputPassword1"
                                placeholderText="Select a date" // Placeholder text when no date is selected
                            />
                        </div> */}
              {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" class="form-label">Remarks*</label>
                            <input type="text" value={inpval.remarks} onChange={setdata} name="remarks" class="form-control" id="exampleInputPassword1" />
                        </div> */}

              <button
                type="submit"
                onClick={addinpdata}
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
