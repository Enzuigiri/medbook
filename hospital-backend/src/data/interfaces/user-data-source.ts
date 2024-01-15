import { Medication } from "../../domain/entities/medication";
import { User } from "../../domain/entities/user";

export interface UserDataSource {
    updateMedication(patient_id: string, medication: Medication): Promise<boolean>;
    requestAccess(patient_id: string, req_id: string, type: string, token: string): Promise<number>;
    getAllMedication(token: string): Promise<Medication[]>
    getAllUser(token: string): Promise<User[]>
}