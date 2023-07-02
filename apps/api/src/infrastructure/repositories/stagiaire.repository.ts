import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StagiaireM } from '../../domain/models/stagiaire';
import { IStagiaireRepository } from '../../domain/repositories/stagiaireRepository.interface';
import { Stagiaire } from '../entities/stagiaire.entity';

@Injectable()
export class StagiaireRepository implements IStagiaireRepository {
  constructor(
    @InjectRepository(Stagiaire)
    private readonly stagiaireEntityRepository: Repository<Stagiaire>,
  ) {}

  insert(todo: StagiaireM): Promise<StagiaireM> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<StagiaireM[]> {
    const stagiaireEntity = await this.stagiaireEntityRepository.find();
    return stagiaireEntity.map((stagiaireEntity) =>
      this.toStagiaire(stagiaireEntity),
    );
  }

  findById(id: number): Promise<StagiaireM> {
    throw new Error('Method not implemented.');
  }
  updateContent(id: number, isDone: boolean): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private toStagiaire(stagiaireEntity: Stagiaire): StagiaireM {
    const stagiaire: StagiaireM = new StagiaireM();

    stagiaire.id = stagiaireEntity.id;
    stagiaire.firstname = stagiaireEntity.firstname;
    stagiaire.lastname = stagiaireEntity.lastname;
    stagiaire.createdAt = stagiaireEntity.createdAt;

    return stagiaire;
  }

  private toStagiaireEntity(stagiaire: StagiaireM): Stagiaire {
    const stagiaireEntity: Stagiaire = new Stagiaire();

    stagiaireEntity.id = stagiaire.id;
    stagiaireEntity.firstname = stagiaire.firstname;
    stagiaireEntity.lastname = stagiaire.lastname;
    stagiaireEntity.createdAt = stagiaire.createdAt;

    return stagiaireEntity;
  }
}
