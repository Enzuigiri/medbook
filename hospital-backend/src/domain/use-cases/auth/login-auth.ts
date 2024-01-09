import { ErrorUtils } from "../../../utils/error/error-utils";
import { RequestAuth, ResponseAuth } from "../../entities/auth";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { LoginUseCase } from "../../interfaces/use-cases/auth/login-auth";

export class LoginAuth implements LoginUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(data: RequestAuth): Promise<ResponseAuth> {
        const result = await this.userRepository.getUserByEmail(data.email);
        if (result == null) {
            ErrorUtils.error.badRequestException({message: "Wrong Email or Password"});
        }
        if (result.password == data.password) {
            return {
                refresh_token: "asdas",
                token: "asda"
            }
        }
        ErrorUtils.error.badRequestException({message: "Wrong Email Or Password"});
    }

}