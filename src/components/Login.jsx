import axios from "axios";
import React, { useState } from "react";
import { userStore } from "../utils/appStore";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon@123");
  const { addUser } = userStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        addUser(res.data.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-10 ">
      <fieldset className="py-5 fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email</label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};
