import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import GroupHeader from "../Group/GroupHeader";

export default function GroupLayout() {
  const [showLayout, setShowLayout] = useState(true);
  const toggleGroupDetail = () => {
    setShowLayout((pre) => !pre);
  };
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
        <Outlet context={[showLayout, toggleGroupDetail]} />
      </div>
      {showLayout && <div className="w-80 h-full bg-slate-100">Layout</div>}
    </div>
  );
}
