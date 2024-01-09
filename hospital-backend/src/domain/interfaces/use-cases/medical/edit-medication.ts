import { Medication } from "../../../entities/medication.js";

export interface EditMedicationUseCase {
  execute(medication: Medication): Promise<Boolean>;
}
