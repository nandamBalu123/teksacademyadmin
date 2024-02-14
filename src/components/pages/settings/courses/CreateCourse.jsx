import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCourse.css";
import { useState } from "react";
import { Update } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useCoursePackageContext } from "../../../../hooks/useCoursePackageContext";
import { useCourseContext } from "../../../../hooks/useCourseContext";
import { useParams } from "react-router-dom";
import axios from "axios";
const CreateCourse = () => {
  const { courseId } = useParams();

  const { dispatch } = useCourseContext();
  const { coursepackages } = useCoursePackageContext();
  const navigate = useNavigate();
  let [formData, setFormData] = useState({
    course_name: "", course_package: "", fee: 0, max_discount: 0, date: new Date(),
  })
  useEffect(() => {
    if (courseId) {
      // Fetch course details for editing
      axios.get(`${process.env.REACT_APP_API_URL}/getcourse/${courseId}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [courseId]);
  useEffect(() => {
    console.log("formData", formData)
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((e) => ({ ...e, [name]: value }))
  }
  useEffect(() => { console.log("formadat", formData) })
  let [user, setUser] = useState()
  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = localStorage.getItem("user");

    // Check if user is present before setting it in the state
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  useEffect(() => {
    if (user) {
      let userObject = JSON.parse(user);
      let created_by = userObject.fullname;
      setFormData((e) => ({ ...e, createdby: created_by }))

    }
  }, [user])

  useEffect(() => {

  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();

    formData = [formData];
    const dataWithTitleCase = formData.map((item) => {
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
    formData = dataWithTitleCase[0];
    console.log("formData Data:", formData); // Log the user data being sent
    // const apiEndpoint = courseId ? `/updatecourse/${courseId}` : "/addcourses";

    // axios.post(apiEndpoint, formData)
    //   .then(response => {
    //     onSubmit(response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error submitting course form:", error);
    //   });
    let response
    if (!courseId) {
      response = await fetch(
        `${process.env.REACT_APP_API_URL}/addcourses`,
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    if (courseId) {
      response = await fetch(
        `${process.env.REACT_APP_API_URL}/updatecourse/${courseId}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Response:", response);

    const json = await response.json();

    console.log("JSON Response:", json);

    if (response.ok) {
      console.log("cousre created successfully.", json);
      if (!courseId) {
        json.reqBody.id = json.Result.insertId
        dispatch({ type: "CREATE_COURSE", payload: json.reqBody });
      }
      if (courseId) {
        let updateContext = {
          updatedData: formData, id: (courseId)
        }
        dispatch({
          type: "EDIT_COURSE",
          payload: updateContext,
        });
      }
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
      <button onClick={() => navigate(-1)} className="btn btn-color btn-sm ">Go Back</button>
      <form>

        <div className="container createcourse">
          <h5 className="text-center mt-3">Create Course</h5>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6 ">
              <TextField
                label={<span className="label-family">Course Name</span>}
                className=" mar w-75"
                variant="standard"
                name="course_name"
                type="text"
                value={formData.course_name}
                onChange={handleChange}
              /></div>
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 ">
              <FormControl variant="standard" className="w-75">
                <InputLabel>
                  <span className="label-family">
                    Course Package<span>*</span>
                  </span>
                </InputLabel>
                <Select
                  id="coursepackage"
                  name="course_package"
                  required
                  onChange={handleChange}
                  value={formData.course_package}
                >
                  <MenuItem value="select"> ---select---</MenuItem>
                  {coursepackages &&
                    coursepackages.map((item, index) => (
                      <MenuItem
                        key={item.id}
                        value={item.coursepackages_name}
                      >
                        {item.coursepackages_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>

          </div>
          <div className="row">
            <div className="col-12 col-md-6">

              <TextField
                label={<span className="label-family">Fee</span>}
                className=" mar w-75"
                variant="standard"
                name="fee"
                type="number"
                value={formData.fee}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">

              <TextField
                label={<span className="label-family">Max-Discount</span>}
                className=" mar w-75"
                variant="standard"
                name="max_discount"
                type="number"
                value={formData.max_discount}
                onChange={handleChange}
              />
            </div>

          </div>
          <div className="text-end">
            <button
              type="submit"
              class="btn btn-color my-4 mx-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>


      </form>
    </div>
  );
};

export default CreateCourse;
