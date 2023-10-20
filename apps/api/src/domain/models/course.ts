import { Skill } from "../../infrastructure/entities/Skill.entity";
import EventType from "./enums/eventType.enum";
import { GroupM } from "./group";

export class CourseM {
    id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    type: EventType;
    group: GroupM;
    parent?: CourseM;
    skills: Skill[];
}