import React, {useContext, useEffect, useState} from 'react'
import {NavLink, useParams, useNavigate} from "react-router-dom"
import { updatedata } from './context/ContextProvider';
import axios from 'axios';
const EditUser = () => {

  // var apiUrl = "http://localhost:3030";
  const { updata, setUPdata } = useContext(updatedata);
  const navigate = useNavigate("");
console.log("update" + updata);
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

  // const updateuser = async (e) => {
  //   e.preventDefault();
  
  //   const {
  //     fullname,
  //     email,
  //     phonenumber,
  //     designation,
  //     department,
  //     reportto,
  //     profile,
  //     branch,
  //   } = user;
  
  //   console.log("user : ", user);
  
  //   const res2 = await fetch(`http://localhost:3030/updateuser/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fullname,
  //       email,
  //       phonenumber,
  //       designation,
  //       department,
  //       reportto,
  //       profile,
  //       branch,
  //     }),
  //   });
  
  //   console.log('res2: ', res2)
  //   const data2 = await res2.json();
  //   console.log('data2' + data2)
  
  //   if (res2.status === 422 || !data2) {
  //     alert("Please fill in the data.");
  //   } else {
  //     navigate("/usersdata");
  //     setUPdata(data2); // You can uncomment this if needed.
  //   }
  // };
  

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


