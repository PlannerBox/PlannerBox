import { RolePermissions } from "../../infrastructure/entities/RolePermissions.entity";
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
  rolePermissions?: RolePermissions;
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
}
