import { MedicationAccessDataSource } from "../../data/interfaces/medication-access-data-source";
import { Medication } from "../entities/medication";
import { MedicationAccess } from "../entities/medication_access";
import { MedicationAccessRepository } from "../interfaces/repositories/medication-access-repository";
import { MedicationRepository } from "../interfaces/repositories/medication-repository";

export class MedicationAccessRepositoryImpl
  implements MedicationAccessRepository
{
  private readonly accessDataSource: MedicationAccessDataSource;
  constructor(accessDataSource: MedicationAccessDataSource) {
    this.accessDataSource = accessDataSource;
  }

  async create(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.accessDataSource.create(user_id, access);
    return result;
  }

  async update(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.accessDataSource.update(user_id, access);
    return result;
  }

  async getAll(user_id: string): Promise<MedicationAccess[]> {
    const result = await this.accessDataSource.getAll(user_id);
    return result;
  }
}
