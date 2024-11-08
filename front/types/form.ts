export interface UserForm {
  name: string;
  email: string;
}

export interface PasswordForm {
  current: string;
  new_pass: string;
  new_pass_confirmation: string;
}
