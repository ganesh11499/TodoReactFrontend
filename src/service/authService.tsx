import api from "../api/axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../types/auth";


export const loginUser = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return response.data;
};

export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/auth/register",
    payload
  );

  return response.data;
};