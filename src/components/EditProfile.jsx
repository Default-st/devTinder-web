import React, { useState } from "react";
import { UserCard } from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { userStore } from "../utils/appStore";

export const EditProfile = ({ data }) => {
  const { addUser } = userStore();
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [photoUrl, setPhotoUrl] = useState(data?.photoUrl);
  const [age, setAge] = useState(data?.age);
  const [gender, setGender] = useState(data?.gender);
  const [about, setAbout] = useState(data?.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        addUser(res.data.data);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };
  return (
    <div className="flex justify-center gap-6 my-10 ">
      <div className="flex justify-center ">
        <fieldset className="py-5 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h2 className="flex justify-center text-xl">Edit Profile</h2>
          <label className="label">FirstName</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input"
            placeholder="FirstName"
          />
          <label className="label">LastName</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input"
            placeholder="LastName"
          />{" "}
          <label className="label">Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input"
            placeholder="Photo URL"
          />
          <label className="label">Age</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input"
            placeholder="Age"
          />
          <label className="label">Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input"
            placeholder="Gender"
          />
          <label className="label">About</label>
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="input"
            placeholder="About"
          />
          {error ? <p className="text-red-500 mt-2"> {error}</p> : null}
          <button className="btn btn-primary mt-2" onClick={saveProfile}>
            Save
          </button>
        </fieldset>
      </div>
      <UserCard data={{ firstName, lastName, photoUrl, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};
