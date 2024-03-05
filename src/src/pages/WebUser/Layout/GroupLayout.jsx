import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function GroupLayout() {
  return (
    <div>
      <div>
        Setting and Channel1
        <NavLink to="channel/10">General</NavLink>
        <NavLink to="channel/12">ahihi</NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
