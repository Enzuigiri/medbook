import { Medication } from "../../entities/medication";
import { MedicationRepository } from "../../interfaces/repositories/medication-repository";
import { EditMedicationUseCase } from "../../interfaces/use-cases/medical/edit-medication";

export class EditMedication implements EditMedicationUseCase {
  private readonly medicationRepository: MedicationRepository;
  constructor(medicationRepository: MedicationRepository) {
    this.medicationRepository = medicationRepository;
  }

  async execute(user_id: string, medication: Medication): Promise<Boolean> {
    const result = await this.medicationRepository.editMedication(
      user_id,
      medication
    );
    return result;
  }
}
