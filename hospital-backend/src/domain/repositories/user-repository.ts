import { UserDataSource } from "../../data/interfaces/user-data-source";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
  private readonly userDataSource: UserDataSource;
  constructor(userDataSouce: UserDataSource) {
    this.userDataSource = userDataSouce;
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.userDataSource.getUserByEmail(email);
    return result;
  }

  async createUser(user: User): Promise<Boolean> {
    const result = await this.userDataSource.createUser(user);
    return result;
  }

  async getUsers(): Promise<User[]> {
    const result = await this.userDataSource.getAll();
    return result;
  }
}
