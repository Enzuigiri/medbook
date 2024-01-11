import { MedicationAccess } from "../../domain/entities/medication_access";

export interface MedicationAccessDataSource {
    create(user_id: string, access: MedicationAccess): Promise<boolean>;
    update(user_id: string, access: MedicationAccess): Promise<boolean>;
    getAll(user_id: string): Promise<MedicationAccess[]>;
}