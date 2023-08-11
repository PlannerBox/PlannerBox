import { Injectable } from "@nestjs/common";
import { IRolePermissionsRepository } from "../../domain/repositories/rolePermissionsRepository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { RolePermissions } from "../entities/RolePermissions.entity";
import { Repository } from "typeorm";
import Role from "../../domain/models/enums/role.enum";
import Permission from "../../domain/models/enums/permission.type";

@Injectable()
export class RolePermissionsRepository implements IRolePermissionsRepository {
    constructor(
        @InjectRepository(RolePermissions)
        private readonly rolePermissionsRepository: Repository<RolePermissions>
    ) {}

    async updateRolePermissions(role: Role, permissions: Permission[]): Promise<void> {
        await this.rolePermissionsRepository.update(
            { role: role },
            { permissions: permissions }
        );
    }
}