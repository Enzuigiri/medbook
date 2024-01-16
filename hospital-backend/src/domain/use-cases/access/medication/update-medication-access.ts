import { MedicationAccess } from "../../../entities/medication_access";
import { MedicationAccessRepository } from "../../../interfaces/repositories/medication-access-repository";
import { UpdateMedicationAccessUseCase } from "../../../interfaces/use-cases/access/medication/update-medication-access";

export class UpdateMedicationAccess implements UpdateMedicationAccessUseCase {
  private readonly medicationAccessRepository: MedicationAccessRepository;
  constructor(medicationAccessRepository: MedicationAccessRepository) {
    this.medicationAccessRepository = medicationAccessRepository;
  }

  async execute(user_id: string, access: MedicationAccess): Promise<boolean> {
    const result = await this.medicationAccessRepository.update(
      user_id,
      access
    );
    return result;
  }
}
