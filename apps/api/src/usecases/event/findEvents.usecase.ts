import { PaginateQuery } from "nestjs-paginate";
import { ICourseRepository } from "../../domain/repositories/courseRepository.interface";

export class FindEventsUseCase {
    constructor(
        private readonly courseRepository: ICourseRepository,
    ) {}

    async findEvents(query: PaginateQuery): Promise<any> {
        return await this.courseRepository.findEvents(query);
    }
}