import { MedicationAccess, MedicationAccessRequest } from "../../../entities/medication_access";
import { MedicationAccessRepository } from "../../../interfaces/repositories/medication-access-repository";
import { IJwtService } from "../../../interfaces/services/jwt-service";
import { CreateMedicationAccessUseCase } from "../../../interfaces/use-cases/access/medication/create-medication-access";

export class CreateMedicationAccess implements CreateMedicationAccessUseCase {
  private readonly medicationAccessRepository: MedicationAccessRepository;
  private readonly jwtService: IJwtService;
  constructor(medicationAccessRepository: MedicationAccessRepository, jwtService: IJwtService) {
    this.medicationAccessRepository = medicationAccessRepository;
    this.jwtService = jwtService
  }

  async execute(user_id: string, access_request: MedicationAccessRequest, token: string): Promise<boolean> {

    const result = await this.medicationAccessRepository.create(
      user_id,
      access,
      token
    );
    return result;
  }
}
