import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCourse.css";
import { useState } from "react";
import { Update } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useCourseContext } from "../../../../hooks/useCourseContext";
const CreateCourse = () => {
  const { dispatch } = useCourseContext();
  const navigate = useNavigate();
  const [course_name, setcourse] = useState("");
  const [fee, setFee] = useState();
  //   const [description, setDescription] = useState("");
  const [BasicAccess, setBasicAccess] = useState({
    Read: false,
    Update: false,
    Delete: false,
    Create: false,
  });
  
  
  
  let user = localStorage.getItem("user");
  let userObject = JSON.parse(user);
  let username = userObject.fullname;

console.log("username", userObject.fullname)

  // let userFullname;
  // console.log("userFullname", userFullname)
  // if(username){
  //   userFullname = username.fullname;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = {
      course_name,
      fee,
      username
    };
    user = [user];
    const dataWithTitleCase = user.map((item) => {
      const newItem = {};

      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (typeof item[key] === "string" && key !== "email") {
            newItem[key] = item[key]
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          } else {
            newItem[key] = item[key];
          }
        }
      }

      return newItem;
    });
    user = dataWithTitleCase[0];
    console.log("User Data:", user); // Log the user data being sent

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/addcourses`,
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response); 

    const json = await response.json();

    console.log("JSON Response:", json); 

    if (response.ok) {
      console.log("cousre created successfully.", json);

      dispatch({ type: "CREATE_COURSE", payload: json });
      // Reset the form fields
      // setbranch("");
      //   setDescription("");
      navigate("/courses");
    }
    // handleCheckboxChange();
    // console.log(role, description);
    // navigate("/roles");
  };
  return (
    <div className="container mt-3">
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="container createcourse">
            <h5 className="text-center mt-3">Create Course</h5>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6 ">
                <TextField
                  label={<span className="label-family">Course Name</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="coursename"
                  type="text"
                  value={course_name}
                  onChange={(e) => setcourse(e.target.value)}
                />
                <TextField
                  label={<span className="label-family">Fee</span>}
                  className=" mar w-75"
                  variant="standard"
                  name="fee"
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                />
                {/* <input
                  className="form-control"
                  placeholder="Course Name"
                  type="text"
                  value={course_name}
                  onChange={(e) => setcourse(e.target.value)}
                  style={{ padding: "15px" }}
                /> */}
                {/* <TextField id="outlined-search" label="Role Name" type="text" value={role} onChange={(e) => setRoleName(e.target.value)} className="w-100" /> */}
              </div>
              <div className="col-12 col-md-6 col-lg-4 ">
                {/* <input
                  className="form-control"
                  placeholder="Role Description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ padding: "15px" }}
                /> */}
                {/* <TextField id="outlined-search" label="Role Description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-100"  /> */}
              </div>
            </div>
            <div className="container ">
              <button
                type="submit"
                class="btn btn-color my-4 "
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Box>
        {/* <label>Role Description :</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="col-12 col-md-6 col-lg-6"
          />
         */}
      </form>
    </div>
  );
};

export default CreateCourse;
