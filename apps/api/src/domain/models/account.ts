import Permission from "./enums/permission.type";

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
  permissions: Permission[];
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
}
