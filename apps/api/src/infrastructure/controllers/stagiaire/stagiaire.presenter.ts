import { ApiProperty } from '@nestjs/swagger';
import { StagiaireM } from '../../../domain/models/stagiaire';

export class StagiairePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  createdAt: Date;

  constructor(stagiaire: StagiaireM) {
    this.id = stagiaire.id;
    this.firstName = stagiaire.firstname,
    this.lastName = stagiaire.lastname,
    this.createdAt = stagiaire.createdAt
  }
}