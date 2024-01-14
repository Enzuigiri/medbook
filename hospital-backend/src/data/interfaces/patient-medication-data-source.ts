import { Medication } from "../../domain/entities/medication";

export interface PatientMedicationDataSource {
    update(patient_id: string, medication: Medication): Promise<boolean>;
    requestAccess(patient_id: string, req_id: string, type: string, token: string): Promise<number>;
    getAllMedication(token: string): Promise<Medication[]>
    getAllPatient(token: string): Promise<Medication[]>
}