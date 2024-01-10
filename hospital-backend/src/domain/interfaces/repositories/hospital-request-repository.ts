import {
  HospitalRequest,
  HospitalRequestResponse,
} from "../../entities/hospital-request";

export interface HospitalRequestRepository {
  create(hospital_request: HospitalRequest): Promise<boolean>;
  getRequests(user_id: string): Promise<HospitalRequest[]>;
  updateResponseStatus(
    hospital_response: HospitalRequestResponse
  ): Promise<boolean>;
}
