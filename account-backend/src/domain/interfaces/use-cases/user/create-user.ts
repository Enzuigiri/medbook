import { User } from "../../../entities/user.js";

export interface CreateUserUseCase {
  execute(user: User): Promise<Boolean>;
}
