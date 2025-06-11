import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { feedStore } from "../utils/appStore";
import { UserCard } from "./UserCard";

export const Feed = () => {
  const { addFeed, feed } = feedStore();

  const getFeed = async () => {
    if (feed.length > 0) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + `/user/feed`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        addFeed(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div>
      {feed.length > 0 ? (
        feed?.map((item) => (
          <div className="flex justify-center my-10">
            <UserCard data={item} key={item._id} />
          </div>
        ))
      ) : (
        <h1 className="text-bold text-3xl text-center my-10">
          No new users to show
        </h1>
      )}
    </div>
  );
};
