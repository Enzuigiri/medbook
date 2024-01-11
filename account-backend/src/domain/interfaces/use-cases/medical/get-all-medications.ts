import { Medication } from "../../../entities/medication.js";

export interface GetAllMedicationsUseCase {
  execute(user_id: string): Promise<Medication[]>;
}
