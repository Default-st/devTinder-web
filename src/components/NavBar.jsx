import React from "react";
import { userStore } from "../utils/appStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const NavBar = () => {
  const { user, removeUser } = userStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        console.log(res.data.msg);
        removeUser();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      {user ? (
        <div className="flex gap-2">
          <div className=" dropdown dropdown-end mx-5">
            <div className="flex mx-4 items-center space-x-3">
              <p>Welcome, {user?.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user?.photoUrl} />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  <div className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </div>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};
