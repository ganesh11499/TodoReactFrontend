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