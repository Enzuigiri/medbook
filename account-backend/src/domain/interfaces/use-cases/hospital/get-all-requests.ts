import { HospitalRequest } from "../../../entities/hospital-request";

export interface GetAllRequestUseCase {
  execute(user_id: string): Promise<HospitalRequest[]>;
}
