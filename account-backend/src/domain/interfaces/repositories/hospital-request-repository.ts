import {
  HospitalRequest,
  HospitalRequestResponse,
} from "../../entities/hospital-request";

export interface HospitalRequestRepository {
  create(request: HospitalRequest): Promise<boolean>;
  getRequests(user_id: string): Promise<HospitalRequest[]>;
  updateResponseStatus(response: HospitalRequestResponse): Promise<boolean>;
}
