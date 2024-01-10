import { HospitalRequest } from "../../entities/hospital-request";
import { HospitalRequestRepository } from "../../interfaces/repositories/hospital-request-repository";
import { GetAllRequestUseCase } from "../../interfaces/use-cases/hospital/get_all_requests";

export class GetAllRequest implements GetAllRequestUseCase {
  private readonly hospitalRequestRepository: HospitalRequestRepository;
  constructor(hospitalRequestRepository: HospitalRequestRepository) {
    this.hospitalRequestRepository = hospitalRequestRepository;
  }

  async execute(user_id: string): Promise<HospitalRequest[]> {
    const result = await this.hospitalRequestRepository.getRequests(user_id);
    return result;
  }
}
