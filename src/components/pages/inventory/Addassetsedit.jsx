import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Addassetsedit.css";
import TextField from "@mui/material/TextField";

export default function Addassetsedit() {
  const [inpval, setINP] = useState({
    name: "",
  });

  const { id } = useParams("");
  const getdata = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/getaddassets/${id}`,
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

  return (
    //   <div>
    //   <input type="text" name="name" value={inpval.name}   />
    //   <input type="text" name="vendername" value={inpval.vendername}   />
    //   <input type="text" name="designation" value={inpval.designation}   />
    //   <input type="text" name="branch" value={inpval.branch}   />
    //   <input type="text" name="assettype" value={inpval.assettype}   />
    //   <input type="text" name="brandname" value={inpval.brandname}   />
    //   <input type="text" name="issueddate" value={inpval.issueddate}   />
    //   <input type="text" name="assetcode" value={inpval.assetcode}   />
    //   <input type="text" name="anonymity" value={inpval.anonymity}   />
    //   <input type="text" name="returndate" value={inpval.returndate}   />
    //   <input type="text" name="remarks" value={inpval.remarks}   />

    //   <button >Update Asset</button>
    // </div>
    <div className="container mt-3">
      <div className="editaddassets">
        <h4 className="mt-3 text-center">Add Asset Edit Form</h4>
        <form className="mt-4">
          <div className="row">
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
              <button className="btn btn-primary  ">Back</button>
            </NavLink>

            <button
              type="submit"
              className="btn btn-primary me-5 ms-2"
              style={{ textTransform: "capitalize" }}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
