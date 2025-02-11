export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm extends LoginForm {
  name: string;
  password_confirmation: string;
}

export interface LoginResponse {
  data?: User;
  error?: string;
  token?: string;
}

export interface RegisterResponse extends LoginResponse {
  message?: string;
}

export interface GetUserResponse {
  data: User;
}
