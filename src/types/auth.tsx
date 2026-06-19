export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
}

export interface RegisterRequest {
    fullName : string;
    email : string;
    mobileNumber : string;
    password : string;
}

export interface RegisterResponse {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  password : string;
}

