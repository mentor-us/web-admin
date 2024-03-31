import AxiosClient from "./AxiosClient";

const TASK_URL = "/api/tasks";

const TaskApi = {
  createTask: (task) => AxiosClient.post(TASK_URL, task),
  updateTask: (task) => AxiosClient.patch(`${TASK_URL}/${task.id}`, task)
};

export default TaskApi;
