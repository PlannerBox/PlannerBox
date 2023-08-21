import Role from "../../../domain/models/enums/role.enum";
import UsersPermissions from "../../../domain/models/enums/usersPermissions.enum";

export class RolesPermissionsDto {
    readonly role: Role;
    readonly permissions: UsersPermissions[];
}