import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Box, Skeleton, Stack } from "@mui/material";
import { styled } from "@mui/system";

import { useGetChannelTasks } from "hooks/tasks/queries";

import TaskItem from "./TaskItem";

const CustomBottomNavigationAction = styled(BottomNavigationAction)({
  "&.Mui-selected": {
    color: "#1890ff" // Color when selected
  },
  "&:hover": {
    color: "#7ab6ed" // Color on hover
  }
});

export default function GroupTask() {
  const { channelId } = useParams();
  const { data: tasks, isLoading, isSuccess } = useGetChannelTasks(channelId);
  const [tabValue, setTabValue] = useState("now"); // State for selected tab ('now' or 'past')
  // Filter tasks based on tabValue ('now' or 'past')
  const filteredTasks = tasks
    ? tasks.filter((task) => {
        const taskTime = new Date(task?.deadline);
        const now = new Date();
        return tabValue === "now" ? taskTime >= now : taskTime < now;
      })
    : [];

  // Sort filtered tasks by start time (descending)
  filteredTasks.sort((a, b) => new Date(b?.deadline) - new Date(a?.deadline));

  // Determine which message to display when no tasks are available
  const emptyMessage =
    isSuccess && (tabValue === "now" ? "Chưa có công việc mới nào" : "Chưa có công việc");

  return (
    <Box className="border overflow-y-scroll overflow-x-hidden">
      {/* Render Bottom Navigation for 'Now' and 'Past' */}
      <BottomNavigation
        value={tabValue}
        onChange={(event, newValue) => setTabValue(newValue)}
        showLabels
        sx={{ backgroundColor: "transparent", borderBottom: "1px solid #e0e0e0" }}
      >
        <CustomBottomNavigationAction value="now" label="Hiện tại" />
        <CustomBottomNavigationAction value="past" label="Đã qua" />
      </BottomNavigation>

      {/* Render Tasks or Empty Message based on loading state and filtered tasks */}
      {isLoading ? (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
        </Stack>
      ) : (
        <Box>
          {filteredTasks.length > 0
            ? filteredTasks.map(
                // eslint-disable-next-line no-sequences
                (task) => <TaskItem key={task.id} task={task} />
              )
            : isSuccess && (
                <div className="flex justify-center text-base mt-4 items-center">
                  {emptyMessage}
                </div>
              )}
        </Box>
      )}
    </Box>
  );
}
