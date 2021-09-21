export interface User {
  message: string;
  username: string;
  email: string;
  full_name: string;
  token: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface UserState {
  data: User;
  loading: boolean;
  error: string;
}
