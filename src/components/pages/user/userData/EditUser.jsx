import React, {useContext, useEffect, useState} from 'react'
import {NavLink, useParams, useNavigate} from "react-router-dom"
import axios from 'axios';
const EditUser = () => {
  const navigate = useNavigate("");
  const [profiles, setProfiles] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3030/getuserroles");

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
    <div className="container mt-4">
     
         
         <div className="row m-auto">
           <div className="mb-4 col-xl-5 col-lg-5 col-md-6 col-12 ">
           <label >
               Full Name
             </label>
             <input
              type="text"
              value={user.fullname}
              onChange={setdata}
              className='form-control'
              name="fullname"
             required
            />
           
          </div>
          <div className=" mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
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
          </div>
          </div>
          <div className='row m-auto'> 
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
          </div>

          <div className='row m-auto'> 
          <div className="mb-4  col-xl-5 col-lg-5 col-md-6 col-12">
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
          <div className="mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Report To
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
           </div>
         <div className='row m-auto'> 
         <div className="mb-4  col-xl-5 col-lg-5 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Profile
            </label>
            <select
              className="form-control ms-2"
              id="exampleInputPassword1"
              required
              style={{ 
                height: "45px",
                paddingRight: "145px",
            
              }}
              name="profile"
              value={user.profile}
              onChange={setdata}
            >
              <option value="">--select--</option>
              {profiles.map((profile) => (
                <option key={profile} value={profile}>
                  {profile}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              value={user.profile}
              onChange={setdata}
              name="profile"
              className="form-control"
              id="exampleInputPassword1"
            /> */}
          </div>
          <div className="mb-4 col-xl-5 col-lg-5 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Branch
            </label>
            <select
              className="form-control ms-2"
              id=""
              required
              
              name="branch"
              value={user.branch}
              onChange={setdata}
            >
              <option value="">--select--</option>

              <option value="hitechcity">Hi-tech City</option>
              <option value="dilsukhnagar">dilshukanagar</option>
              <option value="ameerpet">ameerpet</option>
              <option value="gachibowli">gachibowli</option>
            </select>
            {/* <input
              type="text"
              value={user.branch}
              onChange={setdata}
              name="branch"
              className="form-control"
              id="exampleInputPassword1"
            /> */}
          </div>
         </div>

          <div className='row m-auto'> 
          <div className='col-12 col-md-6 col-lg-6 col-xl-6'>  
          <NavLink to="/usersdata" className="btn btn-primary ">Back</NavLink>
          
          </div>
          <div className='col-12 col-md-6 col-lg-6 col-xl-6'>  
          <button type="submit" onClick={handlesubmit} className="btn btn-primary end ">
            Submit
          </button>
          </div>
         
          </div>
        
     
    </div>
  )
}
export default EditUser;


