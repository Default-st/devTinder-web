import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { feedStore } from "../utils/appStore";

export const UserCard = ({ data }) => {
  const { removeFromFeed } = feedStore();
  const { _id, firstName, lastName, photoUrl, about, age, gender } = data;
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        removeFromFeed(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 shadow-sm w-96">
        <figure>
          <img src={photoUrl} alt="User Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {age && <span>{age}</span>}
            {gender && <span> {gender}</span>}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>{" "}
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
