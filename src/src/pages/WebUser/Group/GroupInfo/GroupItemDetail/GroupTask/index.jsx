import { useParams } from "react-router-dom";
import { Box, Skeleton, Stack } from "@mui/material";

import { useGetChannelTasks } from "hooks/tasks/queries";

import TaskItem from "./TaskItem";

export default function GroupTask() {
  const { channelId } = useParams();
  // const channelId = "65d99d858c91143221a44b99";
  const { data: tasks, isLoading, isSuccess } = useGetChannelTasks(channelId);
  // add sord meeting by date
  if (tasks) {
    tasks.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart));
  }
  return (
    <Box className="border overflow-y-scroll overflow-x-hidden">
      {tasks && tasks.length > 0 ? (
        tasks.map((meeting) => <TaskItem key={meeting.id} meeting={meeting} />)
      ) : (
        <Box>
          {isSuccess && <div className="flex justify-center items-center">Chưa có công việc</div>}
        </Box>
      )}
      {isLoading && (
        <Stack spacing={1}>
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
          <Skeleton variant="rounded" height={90} />
        </Stack>
      )}
    </Box>
  );
}
