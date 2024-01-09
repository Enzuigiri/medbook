import { User } from "../../entities/user.js";

export interface UserRepository {
  createUser(user: User): Promise<Boolean>;
  getUserByEmail(email: string): Promise<User>;
  getUsers(): Promise<User[]>;
}
