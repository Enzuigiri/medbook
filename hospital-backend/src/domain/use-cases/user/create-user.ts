import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { CreateUserUseCase } from "../../interfaces/use-cases/user/create-user";
import { BcryptService } from "../../services/bcrypt-service";

export class CreateUser implements CreateUserUseCase {
  private readonly userRepository: UserRepository;
  private readonly bcryptService: BcryptService;

  constructor(userRepository: UserRepository, bcryptService: BcryptService) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async execute(user: User): Promise<Boolean> {
    user.password = await this.bcryptService.hash(user.password);
    user.created_at = new Date();
    user.last_login = new Date();
    user.hospital_request = [];
    user.medical_record = { medications: [] };
    user.refrest_token = ""
    const result = await this.userRepository.createUser(user);
    return result;
  }
}
