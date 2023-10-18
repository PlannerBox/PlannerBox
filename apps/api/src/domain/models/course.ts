import { Skill } from "../../infrastructure/entities/Skill.entity";
import CourseType from "./enums/courseType.enum";
import { GroupM } from "./group";

export class CourseM {
    id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    type: CourseType;
    group: GroupM;
    skills: Skill[];
}