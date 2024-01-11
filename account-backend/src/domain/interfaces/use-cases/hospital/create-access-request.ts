import { HospitalRequest } from "../../../entities/hospital-request";

export interface CreateHospitalAccessRequestUseCase {
  execute(request: HospitalRequest): Promise<boolean>;
}
