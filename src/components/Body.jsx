import React from "react";
import { NavBar } from "./NavBar.jsx";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer.jsx";

export const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
