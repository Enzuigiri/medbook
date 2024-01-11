import { User } from "../../../entities/user.js";

export interface GetAllUsersUseCase {
  execute(): Promise<User[]>;
}
