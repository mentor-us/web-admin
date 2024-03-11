import React from "react";
import { Route, Routes } from "react-router-dom";

import MessageContainer from "../Group/MessageContainer";
import WelcomeGroup from "../Group/WelcomeGroup";
import GroupLayout from "../Layout/GroupLayout";

export default function GroupRoutes() {
  return (
    <Routes>
      <Route element={<GroupLayout />}>
        <Route index element={<WelcomeGroup />} />
        <Route path="channel/:channelId" element={<MessageContainer />} />
      </Route>
    </Routes>
  );
}
