import React, { useState } from "react"; // Import useState
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import TaskService from "service/taskService";
import { TaskStatusObject } from "utils/constants";

function TaskItem({ task }) {
  const formateTask = TaskService.formatTask(task);
  const [openDialogTask, setOpenDialogTask] = useState(false);

  return (
    <Box className="!px-2 ">
      <Box
        onClick={() => {
          setOpenDialogTask(true);
        }}
        className="w-full max-w-screen-md hover:!shadow-lg !border-solid border-2 my-0.5 gap-1 rounded-xl p-2 pt-10 relative hover:cursor-pointer"
      >
        <Box className="bg-orange-500  absolute top-0 right-0 px-2 py-2 rounded-tr-xl rounded-bl-xl">
          <p className="text-white text-sm font-bold">Công việc</p>
        </Box>
        <Box className="absolute top-1 left-0 px-2 py-2  rounded-r-md">
          <p className="text-black text-base">{formateTask?.title}</p>
        </Box>
        <Box className="flex flex-row justify-between">
          <p className="text-gray-500 text-sm">{formateTask?.deadlineTimeModel?.displayName}</p>
          <p className="text-gray-500 text-sm">
            {TaskStatusObject[formateTask.status]?.displayName}
          </p>
        </Box>
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
