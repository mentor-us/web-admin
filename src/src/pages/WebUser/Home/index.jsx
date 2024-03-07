import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import "./index.css";

export default function HomeLayout() {
  return (
    <div className="web_layout min-h-full flex flex-row h-svh">
      <div className="web_layout_setting_col max-w-16">
        <SideBar />
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
