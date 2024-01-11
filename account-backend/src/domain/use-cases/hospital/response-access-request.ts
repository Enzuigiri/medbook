import { HospitalRequestResponse } from "../../entities/hospital-request";
import { HospitalRequestRepository } from "../../interfaces/repositories/hospital-request-repository";
import { HospitalAccessResponseUseCase } from "../../interfaces/use-cases/hospital/response-access-request";

export class HospitalAccessResponse implements HospitalAccessResponseUseCase {
  private readonly hospitalRequestRepository: HospitalRequestRepository;
  constructor(hospitalRequestRepository: HospitalRequestRepository) {
    this.hospitalRequestRepository = hospitalRequestRepository;
  }

  async execute(response: HospitalRequestResponse): Promise<boolean> {
    const result = await this.hospitalRequestRepository.updateResponseStatus(
      response
    );
    return result;
  }
}
