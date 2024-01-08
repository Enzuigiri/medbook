import { MedicalRecord } from "./medical-record.js";

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  medical_record?: MedicalRecord;
}
