/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";

import { TaskSquareIcon } from "assets/svgs";

import TaskService from "service/taskService";
import useMyInfo from "hooks/useMyInfo";
import { TaskStatusObject } from "utils/constants";

import CreateTaskDialog from "../../../TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";

function TaskItem({ task }) {
  const myInfo = useMyInfo();
  const taskData = TaskService.fullfillTaskStatus(task, myInfo.id);
  const [openDialog, setOpenDialog] = useState(false);
  const ownStatus = useMemo(() => {
    if (!taskData.assignees) {
      return "NULL";
    }
    const assignee = taskData.assignees.find((item) => item.id === myInfo.id);
    if (!assignee) {
      return "NULL";
    }
    return assignee.status;
  }, [taskData]);

  return (
    <>
      <Box className="meeting-message-container">
        <Tooltip placement="top" title={!openDialog ? "Xem chi tiết" : null}>
          <Box
            className="bg-white rounded-lg w-[70%] p-4 cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
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
              {ownStatus && ownStatus !== "NULL" && (
                <Button className="!text-sm !bg-[#ebebeb] !rounded-full !text-[#333] !font-medium">
                  {TaskStatusObject[taskData.status].displayName}
                </Button>
              )}
            </Box>
          </Box>
        </Tooltip>
      </Box>
      {openDialog && (
        <CreateTaskDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          taskId={task?.id ?? ""}
        />
      )}
    </>
  );
}

TaskItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  task: PropTypes.object.isRequired
};

export default TaskItem;
