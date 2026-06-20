import api from "../api/axios";
import type { TodoRequest, TodoResponse } from "../types/todo";

export const saveTodo = async (
  payload: TodoRequest
): Promise<TodoResponse> => {
  const response = await api.post<TodoResponse>(
    "/todos",
    payload
  );

  return response.data;
};

export const getTodoList = async (
  page : number,
  size : number,
  status? : string
) =>{
  return api.get(`/todos?page=${page}&size=${size}&status=${status}`)
}

export const getTodo = async (
 taskId : number
) => {
  return api.get(`/todos/${taskId}`);
}


export const updateTodo = async (
  taskId : number,
  payload: TodoRequest
): Promise<TodoResponse> => {
  const response = await api.put<TodoResponse>(
    `/todos/${taskId}`,
    payload
  );

  return response.data;
};

export const deleteTodo = async (
  taskId : number,
) => {
  const response = await api.delete<TodoResponse>(
    `/todos/${taskId}`,
  );

  return response.data;
};