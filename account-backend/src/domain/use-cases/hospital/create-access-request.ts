
import { HospitalRequest, RequestStatus } from "../../entities/hospital-request";
import { HospitalRequestRepository } from "../../interfaces/repositories/hospital-request-repository";
import { CreateHospitalAccessRequestUseCase } from "../../interfaces/use-cases/hospital/create-access-request";
import { nanoid } from "nanoid";

export class CreateHospitalAccessRequest implements CreateHospitalAccessRequestUseCase {
  private readonly hospitalRequestRepository: HospitalRequestRepository;

  constructor(hospitalRequestRepository: HospitalRequestRepository) {
    this.hospitalRequestRepository = hospitalRequestRepository;
  }

  async execute(hospital_request: HospitalRequest): Promise<boolean> {
    hospital_request.id = nanoid()
    hospital_request.request_status = RequestStatus.pending
    const result = this.hospitalRequestRepository.create(hospital_request);
    return result;
  }
}
