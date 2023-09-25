import React, { useEffect, useState } from "react";

import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3030/userdata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data.Result);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ margin: "30px 0px 0px 20px" }}>
      <h2>Users List</h2>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Designation</th>
            <th scope="col">Department</th>
            <th scope="col">Report To</th>
            <th scope="col">Profile</th>
            <th scope="col">Branch</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.phonenumber}</td>
              <td>{user.designation}</td>
              <td>{user.department}</td>
              <td>{user.reportto}</td>
              <td>{user.profile}</td>
              <td>{user.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserData;
