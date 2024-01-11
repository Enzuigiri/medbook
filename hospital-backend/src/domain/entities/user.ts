import { HospitalRequest } from "./hospital-request.js";
import { MedicalRecord } from "./medical-record.js";
import { MedicationAccess } from "./medication_access.js";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  created_at?: Date;
  last_login?: Date;
  refrest_token?: string;
  medication_access?: MedicationAccess[];
}
