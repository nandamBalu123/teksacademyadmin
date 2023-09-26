import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
const UserView = () => {
  const [singleUser, setUser] = useState();
ś
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`userview/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();
      setUser(json);
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div style={{ marginTop: "30px" }}>
      {/* <p>{singleUser.fullname}</p>
      <p>{singleUser.email}</p>
      <p>{singleUser.phonenumber}</p>
      <p>{singleUser.designation}</p>
      <p>{singleUser.department}</p>
      <p>{singleUser.reportto}</p>
      <p>{singleUser.profile}</p>
      <p>{singleUser.branch}</p> */}
      <p>irshad</p>
      <p>irshad2</p>
      <p>3321332</p>
      <p>rewfasdf</p>
      <p>gfdsfdasf</pś>
      <p>fsdafs</p>
      <p>fsdfsdf</p>
      <p>fsdfa</p>
    </div>
  );
};

export default UserView;
