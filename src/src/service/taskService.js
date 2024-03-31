import { formatDate, getTime } from "utils";
import TaskApi from "api/TaskApi";

const TaskService = {
  createTask: (task) => TaskApi.createTask(task),
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
  }
};

export default TaskService;
