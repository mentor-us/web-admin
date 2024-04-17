import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import SocketService from "service/socketService";

import SideBar from "./SideBar";
import "./index.css";

export default function HomeLayout() {
  useEffect(() => {
    SocketService.connect();
    return () => {
      SocketService.disconnect();
    };
  }, []);

  return (
    <Box className="min-h-full w-full h-svh max-h-svh flex flex-row flex-grow overflow-hidden">
      <Grid container wrap="nowrap" spacing={0}>
        <Grid item className="!max-w-16 h-full" xs="auto">
          <SideBar />
        </Grid>
        <Grid item xs className="h-full">
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
