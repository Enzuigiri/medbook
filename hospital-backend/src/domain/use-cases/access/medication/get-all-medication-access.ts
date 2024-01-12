import { MedicationAccess } from "../../../entities/medication_access";
import { MedicationAccessRepository } from "../../../interfaces/repositories/medication-access-repository";
import { GetAllMedicationAccessUseCase } from "../../../interfaces/use-cases/access/medication/get-all-medication-access";

export class GetAllMedicationAccess implements GetAllMedicationAccessUseCase {
    private readonly medicationAccessRepository: MedicationAccessRepository
    constructor(medicationAccessRepository: MedicationAccessRepository) {
        this.medicationAccessRepository = medicationAccessRepository
    }

    async execute(user_id: string): Promise<MedicationAccess[]> {
       const result = await this.medicationAccessRepository.getAll(user_id);
       return result
    }
}