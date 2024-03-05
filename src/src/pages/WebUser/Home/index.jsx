import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./index.css";

export default function HomeLayout() {
  return (
    <div className="web_layout">
      <div className="web_layout_setting_col">
        Avatar
        <NavLink to="group/1">Mentee</NavLink>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}
