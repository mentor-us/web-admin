import React from "react";
import { Route, Routes } from "react-router-dom";

import GroupLayout from "../Layout/GroupLayout";

export default function GroupRoutes() {
  return (
    <Routes>
      <Route element={<GroupLayout />}>
        <Route index element={<div>Chose Some channel</div>} />
        <Route path="channel/:channelId" element={<div>Message</div>} />
      </Route>
    </Routes>
  );
}
