import { ErrorUtils } from "../../../utils/error/error-utils";
import { RequestAuth, ResponseAuth } from "../../entities/auth";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { IBcryptService } from "../../interfaces/services/bcrypt-service";
import {
  IJwtService,
  IJwtServicePayload,
} from "../../interfaces/services/jwt-service";
import { LoginUseCase } from "../../interfaces/use-cases/auth/login-auth";

export class LoginAuth implements LoginUseCase {
  private readonly userRepository: UserRepository;
  private readonly bcryptService: IBcryptService;
  private readonly jwtService: IJwtService;

  constructor(
    userRepository: UserRepository,
    bcryptService: IBcryptService,
    jwtService: IJwtService
  ) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
    this.jwtService = jwtService;
  }

  async execute(data: RequestAuth): Promise<ResponseAuth> {
    const result = await this.userRepository.getUserByEmail(data.email);

    if (result == null) {
      ErrorUtils.error.badRequestException({
        message: "Wrong Email or Password",
      });
    }

    if (this.bcryptService.compare(data.password, result.password)) {
      let tokenPayload: IJwtServicePayload = { email: result.email };
      let refresh_token = this.jwtService.createToken(
        tokenPayload,
        "asdads",
        "1800s"
      );
      let token = this.jwtService.createToken(tokenPayload, "asdada", "1800s");
        
      result.last_login = new Date();
      result.refrest_token = refresh_token;
      await this.userRepository.update(result);

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
