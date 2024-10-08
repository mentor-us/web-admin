import { formatDate, getTime } from "utils";
import TaskApi from "api/TaskApi";

const TaskService = {
  createTask: (task) => TaskApi.createTask(task),
  updateTask: (task) => TaskApi.updateTask(task),
  fullfillTaskStatus: (task, currentUserId) => {
    const ownAssignee = task.assignees.find((assignee) => assignee.id === currentUserId);
    return {
      ...task,
      deadlineTimeModel: {
        time: formatDate(task?.deadline || "", "time"),
        date: formatDate(task?.deadline || "", "date"),
        displayName: getTime(task?.deadline || "")
      },
      status: !ownAssignee ? "NULL" : ownAssignee.status
    };
  },
  getAllTaskInChannel: (channelId) => TaskApi.getAllTaskInChannel(channelId),
  formatTask: (task) => {
    return {
      ...task,
      deadlineTimeModel: {
        time: formatDate(task?.deadline, "time"),
        date: formatDate(task?.deadline, "date"),
        displayName: getTime(task?.deadline)
      }
    };
  },
  changeStatusTask: (task) => TaskApi.changeStatusTask(task)
};

export default TaskService;
