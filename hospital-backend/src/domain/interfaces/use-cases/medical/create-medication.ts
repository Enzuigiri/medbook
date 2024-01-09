import { Medication } from "../../../entities/medication.js";

export interface CreateMedicationUseCase {
  execute(medication: Medication): Promise<Boolean>;
}
