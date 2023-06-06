import { StagiaireM } from '../models/stagiaire';

export interface IStagiaireRepository {
  insert(todo: StagiaireM): Promise<StagiaireM>;
  findAll(): Promise<StagiaireM[]>;
  findById(id: number): Promise<StagiaireM>;
  updateContent(id: number, isDone: boolean): Promise<void>;
  deleteById(id: number): Promise<void>;
}