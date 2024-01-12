import { MedicationAccess } from "../../../../entities/medication_access";

export interface UpdateMedicationAccessUseCase {
    execute(user_id: string, access: MedicationAccess): Promise<boolean>
}