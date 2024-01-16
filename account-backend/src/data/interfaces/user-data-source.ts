import { User } from "../../domain/entities/user";

export interface UserDataSource {
  createUser(user: User): Promise<boolean>;
  getAll(): Promise<User[]>;
  getUserByID(user_id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  update(user: User): Promise<boolean>;
}
