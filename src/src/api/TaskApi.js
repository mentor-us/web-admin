import AxiosClient from "./AxiosClient";

const TASK_URL = "/api/tasks";

const TaskApi = {
  createTask: (task) => AxiosClient.post(TASK_URL, task),
  getDetailTask: (taskId, params = {}) => AxiosClient.get(`${TASK_URL}/${taskId}`, params),
  getTaskAssignees: (taskId, params = {}) =>
    AxiosClient.get(`${TASK_URL}/${taskId}/assignees`, params),
  updateTask: (task) => AxiosClient.patch(`${TASK_URL}/${task.id}`, task),
  getAllTaskInChannel: (channelId) => AxiosClient.get(`api/channels/${channelId}/tasks`),
  changeStatusTask: (task) => AxiosClient.patch(`${TASK_URL}/${task.id}/${task.status}`)
};

export default TaskApi;
