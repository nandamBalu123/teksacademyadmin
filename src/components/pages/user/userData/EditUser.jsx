import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  var apiUrl = "https://demo.teksacademy.com:3000";

  const navigate = useNavigate("");

  const [user, setuser] = useState({
    fullname: "",
    email: "",
    phonenum: "",
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
    const res = await fetch(`${apiUrl}/viewassets/${id}`, {
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
      setuser(data[0]);
      console.log("get data");
    }
  };

  // useEffect(() => {
  //   getdata();
  // }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const {
      fullname,
      email,
      phonenum,
      designation,
      department,
      reportto,
      profile,
      branch,
    } = user;

    const res2 = await fetch(`${apiUrl}/updatassignassets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        email,
        phonenum,
        designation,
        department,
        reportto,
        profile,
        branch,
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
      <NavLink to="/usersdata">Back</NavLink>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              fullname
            </label>
            <input
              type="text"
              value={user.fullname}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              email
            </label>
            <input
              type="text"
              value={user.email}
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
              value={user.designation}
              onChange={setdata}
              name="designation"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Phone number
            </label>
            <input
              type="text"
              value={user.phonenum}
              onChange={setdata}
              name="branch"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Department
            </label>
            <input
              type="text"
              value={user.department}
              onChange={setdata}
              name="assettype"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              reportto
            </label>
            <input
              type="text"
              value={user.reportto}
              onChange={setdata}
              name="issueddate"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              profile
            </label>
            <input
              type="text"
              value={user.profile}
              onChange={setdata}
              name="assetcode"
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
              value={user.branch}
              onChange={setdata}
              name="anonymity"
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
