import { nanoid } from "nanoid";
import { Medication } from "../../entities/medication";
import { MedicationRepository } from "../../interfaces/repositories/medication-repository";
import { CreateMedicationUseCase } from "../../interfaces/use-cases/medical/create-medication";

export class CreateMedication implements CreateMedicationUseCase {
  private readonly medicationRepository: MedicationRepository;
  constructor(medicationRepository: MedicationRepository) {
    this.medicationRepository = medicationRepository;
  }

  async execute(user_id: string, medication: Medication): Promise<Boolean> {
    medication.id = nanoid();
    medication.created_date = new Date();
    const result = await this.medicationRepository.createMedication(
      user_id,
      medication
    );
    return result;
  }
}
