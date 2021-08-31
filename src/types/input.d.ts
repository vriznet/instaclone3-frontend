export interface loginInputs {
  username: string;
  password: string;
}

export interface signUpInputs extends loginInputs {
  email: string;
  firstName: string;
  lastName: string;
}
