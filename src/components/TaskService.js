import api from "../services/api";

export const getTasks = async () => {
  return await api.get("/tasks");
};

export const createTask = async (task) => {
  return await api.post("/tasks", task);
};

export const updateTask = async (id, updatedTask) => {
  return await api.put(`/tasks/${id}`, updatedTask);
};

export const getTasksByDone = async (done) => {
  return await api.get(`/tasks/done?done=${done}`);
};

export const getTasksSortedByDate = async (order) => {
  return await api.get(`/tasks/sorted?order=${order}`);
};
