import { Medication } from "../../../entities/medication.js";

export interface EditMedicationUseCase {
  execute(user_id: string, medication: Medication): Promise<Boolean>;
}
