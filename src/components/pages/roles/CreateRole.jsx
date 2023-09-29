import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRole.css";
import { useState } from "react";
import { Update } from "@mui/icons-material";
const CreateRole = () => {
  const navigate = useNavigate();
  const [role, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [BasicAccess, setBasicAccess] = useState({
    Read: false,
    Update: false,
    Delete: false,
    Create: false,
  });
  // const handleCheckboxChange = async (event) => {
  //   const name = event.target.name;

  //   // Step 4: Update the state with the new checkbox value
  //   setBasicAccess({
  //     ...BasicAccess,
  //     [name]: !BasicAccess.name,
  //   });
  //   console.log(BasicAccess);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      role,
      description
      
    };

    console.log("User Data:", user); // Log the user data being sent

    const response = await fetch("http://localhost:3030/userroles", {
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
      console.log("User created successfully.");

      // Reset the form fields
      setRoleName("");
      setDescription("");
      
    }
  
  
   
    // handleCheckboxChange();
    console.log(role, description);
    navigate("/roles");
  };

  

  return (
    <div style={{ marginTop: "30px" }}>
      <p>CreateRole</p>
      <form>
        <div>
          <label>Role Name:</label>
          <input
            type="text"
            onChange={(e) => setRoleName(e.target.value)}
            value={role}
          />
        </div>
        <div>
          <label>Role Description :</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>
      <div>
        <div>
          <h2>Module & Object Permissions</h2>
        </div>
        <div>
          <table class="table" border="1">
            <thead border="1">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Basic Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <tr>
                    <th>Read</th>
                    <th>Update</th>
                    <th>Delete</th>
                    <th>Create</th>
                  </tr>
                </td>
              </tr>
              <tr>
                <td>Student</td>
                <td>
                  <tr>
                    <div style={{ display: "flex" }}>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Read"
                          value={BasicAccess.Read}
                          checked={BasicAccess.Read}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Update"
                          value={BasicAccess.Update}
                          checked={BasicAccess.Update}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Delete"
                          value={BasicAccess.Delete}
                          checked={BasicAccess.Delete}
                          // onChange={(event) => handleCheckboxChange}
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          name="Create"
                          value={BasicAccess.Create}
                          checked={BasicAccess.Create}
                          // onChange={(event) => handleCheckboxChange(event)}
                        />
                      </div>
                    </div>
                  </tr>
                </td>
              </tr>
              {/* <tr>
                <td>employee</td>
                <td>
                  <tr>
                    <div style={{ display: "flex" }}>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(read)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(update)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(update)"
                        />
                      </div>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          value="employee Basic Access(delete)"
                        />
                      </div>
                    </div>
                  </tr>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
