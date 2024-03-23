import { formatDate, getTime } from "utils";

const TaskService = {
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
