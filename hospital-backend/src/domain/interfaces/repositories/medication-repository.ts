import { Medication } from "../../entities/medication.js";

export interface MedicationRepository {
  createMedication(medication: Medication): Promise<Boolean>;
  editMedication(medication: Medication): Promise<Boolean>;
  getMedications(user_id: string): Promise<Medication[]>;
}
