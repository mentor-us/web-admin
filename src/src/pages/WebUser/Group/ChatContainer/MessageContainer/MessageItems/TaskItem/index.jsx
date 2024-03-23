/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { TaskSquareIcon } from "assets/svgs";

import TaskService from "service/taskService";
import useMyInfo from "hooks/useMyInfo";
import { TaskStatusObject } from "utils/constants";

function TaskItem({ task }) {
  const myInfo = useMyInfo();
  const taskData = TaskService.fullfillTaskStatus(task, myInfo.id);

  return (
    <Box className="meeting-message-container ">
      <Box className="bg-white rounded-lg w-[70%] p-4">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          gap={1}
        >
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <TaskSquareIcon width={22} height={22} />
            <Typography className="text-[#F05B51] !font-bold !text-base">Công việc</Typography>
          </Box>
          <Typography className="!font-bold !text-xl !text-[#333] line-clamp-2">
            {taskData.title}
          </Typography>
          <Typography className="!text-lg !text-[#888] line-clamp-2">
            Tới hạn {taskData.deadlineTimeModel.time}, ngày {taskData.deadlineTimeModel.date}
          </Typography>
          <Button className="!text-sm !bg-[#ebebeb] !rounded-full !text-[#333] !font-medium">
            {TaskStatusObject[taskData.status].displayName}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

TaskItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  task: PropTypes.object.isRequired
};

export default TaskItem;
