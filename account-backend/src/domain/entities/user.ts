import { ObjectId } from "mongodb";
import { HospitalRequest } from "./hospital-request.js";
import { MedicalRecord } from "./medical-record.js";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string;
  medical_record?: MedicalRecord;
  hospital_request?: HospitalRequest[];
  created_at?: Date;
  last_login?: Date;
  refrest_token?: string;
}
