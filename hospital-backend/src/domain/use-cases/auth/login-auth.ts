import { ErrorUtils } from "../../../utils/error/error-utils";
import { RequestAuth, ResponseAuth } from "../../entities/auth";
import { StaffRepository } from "../../interfaces/repositories/staff-repository";
import { IBcryptService } from "../../interfaces/services/bcrypt-service";
import {
  IJwtService,
  IJwtServicePayload,
} from "../../interfaces/services/jwt-service";
import { LoginUseCase } from "../../interfaces/use-cases/auth/login-auth";

export class LoginAuth implements LoginUseCase {
  private readonly staffRepository: StaffRepository;
  private readonly bcryptService: IBcryptService;
  private readonly jwtService: IJwtService;

  constructor(
    staffRepository: StaffRepository,
    bcryptService: IBcryptService,
    jwtService: IJwtService
  ) {
    this.staffRepository = staffRepository;
    this.bcryptService = bcryptService;
    this.jwtService = jwtService;
  }

  async execute(data: RequestAuth): Promise<ResponseAuth> {
    const result = await this.staffRepository.getStaffByID(data.email);

    if (result == null) {
      ErrorUtils.error.badRequestException({
        message: "Wrong Email or Password",
      });
    }

    if (this.bcryptService.compare(data.password, result.password)) {
      
      let tokenPayload = { staff_id: result._id.toString() };

      let refresh_token = this.jwtService.createToken(
        tokenPayload,
        process.env.REFRESH_TOKEN_SECRET,
        process.env.REFRESH_TOKEN_TTL + "s"
      );
      let token = this.jwtService.createToken(
        tokenPayload,
        process.env.TOKEN_SECRET,
        process.env.TOKEN_TTL + "s"
      );

      result.last_login = new Date();
      result.refresh_token = refresh_token;
      await this.staffRepository.updateStaff(result);

      return {
        refresh_token: refresh_token,
        token: token,
      };
    }
    ErrorUtils.error.badRequestException({
      message: "Wrong Email Or Password",
    });
  }
}
