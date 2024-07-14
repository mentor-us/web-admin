/* eslint-disable no-unused-vars */
import React, { useState } from "react"; // Import useState
import { Box, Stack } from "@mui/material";
import PropTypes from "prop-types";

import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import TooltipCustom from "components/Tooltip";
import TaskService from "service/taskService";
import { TaskStatusObject } from "utils/constants";

function TaskItem({ task }) {
  const formateTask = TaskService.formatTask(task);
  const [openDialogTask, setOpenDialogTask] = useState(false);

  return (
    <Box className="">
      <Box
        onClick={() => {
          setOpenDialogTask(true);
        }}
        className="w-full hover:!shadow-lg !border-solid border-2 my-0.5 gap-1 rounded-xl hover:cursor-pointer pb-2 mb-2"
      >
        <Stack direction="row" gap={1}>
          <TooltipCustom title={formateTask?.title}>
            <Box className="pl-2 mt-2 !text-black !text-base !line-clamp-1 !flex-1">
              <span className="mt-2">{formateTask?.title}</span>
            </Box>
          </TooltipCustom>
          <Box className="bg-orange-500 rounded-tr-xl rounded-bl-xl px-2">
            <span className="!text-white !text-xs !text-center">Công việc</span>
          </Box>
        </Stack>
        <Stack direction="row" gap={1} className="mt-2">
          <TooltipCustom title={`Ngày tới hạn: ${formateTask?.deadlineTimeModel?.displayName}`}>
            <Box className="!flex-1 !line-clamp-1">
              <p className="pl-2 text-gray-500 text-sm">
                {formateTask?.deadlineTimeModel?.displayName}
              </p>
            </Box>
          </TooltipCustom>
          <Box className={`pr-2 !text-[${TaskStatusObject[formateTask.status]?.color}]`}>
            <span
              className={` !text-sm`}
              style={{
                color: TaskStatusObject[formateTask.status]?.color
              }}
            >
              {TaskStatusObject[formateTask.status]?.displayName}
            </span>
          </Box>
        </Stack>
      </Box>
      {openDialogTask && (
        <CreateTaskDialog
          open={openDialogTask}
          handleClose={() => setOpenDialogTask(false)}
          taskId={formateTask.id} // I assume msgIdDialog is defined somewhere
        />
      )}
    </Box>
  );
}

TaskItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  task: PropTypes.object.isRequired
};

export default TaskItem;
