import { RolePermissions } from "../../infrastructure/entities/RolePermissions.entity";
import { FormationMode } from "./enums/formationMode.enum";
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
  rolePermissions?: RolePermissions;
}

export class AccountM extends AccountWithoutPassword {
  password?: string;
  formationMode?: FormationMode;
}