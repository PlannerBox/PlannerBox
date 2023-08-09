import Permission from "./enums/permission.type";
import Role from "./enums/role.enum";

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
  role: Role;
  permissions: Permission[];
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
}
