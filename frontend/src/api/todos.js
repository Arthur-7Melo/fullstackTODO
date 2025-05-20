import API from "./axiosInstance";

export async function fetchTodos(filter ='all') {
  const priorityQuery = filter === 'all' ? '' : `?priority=${filter === 'alta' ? 'alta' : 'baixa'}`;
  
  const res = await API.get(`v1/todos${priorityQuery}`);
  return res.data;
}

export async function createTodo(data) {
  const res = await API.post("/v1/todos", data);
  return res.data;
}

export async function updateTodo(id, data) {
  const res = await API.patch(`/v1/todos/${id}`, data);
  return res.data;
}

export async function deleteTodo(id) {
  const res = await API.delete(`/v1/todos/${id}`);
  return res.data;
}