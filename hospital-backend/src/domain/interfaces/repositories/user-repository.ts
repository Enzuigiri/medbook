import { User } from "../../entities/user.js";

export interface UserRepository {
  createUser(user: User): Promise<Boolean>;
  getUsers(): Promise<User[]>;
}
