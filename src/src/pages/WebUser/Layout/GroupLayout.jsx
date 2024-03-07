import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import GroupHeader from "../Group/GroupHeader";

export default function GroupLayout() {
  return (
    <div className="flex flex-row h-full">
      <div className="flex flex-col w-80 h-full bg-slate-100">
        <div className="h-16 bg-white">
          <GroupHeader />
        </div>
        <hr />
        <div className="flex flex-col pt-2">
          <NavLink to="channel/10">General</NavLink>
          <NavLink to="channel/12">ahihi</NavLink>
        </div>
      </div>
      <div className="grow h-full ">
        <Outlet />
      </div>
    </div>
  );
}
