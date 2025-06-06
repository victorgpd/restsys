export interface IUser {
  cpf: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAccount {
  bank: string;
  agency: string;
  number: string;
  balance: number;
  pixKeys: string[];
  proprietary: IUser;

  creditCard: {
    cvv: string;
    limit: number;
    number: string;
    expirationDate: string;
  };

  createdAt: string;
  updatedAt: string;
}
