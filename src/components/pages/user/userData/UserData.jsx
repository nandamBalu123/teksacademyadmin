import React, { useEffect, useState } from "react";

const UserData = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      setUsers(json);
    };
    fetchWorkouts();
    // axios
    //   .get("/api/users")
    //   .then((users) => setUsers(users.data))
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      UserData
      <div>{users}</div>
    </div>
  );
};

export default UserData;
