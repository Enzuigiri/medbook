import { User } from "../../entities/user";
import { StaffRepository } from "../../interfaces/repositories/staff-repository";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import {
  IJwtService,
  IJwtStaffRequestPayload,
} from "../../interfaces/services/jwt-service";
import { GetAllUserUseCase } from "../../interfaces/use-cases/user/get-all-user";

export class GetAllUser implements GetAllUserUseCase {
  private readonly stafRepository: StaffRepository;
  private readonly userRepository: UserRepository;
  private readonly jwtService: IJwtService;
  constructor(
    userRepository: UserRepository,
    stafRepository: StaffRepository,
    jwtService: IJwtService
  ) {
    this.userRepository = userRepository;
    this.stafRepository = stafRepository;
    this.jwtService = jwtService;
  }

  async execute(staff_id: string): Promise<User[]> {
    const staffData = await this.stafRepository.getStaffByID(staff_id);

    const tokenPayload: IJwtStaffRequestPayload = {
      hospital_name: process.env.HOSPITAL1_NAME,
      hospital_id: process.env.HOSPITAL1_ID,
      staff_id: staffData._id.toString(),
      staff_name: staffData.name,
    };

    const token = this.jwtService.createToken(
      tokenPayload,
      process.env.HOSPITAL1_TOKEN_SECRET,
      ""
    );
    const result = await this.userRepository.getAllUser(token);

    return result;
  }
}
