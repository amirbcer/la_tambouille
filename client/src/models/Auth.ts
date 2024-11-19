export interface LoginParams {
  email_address: string;
  password: string;
}

export interface RegisterParams extends LoginParams {
  password_confirmation: string;
  name: string;
}
