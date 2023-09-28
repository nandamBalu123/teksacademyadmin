import React, { useEffect, useState } from "react";

import { useUsersContext } from "../../../../hooks/useUsersContext";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
const UsersData = () => {
  const navigate = useNavigate();
  const { users, dispatch } = useUsersContext();
  const { user } = useAuthContext();
  

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:3030/deleteasset/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      // setDLTdata(deletedata)
      // getdata();
    }
  };
  // const handleDelete = async () => {
  //   if (!user) {
  //     return;
  //   }
  //   const response = await fetch("http://localhost:3030/userdata/delete" + user._id, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "DELETE_USER", payload: json });
  //   }
  // };
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const response = await fetch("/userdata/users", {
  //         headers: { Authorization: `Bearer ${user.token}` },
  //       });
  //       const json = await response.json();

  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3030/userdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
      console.log(userData)
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
  const handleedit = () => {
    navigate("/edit");
  };
  const handleview = () => {
    navigate("/userview");
  };
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
    
          {userData &&
            userData.map((user) => (
              <tr>
                
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phonenumber}</td>
                <td>{user.designation}</td>
                <td>{user.department}</td>
                <td>{user.reportto}</td>
                <td>{user.profile}</td>
                <td>{user.branch}</td>
                <td>
                <button onClick={handleview}>View</button>
              <button onClick={handleedit}>Edit</button>

              <button onClick={() => deleteuser(user.id)}>Delete</button>
              </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersData;
