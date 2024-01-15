import { MedicationAccess } from "./medication_access.js";

export interface User {
  id?: string;
  name: string;
  email: string;
  medication_access?: MedicationAccess[];
}

export type GetAllUserResponse = [User]
