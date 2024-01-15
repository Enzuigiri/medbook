import { UserDataSource } from "../../data/interfaces/user-data-source";
import { User } from "../entities/user";
import { UserRepository } from "../interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
  private readonly userDataSource: UserDataSource;
  constructor(userDataSource: UserDataSource) {
    this.userDataSource = userDataSource;
  }

  async getAllUser(token: string): Promise<User[]> {
    const result = await this.userDataSource.getAllUser(token);
    return result;
  }
}
