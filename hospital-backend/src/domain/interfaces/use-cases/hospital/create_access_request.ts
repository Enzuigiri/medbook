import { HospitalRequest } from "../../../entities/hospital-request";

export interface CreateHospitalAccessRequestUseCase {
  execute(hospital_request: HospitalRequest): Promise<boolean>;
}
