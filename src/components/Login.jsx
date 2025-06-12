import axios from "axios";
import React, { useState } from "react";
import { userStore } from "../utils/appStore";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("Password@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
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
      setError(error?.response?.data?.msg);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        addUser(res.data.data);
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.msg);
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
        {!isLoginForm ? (
          <>
            {" "}
            <label className="label">First Name</label>{" "}
            <input
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="FirstName"
            />
            <label className="label">Last Name</label>
            <input
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="LastName"
            />
          </>
        ) : null}
        {error ? <p className="text-red-500 mt-2"> {error}</p> : null}
        <button
          className="btn btn-primary mt-2"
          onClick={isLoginForm ? handleLogin : handleSignUp}
        >
          {isLoginForm ? "Login" : "SignUp"}
        </button>{" "}
        <button
          className="text-blue-300 mt-2 cursor-pointer hover:underline"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New User ? Signup Here"
            : "Existing User ? Login Here"}
        </button>
      </fieldset>
    </div>
  );
};
