import { HospitalRequest, HospitalRequestResponse } from "../../domain/entities/hospital-request";

export interface HospitalRequestDataSource {
    create(hospital_request: HospitalRequest, user_id: string): Promise<boolean>;
    getRequests(user_id: string): Promise<HospitalRequest[]>;
    updateResponseStatus(
        hospital_response: HospitalRequestResponse
    ): Promise<boolean>;
}