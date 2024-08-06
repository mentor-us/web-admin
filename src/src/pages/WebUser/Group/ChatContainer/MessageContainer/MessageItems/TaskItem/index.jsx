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
            className="bg-white rounded-lg !min-w-[70%] !max-w-[70%] p-4 cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            <Box display="flex" justifyContent="center" flexDirection="column" gap={1}>
              <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                <TaskSquareIcon width={22} height={22} />
                <Typography className="text-[#F05B51] !font-bold !text-lg">Công việc</Typography>
              </Box>
              <Box className="text-center break-words !max-w-[70%] self-center">
                <Typography className="!font-bold !text-base !text-[#333] !line-clamp-1">
                  <Tooltip title={taskData.title}>{taskData.title}</Tooltip>
                </Typography>
              </Box>
              <Typography className="!text-sm !text-[#888] !line-clamp-1 self-center">
                Tới hạn {taskData.deadlineTimeModel.time}, ngày {taskData.deadlineTimeModel.date}
              </Typography>

              {ownStatus && ownStatus !== "NULL" && (
                <Box className="self-center">
                  <Button className="!text-sx !bg-[#ebebeb] !rounded-full !text-[#333] !font-medium">
                    {TaskStatusObject[taskData.status].displayName}
                  </Button>
                </Box>
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
