import { MedicationAccess, MedicationAccessRequest } from "../../../../entities/medication_access";
import { MedicationAccessRepository } from "../../../repositories/medication-access-repository";

export interface CreateMedicationAccessUseCase {
    execute(user_id: string, access_request: MedicationAccess, token: string): Promise<boolean>
}