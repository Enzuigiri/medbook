import { User } from "../../entities/user.js";

export interface UserRepository {
  createUser(user: User): Promise<boolean>;
  getUserByEmail(email: string): Promise<User>;
  getUserByID(user_id: string): Promise<User>
  getUsers(): Promise<User[]>;
  update(user: User): Promise<boolean>;
}
