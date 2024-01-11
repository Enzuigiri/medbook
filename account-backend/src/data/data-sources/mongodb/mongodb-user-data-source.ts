import { User } from "../../../domain/entities/user";
import { MongoDBWrapper } from "../../interfaces/mongo-db-wrapper";
import { UserDataSource } from "../../interfaces/user-data-source";

export class MongoDBUserDataSource implements UserDataSource {
  private readonly database: MongoDBWrapper;

  constructor(database: MongoDBWrapper) {
    this.database = database;
  }

  async update(user: User): Promise<any> {
    const result = await this.database.updateOne({ email: user.email }, { $set: user });
    return result !== null;
  }

  async getUserByEmail(email: string): Promise<User> {
    const result = await this.database.findOne({ email: email });
    return result;
  }

  async createUser(user: User): Promise<boolean> {
    const result = await this.database.insertOne(user);
    return result !== null;
  }

  async getAll(): Promise<User[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
    }));
  }
}
