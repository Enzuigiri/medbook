import { Medication } from "../../domain/entities/medication";

export interface MedicationDataSource {
    create(user_id: string, medication: Medication): Promise<boolean>
    update(user_id: string, medication: Medication): Promise<boolean>
    getAll(user_id: string): Promise<Medication[]>
}