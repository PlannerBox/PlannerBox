import { StagiaireM } from '../../domain/models/stagiaire';
import { IStagiaireRepository } from '../../domain/repositories/stagiaireRepository.interface';

export class GetStagiairesUseCases {
  constructor(private readonly stagiaireRepository: IStagiaireRepository) {}

  async execute(): Promise<StagiaireM[]> {
    return await this.stagiaireRepository.findAll();
  }
}