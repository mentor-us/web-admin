import AxiosClient from "./AxiosClient";

const TASK_URL = "/api/tasks";

const TaskApi = {
  createTask: (task) => AxiosClient.post(TASK_URL, task)
};

export default TaskApi;
