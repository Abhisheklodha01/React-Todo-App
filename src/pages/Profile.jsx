import React, { useContext } from "react";
import { Context } from "../main";
import Loading from "../components/Loading";

const Profile = () => {
  const { isAuthenticated, loader, user } = useContext(Context);

  return isAuthenticated ? (
    loader ? (
      <Loading />
    ) : (
      <div className="abhi">
        <h1>Welcome {user.name}</h1>
        <p>Email: {user.email}</p>
      </div>
    )
  ) : (
    <p className="paragraph">Please Login to see your Profile</p>
  );
};

export default Profile;
