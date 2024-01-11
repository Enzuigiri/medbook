import { Medication } from "../../entities/medication";
import { MedicationRepository } from "../../interfaces/repositories/medication-repository";
import { GetAllMedicationsUseCase } from "../../interfaces/use-cases/medical/get-all-medications";

export class GetAllMedication implements GetAllMedicationsUseCase {
  private readonly medicationRepository: MedicationRepository;
  constructor(medicationRepository: MedicationRepository) {
    this.medicationRepository = medicationRepository;
  }

  async execute(user_id: string): Promise<Medication[]> {
    const result = this.medicationRepository.getMedications(user_id);
    return result;
  }
}
