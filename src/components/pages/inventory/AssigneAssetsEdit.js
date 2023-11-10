import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "./context/ContextProvider";

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
    vendername: "",
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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/viewassets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
      vendername,
      designation,
      branch,
      assettype,
      issueddate,
      assetcode,
      anonymity,
      remarks,
    } = inpval;

    const res2 = await fetch(`${process.env.REACT_APP_API_URL}/updatassignassets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        vendername,
        designation,
        branch,
        assettype,
        issueddate,
        assetcode,
        anonymity,
        remarks,
      }),
    });

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
    <div className="container">
      <NavLink to="/assignassets">Back</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
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
              onChange={setdata}
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
              onChange={setdata}
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
              onChange={setdata}
              name="branch"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="exampleInputPassword1" className="form-label">Asset Type</label>
                            <select
                                selected={inpval.assettype}
                                onChange={setdata}
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
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Asset Type
            </label>
            <input
              type="text"
              value={inpval.assettype}
              onChange={setdata}
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
              onChange={setdata}
              name="issueddate"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Asset Code
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
              Anonymity
            </label>
            <input
              type="text"
              value={inpval.anonymity}
              onChange={setdata}
              name="anonymity"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Remarks
            </label>
            <input
              type="text"
              value={inpval.remarks}
              onChange={setdata}
              name="remarks"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={updateuser} class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
