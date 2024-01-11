import { MedicationAccess } from "../../entities/medication_access";

export interface MedicationAccessRepository {
    create(user_id: string, access: MedicationAccess): Promise<boolean>
    update(user_id: string, access: MedicationAccess): Promise<boolean>
    getAll(user_id: string): Promise<MedicationAccess[]>
}