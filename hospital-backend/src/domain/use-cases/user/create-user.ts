import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { CreateUserUseCase } from "../../interfaces/use-cases/user/create-user";

export class CreateUser implements CreateUserUseCase {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<Boolean> {
    const result = await this.userRepository.createUser(user);
    return result;
  }
}
