import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.fullname) {
    errors.fullname = "Required";
  } else if (values.fullname.length > 20) {
    errors.fullname = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phonenum) {
    errors.phonenum = "Required";
  } else if (values.phonenum.length > 9) {
    errors.phonenum = "Must be 10 characters";
  }
  if (!values.designation) {
    errors.designation = "Required";
  } else if (values.designation.length > 20) {
    errors.designation = "Must be 20 characters or less";
  }
  if (!values.department) {
    errors.department = "Required";
  } else if (values.department.length > 20) {
    errors.department = "Must be 20 characters or less";
  }
  if (!values.reportto) {
    errors.reportto = "Required";
  } else if (values.reportto.length > 20) {
    errors.reportto = "Must be 20 characters or less";
  }
  if (!values.profile) {
    errors.profile = "Required";
  } else if (values.profile.length > 20) {
    errors.profile = "Must be 20 characters or less";
  }
  if (!values.branch) {
    errors.branch = "Required";
  } else if (values.branch.length > 20) {
    errors.branch = "Must be 20 characters or less";
  }
  return errors;
};

const CreateUserForm = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phonenum: "",
      designation: "",
      department: "",
      reportto: "",
      profile: "",
      branch: "",
    },
    validate,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log("User Data:", values);
      const response = await fetch("http://localhost:3030/createUser", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response); // Log the response from the server

      const json = await response.json();

      console.log("JSON Response:", json); // Log the parsed JSON response

      if (response.ok) {
        console.log("User created successfully.");
      }
    },
  });
  return (
    <div>
      <h3>Create User Form</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <label htmlFor="fullname" className="col ">
            Full Name
          </label>
          <div className="col">
            <input
              id="fullname"
              name="fullname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullname}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <div>{formik.errors.fullname}</div>
            ) : null}
          </div>

          <label htmlFor="email" className="col">
            email{" "}
          </label>
          <div className="col">
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <label htmlFor="phonenum" className="col">
            phonenum{" "}
          </label>
          <div className="col">
            <input
              id="phonenum"
              name="phonenum"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phonenum}
            />
            {formik.touched.phonenum && formik.errors.phonenum ? (
              <div>{formik.errors.phonenum}</div>
            ) : null}
          </div>

          <label htmlFor="designation" className="col">
            designation{" "}
          </label>
          <div className="col">
            <input
              id="designation"
              name="designation"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.designation}
            />
            {formik.touched.designation && formik.errors.designation ? (
              <div>{formik.errors.designation}</div>
            ) : null}
          </div>
        </div>
        <div className="row">
          <label htmlFor="department" className="col">
            department{" "}
          </label>
          <div className="col">
            <input
              id="department"
              name="department"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.department}
              className="col"
            />
            {formik.touched.department && formik.errors.department ? (
              <div>{formik.errors.department}</div>
            ) : null}
          </div>

          <label htmlFor="reportto" className="col">
            reportto{" "}
          </label>
          <div className="col">
            <input
              id="reportto"
              name="reportto"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reportto}
              className="col"
            />
            {formik.touched.reportto && formik.errors.reportto ? (
              <div>{formik.errors.reportto}</div>
            ) : null}
          </div>
        </div>

        <div className="row">
          <label htmlFor="profile" className="col">
            profile{" "}
          </label>
          <div className="col">
            <input
              id="profile"
              name="profile"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profile}
              className="col"
            />
            {formik.touched.profile && formik.errors.profile ? (
              <div>{formik.errors.profile}</div>
            ) : null}
          </div>

          <label htmlFor="branch" className="col">
            branch{" "}
          </label>
          <div className="col">
            <input
              id="branch"
              name="branch"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch}
              className="col"
            />
            {formik.touched.branch && formik.errors.branch ? (
              <div>{formik.errors.branch}</div>
            ) : null}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default CreateUserForm;
