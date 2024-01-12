import { Medication } from "../../../../entities/medication";

export interface GetAllPatientMedicationUseCase {
    execute(user_id: string): Promise<Medication[]>
}