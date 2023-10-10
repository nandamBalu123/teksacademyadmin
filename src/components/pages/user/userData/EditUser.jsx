import React, {useContext, useEffect, useState} from 'react'
import {NavLink, useParams, useNavigate} from "react-router-dom"
import axios from 'axios';
const EditUser = () => {
  const navigate = useNavigate("");

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
    const res = await fetch(`http://localhost:3030/viewuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log('data: ' + data);

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
    axios.put(`http://localhost:3030/updateuser/${id}`, user)
    .then(res => {
      if(res.data.updated){
        alert('User Updated')
        navigate('/usersdata')
        
      }else{
        alert("not updated")
      }
    })
  }

  return (
    <div className="container">
       <NavLink to="/usersdata">Back</NavLink>
       <form className="mt-4">
         <div className="row">
           <div className="mb-3 col-lg-6 col-md-6 col-12">
             <label htmlFor="exampleInputEmail1" className="form-label">
               fullname
             </label>
             <input
              type="text"
              value={user.fullname}
              onChange={setdata}
              name="fullname"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              email
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
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone number
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

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Department
            </label>
            <input
              type="text"
              value={user.department}
              onChange={setdata}
              name="department"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              reportto
            </label>
            <input
              type="text"
              value={user.reportto}
              onChange={setdata}
              name="reportto"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              profile
            </label>
            <input
              type="text"
              value={user.profile}
              onChange={setdata}
              name="profile"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Branch
            </label>
            <input
              type="text"
              value={user.branch}
              onChange={setdata}
              name="branch"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" onClick={handlesubmit} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default EditUser;


