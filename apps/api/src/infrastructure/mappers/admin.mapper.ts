import { AdminM } from "../../domain/models/admin";
import { Admin } from "../entities/Admin.entity";
import { AccountMapper } from "./account.mapper";

export class AdminMapper {
    static fromEntityToModel(adminM: Admin): AdminM {
        return {
            adminId: adminM.id,
            ...AccountMapper.fromEntityToModel(adminM.account)
        }
    }
}