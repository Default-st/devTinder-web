import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { requestsStore } from "../utils/appStore";
import { UserCard } from "./UserCard";

export const Requests = () => {
  const { removeRequests, updateRequests, requests } = requestsStore();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      if (res.status === 200) {
        updateRequests(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequests = async (id, status) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        removeRequests(id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-bold text-3xl my-10">
        No new Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connection Requests</h1>
      <div className="flex ">
        {requests?.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection.fromUserId;
          return (
            <div
              key={_id}
              className="flex items-center justify-between m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
            >
              <div className="flex">
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full object-cover"
                    src={photoUrl}
                  />
                </div>
                <div className="text-left mx-4 flex flex-col justify-center">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>

              <div className="space-x-4">
                <button
                  className="btn btn-active btn-success"
                  onClick={() => reviewRequests(_id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-active btn-error"
                  onClick={() => reviewRequests(_id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
