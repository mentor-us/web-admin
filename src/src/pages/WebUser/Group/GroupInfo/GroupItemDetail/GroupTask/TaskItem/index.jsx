import React, { useState } from "react"; // Import useState
import { Box } from "@mui/material";
import PropTypes from "prop-types";

import CreateTaskDialog from "pages/WebUser/Group/ChatContainer/TextEditor/EditorToolbar/CreateTaskIconButton/CreateTaskDialog";
import { formatDate, getTime } from "utils/formatDate";

function TaskItem({ meeting: task }) {
  const formateTask = {
    ...task,
    deadlineTimeModel: {
      time: formatDate(task.deadline, "time"),
      date: formatDate(task.deadline, "date"),
      displayName: getTime(task.deadline)
    }
  };
  const [openDialogTask, setOpenDialogTask] = useState(false);

  return (
    <Box className="!px-2 hover:scale-105">
      <Box
        onClick={() => {
          setOpenDialogTask(true);
        }}
        className="w-full max-w-screen-md shadow-md my-1 gap-1  p-3 pt-10 relative hover:cursor-pointer"
      >
        <Box className="bg-orange-500 absolute top-1 right-0 px-2 py-2 ">
          <p className="text-white  text-xs text-center">
            {formateTask?.deadlineTimeModel?.display}
          </p>
        </Box>
        <Box className="absolute top-1 left-0 px-2 py-2 border-l-4 border-orange-500 rounded-r-md">
          <p className="text-orange-500 text-sm font-bold">Công việc</p>
        </Box>
        <p className="text-black text-xl">{formateTask?.title}</p>
        <Box className="flex flex-row justify-between">
          <p className="text-gray-500 text-sm">Nhóm: {formateTask?.channel?.name} </p>
          <p className="text-gray-500 text-sm">Tinh trang </p>
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
  meeting: PropTypes.object.isRequired
};

export default TaskItem;
