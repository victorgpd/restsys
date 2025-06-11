export interface IUser {
  uid?: string;
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
  balance: number;
  pixKeys: string[];
  proprietary: IUser;
  numberAccount: string;

  creditCard: {
    cvv: string;
    limit: number;
    number: string;
    expirationDate: string;
  } | null;
}
