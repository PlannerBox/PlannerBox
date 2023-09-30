import { Skill } from "../../infrastructure/entities/Skill.entity";
import { GroupM } from "./group";

export class CourseM {
    id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    group: GroupM;
    skills: Skill[];
}