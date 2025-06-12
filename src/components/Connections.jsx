import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { connectionsStore } from "../utils/appStore";
import { UserCard } from "./UserCard";

export const Connections = () => {
  const { updateConnections, connections } = connectionsStore();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      if (res.status === 200) {
        updateConnections(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-bold text-2xl text-center my-10">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>
      <div className="flex flex-col">
        {connections?.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
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
          );
        })}
      </div>
    </div>
  );
};
