import { MedicationDataSource } from "../../data/interfaces/medication-data-source";
import { Medication } from "../entities/medication";
import { MedicationRepository } from "../interfaces/repositories/medication-repository";

export class MedicationRepositoryImpl implements MedicationRepository {
  private readonly medicationDataSource: MedicationDataSource;
  constructor(medicationDataSource: MedicationDataSource) {
    this.medicationDataSource = medicationDataSource;
  }

  async createMedication(
    user_id: string,
    medication: Medication
  ): Promise<Boolean> {
    const result = await this.medicationDataSource.create(user_id, medication);
    return result;
  }

  async editMedication(
    user_id: string,
    medication: Medication
  ): Promise<Boolean> {
    const result = await this.medicationDataSource.edit(user_id, medication);
    return result;
  }

  async getMedications(user_id: string): Promise<Medication[]> {
    const result = await this.medicationDataSource.getAll(user_id);
    return result;
  }
}
