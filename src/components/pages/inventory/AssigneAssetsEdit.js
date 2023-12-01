import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./AssigneAssetsEdit.css";

const Edit = () => {
  // var apiUrl = "https://demo.teksacademy.com:3000";
  // var apiUrl = 'http://localhost:3003/';

  // const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const [getassigndata, setUserdata] = useState([]);
  console.log(getassigndata);

  const { updata, setUPdata } = useContext(updatedata);

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    // vendername: "",
    designation: "",
    branch: "",
    assettype: "",
    issueddate: "",
    assetcode: "",
    anonymity: "",
    remarks: "",
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

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/viewassets/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data[0]);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      name,
      // vendername,
      designation,
      branch,
      assettype,
      issueddate,
      assetcode,
      anonymity,
      remarks,
    } = inpval;

    const res2 = await fetch(
      `${process.env.REACT_APP_API_URL}/updatassignassets/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          // vendername,
          designation,
          branch,
          assettype,
          issueddate,
          assetcode,
          anonymity,
          remarks,
        }),
      }
    );

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      navigate("/assignassets");
      // setUPdata(data2);
    }
  };

  return (
    <div className="container mt-3">
      <div className="main-assignassetsedit">
        <h5 className="mt-3"> Assign Assets Edit</h5>
        <div className="assignassetsedit text-center">
          <form className="mt-4">
            <div className="row ">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Full Name</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="name"
                  type="text"
                  value={inpval.name}
                  id="name"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Designation</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="designation"
                  type="text"
                  value={inpval.designation}
                />
                {/* <TextField
                label="Vender Name"
                className=" mar w-75"
                variant="standard"
                name="name"
                type="text"
                value={inpval.vendername}
                
              
              /> */}
              </div>{" "}
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Branch</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="text"
                  value={inpval.branch}
                  name="branch"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Asset Type</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="text"
                  value={inpval.assettype}
                  name="assettype"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Issue Date</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="date"
                  value={inpval.issueddate}
                  name="issueddate"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Asset Code</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="text"
                  value={inpval.assetcode}
                  name="assetcode"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Quantity</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="number"
                  value={inpval.anonymity}
                  name="anonymity"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                <TextField
                  label={<span className="label-family">Remarks</span>}
                  className=" mar w-75"
                  variant="standard"
                  type="text"
                  value={inpval.remarks}
                  name="remarks"
                />
              </div>
            </div>

            <div className="create-button  d-flex justify-content-between my-4 ">
              <NavLink to="/assignassets ">
                <button className="btn btn-color ms-sm-5">Back</button>
              </NavLink>

              <button
                type="submit"
                onClick={updateuser}
                className="btn btn-color me-sm-5"
                style={{ textTransform: "capitalize" }}
              >
                submit
              </button>
            </div>

            {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Vender Name
            </label>
            <input
              type="text"
              value={inpval.vendername}
              
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Designation
            </label>
            <input
              type="email"
              value={inpval.designation}
              
              name="designation"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Branch
            </label>
            <input
              type="text"
              value={inpval.branch}
              
              name="branch"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div> */}
            {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Asset Type</label>
                            <select
                                selected={inpval.assettype}
                                
                                name="assettype"
                                className="form-select"
                                id="exampleInputPassword1"
                            >
                                <option value="">Select Mobile</option>
                                <option value="shirt">Shirt</option>
                                <option value="t-shirt">T-Shirt</option>
                                <option value="laptop">Laptop</option>
                                <option value="charger">Charger</option>
                                <option value="mouse">Mouse</option>
                                <option value="student bags">Student Bags</option>
                            </select>
                        </div> */}
            {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Asset Type
            </label>
            <input
              type="text"
              value={inpval.assettype}
              
              name="assettype"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Issued Date
            </label>
            <input
              type="text"
              value={inpval.issueddate}
              
              name="issueddate"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div> */}
            {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Asset Code
            </label>
            <input
              type="text"
              value={inpval.assetcode}
              
              name="assetcode"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div> */}
            {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Anonymity
            </label>
            <input
              type="text"
              value={inpval.anonymity}
              
              name="anonymity"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div> */}
            {/* <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Remarks
            </label>
            <input
              type="text"
              value={inpval.remarks}
              
              name="remarks"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div> */}

            {/* <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
