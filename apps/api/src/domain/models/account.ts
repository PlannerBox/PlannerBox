export class AccountWithoutPassword {
  id?: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  birthPlace: string;
  lastLogin?: Date;
  hashRefreshToken?: string;
  active: boolean;
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
}
