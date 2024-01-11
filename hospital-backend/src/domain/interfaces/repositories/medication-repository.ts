import { Medication } from "../../entities/medication.js";

export interface MedicationRepository {
  createMedication(user_id: string, medication: Medication): Promise<Boolean>;
  editMedication(user_id: string, medication: Medication): Promise<Boolean>;
  getMedications(user_id: string): Promise<Medication[]>;
}
