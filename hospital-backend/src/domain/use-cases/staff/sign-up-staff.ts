import { Staff } from "../../entities/staff";
import { StaffRepository } from "../../interfaces/repositories/staff-repository";
import { SignUpStaffUseCase } from "../../interfaces/use-cases/staff/sign-up-staff";
import { BcryptService } from "../../services/bcrypt-service";

export class SignUpStaff implements SignUpStaffUseCase {
  private readonly userRepository: StaffRepository;
  private readonly bcryptService: BcryptService;

  constructor(staffRepository: StaffRepository, bcryptService: BcryptService) {
    this.userRepository = staffRepository;
    this.bcryptService = bcryptService;
  }

  async execute(staff: Staff): Promise<Boolean> {
    staff.password = await this.bcryptService.hash(staff.password);
    staff.created_at = new Date();
    staff.last_login = new Date();
    staff.refrest_token = ""
    const result = await this.userRepository.createStaff(staff);
    return result;
  }
}
