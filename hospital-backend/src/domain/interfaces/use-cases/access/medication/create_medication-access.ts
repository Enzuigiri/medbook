import { MedicationAccess } from "../../../../entities/medication_access";

export interface CreateMedicationAccessUsecas {
    execute(user_id: string, access: MedicationAccess): Promise<boolean>
}