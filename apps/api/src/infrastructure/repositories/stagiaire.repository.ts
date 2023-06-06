import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StagiaireM } from "src/domain/models/stagiaire";
import { IStagiaireRepository } from "src/domain/repositories/stagiaireRepository.interface";
import { Stagiaire } from "../entities/stagiaire.entity";
import { Repository } from "typeorm";

@Injectable()
export class StagiaireRepository implements IStagiaireRepository {

    constructor(
        @InjectRepository(Stagiaire)
        private readonly stagiaireEntityRepository: Repository<Stagiaire>,
      ) {}
      
    insert(todo: StagiaireM): Promise<StagiaireM> {
        throw new Error("Method not implemented.");
    }
    
    async findAll(): Promise<StagiaireM[]> {
        const stagiaireEntity = await this.stagiaireEntityRepository.find();
        return stagiaireEntity.map((stagiaireEntity) => this.toStagiaire(stagiaireEntity));
    }

    findById(id: number): Promise<StagiaireM> {
        throw new Error("Method not implemented.");
    }
    updateContent(id: number, isDone: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
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