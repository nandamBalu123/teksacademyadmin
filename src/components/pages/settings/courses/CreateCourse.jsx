import React from "react";
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
  //   const [description, setDescription] = useState("");
  const [BasicAccess, setBasicAccess] = useState({
    Read: false,
    Update: false,
    Delete: false,
    Create: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      course_name,
    };

    console.log("User Data:", user); // Log the user data being sent

    const response = await fetch("http://localhost:3030/addcourses", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response); // Log the response from the server

    const json = await response.json();

    console.log("JSON Response:", json); // Log the parsed JSON response

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
    <div style={{ marginTop: "30px" }}>
      <p className="fs-5 ms-5">Create Course</p>
      <form>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="container createrole">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 ">
                <input
                  className="form-control"
                  placeholder="Course Name"
                  type="text"
                  value={course_name}
                  onChange={(e) => setcourse(e.target.value)}
                  style={{ padding: "15px" }}
                />
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
                class="btn btn-primary my-4 "
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