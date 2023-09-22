import React from "react";
import "./CreateUserForm.css";
const CreateUserForm = () => {
  return (
    <div className="main-user-container">
      <h3>User Creation Form</h3>
      <div className="sub-user-container">
        <form>
          <div className="row">
            <label className="mar col-md-2">Full Name:</label>
            <input className="mar col-md-3" type="text" />
            <label className="mar col-md-2">Email ID:</label>
            <input className="mar col-md-4" type="email" />
          </div>
          <div className="row">
            <label className="mar col-md-2">Phone Number :</label>
            <input className="mar col-md-3" type="number" />
            <label className="mar col-md-2">Designation :</label>
            <input className="mar col-md-4" />
          </div>
          <div className="row">
            <label className="mar col-md-2">Department:</label>
            <input className="mar col-md-3" type="text" />
            <label className="mar col-md-2">Report to :</label>
            <input className="mar col-md-4" type="text" />
          </div>
          <div className="row">
            <label className="mar col-md-2">Profile :</label>
            <input className="mar col-md-3" type="text" />
            <label className="mar col-md-2">Branch :</label>
            <select className="mar col-md-4" id="branch" name="branch">
              <option value="">--select--</option>
              <option value="hitechcity">Hitech City</option>
              <option value="ameerpet">Ameerpet</option>
              <option value="kukatpally">Kukatpally</option>
              <option value="secundrabad">Secundrabad</option>
              <option value="dilshuknagar">Dilshuknagar</option>
            </select>
          </div>
          <div className="create-button">
            <button type="button" class="btn btn-primary mt-5">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
