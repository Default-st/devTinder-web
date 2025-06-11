import React from "react";
import { userStore } from "../utils/appStore";
import { EditProfile } from "./EditProfile";

export const Profile = () => {
  const { user } = userStore();
  return (
    user && (
      <div>
        <EditProfile data={user} />
      </div>
    )
  );
};
