import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminM } from "../../domain/models/admin";
import { IAdminRepository } from "../../domain/repositories/adminRepository.interface";
import { Repository } from "typeorm";
import { Admin } from "../entities/Admin.entity";

@Injectable()
export class AdminRepository implements IAdminRepository {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>
    ) {}
    
    async findOne(username: string): Promise<AdminM> {
        const adminAccountEntity =  await this.adminRepository.findOne({
            where: {
                account: {
                    username: username
                }
            }
        });

        if (!adminAccountEntity) {
            return null;
        }

        return this.toAdmin(adminAccountEntity);
    }

    private toAdmin(adminAccountEntity: Admin): AdminM {
        const adminAccount: AdminM = {
            id: adminAccountEntity.id,
            username: adminAccountEntity.account.username,
            password: adminAccountEntity.account.password,
            firstname: adminAccountEntity.account.firstname,
            lastname: adminAccountEntity.account.lastname,
            birthDate: adminAccountEntity.account.birthDate,
            birthPlace: adminAccountEntity.account.birthPlace,
            active: adminAccountEntity.account.active,
            role: adminAccountEntity.account.role,
            permissions: adminAccountEntity.account.permissions,
        };

        return adminAccount;
    }
}