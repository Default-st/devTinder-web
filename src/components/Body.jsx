import React, { useEffect } from "react";
import { NavBar } from "./NavBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";
import { userStore } from "../utils/appStore.js";

export const Body = () => {
  const { addUser, user } = userStore();
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (user) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res.status === 200) {
        addUser(res.data.data);
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
