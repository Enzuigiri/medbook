import { MedicalRecord } from "../../entities/medical-record";
import { User } from "../../entities/user";
import { UserRepository } from "../../interfaces/repositories/user-repository";
import { CreateUserUseCase } from "../../interfaces/use-cases/user/create-user";

export class CreateUser implements CreateUserUseCase {
  private readonly userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<Boolean> {
    user.created_at = new Date()
    user.last_login = new Date()
    user.hospital_request = []
    user.medical_record = { medications: [] }
    const result = await this.userRepository.createUser(user);
    return result;
  }
}
