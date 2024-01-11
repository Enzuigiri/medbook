import { Medication } from "../../../entities/medication.js";

export interface CreateMedicationUseCase {
  execute(user_id: string, medication: Medication): Promise<Boolean>;
}
