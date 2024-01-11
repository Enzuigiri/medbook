import { HospitalRequestDataSource } from "../../data/interfaces/hospital-request-data-source";
import {
  HospitalRequest,
  HospitalRequestResponse,
} from "../entities/hospital-request";
import { HospitalRequestRepository } from "../interfaces/repositories/hospital-request-repository";

export class HospitalRequestRepositoryImpl
  implements HospitalRequestRepository
{
  private readonly hospitalRequestDataSource: HospitalRequestDataSource;
  constructor(hostpitalRequestDataSource: HospitalRequestDataSource) {
    this.hospitalRequestDataSource = hostpitalRequestDataSource;
  }

  async create(hospital_request: HospitalRequest): Promise<boolean> {
    const user_id = hospital_request.user_id;
    hospital_request.date = new Date();
    delete hospital_request.user_id;
    const result = await this.hospitalRequestDataSource.create(
      hospital_request,
      user_id
    );
    return result;
  }

  async getRequests(user_id: string): Promise<HospitalRequest[]> {
    const result = await this.hospitalRequestDataSource.getRequests(user_id);
    return result;
  }

  async updateResponseStatus(
    hospital_response: HospitalRequestResponse
  ): Promise<boolean> {
    const result = await this.hospitalRequestDataSource.updateResponseStatus(
      hospital_response
    );
    return result;
  }
}
