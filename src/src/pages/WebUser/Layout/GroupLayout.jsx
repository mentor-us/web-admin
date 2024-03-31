/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams } from "react-router";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

import { useGetWorkSpace } from "hooks/groups/queries";

import GroupInfo from "../Group/GroupInfo";

// import MessageContainer from "../Group/MessageContainer";
import GroupSidebar from "./components/GroupSidebar";

export default function GroupLayout() {
  const [showLayout, setShowLayout] = useState(true);
  const toggleGroupDetail = () => {
    setShowLayout((pre) => !pre);
  };

  const { groupId, channelId } = useParams();
  const { data: workspace, isLoading } = useGetWorkSpace(groupId);

  return (
    <Grid container wrap="nowrap" spacing={0} height="100%">
      <Grid item xs="auto" className="min-w-80 max-w-80 !h-full bg-white border-r-2">
        <GroupSidebar workspace={workspace} isLoading={isLoading} />
      </Grid>
      <Grid item xs className="!h-full !max-w-full !min-h-full">
        <Outlet context={[showLayout, toggleGroupDetail]} />
      </Grid>
      {channelId && showLayout && (
        <Grid item xs="auto" className="min-w-78 max-w-78 w-78 h-full bg-slate-100 border-l-2">
          <GroupInfo />
        </Grid>
      )}
    </Grid>
  );
}
