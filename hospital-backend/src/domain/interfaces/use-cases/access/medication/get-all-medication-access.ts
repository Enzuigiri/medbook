import { MedicationAccess } from "../../../../entities/medication_access";

export interface GetAllMedicationAccessUseCase {
    execute(user_id:string): Promise<MedicationAccess[]>
}