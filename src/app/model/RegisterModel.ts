export class RegisterModel {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Name: string;
  Surname: string;
  Username: string;

  constructor(email: string, password: string, confPassword: string, name: string, surname: string, username: string) {
    this.Name = name;
    this.Surname = surname;
    this.Password = password;
    this.ConfirmPassword = confPassword;
    this.Email = email;
    this.Username = username;
  }
}
