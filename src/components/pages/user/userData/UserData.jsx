import React, { useEffect, useState } from "react";

import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
const UserData = () => {
  // const [users, setUsers] = useState([]);
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/userdata/users", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERS", payload: json });
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [dispatch, user]);
  // axios
  //   .get("/api/users")
  //   .then((users) => setUsers(users.data))
  //   .catch((err) => console.log(err));

  return (
    <div style={{ margin: "30px 0px 0px 20px" }}>
      <h2>Users List</h2>
      <table class="table">
        <thead class="table-dark">
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
          {users &&
            users.map((user) => (
              <tr>
                <th scope="row"></th>
                <td>{user.fullname}</td>
                <td>{users.email}</td>
                <td>{users.phonenum}</td>
                <td>{users.designation}</td>
                <td>{users.department}</td>
                <td>{users.reportto}</td>
                <td>{users.profile}</td>
                <td>{users.branch}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
